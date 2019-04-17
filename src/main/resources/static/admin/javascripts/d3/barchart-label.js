function barchartLabel(data, settings){
    var margin = {top:30, right:30, bottom:50, left:30},
        width  = settings.width,
        height = settings.height;

    var svg = d3.select(settings.selector)
        .append("svg")
        .attr("width", settings.width)
        .attr("height", settings.height)
        .attr("viewBox", "0 0 " + width + " " + height);
    var yScale = d3.scale.linear()
        .range([height - margin.top - margin.bottom, 0]);

    var xScale = d3.scale.ordinal()
        // .rangeRoundBands([0, width - margin.right+100 - margin.left], .3);
        .rangeRoundBands([0, 700], .05);
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");


    data = data.map(function(d){
        d[settings.y] = +d[settings.y];
        return d;
    });
    //yscale's domain is from zero to the maximum "Median Price" in your data
    yScale.domain([0, d3.max(data, function(d){ return d[settings.y]; })]);

    //xscale is unique values in your data (Age Group, since they are all different)
    xScale.domain(data.map(function(d){ return d[settings.x]; }));
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d){ return xScale(d[settings.x])+30; })
        .attr("y", function(d){ return yScale(d[settings.y]); })
        .attr("height", function(d){ return height - margin.top - margin.bottom - yScale(d[settings.y]); })
        .attr("width", function(d){ return 50;});
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);

    //adding x axis to the bottom of chart
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
        .call(xAxis);
    //go back to where you created yAxis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    //add text labels to the top of each bar
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll(".textlabel")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "textlabel")
        .attr("x", function(d){ return xScale(d[settings.x]) + (110/2); })
        .attr("y", function(d){ return yScale(d[settings.y]) - 3; })
        .text(function(d){ return d3.format("")(d[settings.y]); });


    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-size','12px')
        .text(settings.y_text);



    // text label for the x axis
    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +","+(height-(5))+")")  // centre below axis
        .style('font-size','12px')
        .text(settings.x_text);
}