import dash
from dash import dcc, html, Input, Output, State
import dash_bootstrap_components as dbc
from pdf_loader import get_fda_drug_data, extract_drug_name_from_pdf
import base64

# Initialize the Dash app
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Store the drug info in a server-side variable using dcc.Store
app.layout = dbc.Container([
    dcc.Location(id='url', refresh=False),  # URL bar for page navigation
    dcc.Store(id='drug-info-store'),  # Store for drug information
    dcc.Store(id='drug-name-store'),  # Store for drug name

    # Page layout that will change based on the URL
    html.Div(id='page-content')
])

# Page 1: PDF Upload Page
upload_layout = dbc.Container([
    html.H1("Upload PDF to Extract Drug Information"),

    dcc.Upload(
        id='upload-pdf',
        children=html.Div([
            'Drag and Drop or ',
            html.A('Select PDF File')
        ]),
        style={
            'width': '100%', 'height': '60px', 'lineHeight': '60px',
            'borderWidth': '1px', 'borderStyle': 'dashed',
            'borderRadius': '5px', 'textAlign': 'center', 'margin': '10px'
        },
        multiple=False
    ),

    html.Div(id='output-upload-status'),

    dbc.Button("Go to Dashboard", id='go-to-dashboard', href='/dashboard', color='primary', disabled=True)
])

# Page 2: Dashboard Page
dashboard_layout = dbc.Container([
    html.H1("Drug Information Dashboard"),

    html.Div(id='output-drug-info', children=[
        html.H4(id='adverse-effects'),
        html.H4(id='usage'),
        html.H4(id='directions'),
        html.H4(id='storage')
    ], style={'marginTop': '20px'}),

    dbc.Button("Back to Upload", id='back-to-upload', href='/upload', color='secondary', style={'marginTop': '20px'})
])


# Update the layout based on the URL
@app.callback(
    Output('page-content', 'children'),
    [Input('url', 'pathname')]
)
def display_page(pathname):
    if pathname == '/dashboard':
        return dashboard_layout
    else:
        return upload_layout  # Default is the upload page


# Handle PDF upload and store drug information
@app.callback(
    [Output('output-upload-status', 'children'),
     Output('drug-name-store', 'data'),
     Output('go-to-dashboard', 'disabled')],
    [Input('upload-pdf', 'contents')]
)
def handle_pdf_upload(contents):
    if contents is not None:
        drug_name = extract_drug_name_from_pdf(contents)
        if drug_name:
            return f"Drug Name Extracted: {drug_name}", drug_name, False
    return "No drug name found in PDF", None, True


# Fetch drug data and update the dashboard page with drug info
@app.callback(
    [Output('adverse-effects', 'children'),
     Output('usage', 'children'),
     Output('directions', 'children'),
     Output('storage', 'children'),
     Output('drug-info-store', 'data')],
    [Input('url', 'pathname')],
    [State('drug-name-store', 'data')]
)
def update_dashboard(pathname, drug_name):
    if pathname == '/dashboard' and drug_name:
        drug_info = get_fda_drug_data(drug_name)
        if drug_info:
            return (
                f"Adverse Effects: {drug_info.get('adverse_effects', 'No data')}",
                f"Usage: {drug_info.get('usage', 'No data')}",
                f"Directions: {drug_info.get('directions', 'No data')}",
                f"Storage: {drug_info.get('storage', 'No data')}",
                drug_info
            )
    return "", "", "", "", None


# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
