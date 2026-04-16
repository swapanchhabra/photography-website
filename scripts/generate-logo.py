#!/usr/bin/env python3
"""Generate luxury photography logo as SVG."""

import math

def create_aperture_blades(cx, cy, radius, num_blades=6, inner_ratio=0.35):
    """Create a subtle aperture/iris symbol with overlapping blades."""
    paths = []
    inner_r = radius * inner_ratio

    for i in range(num_blades):
        angle1 = (2 * math.pi * i / num_blades) - math.pi / 2
        angle2 = (2 * math.pi * (i + 0.5) / num_blades) - math.pi / 2
        angle3 = (2 * math.pi * (i + 1) / num_blades) - math.pi / 2

        # Outer point
        ox = cx + radius * math.cos(angle1)
        oy = cy + radius * math.sin(angle1)

        # Tip point (slightly inside)
        tx = cx + radius * 0.9 * math.cos(angle2)
        ty = cy + radius * 0.9 * math.sin(angle2)

        # Inner curve control
        ix = cx + inner_r * math.cos(angle2)
        iy = cy + inner_r * math.sin(angle2)

        # Next outer point
        nx = cx + radius * math.cos(angle3)
        ny = cy + radius * math.sin(angle3)

        path = f"M {ox:.1f},{oy:.1f} Q {tx:.1f},{ty:.1f} {nx:.1f},{ny:.1f} L {ix:.1f},{iy:.1f} Z"
        paths.append(path)

    return paths


def create_logo_svg():
    """Create the full luxury logo."""

    width = 800
    height = 280

    # Colors
    gold = "#c9a96e"
    dark = "#1a1614"

    # Aperture settings
    ap_cx, ap_cy = width / 2, 48
    ap_radius = 28

    blades = create_aperture_blades(ap_cx, ap_cy, ap_radius, num_blades=7, inner_ratio=0.38)

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&amp;display=swap');
    </style>
  </defs>

  <!-- Aperture symbol -->
  <g opacity="0.85">
'''

    for blade in blades:
        svg += f'    <path d="{blade}" fill="{gold}" opacity="0.5" />\n'

    # Inner circle (aperture hole)
    inner_r = ap_radius * 0.35
    svg += f'    <circle cx="{ap_cx}" cy="{ap_cy}" r="{inner_r:.1f}" fill="none" stroke="{gold}" stroke-width="0.8" opacity="0.6" />\n'
    svg += f'    <circle cx="{ap_cx}" cy="{ap_cy}" r="{ap_radius}" fill="none" stroke="{gold}" stroke-width="0.5" opacity="0.3" />\n'

    svg += '  </g>\n\n'

    # Decorative line above main text
    line_y = 92
    line_half = 60
    svg += f'  <line x1="{ap_cx - line_half}" y1="{line_y}" x2="{ap_cx + line_half}" y2="{line_y}" stroke="{gold}" stroke-width="0.5" opacity="0.6" />\n\n'

    # Main text: POSE & SAY CHEESE
    svg += f'''  <!-- Main title -->
  <text x="{width/2}" y="135" text-anchor="middle"
        font-family="'Cormorant Garamond', Georgia, serif"
        font-size="42" font-weight="300" letter-spacing="0.35em"
        fill="{dark}">POSE &amp; SAY CHEESE</text>

'''

    # Decorative line below main text
    line_y2 = 152
    svg += f'  <line x1="{ap_cx - line_half}" y1="{line_y2}" x2="{ap_cx + line_half}" y2="{line_y2}" stroke="{gold}" stroke-width="0.5" opacity="0.6" />\n\n'

    # Subtitle: Photography
    svg += f'''  <!-- Subtitle -->
  <text x="{width/2}" y="190" text-anchor="middle"
        font-family="'Cormorant Garamond', Georgia, serif"
        font-size="28" font-style="italic" font-weight="400" letter-spacing="0.3em"
        fill="{gold}">Photography</text>

'''

    # Tagline
    svg += f'''  <!-- Tagline -->
  <text x="{width/2}" y="235" text-anchor="middle"
        font-family="'Cormorant Garamond', Georgia, serif"
        font-size="10" font-weight="400" letter-spacing="0.5em"
        fill="{dark}" opacity="0.5">ETTLINGEN &amp; KARLSRUHE</text>

'''

    # Small decorative dots
    dot_y = 248
    svg += f'  <circle cx="{ap_cx - 20}" cy="{dot_y}" r="1" fill="{gold}" opacity="0.4" />\n'
    svg += f'  <circle cx="{ap_cx}" cy="{dot_y}" r="1.2" fill="{gold}" opacity="0.6" />\n'
    svg += f'  <circle cx="{ap_cx + 20}" cy="{dot_y}" r="1" fill="{gold}" opacity="0.4" />\n'

    svg += '</svg>'

    return svg


def create_favicon_svg():
    """Create a minimal favicon version — just the aperture + P&SC initials."""

    size = 64
    cx, cy = size / 2, size / 2
    gold = "#c9a96e"
    dark = "#1a1614"

    blades = create_aperture_blades(cx, cy, 28, num_blades=7, inner_ratio=0.38)

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&amp;display=swap');
    </style>
  </defs>

  <!-- Aperture -->
  <g opacity="0.2">
'''
    for blade in blades:
        svg += f'    <path d="{blade}" fill="{gold}" />\n'
    svg += '  </g>\n'

    svg += f'''  <circle cx="{cx}" cy="{cy}" r="28" fill="none" stroke="{gold}" stroke-width="1" opacity="0.4" />

  <!-- Initials -->
  <text x="{cx}" y="{cy + 7}" text-anchor="middle"
        font-family="'Cormorant Garamond', Georgia, serif"
        font-size="22" font-weight="600" letter-spacing="0.1em"
        fill="{dark}">P&amp;S</text>
</svg>'''

    return svg


def create_header_logo_svg():
    """Create a compact horizontal logo for the site header."""

    width = 360
    height = 50
    gold = "#c9a96e"

    # Mini aperture
    ap_cx, ap_cy = 18, height / 2
    ap_r = 14
    blades = create_aperture_blades(ap_cx, ap_cy, ap_r, num_blades=7, inner_ratio=0.38)

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,400&amp;display=swap');
    </style>
  </defs>

  <!-- Mini aperture -->
  <g opacity="0.7">
'''
    for blade in blades:
        svg += f'    <path d="{blade}" fill="{gold}" opacity="0.5" />\n'
    svg += f'    <circle cx="{ap_cx}" cy="{ap_cy}" r="{ap_r}" fill="none" stroke="{gold}" stroke-width="0.5" opacity="0.4" />\n'
    svg += '  </g>\n\n'

    svg += f'''  <!-- Text -->
  <text x="42" y="23"
        font-family="'Cormorant Garamond', Georgia, serif"
        font-size="18" font-weight="300" letter-spacing="0.3em"
        fill="currentColor">POSE &amp; SAY CHEESE</text>
  <text x="42" y="40"
        font-family="'Cormorant Garamond', Georgia, serif"
        font-size="12" font-style="italic" font-weight="400" letter-spacing="0.25em"
        fill="{gold}">Photography</text>
</svg>'''

    return svg


if __name__ == '__main__':
    import os

    out_dir = '/home/user/photography-website/public'

    # Full logo
    with open(os.path.join(out_dir, 'logo.svg'), 'w') as f:
        f.write(create_logo_svg())
    print("✓ logo.svg")

    # Favicon
    with open(os.path.join(out_dir, 'favicon.svg'), 'w') as f:
        f.write(create_favicon_svg())
    print("✓ favicon.svg")

    # Header logo
    with open(os.path.join(out_dir, 'logo-header.svg'), 'w') as f:
        f.write(create_header_logo_svg())
    print("✓ logo-header.svg")

    print("\nAll logos generated in public/")
