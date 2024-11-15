import dask.dataframe as dd
import plotly.express as px
import dash_bootstrap_components as dbc
from dash_extensions.enrich import (
    DashProxy,
    html,
    dcc,
    Input,
    Output,
    State,
    Serverside,
    ServersideOutputTransform,
)
import io
import base64
import logging
import os
import dash
from dash import callback_context

from utils import parse_xml, ts_type, clean_types, prompt
from layout_utils import update_figure_layout

from proompt import Proompt

SELECTED_THEME = dbc.themes.BOOTSTRAP

app = DashProxy(
    __name__,
    transforms=[ServersideOutputTransform()],
    suppress_callback_exceptions=True,
)

server = app.server

parquet_path = "data/carter_export.parquet"

df = dd.read_parquet(parquet_path)

def valid_types(_df=df):
    return [_type for _type in _df["type"].unique().compute() if "<NA>" not in _type]

theme_toggle = dbc.Switch(
    id="theme-toggle",
    label=None,
    value=False,
    className="ms-2",
)

navbar = dbc.Navbar(
    dbc.Container([
        dbc.NavbarBrand("Team 204 - Health Insights", href="#"),
        dbc.Nav([
            dbc.NavItem(
                html.Div([
                    theme_toggle,
                    html.Span(id='theme-label', className="ms-2")
                ], className="theme-toggle-container")
            )
        ], className="ms-auto"),
    ]),
    color="primary",
    expand="lg",
    className="position-relative",
)

app.layout = html.Div([
    html.Link(rel="stylesheet", href=SELECTED_THEME, id="theme-link"),

    dcc.Store(id='theme-store', data='light'),

    navbar,

    html.Div([
        html.H1("Automated Health Insights from Wearable Devices", className='text-center my-4'),
        html.P(
            "By default we display metrics based on Carter's Apple Watch data. Note that he switched to the Apple Watch Ultra in April 2023, so metrics may be measured slightly differently before and after this date. You can upload your own data to visualize your own metrics.",
            className='text-center'
        )
    ], className='centered-section'),

    html.Div([
        dcc.Upload(
            id='upload-data',
            children=html.Div([
                html.A('Upload Export.xml', className='btn btn-primary')
            ]),
            accept='.xml',
            className='upload-container'
        )
    ], className='centered-section my-3'),

    html.Br(),
    html.Div([
        html.P("Select the metrics you want to visualize:", className='text-center'),
        dcc.Dropdown(
            id='type-dropdown',
            options=[{'label': _type, 'value': _type} for _type in valid_types()],
            value=[],
            className='dccDropdown',
            multi=True,
        ),
    ], className='metrics-section'),

    dcc.Loading(
        id="loading-metrics",
        type="graph",
        fullscreen=True,
        children=html.Div(id='metric-graphs', className='container'),
        className='dash-loading'
    ),
    dcc.Loading(
        dcc.Store(id='df-store'),
        fullscreen=True,
        type='cube',
        className='dash-loading'
    ),
    html.Div(
        children=[
            html.H2("Personalized Insights", className='text-center'),
            html.Br(),
            dcc.Loading(
                html.P(id='insights-container'),
                id="loading-insights",
                type="dot",
                className="dash-loading"
            )
        ],
        className='insights-section',
        style={'width': '80%', 'margin': 'auto'}  # Added style for 80% width
    ),
], id='main-container')

@app.callback(
    Output('type-dropdown', 'options'),
    Input('df-store', 'data'),
    prevent_initial_call=True,
)
def update_type_dropdown(_df):
    return [{'label': _type, 'value': _type} for _type in valid_types(_df)]
   
@app.callback(
    Output('theme-label', 'children'),
    Input('theme-toggle', 'value')
)
def update_theme_label(dark_mode):
    return "Light Mode" if dark_mode else "Dark Mode"

@app.callback(
    Output('df-store', 'data'),
    Input('upload-data', 'contents'),
    State('upload-data', 'filename'),
)
def update_df(contents, filename):
    if contents:
        content_type, content_string = contents.split(",")
        decoded = base64.b64decode(content_string)

        try:
            logging.info(f"Parsing XML file: {filename}")
            _df = parse_xml(io.StringIO(decoded.decode("utf-8")))
            _df = clean_types(_df)
        except Exception as e:
            logging.error(e)
            return Serverside(df)
    else:
        _df = df
    logging.debug(f"Updated df:\n{_df.head()}")
    return Serverside(_df)

@app.callback(
    Output("metric-graphs", "children"),
    Input("df-store", "data"),
    Input("type-dropdown", "value"),
    Input("theme-toggle", "value"),
    prevent_initial_call=True,
)
def update_metric_graphs(_df, types, dark_mode):
    theme = 'dark' if dark_mode else 'light'
    figs = []
    for _type in types:
        if _type:
            series = ts_type(_df, _type)
            fig = px.line(series, title=series.name)
            fig = update_figure_layout(fig, series.name, theme)
            figs.append(fig)
    return html.Div(
        [
            html.Div(
                dcc.Graph(figure=fig),
                className='graph-item'
            ) for fig in figs
        ],
        className='graph-container'
    )

@app.callback(
    Output("insights-container", "children"),
    Input("df-store", "data"),
)
def update_insights(_df):
    if _df is None:
        return
    logging.info("Updating insights")
    metrics = prompt(_df)
    proompt = Proompt()
    
    logging.debug(f"Metrics: {metrics}")
    possible_conditions = proompt.generate_possible_conditions(metrics)
    logging.debug(f"Possible conditions: {possible_conditions}")
    # condition, score = proompt.extract_condition(metrics, possible_conditions)
    # logging.debug(f"Condition: {condition}, Score: {score}")
    
    return html.P(possible_conditions)

app.clientside_callback(
    """
    function(dark_mode) {
        const theme = dark_mode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
        return dark_mode;
    }
    """,
    Output('theme-store', 'data'),
    Input('theme-toggle', 'value'),
)

if __name__ == "__main__":
    logging.basicConfig(level=logging.ERROR)
    app.run()