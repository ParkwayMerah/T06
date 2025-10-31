# T06.1 - Interactive Histogram (Filtering)

## Aim
Visualise the frequency of TV energy consumption (kWh/year) using an interactive histogram with filter buttons for LCD, LED, and OLED.

## Dataset
File: `data/Ex6_TVdata.csv`

- `brand`
- `model`
- `energyConsumption`
- `screenTech`

## Features
- Reads actual dataset values dynamically
- Histogram built with D3.js v7
- Auto scales both axes to dataset range
- Blue-themed interface
- Filter buttons (All / LCD / LED / OLED)
- Smooth transitions between filters

## ⚙️ How to Run
1. Open terminal in `T06.1` folder
2. Run a local server:
   ```bash
   python -m http.server
