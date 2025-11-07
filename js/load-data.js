(async function() {
  const data = await d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    energyConsumption: +d.energyConsumption,
    screenTech: d.screenTech,
    star2: +d.star2,
    screenSize: +d.screenSize
  }));

  console.log("✅ Loaded data:", data.length, "rows");

  populateFilters(data);
  drawHistogram(data);
  drawScatterplot(data);
  createTooltip();
})();
