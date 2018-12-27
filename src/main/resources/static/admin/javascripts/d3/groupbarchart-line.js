function getTextWidth(text, fontSize, fontName) {
    c = document.createElement("canvas");
    ctx = c.getContext("2d");
    ctx.font = fontSize + ' ' + fontName;
    return ctx.measureText(text).width;
}

function DataSegregator(array, on) {
    var SegData;
    OrdinalPositionHolder = {
        valueOf: function () {
            thisObject = this;
            keys = Object.keys(thisObject);
            keys.splice(keys.indexOf("valueOf"), 1);
            keys.splice(keys.indexOf("keys"), 1);
            return keys.length == 0 ? -1 : d3.max(keys, function (d) { return thisObject[d] })
        }
        , keys: function () {
            keys = Object.keys(thisObject);
            keys.splice(keys.indexOf("valueOf"), 1);
            keys.splice(keys.indexOf("keys"), 1);
            return keys;
        }
    }
    array[0].map(function (d) { return d[on] }).forEach(function (b) {
        value = OrdinalPositionHolder.valueOf();
        OrdinalPositionHolder[b] = OrdinalPositionHolder > -1 ? ++value : 0;
    })

    SegData = OrdinalPositionHolder.keys().map(function () {
        return [];
    });

    array.forEach(function (d) {
        d.forEach(function (b) {
            SegData[OrdinalPositionHolder[b[on]]].push(b);
        })
    });

    return SegData;
}



function groupBarchartWithTrendLine(Data, settings){
    var margin = { top: 20, right: 30, bottom: 60, left: 40 },
        width = settings.width - margin.left - margin.right,
        height = settings.height - margin.top - margin.bottom;

    var textWidthHolder = 0;
    /// Adding Date in LineCategory
    Data.forEach(function (d) {
        d.LineCategory.forEach(function (b) {
            b.Date = d.Date;
        })
    });

    var Categories = new Array();
    // Extension method declaration

    Categories.pro

    var Data;
    var ageNames;
    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .4);
    var XLine = d3.scale.ordinal()
        .rangeRoundPoints([0, width], .4);
    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var YLine = d3.scale.linear().range([height, 0])
        .domain([0, d3.max(Data, function (d) { return d3.max(d.LineCategory, function (b) { return b.Value }) })]);

    var color = d3.scale.ordinal()
        .range(["#1967e5", "#01ba36", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var line = d3.svg.line()
        .x(function (d) {return x0(d.Date) + x0.rangeBand() / 2;})
        .y(function (d) { return YLine(d.Value) });




    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var YLeftAxis = d3.svg.axis().scale(YLine).orient("right").tickFormat(d3.format(".2s"));

    var svg = d3.select(settings.selecctor).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");





    // Bar Data categories
    Data.forEach(function (d) {
        d.Categories.forEach(function (b) {
            if (Categories.findIndex(function (c) { return c.Name===b.Name}) == -1) {
                b.Type = "bar";
                console.log(JSON.stringify(b))
                Categories.push(b)
            }
        })
    });


    // Line Data categories
    Data.forEach(function (d) {
        d.LineCategory.forEach(function (b) {
            if (Categories.findIndex(function (c) { return c.Name === b.Name }) == -1) {
                b.Type = "line";
                console.log(JSON.stringify(b))
                Categories.push(b)
            }
        })
    });

    // Processing Line data
    lineData = DataSegregator(Data.map(function (d) { return d.LineCategory }), "Name");
    console.log(lineData);

    // Line Coloring
    LineColor = d3.scale.ordinal();
    LineColor.domain(Categories.filter(function (d) { return d.Type == "line" }).map(function (d) { return d.Name }));
    LineColor.range(["#d40606", "white", "#98bdc5", "#671919", "#0b172b"])
    x0.domain(Data.map(function (d) { return d.Date; }));
    XLine.domain(Data.map(function (d) { return d.Date; }));
    x1.domain(Categories.filter(function (d) { return d.Type == "bar" }).map(function (d) { return d.Name})).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(Data, function (d) { return d3.max(d.Categories, function (d) { return d.Value; }); })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        ;


    var state = svg.selectAll(".state")
        .data(Data)
        .enter().append("g")
        .attr("class", "state")
        .attr("transform", function (d) { return "translate(" + x0(d.Date) + ",0)"; });

    state.selectAll("rect")
        .data(function (d) { return d.Categories; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function (d) { return x1(d.Name); })
        .attr("y", function (d) { return y(d.Value); })
        //.attr("height", function (d) { return height - y(d.Value); })
        .style("fill", function (d) { return color(d.Name); })
        .transition().delay(500).attrTween("height", function (d) {
        var i = d3.interpolate(0, height - y(d.Value));
        return function (t)
        {
            return i(t);
        }
    });

    // drawaing lines
    svg.selectAll(".lines")
        .data(lineData)
        .enter()
        .append("g")
        .attr("class", "line")
        .each(function (d) {
            Name=d[0].Name
            d3.select(this)
                .append("path")
                .attr("d", function (b) { return line(b) })
                .style({ "stroke-width": "3px", "fill": "none" })
                .style("stroke", LineColor(Name))
                .transition()
                .duration(1500);
        })
}