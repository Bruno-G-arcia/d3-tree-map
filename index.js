let title = d3.selectAll('body')
.append('div')
.classed('title', true)
.text('Video Game Sales');

let description = d3.selectAll('.title')
.append('div')
.classed('description', true)
.text('Top 100 Most Sold Video Games Grouped by Plataform');

let footer = d3.selectAll('body')
.append('div')
.classed('footer', true)
.text('<garciaBruno/>');


