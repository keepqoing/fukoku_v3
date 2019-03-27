// Get the data
function barchartMultiLine(data, settings) {

// set the dimensions and margins of the graph
    var margin = {top: 10, right: 40, bottom: 30, left: 50},
        width = settings.width - margin.left - margin.right,
        height = settings.height - margin.top - margin.bottom;

// parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
//     var xBar = d3.scaleBand().range([0, width]).paddingInner(0.5).paddingOuter(0.25);
    var xLine = d3.scalePoint().range([0, width]).padding(0.5);
    // var yBar = d3.scaleLinear().range([height, 0]);
    var yLine = d3.scaleLinear().range([height, 0]);

// define the 1st line
    var valueline = d3.line()
        .x(function(d) { return xLine(d.year); })
        .y(function(d) { return yLine(d.line1); });

// define the 2nd line
//     var valueline2 = d3.line()
//         .x(function(d) { return xLine(d.year); })
//         .y(function(d) { return yLine(d.line2); });

// define the 3nd line
//     var valueline3 = d3.line()
//         .x(function(d) { return xLine(d.year); })
//         .y(function(d) { return yLine(d.line3); });

// define the 4th line
//     var valueline4 = d3.line()
//         .x(function(d) { return xLine(d.year); })
//         .y(function(d) { return yLine(d.line4); });

// define the 5th line
    /*
    var valueline5 = d3.line()
        .x(function(d) { return xLine(d.year); })
        .y(function(d) { return yLine(d.line5); });
*/
// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select(settings.selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // format the data
    data.forEach(function(d) {
        // d.bar = +d.bar;
        d.line1 = +d.line1;
        // d.line2 = +d.line2;
        // d.line3 = +d.line3;
        // d.line4 = +d.line4;
        // d.line5 = +d.line5;
    });
    console.table(data);

    // Scale the range of the data
    // xBar.domain(data.map(function(d) { return d.year; }));
    xLine.domain(data.map(function(d) { return d.year; }));
    // yBar.domain([0, d3.max(data, function(d) { return d.bar; })]).nice();
    // yLine.domain([0, d3.max(data, function(d) {return Math.max(d.line1, d.line2); })]).nice();
    yLine.domain([0, d3.max(data, function(d) {return Math.max(d.line1); })]).nice();

    // var rect = svg.selectAll("rect")
    //     .data(data)

    // rect.enter().append("rect")
    //     .merge(rect)
    //     .attr("class", "bar")
    //     .style("stroke", "none")
    //     .style("fill", "#1792a4")
    //     .attr("x", function(d){ return xBar(d.year); })
    //     .attr("width", function(d){ return xBar.bandwidth(); })
    //     .attr("height", function(d){ return height - yBar(d.bar); })
    //     .attr("y", function(d){ return yBar(d.bar); });


    // var rect1 = svg.selectAll("bar")
    //     .data(data)
    // bar 2
    // rect1.enter().append("rect")

        // .attr("class", "bar")
        // .style("stroke", "none")
        // .style("fill", "#FE2EF7")
        // .attr("x", function(d){ return xBar(d.year) ; })
        // .attr("width", function(d){ return xBar.bandwidth(); })
        // .attr("height", function(d){ return height - yBar(d.line5); })
        // .attr("y", function(d){ return yBar(d.line5); });



    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#3A01DF")
        .attr("d", valueline);

   /*
    // Add the valueline2 path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#5FB404")
        .attr("d", valueline2);
    // Add the valueline3 path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#FF8000")
        .attr("d", valueline3);
    // Add the valueline4 path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#B40431")
        .attr("d", valueline4);
    // Add the valueline5 path.

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#AC58FA")
        .attr("d", valueline5);
*/
    var points1 = svg.selectAll("circle.point1")
        .data(data)

    points1.enter().append("circle")
        .merge(points1)
        .attr("class", "point1")
        .style("stroke", "#3A01DF")
        .style("fill", "#3A01DF")
        .attr("cx", function(d){ return xLine(d.year); })
        .attr("cy", function(d){ return yLine(d.line1); })
        .attr("r", function(d){ return 5; });

    /*
    var points2 = svg.selectAll("circle.point2")
        .data(data)

    points2.enter().append("circle")
        .merge(points1)
        .attr("class", "point2")
        .style("stroke", "#5FB404")
        .style("fill", "#5FB404")
        .attr("cx", function(d){ return xLine(d.year); })
        .attr("cy", function(d){ return yLine(d.line2); })
        .attr("r", function(d){ return 5; });

    var points3 = svg.selectAll("circle.point3")
        .data(data)

    points3.enter().append("circle")
        .merge(points1)
        .attr("class", "point3")
        .style("stroke", "#FF8000")
        .style("fill", "#FF8000")
        .attr("cx", function(d){ return xLine(d.year); })
        .attr("cy", function(d){ return yLine(d.line3); })
        .attr("r", function(d){ return 5; });

    var points4 = svg.selectAll("circle.point4")
        .data(data)
    points4.enter().append("circle")
        .merge(points1)
        .attr("class", "point4")
        .style("stroke", "#B40431")
        .style("fill", "#B40431")
        .attr("cx", function(d){ return xLine(d.year); })
        .attr("cy", function(d){ return yLine(d.line4); })
        .attr("r", function(d){ return 5; });


    var points5 = svg.selectAll("circle.point5")
        .data(data)
    points5.enter().append("circle")
        .merge(points1)
        .attr("class", "point5")
        .style("stroke", "#AC58FA")
        .style("fill", "#AC58FA")
        .attr("cx", function(d){ return xLine(d.year); })
        .attr("cy", function(d){ return yLine(d.line5); })
        .attr("r", function(d){ return 5; });
*/
    // Add the X Axis
    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xLine))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(25)")
        .style("text-anchor", "start");


    // Add the Y0 Axis
    /*
    svg.append("g")
        .attr("class", "axis#1792a4")
        .call(d3.axisLeft(yBar));
    */
    // Add the Y1 Axis
    svg.append("g")
        .attr("class", "axisRed")
        .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(yLine));

}