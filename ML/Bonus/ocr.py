import os
from PIL import Image
import pytesseract
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

def extract_text_from_image(image_path):
    try:
        text = pytesseract.image_to_string(Image.open(image_path))
        return text
    except Exception as e:
        print(f"Error processing image: {e}")
        ret
def classify_document(text):

    pass


def extract_details(text, doc_type):

    pass

source_directory = 'path/to/source'
for file_name in os.listdir(source_directory):
    file_path = os.path.join(source_directory, file_name)
    text = extract_text_from_image(file_path)
    if text:
        doc_type = classify_document(text)
        details = extract_details(text, doc_type)
