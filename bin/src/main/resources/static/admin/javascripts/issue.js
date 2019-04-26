$(function () {

    var issues = {};
    var checkPagination = true;
    var currentPage = 1;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    //TODO: SERVER SIDE REQUEST
    issues.getAllIssues = function () {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/issue",
            type: 'GET',
            dataType: 'JSON',
            data: {
                "limit"     :   $("#PER_PAGE").val(),
                "page"      :   currentPage
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    $("#ISSUE").html("");
                    if (response.DATA.length > 0) {
                        $("#limitPage").html(response.PAGINATION.PAGE);
                        $("#totalPage").html(response.PAGINATION.TOTAL_PAGES);
                        $("#totalRecords").html("(" + response.PAGINATION.TOTAL_COUNT + " 라인)");
                        $.each(response.DATA, function (key, value) {
                            response.DATA[key]["NO"] = (key + 1) + ((response.PAGINATION.PAGE - 1) * response.PAGINATION.LIMIT);
                        });
                        $("#ISSUE_TEMPLATE").tmpl(response.DATA).appendTo("tbody#ISSUE");
                        if (checkPagination) {
                            issues.setPagination(response.PAGINATION.TOTAL_PAGES);
                            checkPagination = false;
                        }
                    } else {
                        $("#ISSUE").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
                        $("#PAGINATION").html("");
                    }
                } else {
                    $("#ISSUE").html("<tr style='text-align:center;'><td colspan='7'>콘텐츠 없음</td></tr>");
                    $("#PAGINATION").html("");
                    $("#limitPage").html(0);
                    $("#totalPage").html(0);
                    $("#totalRecords").html("(0 라인)");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    issues.getAllIssueReplies = function (id) {
        openLoading();
        $.ajax({
            url: "/v1/api/fukoku/reply-issue/"+id,
            type: 'GET',
            dataType: 'JSON',
            data: {
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (response.CODE == "7777") {
                    console.log(response);
                    $("#REPLY").html("");
                    if (response.DATA.length > 0) {
                        $("#REPLY_TEMPLATE").tmpl(response.DATA).appendTo("#REPLY");
                    } else {
                        $("#REPLY").html("<div class='col-sm-9'><h4 style='text-align:center;'>콘텐츠 없음</h4></div>");
                    }
                } else {
                    $("#REPLY").html("<div class='col-sm-9'><h4 style='text-align:center;'>콘텐츠 없음</h4></div>");
                }
                closeLoading();
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    issues.addIssue = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/issue",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    issues.getIssue = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/issue/" + id,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    }

    issues.updateIssue = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/issue",
            type: 'PUT',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    }

    issues.updateIssueStatus = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/issue/status",
            type: 'PUT',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    }

    issues.deleteIssue = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/issue/" + id,
            type: 'DELETE',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    }

    issues.deleteReplyIssue = function (id, callback) {
        $.ajax({
            url: "/v1/api/fukoku/reply-issue/" + id,
            type: 'DELETE',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    }

    issues.addReplyIssue = function (data, callback) {
        $.ajax({
            url: "/v1/api/fukoku/reply-issue",
            type: 'POST',
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (response) {
                if (callback) {
                    callback(response);
                }
            },
            error: function (data, status, err) {
                console.log("error: " + data + " status: " + status + " err:" + err);
            }
        });
    };

    //TODO: PAGINATION
    issues.setPagination = function (totalPage) {
        $('#PAGINATION').bootpag({
            total: totalPage,
            page: currentPage,
            maxVisible: 10,
            leaps: true,
            firstLastUse: true,
            first: '처음',
            last: '마지막',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        });
    };

    $("#PAGINATION").on("page", function (event, page) {
        checkPagination = false;
        currentPage = page;
        issues.getAllIssues();
    });

    $("#PER_PAGE").change(function () {
        checkPagination = true;
        issues.getAllIssues();
    });

    issues.getAllIssues();

    //TODO: View action
    $("#btnNew").click(function () {
        $("input").not("input[type=button]").val("");
        $("#btnSaveUpdate").hide();
        $("#btnSave").show();
        $("#modalIssue").modal('show');
    });

    $("#btnSave").click(function () {
        if ($("#txtTitle").val() == "" || $("#txtReporter").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "TITLE"          :   $("#txtTitle").val(),
                "REPORTER"       :   $("#txtReporter").val(),
                "CONTENT"        :   $("#txtContent").val()
            };
            issues.addIssue(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalIssue").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalIssue").trigger("click");
                    checkPagination = true;
                    issues.getAllIssues();
                } else {
                    $("#modalIssue").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalIssue").trigger("click");
                }
            });
        }
    });

    var id = 0;
    $(document).on('click', '#btnEdit', function () {
        id = $(this).parents("tr").data("id");
        $("#btnSave").hide();
        $("#btnSaveUpdate").show();
        issues.getIssue(id, function (response) {
            $("#txtTitle").val(response.DATA.TITLE);
            $("#txtReporter").val(response.DATA.REPORTER);
            $("#txtContent").val(response.DATA.CONTENT);
            $("#modalIssue").modal("show");
        });
    });

    $("#btnSaveUpdate").click(function () {
        if ($("#txtTitle").val() == "" || $("#txtReporter").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "TITLE"          :   $("#txtTitle").val(),
                "REPORTER"       :   $("#txtReporter").val(),
                "CONTENT"        :   $("#txtContent").val(),
                "ID"             :   id
            };
            issues.updateIssue(data, function (response) {
                if (response.CODE == "0000") {
                    $("#modalIssue").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalIssue").trigger("click");
                    checkPagination = true;
                    issues.getAllIssues();
                } else {
                    $("#modalIssue").attr("data-toastr-notification", response.MESSAGE);
                    $("#modalIssue").trigger("click");
                }
            });
        }
    });

    $(document).on('click', '#btnDelete', function () {
        $("#modalMessage").modal("show");
        id = $(this).parents("tr").data("id");
    });

    $(document).on('click', '#btnReply', function () {
        id = $(this).parents("tr").data("id");
        issues.getAllIssueReplies(id);
        issues.getIssue(id, function (response) {
            $("#TITLE").html(response.DATA.TITLE);
        });
        $("#modalReply").modal("show");
    });

    $("#btnOk").click(function () {
        issues.deleteIssue(id, function (response) {
            if (response.CODE == "0000") {
                $("#modalIssue").attr("data-toastr-notification", response.MESSAGE);
                $("#modalIssue").trigger("click");
                checkPagination = true;
                issues.getAllIssues();
            } else {
                $("#modalIssue").attr("data-toastr-notification", response.MESSAGE);
                $("#modalIssue").trigger("click");
            }
        });
        $("#modalMessage").modal("hide");
    });

    $(document).on('click', '#chkStatus', function () {
        var v = $(this).val();
        id = $(this).parents("tr").data("id");
        console.log(v);
        if(v=="1"){
            data = {
                "STATUS"         :   "PROCESSING",
                "ID"             :   id
            };

        }else{
            data = {
                "STATUS"         :   "SOLVED",
                "ID"             :   id
            };

        }
        issues.updateIssueStatus(data, function (response) {
            if (response.CODE == "0000") {
                $("#modalIssue").attr("data-toastr-notification", response.MESSAGE);
                $("#modalIssue").trigger("click");
                checkPagination = true;
                issues.getAllIssues();
            } else {
                $("#modalIssue").attr("data-toastr-notification", response.MESSAGE);
                $("#modalIssue").trigger("click");
            }
        });
    });

    $("#btnReplySave").click(function () {
        if ($("#txtReplyUser").val() == "" || $("#txtReplyContent").val() == ""){
            alert("Please input the data!");
        } else {
            var data = {
                "REPLY_USER"     :   $("#txtReplyUser").val(),
                "ISSUE"          :   id,
                "CONTENT"        :   $("#txtReplyContent").val()
            };
            issues.addReplyIssue(data, function (response) {
                if (response.CODE == "0000") {
                    issues.getAllIssueReplies(id);
                } else {

                }
            });
        }
    });

    $(document).on('click', '#btnDeleteReply', function () {
        var i = $(this).data("id");
        issues.deleteReplyIssue(i, function (response) {
            if (response.CODE == "0000") {
                issues.getAllIssueReplies(id);
            } else {
            }
        });
    });
});