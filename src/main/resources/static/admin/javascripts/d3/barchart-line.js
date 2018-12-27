

var data = [
    { num_sent: 0, perc: '100' },
    { num_sent: 1, perc: '70' },
    { num_sent: 2, perc: '40' },
    { num_sent: 3, perc: '60' },
    { num_sent: 4, perc: '80' }
];

var generateData = function()
{
    for(var i=0;  i < data.length; i++)
    {
        data[i].perc = Math.random()*100 << 0;
        // data[i].id = i;
    }
};

var Chart = Chart || {};
Chart.barChart = function(options)
{
    var defaults = {
        selector: '',
        data: {},    // data
        group: '',
        colorRange: ["steelblue"],
        width: 960,
        height: 500,
        yAxisLabel: 'PAKA온도',
        xAxisLabel: "시간",
        showLegend: false,
        horizontal: false,
        dimensionName: '',
        selectColor: "red",
        onClick: function(){},
    };

    // merge defaults and options,
    // overwriting any default setting specified in options
    var settings = $.extend( {}, defaults, options );

    settings.data = $.extend(true, [], settings.data);

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = settings.width - margin.left - margin.right,
        height = settings.height - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(settings.colorRange);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var categoryNames = d3.keys(settings.data[0]).filter(function(key) { return key !== settings.dimensionName; });

    settings.data.forEach(function(d) {
        d.categories = categoryNames.map(function(name) { return {name: name, value: +d[name]}; });
    });

    x0.domain(settings.data.map(function(d) { return d[settings.dimensionName]; }));

    x1.domain(categoryNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(settings.data, function(d) { return d3.max(d.categories, function(d) { return d.value; }); })]);

    var svg = d3.select(settings.selector).append("svg")
        .attr("class", "bar-chart")
        .attr("width", !settings.horizontal ? (width + margin.left + margin.right) : (height + margin.top + margin.bottom))
        .attr("height", !settings.horizontal ? (height + margin.top + margin.bottom) : (width + margin.left + margin.right))
        .append("g")
        .attr(
            "transform",
            "translate(" + (!settings.horizontal ? margin.left : (settings.height)) + "," + margin.top + ")"+
            (settings.horizontal ? " rotate(90)" : '')
        );

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("dy", "2.4em")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("x", settings.width-65)
        .style("text-anchor", "end")
        .text(settings.xAxisLabel) ;

    var yAxisEl = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    yAxisEl.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-3em")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .style("text-anchor", "end")
        .text(settings.yAxisLabel);

    if(settings.horizontal)
    {
        yAxisEl
            .selectAll("text")
            .attr("transform", "rotate(-90)")
            .attr("x", "0")
            .attr("y", "-13")
            .style("text-anchor", "middle")
    }

    // this.updateBar = function(chartData)
    // {
    // console.log("TRYING TO UPDATE");

    // every chart works with a copy of the data
    // chartData = $.extend(true, [], chartData);
    // console.log(settings.data);

    // console.log(chartData);

    // ===========================================================================

    var layer = svg.selectAll(".category")
        .data(settings.data);

    layer.exit().remove();

    var containers = layer.enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x0(d[settings.dimensionName]) + ",0)"; });

    var bars = containers.selectAll("rect")
    // .data(function(d) { return d; })
    // .data(function(d) { d.categories = d.categories[0]; console.log(d); return d; })
        .data(function(d) { return d.categories; })

    bars.exit().remove();
    bars.enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { if(!isNaN(d.value)) return y(d.value); })
        .attr("height", function(d) { if(!isNaN(d.value)) {return height - y(d.value);} })
        .style("fill", function(d) { return color(d.value); });

    containers.on('click', function(d,i){
        settings.onClick(d, i, this);
    });

    //
    svg.selectAll(".y.axis")
        .selectAll(".tick line")
        .call(yAxis)
        .attr("x2", width);

    // legend
    if(settings.showLegend)
    {
        var legend = svg.selectAll(".legend")
            .data(categoryNames.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });
    }
    // };

    var getBarData = function(index)
    {
        var data = null;
        var bar = containers
            .filter(function(d,i){ return i === index; })
            .each(function(d){ data = d; });

        return data;
    };

    var selectBar = function(index)
    {
        var bar = containers
            .filter(function(d,i){ return i === index; })

        var classes = bar.attr("class");

        if(classes.indexOf("selected") < 0)
            bar.attr("class", classes+" selected");
        else
            return deselectBar(index);

        return true;
    };

    var deselectBar = function(index)
    {
        var bar = containers
            .filter(function(d,i){ return i === index; })

        var classes = bar.attr("class");

        if(classes.indexOf("selected") > 0)
            bar.attr("class", "g");
        else
            return selectBar(index);

        return false;

        // containers
        //   .filter(function(d,i){ return i === index; })
        //   .select("rect")
        //   .style("fill", "red");
    };

    var createHorizontalLine = function(yPos)
    {
        svg.append("g")
            .attr("transform", "translate(0, "+y(yPos)+")")
            .append("line")
            .attr("x2", width)
            .style("stroke", "#cc0000")
            .style("stroke-width", "3px")
            .style("stroke-dasharray", "5");

        svg.append("text")
            .attr("y", 40)
            .attr("x", settings.width-100)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("PAKA온도 상한");

        svg.append("text")
            .attr("y", 125)
            .attr("x", settings.width-100)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("PAKA온도 하한");
    };

    var createHorizontalLine1 = function(yPos)
    {
        svg.append("g")
            .attr("transform", "translate(0, "+y(yPos)+")")
            .append("line")
            .attr("x2", width)
            .style("stroke", "#cc0000")
            .style("stroke-width", "3px")
            .style("stroke-dasharray", "5");

        svg.append("text")
            .attr("y", 40)
            .attr("x", settings.width-100)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("탕상온도 상한");

        svg.append("text")
            .attr("y", 125)
            .attr("x", settings.width-100)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("탕상온도 하한");
    };

    var createHorizontalLine2 = function(yPos)
    {
        svg.append("g")
            .attr("transform", "translate(0, "+y(yPos)+")")
            .append("line")
            .attr("x2", width)
            .style("stroke", "#cc0000")
            .style("stroke-width", "3px")
            .style("stroke-dasharray", "5");

        svg.append("text")
            .attr("y", 40)
            .attr("x", settings.width-100)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("토출량 상한");

        svg.append("text")
            .attr("y", 125)
            .attr("x", settings.width-100)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("토출량 하한");
    };

    var createHorizontalLine3 = function(yPos)
    {
        svg.append("g")
            .attr("transform", "translate(0, "+y(yPos)+")")
            .append("line")
            .attr("x2", width)
            .style("stroke", "#cc0000")
            .style("stroke-width", "3px")
            .style("stroke-dasharray", "5");

        svg.append("text")
            .attr("y", 125)
            .attr("x", settings.width-100)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("중량 하한");
    };


    var createHorizontalLineULC = function(yPos)
    {
        svg.append("g")
            .attr("transform", "translate(0, "+y(yPos)+")")
            .append("line")
            .attr("x2", width)
            .style("stroke", "#cc0000")
            .style("stroke-width", "3px")
            .style("stroke-dasharray", "5");

        svg.append("text")
        //.attr("y", 125)
            .attr("x", settings.width-100)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("토출량 상한");
    };

    var createHorizontalLineUCL = function(yPos)
    {
        svg.append("g")
            .attr("transform", "translate(0, "+y(yPos)+")")
            .append("line")
            .attr("x2", width)
            .style("stroke", "#cc0000")
            .style("stroke-width", "3px")
            .style("stroke-dasharray", "5");

        svg.append("text")
             .attr("y", y(yPos))
            .attr("x", settings.width-180)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("UCL");
            //.text("토출량 상한");

    };


    var createHorizontalLineLCL = function(yPos)
    {
        svg.append("g")
            .attr("transform", "translate(0, "+y(yPos)+")")
            .append("line")
            .attr("x2", width)
            .style("stroke", "#cc0000")
            .style("stroke-width", "3px")
            .style("stroke-dasharray", "5");

        svg.append("text")
            .attr("y", y(yPos))
            .attr("x", settings.width-100)
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .style("text-anchor", "end")
            .attr("fill", "#cc0000")
            .text("LCL");
            //.text("중량 하한");
    };


    return {
        selectBar: selectBar,
        deselectBar: deselectBar,
        getBarData: getBarData,
        createHorizontalLine: createHorizontalLine,
        createHorizontalLine1: createHorizontalLine1,
        createHorizontalLine2: createHorizontalLine2,
        createHorizontalLine3: createHorizontalLine3,
        createHorizontalLineLCL:createHorizontalLineLCL,
        createHorizontalLineUCL:createHorizontalLineUCL
    };

    // this.updateBar(settings.data);
    // return this;
};

