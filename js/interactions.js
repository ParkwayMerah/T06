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
  
    const y = d3.scaleLinear()
      .domain([0, maxFrequency])
      .range([h, 0]);
  
    // Update bars with transitions
    const bars = container.selectAll("rect").data(bins);
  
    bars.join(
      enter => enter.append("rect")
        .attr("x", d => d.x0)
        .attr("width", d => d.x1 - d.x0)
        .attr("y", h)
        .attr("height", 0)
        .attr("fill", "#3b82f6")
        .transition()
        .duration(800)
        .attr("y", d => y(d.length))
        .attr("height", d => h - y(d.length)),
  
      update => update.transition()
        .duration(800)
        .attr("y", d => y(d.length))
        .attr("height", d => h - y(d.length)),
  
      exit => exit.transition().duration(500).attr("height", 0).remove()
    );
  }
  