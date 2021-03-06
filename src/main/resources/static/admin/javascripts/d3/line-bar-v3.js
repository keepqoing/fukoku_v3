// Get the data
function lineBarchart(data, settings) {

    console.log("data",data)

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 40, bottom: 30, left: 50},
        width = settings.width - margin.left - margin.right,
        height = settings.height - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var xBar = d3.scaleBand().range([0, width]).paddingInner(0.5).paddingOuter(0.25);
    var xLine = d3.scalePoint().range([0, width]).padding(0.5);
    var yBar = d3.scaleLinear().range([height, 0]);
    var yLine = d3.scaleLinear().range([height, 0]);

    // define the 1st line
    var valueline = d3.line()
        .x(function (d) {
            return xLine(d[settings.xColumn]);
        })
        .y(function (d) {
            return yLine(d[settings.yColumn]);
        });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(settings.selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // format the data
    data.forEach(function (d) {
        d.bar = +d[settings.yColumn];
        d.line1 = +d[settings.yColumn];
    });
    console.table(data);

    // Scale the range of the data
    xBar.domain(data.map(function (d) {
        return d[settings.xColumn];
    }));
    xLine.domain(data.map(function (d) {
        return d[settings.xColumn];
    }));
    yBar.domain([0, d3.max(data, function (d) {
        return d[settings.yColumn];
    })]).nice();
    yLine.domain([0, d3.max(data, function (d) {
        return Math.max(d[settings.yColumn]);
    })]).nice();

    var rect = svg.selectAll("rect")
        .data(data)

    rect.enter().append("rect")
        .merge(rect)
        .attr("class", "bar")
        .style("stroke", "none")
        .style("fill", "steelblue")
        .attr("x", function (d) {
            return xBar(d[settings.xColumn]);
        })
        .attr("width", function (d) {
            return xBar.bandwidth();
        })
        .attr("height", function (d) {
            return height - yBar(d[settings.yColumn]);
        })
        .attr("y", function (d) {
            return yBar(d[settings.yColumn]);
        });

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class","label")
        .text(function(d) { return d.TOTAL_STOP_TIME; })
        .attr("x", (function(d,i) { return i * (width/data.length) + (width/data.length - margin.bottom)/2; }  ))
        .attr("y", function(d,i) { return yBar(d.TOTAL_STOP_TIME)-20; })
        .attr("dy", ".75em") ;

    /*svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#c40000")
        .attr("d", valueline);
*/
    /*  var points2 = svg.selectAll("circle.point2")
          .data(data)

      var points1 = svg.selectAll("circle.point1")
          .data(data)

      points1.enter().append("circle")
          .merge(points1)
          .attr("class", "point1")
          .style("stroke", "#c40000")
          .style("fill", "#c40000")
          .attr("cx", function (d) {
              return xLine(d.year);
          })
          .attr("cy", function (d) {
              return yLine(d.line1);
          })
          .attr("r", function (d) {
              return 5;
          });*/







    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xLine));

    // Add the Y0 Axis
    svg.append("g")
        .attr("class", "axisSteelBlue")
        .call(d3.axisLeft(yBar));

    // Add the Y1 Axis
    svg.append("g")
        .attr("class", "axisRed")
        .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(yLine));






}