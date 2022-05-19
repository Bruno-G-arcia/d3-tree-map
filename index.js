const dataSet = {
  videogames: {
    title: "Video Game Sales",
    description: "Top 100 Most Sold Video Games Grouped by Platform",
    url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",
  },
  movies: {
    title: "Movie Sales",
    description: "Top 100 Highest Grossing Movies Grouped By Genre",
    url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
  },
  kickstarter: {
    title: "Kickstarter Pledges",
    description:
      "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
    url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
  },
};

const vidyaURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let width = 400;
let height = 400;
let padding = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

let title = d3
  .selectAll("body")
  .append("div")
  .attr("id", "title")
  .classed("title", true);

let description = d3
  .selectAll("body")
  .append("div")
  .classed("description", true)
  .attr("id", "description");

document.getElementById("title").innerHTML = dataSet.videogames.title;
document.getElementById("description").innerHTML =
  dataSet.videogames.description;

let svgContainer = d3
  .select("body")
  .append("div")
  .classed("graphContainer", true);

let svg = d3
  .select(".graphContainer")
  .append("svg")
  .attr("width", width + padding.left + padding.right)
  .attr("height", height + padding.top + padding.right);

let footer = d3
  .selectAll("body")
  .append("div")
  .classed("footer", true)
  .text("<garciaBruno/>");

async function fetchDataAsync(url) {
  const response = await fetch(url);
  return response;
}

async function main() {
  let data = await (await fetchDataAsync(vidyaURL)).json();


  let root = d3
    .hierarchy(data)
    .sum((d) => {
      return d.value;
    })
    .eachBefore(function (d) {
      d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name;
    })
    .sort((d) => d.category);

  
  let treemap = d3.treemap()
  .size([width, height]).paddingInner(3);

  treemap(root);

  for(child of data.children){
    console.log(child);
  }

  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', (d) =>  d.x0)
      .attr('y', (d) =>  d.y0)
      .attr('width', (d) =>  d.x1 - d.x0)
      .attr('height', (d) =>  d.y1 - d.y0)
      .style("stroke", "black")
      .style("fill", "slateblue");



  
}

main();
