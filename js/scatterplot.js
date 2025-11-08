function drawScatterplot(data) {
    const container = d3.select("#scatterplot");
    container.selectAll("*").remove();
  
    const width = container.node().clientWidth;
    const height = 450;
    const margin = { top: 20, right: 30, bottom: 60, left: 70 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;
  
    const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height);
  
    innerChartS = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const maxEnergy = d3.max(data, d => d.energyConsumption);
    const maxStar = d3.max(data, d => +d.star2);
  
    xScaleS = d3.scaleLinear().domain([0, maxStar]).range([0, w]);
    yScaleS = d3.scaleLinear().domain([0, maxEnergy]).range([h, 0]);
  
    innerChartS.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => xScaleS(d.star2))
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("r", 4)
      .attr("fill", d => colorScale(d.screenTech))
      .attr("opacity", 0.6);
  
    innerChartS.append("g")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(xScaleS));
  
    innerChartS.append("g").call(d3.axisLeft(yScaleS));
  
    innerChartS.append("text")
      .attr("x", w / 2)
      .attr("y", h + 40)
      .attr("text-anchor", "middle")
      .attr("fill", "#1e293b")
      .text("Star Rating");
  
    innerChartS.append("text")
      .attr("x", -h / 2)
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("fill", "#1e293b")
      .text("Energy Consumption (kWh/year)");
  
    const legend = innerChartS.selectAll(".legend")
      .data(colorScale.domain())
      .join("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${i * 100},${-10})`);
  
    legend.append("rect")
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", d => colorScale(d));
  
    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .attr("fill", "#1e293b")
      .text(d => d);
  }  