function Draw_LineChart_V3(incomingData, startDate, endDate, svgSelection, attrSelection, classSelection) {
    //////////////////////Variable Definitions [svg, margin, width, height]//////////////////////


    console.log("attrSelection = " + attrSelection);

    //SVG Definition
    var svg = d3.select(svgSelection);
    var transition = svg.transition();

    var margin = {top: 20, right: 20, bottom: 100, left: 40},
        margin2 = {top: 340, right: 20, bottom: 40, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        height2 = +svg.attr("height") - margin2.top - margin2.bottom;

    var minDate = d3.min(incomingData,function (d) {
        return d.dates;
    });
    var maxDate = d3.max(incomingData,function (d) {
        return d.dates;
    });

    // var minDateTransformed = new Date(minDate.substr(0,4),parseInt(minDate.substr(4,2))-1,minDate.substr(6,2),minDate.substr(8,2),minDate.substr(10,2));
    // var maxDateTransformed = new Date(maxDate.substr(0,4),parseInt(maxDate.substr(4,2))-1,maxDate.substr(6,2),maxDate.substr(8,2),maxDate.substr(10,2));


    var minDateTransformed = new Date(minDate);
    var maxDateTransformed = new Date(maxDate);

    var xScale = d3.scaleTime()
        .domain([minDateTransformed, maxDateTransformed])
        .range([0, width]);

    var x2 = d3.scaleTime()
        .range([0, width]);

    x2.domain(xScale.domain());
    var yMax = d3.max(incomingData, function (d) {
        return parseFloat(d[attrSelection]);
    });

    var yMin = d3.min(incomingData, function (d) {
        return parseFloat(d[attrSelection]);
    });

    var yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0]);

    var yScale2 = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height2, 0]);

    var xAxis = d3.axisBottom(xScale),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(yScale);

    var brush = d3.brushX()
        .extent([[0, 0], [width, height2]])
        .on("brush end", brushed);

    var zoom = d3.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]])
        .on("zoom", zoomed);


    var line = d3.line()
            .y(function (d) {
                return yScale(d[attrSelection]);
            })
            .defined(function (d) {
                return d[attrSelection];
            })
            .x(function (d) {
                var tmp =  new Date(d.dates.substr(0,4), parseInt(d.dates.substr(4,2))-1, d.dates.substr(6,2),d.dates.substr(8,2),d.dates.substr(10,2));
                return xScale(tmp);
            });

    var line2 = d3.line()
        .y(function (d) {
            return yScale2(d[attrSelection]);
        })
        .defined(function (d) {
            return d[attrSelection];
        })
        .x(function (d) {
            var tmp =  new Date(d.dates.substr(0,4), parseInt(d.dates.substr(4,2))-1, d.dates.substr(6,2),d.dates.substr(8,2),d.dates.substr(10,2));
            return xScale(tmp);
        });

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    svg.selectAll("path").remove();
    svg.selectAll("text").remove();
    svg.selectAll("line").remove();
    svg.selectAll(".selection").remove();

    var Line_chart = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("clip-path", "url(#clip)");

    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis.tickFormat(d3.timeFormat("%m-%d %H:%m")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);



    Line_chart.append("path")
        .datum(incomingData)
        .attr("class", "line")
        .attr("d", line)
        .style("stroke-width", "0.5px");

    context.append("path")
        .datum(incomingData)
        .attr("class", "line cont")
        .attr("d", line2);


    context.append("g")
        .attr("class", "axis axis--x 2x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2.tickFormat(d3.timeFormat("%Y-%m-%d")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    context.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, xScale.range());

    svg.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);


    //////////////////////////////////////////////////////Brush, Zooming Functions Start///////////////////////////////////////
    function brushed() {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
        var s = d3.event.selection || x2.range();
        xScale.domain(s.map(x2.invert, x2));
        Line_chart.select(".line").attr("d", line);
        focus.select(".axis--x").call(xAxis);
        svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
            .scale(width / (s[1] - s[0]))
            .translate(-s[0], 0));
    }

    function zoomed() {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        var t = d3.event.transform;
        xScale.domain(t.rescaleX(x2).domain());
        Line_chart.select(".line").attr("d", line);
        focus.select(".axis--x").call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
        context.select(".brush").call(brush.move, xScale.range().map(t.invertX, t));
    }

//////////////////////////////////////////////////////Brush, Zooming Functions End///////////////////////////////////////

};

