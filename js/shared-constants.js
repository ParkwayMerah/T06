// ===== Shared Constants =====
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "LED", label: "LED", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
  ];
  
  // Dynamically created later based on max energy
  function createBinGenerator(maxEnergy) {
    return d3.bin()
      .domain([0, maxEnergy])
      .thresholds(50)
      .value(d => d.energyConsumption);
  }
  