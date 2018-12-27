function drawLineBarchart(data, settings) {

    var  margin = settings.margin,
        width  = +settings.width - margin.left - margin.right,
        height = +settings.height  - margin.top - margin.bottom;

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

    var svg = d3.select(settings.selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", "0 0 " + (settings.width + 150) + " " + (settings.height+70));

    var x = d3.scaleLinear().rangeRound([0,width]);
    var y = d3.scaleBand().rangeRound([height,0]).padding(0.1);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xColumn = settings.xColumn;
    var yColumn = settings.yColumn;


    // sort data
    data.sort(function(a, b) { return a[xColumn] - b[xColumn]; });


    x.domain([0, d3.max(data, function(d){ console.log(d) ;return d.FREQUENCY;})]);
    y.domain(data.map(function(d) {return d[yColumn]; })).padding(0.1);



    g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","bar")
        .attr("x",0)
        .attr("height",y.bandwidth())
        .attr("y", function(d){ return y(d[yColumn]); })
        .attr("width", function(d) { return x(d.FREQUENCY)})
        .on("mousemove", function(d){
            tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html((d[yColumn]) + "<br>" + " : " + x(d.FREQUENCY));
        })
        .on("mouseout", function(d){ tooltip.style("display", "none");});


    // add the x Axis
    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // g.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x).ticks(5).tickFormat(function(d){return parseInt((d[xColumn]) / 1000);}).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));


    g.append("text")
        .attr("class", xColumn)
        .attr("y", y.bandwidth())
        .attr("dx", margin.right) //margin right

        /*
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .text(function(d){ console.log("dd",d);
             return (x(d.FREQUENCY));
         })*/
        // .attr("x", function(d){
        //     var width = this.getBBox().width;
        //     return Math.max(width + valueMargin, scale(d.value));
        // });
        ;
}