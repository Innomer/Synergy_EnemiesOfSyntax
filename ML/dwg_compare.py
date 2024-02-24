from flask import Flask, request, send_file
from PIL import Image
from pdf2image import convert_from_path

app = Flask(__name__)

def pdftoimg(pdf_file):
    images = convert_from_path(pdf_file)
    return images

def make_image_transparent(image):
    img = image.convert("RGBA")
    datas = img.getdata()
    newData = []

    for item in datas:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)

    return img

def compare_image(image1, image2):
    img1 = image1.convert("RGBA")
    img2 = image2.convert("RGBA")
    datas1 = img1.getdata()
    datas2 = img2.getdata()

    newData = []
    for i in range(0, len(datas1)):
        if datas1[i] == datas2[i]:
            newData.append(datas1[i])
        else:
            newData.append((255, 0, 0))

    img2.putdata(newData)

    return img2

@app.route('/compare_images', methods=['POST'])
def compare_images():
    try:
        old_dwg_path = request.form['old_dwg']
        mod_dwg_path = request.form['mod_dwg']

        old_dwg_img = pdftoimg(old_dwg_path)
        mod_dwg_img = pdftoimg(mod_dwg_path)

        results = []

        for old, modded in zip(old_dwg_img, mod_dwg_img):
            transparent_old = make_image_transparent(old)
            transparent_mod = make_image_transparent(modded)
            compared_image = compare_image(transparent_old, transparent_mod)

            # Save the compared image
            compared_image_path = 'compared_image.png'
            compared_image.save(compared_image_path)

            results.append(compared_image_path)

        return send_file(results[0], mimetype='image/png', as_attachment=True)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(port=5000,debug=True)