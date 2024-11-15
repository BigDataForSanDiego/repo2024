import base64
import io
import requests
import PyPDF2
import os


# Function to extract drug data from FDA API
def get_fda_drug_data(drug_name):
    base_url = "https://api.fda.gov/drug/label.json"
    params = {'search': f"openfda.brand_name:{drug_name}", 'limit': 1}
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raise an error for bad responses
        data = response.json()

        if 'results' in data and len(data['results']) > 0:
            drug_info = data['results'][0]
            adverse_effects = drug_info.get('stop_use', ['No adverse effects data available'])[0]
            usage = drug_info.get('indications_and_usage', ['No usage data available'])[0]
            directions = drug_info.get('dosage_and_administration', ['No directions available'])[0]
            storage = drug_info.get('storage_and_handling', ['No storage data available'])[0]

            return {
                'adverse_effects': adverse_effects,
                'usage': usage,
                'directions': directions,
                'storage': storage
            }
        else:
            return {'error': 'No results found for the provided drug name.'}
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}


# Function to extract drug name from uploaded PDF
def extract_drug_name_from_pdf(contents):
    _, content_string = contents.split(',')
    decoded = base64.b64decode(content_string)
    with io.BytesIO(decoded) as open_pdf_file:
        reader = PyPDF2.PdfReader(open_pdf_file)
        page = reader.pages[0]
        text = page.extract_text()

        # Logic to extract drug name from PDF
        for line in text.split("\n"):
            if "medicine name:" in line.lower():
                return line.split(":")[1].strip()  # Extract the drug name

    return None


# Function to load PDF manually from a specified path
def load_pdf_file(file_path):
    if os.path.isfile(file_path) and file_path.lower().endswith('.pdf'):
        with open(file_path, "rb") as pdf_file:
            encoded_string = base64.b64encode(pdf_file.read()).decode('utf-8')
            pdf_content = f"data:application/pdf;base64,{encoded_string}"
            return pdf_content
    else:
        print("Invalid file path. Please ensure the file exists and is a PDF.")
        return None


# Example usage
if __name__ == "__main__":
    # Manual input for PDF file path
    file_path = input("Enter the path to the PDF file: ")

    # Load the PDF file
    pdf_content = load_pdf_file(file_path)
    if pdf_content:
        drug_name = extract_drug_name_from_pdf(pdf_content)
        if drug_name:
            drug_info = get_fda_drug_data(drug_name)
            print(drug_info)
        else:
            print("No drug name found in the PDF.")
