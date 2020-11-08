import * as d3 from 'd3'

window.d3 = d3

const dataset = {
  nodes: [
    { id: 1, name: 'boot' },
    { id: 2, name: 'woot' },
    { id: 3, name: 'noot' },
    { id: 4, name: 'doot' },
    { id: 5, name: 'doot' },
  ],
  links: [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 4, target: 3 },
    { source: 3, target: 1 },
    { source: 5, target: 1 },
  ],
}

function drawGraphs(element) {
  const container = d3.select(element)
  const { width, height } = element.getBoundingClientRect()

  const svg = container
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', [-width / 2, -height / 2, width, height])

  // D3 v6 simulation from Observable.
  // https://observablehq.com/@d3/modifying-a-force-directed-graphhttps://observablehq.com/@d3/modifying-a-force-directed-graph

  let link = svg.append("g")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
    .selectAll("line");

  let node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle");


  const simulation = d3
    .forceSimulation()
    .force("link", d3.forceLink().id(d => d.id).distance(120))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .on('tick', ticked)

  simulation.nodes(dataset.nodes)
  simulation.force('link').links(dataset.links)

  node = node
    .data(dataset.nodes, d => d.id)
    .join(enter => enter.append("circle")
      .attr("r", 12)
      .attr("fill", d => 'red'));

  link = link
    .data(dataset.links, d => [d.source, d.target])
    .join("line");

  function ticked() {
    node.attr("cx", d => d.x)
        .attr("cy", d => d.y)

    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
  }
}

window.addEventListener('load', () => {
  const el = document.getElementById('d3-root')
  drawGraphs(el)
})
