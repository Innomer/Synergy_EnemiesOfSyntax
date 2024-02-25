import os
import shutil

source_directory = 'source/images/path'
destination_directory = 'destination/images/path'
image_categories = ['3D Render', 'Site Photos', 'Inspection Photos']

def sort_images():
    if not os.path.exists(destination_directory):
        os.makedirs(destination_directory)

    for file in os.listdir(source_directory):
        if file.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tif', '.tiff')):
            for category in image_categories:
                if category.lower() in file.lower():
                    category_destination = os.path.join(destination_directory, category)
                    if not os.path.exists(category_destination):
                        os.makedirs(category_destination)
                    
                    shutil.move(os.path.join(source_directory, file), os.path.join(category_destination, file))
                    break

sort_images()
