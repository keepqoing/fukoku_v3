function drawLineBarchar(data, settings){
       var  margin = settings.margin,
        width  = +settings.width - margin.left - margin.right,
        height = +settings.height  - margin.top - margin.bottom;

    var svg = d3.select(settings.selector)
        .append("svg")
        .attr("width", settings.width - margin.left - margin.right)
        .attr("height", settings.height - margin.top - margin.bottom)
        .attr("viewBox", "0 0 " + settings.width + " " + (settings.height+70));


    var tooltip = d3.select(settings.selector).append("div").attr("class", "toolTip");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var colours = d3.scaleOrdinal()
        .range(["#6F257F", "#CA0D59"]);
    var marginTop = margin.top-50;
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xColumn = settings.xColumn;
    var yColumn = settings.yColumn;

    x.domain(data.map(function(d) {
        return d[xColumn];
    }));
    y.domain([0, d3.max(data, function(d) { return d[yColumn]; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .style("font","15px times")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(30)")
        .style("text-anchor", "start");


    g.append("g")
        .attr("class", "axis axis--y")
        .style("font","18px times")
        .call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-width]))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text(settings.yLabel);

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d) { return x(d[xColumn]); })
        .attr("y", function(d) { return y(d[yColumn]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[yColumn]); })
        .attr("fill", function(d) { return colours(d[xColumn]); })

        /*.on("mousemove", function(d){
            tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html((d[xColumn]) + "<br>" + (d[yColumn])+ " time");
        })*/
        /*.on("mouseout", function(d){ tooltip.style("display", "none");});*/

}