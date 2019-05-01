

$(function () {
    var faultApriori = {};

    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    faultApriori.drawSankey = function (json) {
        var colors = {
            "라인": '#B40404',
            '설비': '#B43104',
            '항목': '#B45F04',
            '세부항목': '#B18904',
            '고장': '#AEB404',
            '조치': '#86B404'
        };


        var seperation = ["라인", "설비", "항목", "세부항목", "고장", "조치"];
        var offlength = 225;
        var len = 0;
        var HeadSVG;

        HeadSVG = d3.select("#apriori")
            .append("svg")
            .attr("transform", "translate(10,0)")
            .attr("width", 1200)
            .attr("height", 25);
        for(var x= 0; x<seperation.length; x += 1)
        {
            HeadSVG.append("text")
                .attr("x", len)
                .attr("y", 20)
                .style("font-family" ,"Do Hyeon")
                .text(function () {
                    return seperation[x];
                })
            len += offlength;
        }

//산키 부분
        var chart = d3.select("#apriori")
            .append("svg")
            .attr("transform", "translate(12,0)")
            .attr("width", 1200)
            .attr("height", 800);
        chart
            .chart("Sankey.Path")
            .name(label)
            .colorNodes(function(name, node) {
                return color(node, 1) || colors.fallback;
            })
            .colorLinks(function(link) {
                return color(link.source, 2) || color(link.target, 4) || colors.fallback;
            })
            .nodeWidth(15)
            .nodePadding(10)
            .spread(true)
            .iterations(0)
            .draw(json);

        function label(node) {
            return node.name + " : " +Math.floor(node.value * 10);
        }
        function color(node, depth) {
            var id = node.id.replace(/(_score)?(_\d+)?$/, '');
            if (colors[id]) {
                return colors[id];
            } else if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
                return color(node.targetLinks[0].source, depth-1);
            } else {
                return null;
            }
        }

    }

    faultApriori.getAllfaultApriori = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/fault-apriori",
            type: 'GET',
            dataType: 'JSON',
            // data: {
            //     "department"    :   '',
            //     "line"          :   lId,
            //     "machine"       :   mId,
            //     "productionDate"       :   $('#txtProductionDate').val(),
            //     "limit"         :   $("#PER_PAGE").val(),
            //     "page"          :   currentPage
            // },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    console.log(response);
                    var json = {};
                    json["nodes"] = response.NODE;
                    json["links"] = response.LINK;
                    console.log(json);
                    faultApriori.drawSankey(json);
                }
                else {
                    console.log("data loading fail")
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    faultApriori.getAllfaultApriori();

    $('#productionDate').datetimepicker({
        format: 'YYYY-MM-DD',
    }).on('dp.change', function (ev) {
        $("#selectMachineButtonList").html("");
        getCountLine();
        checkPagination = true;
        faultApriori.getAllfaultAprioris("", "");
    });

});