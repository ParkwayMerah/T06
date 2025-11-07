function drawHistogram(data) {
  const container = d3.select("#histogram");
  container.selectAll("*").remove();

  const width = container.node().clientWidth;
  const height = 450;
  const margin = { top: 20, right: 30, bottom: 50, left: 60 };
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const maxEnergy = d3.max(data, d => d.energyConsumption);
  const binGenerator = createBinGenerator(maxEnergy);
  const bins = binGenerator(data);

  const maxFrequency = d3.max(bins, d => d.length);

  const x = d3.scaleLinear().domain([0, maxEnergy]).range([0, w]);
  const y = d3.scaleLinear().domain([0, maxFrequency]).nice().range([h, 0]);

  svg.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0) + 1)
    .attr("y", d => y(d.length))
    .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
    .attr("height", d => h - y(d.length))
    .attr("fill", "#3b82f6")
    .attr("opacity", 0.85);

  svg.append("g").attr("transform", `translate(0,${h})`).call(d3.axisBottom(x));
  svg.append("g").call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", w / 2)
    .attr("y", h + margin.bottom - 10)
    .attr("text-anchor", "middle")
    .attr("fill", "#1e293b")
    .text("Energy Consumption (kWh/year)");

  svg.append("text")
    .attr("x", -h / 2)
    .attr("y", -40)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("fill", "#1e293b")
    .text("Frequency");
}
