import pygame
import sys
import random

from synth import *
from synth.main import getall_df

# Initialize Pygame
pygame.init()
random.seed(26)

# Screen dimensions
INNER_BOX_LENGTH = 1000
BOX_BORDER = 50
SLIDER_BOX_BOTTOM = 50

WIDTH = INNER_BOX_LENGTH + 2 * BOX_BORDER
HEIGHT = INNER_BOX_LENGTH + 2 * BOX_BORDER + SLIDER_BOX_BOTTOM

BORDER_RATIO = 0.95
POINT_COORD_LIMIT = INNER_BOX_LENGTH * BORDER_RATIO
POINT_COORD_BORDER = BOX_BORDER + (POINT_COORD_LIMIT * (1 - BORDER_RATIO)/2)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Pygame Slider Example')

# Define colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)

# Constants
PHARMACY_POINT_SIZE = 15
auto_flag = False

if len(sys.argv) > 1:
    if sys.argv[1] == 'auto':
        auto_flag = True
        print("Auto mode enabled")
    else:
        print("Invalid argument. Usage: python main.py [auto]")

# Slider bar parameters
slider_bar_rect = pygame.Rect(50, HEIGHT - 50, WIDTH - 100, 10)

# Slider handle parameters
slider_handle_radius = 10
slider_handle_pos = [slider_bar_rect.left, slider_bar_rect.centery]
slider_value, slider_steps = 0, 1000 # Number of steps in the slider
step_width = slider_bar_rect.width / slider_steps
dragging = False # Dragging flag

meds_df, cs_df, rx_df = getall_df(MAXLAT=POINT_COORD_LIMIT, MAXLONG=POINT_COORD_LIMIT)

client_points = (cs_df[['Lat', 'Long']] + (POINT_COORD_BORDER, POINT_COORD_BORDER)).values.tolist()
pharmacy_points = (rx_df[['Lat', 'Long']] + (POINT_COORD_BORDER, POINT_COORD_BORDER)).values.tolist()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        elif event.type == pygame.MOUSEBUTTONDOWN:
            # Check if the mouse is over the slider handle
            mouse_pos = pygame.mouse.get_pos()
            dx = mouse_pos[0] - slider_handle_pos[0]
            dy = mouse_pos[1] - slider_handle_pos[1]
            if dx * dx + dy * dy <= slider_handle_radius ** 2: dragging = True
        elif event.type == pygame.MOUSEBUTTONUP:
            dragging = False

        elif event.type == pygame.MOUSEMOTION:
            if dragging:
                # Move the slider handle
                mouse_x = pygame.mouse.get_pos()[0]
                # Clamp the handle position to the slider bar
                handle_x = max(slider_bar_rect.left, min(mouse_x, slider_bar_rect.right))
                # Calculate the closest step
                relative_x = handle_x - slider_bar_rect.left
                step = int(round(relative_x / step_width))
                # Update slider handle position based on the step
                slider_handle_pos[0] = slider_bar_rect.left + step * step_width
                # Update slider value
                slider_value = step
    
    # Clear screen
    screen.fill(WHITE)

    # draw border around points
    pygame.draw.rect(screen, BLACK, (BOX_BORDER, BOX_BORDER, INNER_BOX_LENGTH, INNER_BOX_LENGTH), 2)

    # Draw the slider bar
    pygame.draw.rect(screen, BLACK, slider_bar_rect)

    # Draw the slider handle
    pygame.draw.circle(screen, RED, (int(slider_handle_pos[0]), int(slider_handle_pos[1])), slider_handle_radius)

    # Draw the clients
    for p in client_points:
        pygame.draw.circle(screen, BLACK, p, 5)
    # Draw the pharmacies
    for p in pharmacy_points:
        pygame.draw.rect(screen, RED, (p[0] - 5, p[1] - 5, PHARMACY_POINT_SIZE, PHARMACY_POINT_SIZE))
    
    # time is 0
    if slider_value == 0:
        cs_df_relevant = cs_df[['Lat', 'Long', 'Assigned_Pharmacy']]
        for i, row in cs_df_relevant.iterrows():
            client = row[['Lat', 'Long']].values + (POINT_COORD_BORDER, POINT_COORD_BORDER)

            pharmacy_row = rx_df.iloc[row['Assigned_Pharmacy']]
            pharmacy = pharmacy_row[['Lat', 'Long']].values + (POINT_COORD_BORDER, POINT_COORD_BORDER)
            pygame.draw.line(screen, BLACK, client, pharmacy, 2)


    # Draw lines between the points based on the slider value
    else:
        for index, row in cs_df[slider_value % np.divide(cs_df.Lifespan, cs_df.Dosage) == 0].iterrows():
            assigned_rx = row['Assigned_Pharmacy']
            pygame.draw.line(screen, 
                color=pygame.Color(row['Medicine']),
                start_pos=(row['Lat'] + POINT_COORD_BORDER, row['Long'] + POINT_COORD_BORDER),    
                end_pos=(rx_df.iloc[assigned_rx]['Lat'] + POINT_COORD_BORDER, rx_df.iloc[assigned_rx]['Long'] + POINT_COORD_BORDER),
                width=7
            )
    if auto_flag: slider_value += 1
    pygame.display.flip()

pygame.quit()
sys.exit()
