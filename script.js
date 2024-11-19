// Dataset
const data = [
    { year: "2000", emissions: 25 },
    { year: "2005", emissions: 30 },
    { year: "2010", emissions: 35 },
    { year: "2015", emissions: 40 },
    { year: "2020", emissions: 45 },
  ];
  
  // Dimensions
  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 50, left: 60 };
  
  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
  
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // Scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, chartWidth])
    .padding(0.2);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.emissions)])
    .nice()
    .range([chartHeight, 0]);
  
  // Axes
  chart.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale));
  
  chart.append("g")
    .call(d3.axisLeft(yScale));
  
  // Bars
  const bars = chart.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d.emissions))
    .attr("width", xScale.bandwidth())
    .attr("height", d => chartHeight - yScale(d.emissions));
  
  // Tooltip
  const tooltip = d3.select("body").append("div").attr("class", "tooltip");
  
  // Interactivity
  bars.on("mouseover", function (event, d) {
    d3.select(this).style("fill", "orange");
    tooltip.style("display", "block")
      .html(`Year: ${d.year}<br>Emissions: ${d.emissions} MtCO2`)
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 20 + "px");
  })
  .on("mouseout", function () {
    d3.select(this).style("fill", "steelblue");
    tooltip.style("display", "none");
  })
  .on("click", function () {
    bars.style("fill", "steelblue");
    d3.select(this).style("fill", "red");
  });
  
  bars.transition()
  .duration(1000)
  .delay((d, i) => i * 100)
  .attr("y", d => yScale(d.emissions))
  .attr("height", d => chartHeight - yScale(d.emissions));
