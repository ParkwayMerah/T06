// ===== TOOLTIP FOR SCATTERPLOT =====
function createTooltip() {
  // Tooltip group inside scatterplot chart
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
  // Select all scatter circles
  innerChartS.selectAll("circle")
    .on("mouseenter", function (event, d) {
      const x = +d3.select(this).attr("cx");
      const y = +d3.select(this).attr("cy");

      tooltip.select("text").text(`Size: ${d.screenSize}"`);
      tooltip
        .attr("transform", `translate(${x + 10},${y - 30})`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", function () {
      tooltip.transition().duration(200).style("opacity", 0);
    });
}
