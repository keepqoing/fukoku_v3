function barchartLabelWithClickNA(data, settings, pYear, pURL, pType){
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
        .rangeRoundBands([0, 400], .05);
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");


    // Color array
    var colors = [
            "#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
            "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
            "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
            "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
            "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
        ];


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
        // .attr("class", "bar")

        .attr("x", function(d){ return xScale(d[settings.x]); })
        .attr("y", function(d){ return yScale(d[settings.y]); })
        .attr("height", function(d){ return height - margin.top - margin.bottom - yScale(d[settings.y]); })
        .attr("width", function(d){ return 20;})

        .attr("fill", function(d,i){ return colors[i]})

        .on("click", function(d,i){

            console.log(d.line1);
                var queryString = "";
                if(pType == "line"){
                    // console.log(d);
                    // alert(d);
                   queryString = "?" + d.LINE + "&" + pYear;
                }else if(pType == "machine"){
                    var machine = "";
                    if( d.MACHINE.substr(3) == "Pre1" ||
                        d.MACHINE.substr(3) == "Pre2" ||
                        d.MACHINE.substr(3) == "Pre3"
                    ){
                        machine = "Pre";
                    }else{
                        machine = d.MACHINE.substr(3);
                    }

                   queryString = "?" + machine + "&" + pYear;
                }
                console.log("queryString = " + queryString);
                console.log("pURL = " + pURL);
                console.log("pURL + queryString = " + pURL + queryString);
                window.location.href = pURL + queryString;

        })
        .style("cursor", "pointer")
        ;

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);

    //adding x axis to the bottom of chart
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + (margin.left - 20) + "," + (height - margin.bottom) + ")")
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
        .attr("x", function(d){ return xScale(d[settings.x]) + 15; })
        .attr("y", function(d){ return yScale(d[settings.y]) - 3; })
        .text(function(d){ return d3.format("")(d[settings.y]); });


    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-50)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-size','8px')
        .text(settings.y_text);



    // text label for the x axis
    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +","+(height-(5))+")")  // centre below axis
        .style('font-size','8px')
        .text(settings.x_text);


}