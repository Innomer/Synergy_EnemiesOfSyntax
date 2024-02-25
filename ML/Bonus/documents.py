import os
import shutil

source_directory = 'source/documents/path'
destination_directory = 'destination/documents/path'
document_categories = ['Report', 'Specification', 'Approvals', 'Schedules', 'Scope of Works', 'Subcontract', 'Contract']

def organize_documents():
    if not os.path.exists(destination_directory):
        os.makedirs(destination_directory)

    for file in os.listdir(source_directory):
        if file.lower().endswith(('.pdf', '.docx', '.xlsx')):
            for category in document_categories:
                if category.lower() in file.lower():
                    category_destination = os.path.join(destination_directory, category)
                    if not os.path.exists(category_destination):
                        os.makedirs(category_destination)
                    
                    shutil.move(os.path.join(source_directory, file), os.path.join(category_destination, file))
                    break

organize_documents()
