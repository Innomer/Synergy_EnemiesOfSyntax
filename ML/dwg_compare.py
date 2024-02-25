from flask import Flask, request, jsonify, send_file
from PIL import Image
from pdf2image import convert_from_path
import img2pdf
import json
import os
import requests
from io import BytesIO

app = Flask(__name__)

from pathlib import Path
import sys

def convert_node_path_to_system_path(node_path):
    # Assuming the node_path is a URL-encoded string
    decoded_path = Path(node_path).resolve()

    # Convert to system-specific path
    system_path = str(decoded_path)

    if sys.platform.startswith('win'):
        # If on Windows, replace forward slashes with backslashes
        system_path = system_path.replace('/', '\\')

    return system_path

def pdftoimg(pdf_file):
    images = convert_from_path(pdf_file)
    return images

def make_image_transparent(image):
    img = image.convert("RGBA")
    datas = img.getdata()
    new_data = [(r, g, b, 0) if r == g == b == 255 else item for r, g, b, item in datas]
    img.putdata(new_data)
    return img

def compare_image(image1, image2):
    img1 = image1.convert("RGBA")
    img2 = image2.convert("RGBA")
    datas1 = img1.getdata()
    datas2 = img2.getdata()

    new_data = [(255, 0, 0) if data1 != data2 else data1 for data1, data2 in zip(datas1, datas2)]
    img2.putdata(new_data)

    return img2

def save_images_to_pdf(image_paths, output_pdf_path):
    for image_path in image_paths:
        with open(output_pdf_path, "wb") as f:
            f.write(img2pdf.convert(image_path))

@app.route('/compare_images', methods=['POST'])
def compare_images():
    try:
        # Assuming you have a byte object received in request.data
        byte_data = request.data

        # Decode the byte data to a string assuming it's in JSON format
        decoded_data = byte_data.decode('utf-8')

        # Now, you can load the JSON string into a dictionary
        data_dict = json.loads(decoded_data)

        # Access values using dictionary methods
        old_dwg_url = data_dict.get('old_dwg')
        mod_dwg_url = data_dict.get('mod_dwg')

        old_dwg_url = convert_node_path_to_system_path(old_dwg_url).replace("ML","backend")
        mod_dwg_url = convert_node_path_to_system_path(mod_dwg_url).replace("ML","backend")

        (old_dwg_url,mod_dwg_url)=(mod_dwg_url,old_dwg_url)
        print(old_dwg_url)
        print(mod_dwg_url)

        # Convert PDFs to images
        old_dwg_img = pdftoimg(old_dwg_url)
        mod_dwg_img = pdftoimg(mod_dwg_url)


        results = []

        for index, (old, modded) in enumerate(zip(old_dwg_img, mod_dwg_img)):
            transparent_old = make_image_transparent(old)
            transparent_mod = make_image_transparent(modded)
            compared_image = compare_image(transparent_old, transparent_mod)

            # Save the compared image as PNG
            compared_image_path = f'compared_image_{index}.png'
            compared_image.save(compared_image_path)

            results.append(compared_image_path)

        # Save the compared images to a PDF
        output_pdf_path = 'compared_images.pdf'
        save_images_to_pdf(results, output_pdf_path)

        # Get the server's IP address
        server_ip = "122.170.14.3"

        # Create a downloadable link with the server's IP address
        download_link = f'http://{server_ip}:5555/download/{output_pdf_path}'
        
        return jsonify({'download_link': download_link})
    except Exception as e:
        print(e)
        return str(e)

@app.route('/download/<path:filename>')
def download_file(filename):
    return send_file(filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host="122.170.14.3", port="5555")
