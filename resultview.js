
// (function(){

  var width = 400,
      height = 250,
      svgVis = d3.select('#resultset-view').append('svg')
        .attr('width', width)
        .attr('height', height);

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0, 1]);

  updateChart(diceSet.getResultSet());

  function updateChart(resultSet){

    var values = resultSet.values.map(function(r){
          return r.value.hearts || 0; // could use hearts etc.
        }),
        valueCounts = [];

    values.forEach(function(v){
      if(!valueCounts[v]){
        valueCounts[v]=1;
      }else{
        valueCounts[v]++;
      }
    });

    var countSum = d3.sum(valueCounts),
        valuePercentages = valueCounts.map(function(v){
          return v / countSum;
        });

    var bars = svgVis.selectAll('rect')
        .data(valuePercentages);

    bars.enter().append('rect')
        .attr('width', 20)
        .style('stroke', 'white')
        .style('fill', 'steelblue');

    bars.attr('height', function(d){ return d * 20; })
        .attr('x', function(d,i){ return i * 20; })
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); });

    bars.exit().remove();

  }

// }());
