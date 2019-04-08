var w = 1200;
var h = 600;
var padding = 30;
function Draw_LineChart_ELE(incomingData, startDate, endDate, svgSelection, attrSelection, classSelection) {
    var minDate = d3.min(incomingData,function (d) {
        return d.dates;
    });
    var maxDate = d3.max(incomingData,function (d) {
        return d.dates;
    });
    var xScale = d3.scaleTime()
        .domain([new Date(minDate.substr(0,4),minDate.substr(4,2),minDate.substr(6,2),minDate.substr(8,2),minDate.substr(10,2)), new Date(maxDate.substr(0,4),maxDate.substr(4,2),maxDate.substr(6,2),maxDate.substr(8,2),maxDate.substr(10,2))])
        .range([padding * 2, w - padding * 2]);
    var yMax = d3.max(incomingData, function (d) {
        return parseFloat(d[attrSelection]);
    })

    var yMin = d3.min(incomingData, function (d) {
        return parseFloat(d[attrSelection]);
    })
    console.log(attrSelection +"yMax, yMin = "+ yMax, yMin);
    var yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([h - padding, padding]);

    drawAxis([1], xScale, yScale);

    var line = d3.line()
            .y(function (d) {
                return yScale(d[attrSelection]);
            })
            .defined(function (d) {
                return d[attrSelection];
            })
            .x(function (d) {
                var tmp =  new Date(d.dates.substr(0,4), d.dates.substr(4,2), d.dates.substr(6,2),d.dates.substr(8,2),d.dates.substr(10,2));
                return xScale(tmp);
            });

    var svgTrend = d3.select(svgSelection)
        .selectAll('.RatingText')
        .data(incomingData);

    svgTrend.enter()
        .append('text')
        .attr("class", "RatingText")
        .text(function (d) {
            return d[attrSelection];
        })
        .attr("x", function (d, i) {
            var tmp =  new Date(d.dates.substr(0,4), d.dates.substr(4,2), d.dates.substr(6,2),d.dates.substr(8,2),d.dates.substr(10,2));
            return xScale(tmp);
        })
        .attr("y", function (d) {
            if (d[attrSelection])
                return yScale(d[attrSelection]);
        })
        .style("opacity",0);

    svgTrend.text(function (d) {
        return d[attrSelection];
    })
        .attr("x", function (d, i) {
            var tmp =  new Date(d.dates.substr(0,4), d.dates.substr(4,2), d.dates.substr(6,2),d.dates.substr(8,2),d.dates.substr(10,2));
            return xScale(tmp);
        })
        .attr("y", function (d) {
            if (d[attrSelection])
                return yScale(d[attrSelection]);
        });

    svgTrend.exit().remove();

    var linChartG = d3.select(svgSelection)
        .selectAll(classSelection)
        .data([1]);

    linChartG.enter()
        .append("g")
        .attr("class", classSelection);


    // Trent Graph Line enter()
    var lineG = d3.select("."+classSelection)
        .selectAll("path")
        .data([1]);

    lineG.enter()
        .append("path")
        .attr("d", line(incomingData));

    // Trent Graph Line update()
    lineG.transition().duration(500)
        .attr("d", line(incomingData));
        // Omit empty values.;

    var circles = d3.select(classSelection)
        .selectAll("circle")
        .data(incomingData);

    // Trent Graph Circle enter()
    circles.enter()
        .append("circle")
        .attr("cx", function (d, i) {
            var tmp =  new Date(d.dates.substr(0,4), d.dates.substr(4,2), d.dates.substr(6,2),d.dates.substr(8,2),d.dates.substr(10,2));
            return xScale(tmp);
        })
        .attr("cy", function (d) {
            return yScale(d[attrSelection]);
        })
        .attr("r", 5)
        .on("mouseover",showDetail)
        .on("mouseout",hideDetail);


    // Trent Graph Circle update()
    circles.transition().duration(500)
        .attr("cx", function (d, i) {
            var tmp =  new Date(d.dates.substr(0,4), d.dates.substr(4,2), d.dates.substr(6,2),d.dates.substr(8,2),d.dates.substr(10,2));
            return xScale(tmp);
        })
        .attr("cy", function (d) {
            return yScale(d[attrSelection]);
        });


    circles.exit().remove();


    function showDetail(d) {
        d3.select("#modal")
            .style("left",function(){
                var tmp =  new Date(d.dates.substr(0,4), d.dates.substr(4,2), d.dates.substr(6,2),d.dates.substr(8,2),d.dates.substr(10,2));
                return xScale(tmp) +"px";
            })
            .style("top", function(){
                return (yScale(d[attrSelection])-70) +"px";
            })
            .style("opacity",1);

        d3.selectAll("td.data")
            .data(d3.values(d))
            .html(function (p) { return p });
        var tmp =  new Date(d.dates.substr(0,4), d.dates.substr(4,2), d.dates.substr(6,2),d.dates.substr(8,2),d.dates.substr(10,2));

    }

    function hideDetail(d){
        d3.select("#modal")
            .style("left",0)
            .style("top", 0)
            .style("opacity",0);
    }





    function drawArea(xScale, yScale, yMin) {
        function ratingColor(c) {
            return {
                1: "rgba(0,0,255,1)",
                2: "rgba(45,20,210,1)",
                3: "rgba(90,40,165,1)",
                4: "rgba(125,30,130,1)",
                5: "rgba(255,0,40,1)"
            }[c]
        };

        var tmp = [{"x": xScale(dataset[0].TREND_IN_MONTH), "y": yScale(100), "height": yScale(90) - yScale(100)},
            {"x": xScale(dataset[0].TREND_IN_MONTH), "y": yScale(90), "height": yScale(85) - yScale(90)},
            {"x": xScale(dataset[0].TREND_IN_MONTH), "y": yScale(85), "height": yScale(80) - yScale(85)},
            {"x": xScale(dataset[0].TREND_IN_MONTH), "y": yScale(80), "height": yScale(75) - yScale(80)},
            {"x": xScale(dataset[0].TREND_IN_MONTH), "y": yScale(75), "height": yScale(yMin) - yScale(75)}];

        var area = d3.select(svgSelection)
            .selectAll("rect")
            .data(tmp);

        area.enter()
            .append("rect")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .attr("width", xScale(12) - xScale(1))
            .attr("height", function (d) {
                return d.height;
            })
            .attr("fill", function (d, i) {
                return ratingColor(i + 1);
            })
            .style("opacity", function (d, i) {
                if (i == 4)
                    return "0.2";
                else
                    return "0.4"
            });

        area.transition().duration(500)
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .attr("width", xScale(12) - xScale(1))
            .attr("height", function (d) {
                return d.height;
            });
    }


    function drawAxis(incomingData, xScale, yScale) {
        var yAxis = d3.axisLeft()
            .scale(yScale);

        var xAxis = d3.axisBottom()
            .scale(xScale);


        var axis = d3.select(svgSelection)
            .selectAll("#yAxisG")
            .data(incomingData);

        axis.enter()
            .append("g")
            .attr("id", "yAxisG")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding * 2 + ",0)")
            .call(yAxis);

        axis.transition().duration(500)
            .call(yAxis);


        axis = d3.select(svgSelection)
            .selectAll("#xAxisG")
            .data(incomingData);

        axis.enter()
            .append("g")
            .attr("id", "xAxisG")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis)
            .selectAll("text")
            .text(function (d) {
                return d;
            });

        axis.call(xAxis)
            .selectAll("text")
            .text(function (d) {
                return  (parseInt(d.getMonth())) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()+ ":" + d.getSeconds();
            });

        axis.exit().remove();

        axis = d3.select(svgSelection)
            .selectAll("#xGrid")
            .data(incomingData);

        axis.enter()
            .append("g")
            .attr("id", "xGrid")
            .attr("class", "grid")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis.tickSize(-h));

        axis.transition().duration(500)
            .call(xAxis.tickSize(-h));

        axis = d3.select(svgSelection)
            .selectAll("#yGrid")
            .data(incomingData);

        axis.enter()
            .append("g")
            .attr("id", "yGrid")
            .attr("class", "grid")
            .call(d3.axisLeft()
                .scale(yScale).ticks(10).tickSize(-w));

        axis .call(d3.axisLeft()
            .scale(yScale).ticks(10).tickSize(-w));
    }
};

