$(function () {

    var users = {};
    var checkPagination = true;
    var currentPage = 1;


    var _ctx = ($("meta[name='ctx']").attr("content") === undefined) ? "" : $("meta[name='ctx']").attr("content");

    // Prepend context path to all jQuery AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!options.crossDomain) {
            options.url = _ctx + options.url;
        }
    });

    $(document).on('click', '#btnMachineStateExec', function () {
        $("#modalExecution").modal("show");
    });

    $(document).on('click', '#btnWorkpieceExec', function () {
        $("#modalExecution").modal("show");
    });
});