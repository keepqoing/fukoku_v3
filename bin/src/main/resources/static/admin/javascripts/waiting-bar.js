function openLoading() {
    waitingDialog.show('Processing...', {
        dialogSize: 'sm',
        progressType: 'success'
    });
}

function closeLoading() {
    waitingDialog.hide();
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isSpaceKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 32)
        return false;
    return true;
}

function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function fixit(selector) {
    selector.each(function () {
        var values = $(this).find("tr>td:first-of-type")
        var run = 1
        for (var i = values.length - 1; i > -1; i--) {
            if (values.eq(i).text() === values.eq(i - 1).text()) {
                values.eq(i).remove()
                run++
            } else {
                values.eq(i).attr("rowspan", run)
                run = 1
            }
        }
    })
}

function getCurrentDay(d1) {
    var d = new Date(d1);
    var dd = d.getDate();
    var mm = d.getMonth() + 1; //January is 0!
    var yyyy = d.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function getPreviousDay(d1) {
    var d = new Date(d1);
    var dd = d.getDate() - 1;
    var mm = d.getMonth() + 1; //January is 0!
    var yyyy = d.getFullYear();
    if (dd == 0) {
        var a = new Date(d.setDate(d.getDate() - 1));
        dd = a.getDate();
        mm = a.getMonth() + 1;
        yyyy = a.getFullYear();
    }
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function checkAll(ele) {
    var checkboxes = document.getElementsByTagName('input');
    if (ele.checked) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == 'checkbox') {
                checkboxes[i].checked = true;

            }
        }
    } else {
        for (var i = 0; i < checkboxes.length; i++) {

            if (checkboxes[i].type == 'checkbox') {
                checkboxes[i].checked = false;
            }
        }
    }
}

function generateUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

