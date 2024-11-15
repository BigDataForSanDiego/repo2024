import plotly.graph_objects as go

def update_figure_layout(fig, series_name, selected_theme):
    # Define a darker blue color
    darker_blue = '#00003f'  # A much darker blue color

    if selected_theme == 'dark':
        fig.update_layout(
            plot_bgcolor='#1a1a1a',
            paper_bgcolor='#1a1a1a',
            font=dict(color='#e0e0e0'),
            xaxis=dict(
                title='Date',
                gridcolor='#444',
                zerolinecolor='#444',
                title_font=dict(color=darker_blue),  # Updated text color
                tickfont=dict(color=darker_blue)     # Updated text color
            ),
            yaxis=dict(
                title=series_name,
                gridcolor='#444',
                zerolinecolor='#444',
                title_font=dict(color=darker_blue),  # Updated text color
                tickfont=dict(color=darker_blue)     # Updated text color
            ),
            showlegend=False,
            margin=dict(l=80, r=60, t=60, b=60)  # Increased left margin
        )
    else:  # light mode
        fig.update_layout(
            plot_bgcolor='#ffffff',
            paper_bgcolor='#ffffff',
            font=dict(color='#000000'),
            xaxis=dict(
                title='Date',
                gridcolor='#dee2e6',
                zerolinecolor='#dee2e6',
                title_font=dict(color=darker_blue),  # Updated text color
                tickfont=dict(color=darker_blue)     # Updated text color
            ),
            yaxis=dict(
                title=series_name,
                gridcolor='#dee2e6',
                zerolinecolor='#dee2e6',
                title_font=dict(color=darker_blue),  # Updated text color
                tickfont=dict(color=darker_blue)     # Updated text color
            ),
            showlegend=False,
            margin=dict(l=80, r=60, t=60, b=60)  # Increased left margin
        )
    return fig
