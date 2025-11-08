function populateFilters(data) {
  const filterDiv = d3.select("#filters");
  filterDiv.selectAll("*").remove();

  const buttons = filterDiv.selectAll("button")
    .data(filters_screen)
    .join("button")
    .attr("class", d => d.isActive ? "active" : "")
    .text(d => d.label)
    .on("click", function(event, d) {
      filters_screen.forEach(f => f.isActive = (f.id === d.id));
      buttons.classed("active", f => f.isActive);
      updateHistogram(d.id, data);
    });
}

function updateHistogram(selectedId, data) {
  let filteredData = data;
  if (selectedId !== "all") {
    filteredData = data.filter(d => d.screenTech === selectedId);
  }

  const maxEnergy = d3.max(filteredData, d => d.energyConsumption);
  const binGenerator = createBinGenerator(maxEnergy);
  const bins = binGenerator(filteredData);
  const maxFrequency = d3.max(bins, d => d.length);

  const container = d3.select("#histogram svg g");
  const h = 450 - 20 - 50;

  const y = d3.scaleLinear().domain([0, maxFrequency]).range([h, 0]);

  container.selectAll("rect")
    .data(bins)
    .join("rect")
    .transition()
    .duration(800)
    .attr("y", d => y(d.length))
    .attr("height", d => h - y(d.length));
}

function createTooltip() {
  const tooltip = innerChartS.append("g")
    .attr("class", "tooltip")
    .style("opacity", 0);

  tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("fill", "rgba(59,130,246,0.9)")
    .attr("stroke", "#1e3a8a")
    .attr("opacity", 0.9);

  tooltip.append("text")
    .attr("x", 10)
    .attr("y", 25)
    .attr("fill", "#fff")
    .attr("font-size", "12px");

  handleMouseEvents(tooltip);
}

function handleMouseEvents(tooltip) {
  innerChartS.selectAll("circle")
    .on("mouseenter", function(event, d) {
      const x = +d3.select(this).attr("cx");
      const y = +d3.select(this).attr("cy");

      tooltip.select("text").text(`Size: ${d.screenSize}"`);
      tooltip
        .attr("transform", `translate(${x + 10},${y - 30})`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", function() {
      tooltip.transition().duration(200).style("opacity", 0);
    });
}