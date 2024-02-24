import os
import random
import shutil

# Define the folder to store sample data
sample_data_folder = "sample_data"

# Create folders for each drawing type
types = ["Architectural", "Structural", "Hydraulic", "Electrical", "Civil"]
for type_name in types:
    os.makedirs(os.path.join(sample_data_folder, type_name), exist_ok=True)

# Function to generate sample data
def generate_sample_data(num_drawings_per_type):
    for type_name in types:
        for i in range(num_drawings_per_type):
            # Generate a random filename
            filename = f"{type_name}_{i+1}.pdf" if random.randint(0, 1) == 0 else f"{type_name}_{i+1}.dwg"
            # Create an empty file
            with open(os.path.join(sample_data_folder, type_name, filename), "w") as f:
                pass

# Generate sample data with 5 drawings per type
generate_sample_data(5)

# Function to generate additional random drawings in "Other" folder
def generate_other_drawings(num_other_drawings):
    other_folder = os.path.join(sample_data_folder, "Other")
    os.makedirs(other_folder, exist_ok=True)
    for i in range(num_other_drawings):
        filename = f"Other_{i+1}.pdf" if random.randint(0, 1) == 0 else f"Other_{i+1}.dwg"
        with open(os.path.join(other_folder, filename), "w") as f:
            pass

# Generate additional random drawings in "Other" folder
generate_other_drawings(3)

print("Sample data generated successfully.")
