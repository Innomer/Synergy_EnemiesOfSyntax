import os
import shutil

source_directory = 'source/directory/path'
destination_directory = 'destination/directory/path'
drawing_types = ['Architectural', 'Structural', 'Hydraulic', 'Electrical', 'Civil']

def segregate_drawings():
    if not os.path.exists(destination_directory):
        os.makedirs(destination_directory)

    for file in os.listdir(source_directory):
        if file.lower().endswith(('.pdf', '.dwg')):
            for drawing_type in drawing_types:
                if drawing_type.lower() in file.lower():
                    type_destination = os.path.join(destination_directory, drawing_type)
                    if not os.path.exists(type_destination):
                        os.makedirs(type_destination)
                    
                    shutil.move(os.path.join(source_directory, file), os.path.join(type_destination, file))
                    break

segregate_drawings()
