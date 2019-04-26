function d3_xy_chart() {
    var width = 640,
        height = 480,
        xlabel = "X Axis Label",
        ylabel = "Y Axis Label";

    function chart(selection) {
        selection.each(function (datasets) {
            //
            // Create the plot.
            //
            var margin = {top: 20, right: 80, bottom: 30, left: 50},
                innerwidth = width - margin.left - margin.right,
                innerheight = height - margin.top - margin.bottom;

            var x_scale = d3.scale.linear()
                .range([0, innerwidth])
                .domain([d3.min(datasets, function (d) {
                    return d3.min(d.x);
                }),
                    d3.max(datasets, function (d) {
                        return d3.max(d.x);
                    })]);

            var y_scale = d3.scale.linear()
                .range([innerheight, 0])
                .domain([d3.min(datasets, function (d) {
                    return d3.min(d.y);
                }),
                    d3.max(datasets, function (d) {
                        return d3.max(d.y);
                    })]);

            /*var color_scale = d3.scale.category10()
                .domain(d3.range(datasets.length));*/

            var x_axis = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom");

            var y_axis = d3.svg.axis()
                .scale(y_scale)
                .orient("left");

            var x_grid = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                //.tickSize(-innerheight)
                .tickFormat("");

            var y_grid = d3.svg.axis()
                .scale(y_scale)
                .orient("left")
                //.tickSize(-innerwidth)
                .tickFormat("");

            var draw_line = d3.svg.line()
                .interpolate("basis")
                .x(function (d) {
                    return x_scale(d[0]);
                })
                .y(function (d) {
                    return y_scale(d[1]);
                });

            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            svg.append("g")
                .attr("class", "x grid")
                .attr("transform", "translate(0," + innerheight + ")")
                .call(x_grid);

            svg.append("g")
                .attr("class", "y grid")
                .call(y_grid);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + innerheight + ")")
                .call(x_axis)
                .append("text")
                .attr("dy", "2.4em")
                .attr("font-size", 12)
                .attr("font-weight", "bold")
                .attr("x", innerwidth)
                .style("text-anchor", "end")
                .text(xlabel);

            svg.append("g")
                .attr("class", "y axis")
                .call(y_axis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("font-size", 12)
                .attr("font-weight", "bold")
                .attr("dy", "-3em")
                .style("text-anchor", "end")
                .text(ylabel);

            var data_lines = svg.selectAll(".d3_xy_chart_line")
                .data(datasets.map(function (d) {
                    return d3.zip(d.x, d.y);
                }))
                .enter().append("g")
                .attr("class", "d3_xy_chart_line");

            data_lines.append("path")
                .attr("class", "line")
                .attr("d", function (d) {
                    return draw_line(d);
                })
                .attr("stroke", function (_, i) {
                    if(i==3)
                        return "red";
                    return "black";
                });

            svg.append("circle")
                .attr("r", 10)
                .attr("cx", x_scale(8)-5)
                .attr("cy", y_scale(8)-5)
                .attr("fill", "black")
                .attr("stroke", "black");

            svg.append("circle")
                .attr("r", 10)
                .attr("cx", x_scale(18)-5)
                .attr("cy", y_scale(8)-5)
                .attr("fill", "black")
                .attr("stroke", "black");

            svg.append("circle")
                .attr("r", 10)
                .attr("cx", x_scale(26)-5)
                .attr("cy", y_scale(6)-5)
                .attr("fill", "red")
                .attr("stroke", "red");

            svg.append("g")
                .attr("transform", "translate(0, "+height/3+")")
                .append("line")
                .attr("x2", width - 100)
                .style("stroke", "red")
                .style("stroke-width", "2px")
                .style("stroke-dasharray", "5");

            svg.append("g")
                .attr("transform", "translate(0, "+height/2+")")
                .append("line")
                .attr("x2", width - 100)
                .style("stroke", "red")
                .style("stroke-width", "2px")
                .style("stroke-dasharray", "5");
        });
    }

    chart.width = function (value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function (value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.xlabel = function (value) {
        if (!arguments.length) return xlabel;
        xlabel = value;
        return chart;
    };

    chart.ylabel = function (value) {
        if (!arguments.length) return ylabel;
        ylabel = value;
        return chart;
    };

    return chart;
}