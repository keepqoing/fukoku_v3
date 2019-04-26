$(function() {

    var productQtyInfor = {};

    var _ctx = ($("meta[name='ctx']").attr("content")===undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    $("#btnQuery").click(function (){
        if($("#txtStartDate").val()=="" || $("#txtStartDate").val()==""){
            alert("Input data");
        }else {
            productQtyInfor.getAllProductQTY();
            productQtyInfor.getAllProductQTYTable();
        }
    });

    productQtyInfor.getAllProductQTY = function () {
        $.ajax({
            url: "/v1/api/fukoku/statistic/product-qty/graph",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "startDate"     :   $("#txtStartDate").val(),//+"-01-01",
                "endDate"       :   $("#txtStartDate").val()+"12-31"
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#groupBarchart").html("");
                    if (response.DATA.length > 0) {
                        productQtyInfor.getYearlyReport = function(){
                            var settings = {
                                selector: "#groupBarchart",
                                height: 350,
                                width: window.innerWidth - 520
                            }
                            groupBarchart(response.DATA, settings);
                            console.log(response.DATA)
                        };
                        productQtyInfor.getYearlyReport();
                    }
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    productQtyInfor.getAllProductQTYTable = function () {
        $.ajax({
            url: "/v1/api/fukoku/statistic/product-qty/table",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "startDate"     :   $("#txtStartDate").val(),//+"-01-01",
                "endDate"       :   $("#txtStartDate").val()+"-12-31"
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#PRODUCT_QTY").html("");
                    $("#PRODUCT_QTY").append("<tr style=\"font-weight: bold;background-color: #3c8dbc;color: white;\">\n" +
                        "                                        <td rowspan='2'>라인</td>\n" +
                        "                                        <td colspan=\"2\">1월</td>\n" +
                        "                                        <td colspan=\"2\">2월</td>\n" +
                        "                                        <td colspan=\"2\">3월</td>\n" +
                        "                                        <td colspan=\"2\">4월</td>\n" +
                        "                                        <td colspan=\"2\">5월</td>\n" +
                        "                                        <td colspan=\"2\">6월</td>\n" +
                        "                                        <td colspan=\"2\">7월</td>\n" +
                        "                                        <td colspan=\"2\">8월</td>\n" +
                        "                                        <td colspan=\"2\">9월</td>\n" +
                        "                                        <td colspan=\"2\">10월</td>\n" +
                        "                                        <td colspan=\"2\">11월</td>\n" +
                        "                                        <td colspan=\"2\">12월</td>\n" +
                        "                                        <td rowspan='2'>생산수량</td>\n" +
                        "                                        <td rowspan='2'>불량수</td>\n" +
                        "                                        <td rowspan='2'>불량율 (%)</td>\n" +
                        "                                    </tr>");
                    $("#PRODUCT_QTY").append("<tr style=\"font-weight: bold;background-color: #3c8dbc;color: white;\">\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                        <td>생산수</td>\n" +
                        "                                        <td>불량수</td>\n" +
                        "                                    </tr>");
                    if (response.DATA.length > 0) {
                        $("#PRODUCT_QTY_TEMPLATE").tmpl(response.DATA).appendTo("table#PRODUCT_QTY");
                    } else {
                        $("#PRODUCT_QTY").html("<tr style='text-align:center;'><td colspan='30'>콘텐츠 없음</td></tr>");
                    }
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };
});