// ===== Shared Constants =====
const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "LED", label: "LED", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// Histogram bin generator
function createBinGenerator(maxEnergy) {
  return d3.bin()
    .domain([0, maxEnergy])
    .thresholds(50)
    .value(d => d.energyConsumption);
}

// Tooltip and scatter constants
const tooltipWidth = 120;
const tooltipHeight = 40;

const colorScale = d3.scaleOrdinal()
  .domain(["LCD", "LED", "OLED"])
  .range(["#60a5fa", "#f59e0b", "#a855f7"]); // blue, orange, purple

// Placeholder for scatterplot chart group
let innerChartS, xScaleS, yScaleS;
