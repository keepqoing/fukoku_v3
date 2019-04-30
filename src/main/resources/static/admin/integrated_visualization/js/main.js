const startDateOfDatabase = "2018-01-01";
const companies = ['보령 댐퍼 공장', '보령 러버 공장'];
//const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', "Jun", 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const months = ['1월', '2월', '3월', '4월', '5월', "6월", '7월', '8월', '9월', '10월', '11월', '12월'];
let currentLines = [];
let currentMachines = [];
let machinesName = new Object();
let states = new Object();

let selectCompany = $j(`#selectCompany`);

let selectLine = $j(`#selectLine`);
let selectMachine = $j(`#selectMachine`);

let selectStartYear = $j(`#selectStartYear`);
let selectStartMonth = $j(`#selectStartMonth`);
let selectStartDay = $j(`#selectStartDay`);

let selectEndYear = $j(`#selectEndYear`);
let selectEndMonth = $j(`#selectEndMonth`);
let selectEndDay = $j(`#selectEndDay`);

let selectXAxis = $j(`#selectXAxis`);
let selectYAxis = $j(`#selectYAxis`);


let chipsCompany = $j(`#company`);
let chipsLine = $j(`#line`);
let chipsMachine = $j(`#machine`);
let chipsStart = $j(`#startDate`);
let chipsEnd = $j(`#startEnd`);

let savedDataMachine = {};
let savedDataProduction = {};


const machineStates = new Object();
machineStates['ACTIVE_TIME_H'] = {
    label: '가동시간',
    color: '#32CD32',
    unit: 'H',
    isChecked: true
};
machineStates['WORKING_NONACTIVE_TIME_H'] = {
    label: '부하비가동시간',
    color: '#FFDD00',
    unit: 'H',
    isChecked: true
};
machineStates['FAULT_TIME_H'] = {
    label: '고장시간',
    color: '#FD6347',
    unit: 'H',
    isChecked: false
};
machineStates['ALARM_TIME_H'] = {
    label: '알람시간',
    color: '#1289FC',
    unit: 'H',
    isChecked: false
};
machineStates['ACTIVE_FREQ'] = {
    label: '가동횟수',
    color: '#0F940F',
    unit: '개',
    isChecked: false
};
machineStates['WORKING_NONACTIVE_FREQ'] = {
    label: '부하비가동횟수',
    color: '#B5970C',
    unit: '개',
    isChecked: false
};
machineStates['FAULT_FREQ'] = {
    label: '고장횟수',
    color: '#B0311A',
    unit: '개',
    isChecked: false
};
machineStates['ALARM_FREQ'] = {
    label: '알람횟수',
    color: '#2370BA',
    unit: '개',
    isChecked: false
};
machineStates['ACTIVE_RATE'] = {
    label: '가동율',
    color: '#135E13',
    unit: '%',
    isChecked: false
};
machineStates['WORKING_NONACTIVE_RATE'] = {
    label: '부하비가동율',
    color: '#8A7622',
    unit: '%',
    isChecked: false
};
machineStates['FAULT_RATE'] = {
    label: '고장율',
    color: '#85382A',
    unit: '%',
    isChecked: false
};
machineStates['ALARM_RATE'] = {
    label: '알람율',
    color: '#3E678F',
    unit: '%',
    isChecked: false
};
machineStates['WORKING_TIME_H'] = {
    forCalculation: true
};


const productionStates = new Object();
productionStates['TOTAL_PRODUCT'] = {
    label: '생산수량',
    color: '#C75EFF',
    unit: '개',
    isChecked: true
};
productionStates['BYPASSED_PRODUCT'] = {
    label: '직행수량',
    color: '#1289FC',
    unit: '개',
    isChecked: false
};
productionStates['OK_PRODUCT'] = {
    label: '양품수량',
    color: '#32CD32',
    unit: '개',
    isChecked: false
};
productionStates['NG_PRODUCT'] = {
    label: 'NG수량',
    color: '#FD6347',
    unit: '개',
    isChecked: false
};
productionStates['DEFECTIVE_PRODUCT'] = {
    label: '불량수량',
    color: '#FFDD00',
    unit: '개',
    isChecked: false
};
productionStates['THEORETICAL_PRODUCT_QTY'] = {
    label: '이론목표수량',
    color: '#962CB0',
    unit: '개',
    isChecked: false
};
productionStates['BYPASSED_PRODUCT_RATE'] = {
    label: '직행율',
    color: '#2370BA',
    unit: '%',
    isChecked: false
};
productionStates['OK_PRODUCT_RATE'] = {
    label: '양품율',
    color: '#0F940F',
    unit: '%',
    isChecked: false
};
productionStates['NG_PRODUCT_RATE'] = {
    label: 'NG율',
    color: '#B0311A',
    unit: '%',
    isChecked: false
};
productionStates['DEFECTIVE_PRODUCT_RATE'] = {
    label: '불량율',
    color: '#B5970C',
    unit: '%',
    isChecked: false
};
productionStates['TARGET_PRODUCT_QTY'] = {
    label: '목표수량',
    color: '#68327A',
    unit: '개',
    isChecked: false
};
productionStates['UPH'] = {
    label: 'UPH',
    color: '#3E678F',
    unit: '개',
    isChecked: false
};
productionStates['THEORETICAL_CYCLE_TIME_S'] = {
    label: '이론사이클타임',
    color: '#135E13',
    unit: '초',
    isChecked: false
};
productionStates['PROCESS_CYCLE_TIME_S'] = {
    label: '공정사이클타임',
    color: '#85382A',
    unit: '초',
    isChecked: false
};
productionStates['WORKING_TIME_H'] = {
    forCalculation: true
};


let machineActions = [];
let productionActions = [];

function setLines(lines){
    currentLines = lines;
    selectLine.append(`<option value="all">All</option>`);
    lines.forEach(function(line, index){
        selectLine.append(`<option value="${index + 1}">${line}</option>`);
    });
}


function setMachines(machines){
    currentMachines = machines;
    selectMachine.empty();
    selectMachine.append(`<option value="all">All</option>`);
    machines.forEach(function(machine, index){
        selectMachine.append(`<option value="${index + 1}">${machine}</option>`);
    });
}

function setStates(){
    let currentRowId;
    let numberOfItemsEachRow = 4;
    Object.keys(machineStates).forEach(function(key, index){
        if (!machineStates[key].forCalculation){
            if (index%numberOfItemsEachRow == 0) {
                currentRowId = `row${Math.floor(index/numberOfItemsEachRow)}`;
                $j("#zAxisBox1").append(`<div class='row' id=zAxisBox1${currentRowId} style="margin: 5px 0";></div>`);
            }
            $j(`#zAxisBox1${currentRowId}`).append(`
            <div class='col-lg-${Math.floor(12/numberOfItemsEachRow)} col-md-${Math.floor(12/numberOfItemsEachRow)} col-sm-${Math.floor(12/numberOfItemsEachRow)} col-xs-${Math.floor(12/numberOfItemsEachRow)}' style='padding:${((index+1)%numberOfItemsEachRow == 0) ? '0' : '0 10px 0 0'}'>
                <div class='input-group' style='vertical-align: middle;'>
                    <span class="input-group-addon" style="background-color: #fff; vertical-align: middle;">
                        <input type="checkbox" style="vertical-align: middle;" id="chb_${key}" ${machineStates[key].isChecked ? 'checked': ''}>
                    </span>
                    <div class="input-group-addon"  style="text-align: left; background-color: #fff; width: 100%;">
                        <label class="input-group-text" style="vertical-align: middle;">${machineStates[key].label} (${machineStates[key].unit})</label>
                    </div>
                    <div id="cp_${key}" class="input-group colorpicker-component" data-color="${machineStates[key].color}">
                        <span class="input-group-addon" style="background-color: #fff; border-right: 1px solid #ccc; width: min-content;"><i></i></span>
                    </div>
                </div>
            </div>
            `);
            $(`#cp_${key}`).colorpicker().on('changeColor', function(event){
                machineStates[key].color = event.color.toHex();
            });
            $(`#chb_${key}`).change(function(){
                let checkedAvailable = false;
                Object.keys(machineStates).forEach(function(key, index){
                    if ($(`#chb_${key}`).is(':checked')){
                        checkedAvailable = true;
                    }
                });
                $('#btnSendRequest').prop('disabled', !checkedAvailable);
            });
        }
    });
    numberOfItemsEachRow = 5;
    Object.keys(productionStates).forEach(function(key, index){
        if (!productionStates[key].forCalculation){
            if (index%numberOfItemsEachRow == 0) {
                currentRowId = `row${Math.floor(index/numberOfItemsEachRow)}`;
                $j("#zAxisBox2").append(`<div class='row' id=zAxisBox2${currentRowId} style="margin: 5px 0";></div>`);
            }
            $j(`#zAxisBox2${currentRowId}`).append(`
            <div class='col-lg-${Math.floor(12/numberOfItemsEachRow)} col-md-${Math.floor(12/numberOfItemsEachRow)} col-sm-${Math.floor(12/numberOfItemsEachRow)} col-xs-${Math.floor(12/numberOfItemsEachRow)}' style='width: ${100/numberOfItemsEachRow}%; padding:${((index+1)%numberOfItemsEachRow == 0) ? '0' : '0 10px 0 0'}'>
                <div class='input-group' style='vertical-align: middle;'>
                    <span class="input-group-addon" style="background-color: #fff; vertical-align: middle;">
                        <input type="checkbox" style="vertical-align: middle;" id="chb_${key}" ${productionStates[key].isChecked ? 'checked': ''}>
                    </span>
                    <div class="input-group-addon"  style="text-align: left; background-color: #fff; width: 100%;">
                        <label class="input-group-text" style="vertical-align: middle;">${productionStates[key].label} (${productionStates[key].unit})</label>
                    </div>
                    <div id="cp_${key}" class="input-group colorpicker-component" data-color="${productionStates[key].color}">
                        <span class="input-group-addon" style="background-color: #fff; border-right: 1px solid #ccc; width: min-content;"><i></i></span>
                    </div>
                </div>
            </div>
            `);
            $(`#cp_${key}`).colorpicker().on('changeColor', function(event){
                productionStates[key].color = event.color.toHex();
            });
            $(`#chb_${key}`).change(function(){
                let checkedAvailable = false;
                Object.keys(productionStates).forEach(function(key, index){
                    if ($(`#chb_${key}`).is(':checked')){
                        checkedAvailable = true;
                    }
                });
                $('#btnSendRequest').prop('disabled', !checkedAvailable);
            });
        }
    });
}

function setCompany(){
    companies.forEach(function(company, index){
        selectCompany.append(`<option value="${index + 1}">${company}</option>`);
    });
}

function setDate(){
    const startDate = new Date(startDateOfDatabase);
    for (let year=new Date().getFullYear(); year>=startDate.getFullYear(); year--){
        selectStartYear.append(`<option value="${year}">${year}</option>`);
        selectEndYear.append(`<option value="${year}">${year}</option>`);
    }
    selectStartYear.val(startDate.getFullYear().toString()).change();
    selectEndYear.val(new Date().getFullYear().toString()).change();

    months.forEach(function(month, index){
        selectStartMonth.append(`<option value="${index + 1}">${month}</option>`);
        selectEndMonth.append(`<option value="${index + 1}">${month}</option>`);
    });
    selectStartMonth.val((startDate.getMonth() + 1).toString()).change();
    selectEndMonth.val((new Date().getMonth() + 1).toString()).change();

    for (let i=1; i<=getDays(startDate.getFullYear(), startDate.getMonth() + 1); i++){
        selectStartDay.append(`<option value="${i}">${i}</option>`);
    }
    for (let i=1; i<=getDays(new Date().getFullYear(), new Date().getMonth() + 1); i++){
        selectEndDay.append(`<option value="${i}">${i}</option>`);
    }
    selectStartDay.val((startDate.getDate()).toString()).change();
    selectEndDay.val((new Date().getDate()).toString()).change();
};

function getDays(year, month){
    let n = 31;
    if (month == 2){
        if (year%4 == 0){
            n = 29;
        } else {
            n = 28;
        }
    } else {
        if (month == 4 || month == 6 || month == 9 || month == 11){
            n = 30;
        }
    }
    return n;
}


async function drawChart(xAxis, yAxis, lineLabel, machineLabel, jsonData){

    selectXAxis.val(xAxis).change();
    selectYAxis.val(yAxis).change();
    selectLine.val($(`#selectLine option:contains("${lineLabel}")`).val()).change();
    selectMachine.val($(`#selectMachine option:contains("${machineLabel}")`).val()).change();

    let interval = 'year';
    let startDate = new Date(getStartDate());
    let endDate = new Date(getEndDate());
    endDate.setHours(endDate.getHours() - 10);

    if (endDate.getFullYear() - startDate.getFullYear() > 0){
        interval = 'year';
    } else {
        if (endDate.getMonth() - startDate.getMonth() > 0){
            interval = 'month';
        } else {
            interval = 'day';
        }
    }

    if ($("#navStates li.active").attr('id') == 'liMachine'){
        machineActions.push({
            xAxis: xAxis,
            yAxis: yAxis,
            lineLabel: lineLabel,
            machineLabel: machineLabel,
            startDate: getStartDate(),
            endDate: getEndDate(),
            interval: interval
        });
    };

    if ($("#navStates li.active").attr('id') == 'liProduction'){
        productionActions.push({
            xAxis: xAxis,
            yAxis: yAxis,
            lineLabel: lineLabel,
            machineLabel: machineLabel,
            startDate: getStartDate(),
            endDate: getEndDate(),
            interval: interval
        });
    };

    let values = new Object();

    chipsLine.text(lineLabel);
    chipsMachine.text(machineLabel);
    chipsStart.text(getStartDate);
    chipsEnd.text(getEndDate);
    let lines = [];
    let machines = [];
    let selectedMachineNames = new Object();


    if (lineLabel == "All"){
        lines = await getAllLineNames();
        if (machineLabel == "All"){
            machines = await getAllMachineNames();
            selectedMachineNames = machinesName;
        } else {
            machines.push(machineLabel);
            selectedMachineNames[machineLabel] = machinesName[machineLabel];
        }
    } else {

        lines.push(lineLabel);
        if (machineLabel == "All"){
            machines = await getMachinesByLineName(lineLabel);
            selectedMachineNames = machinesName;

        } else {
            machines.push(machineLabel);
            selectedMachineNames[machineLabel] = machinesName[machineLabel];
        }
    }

    const data = [];
    let xAxisLabels = [];
    let xAxisName = 'xAxis';
    let yAxisName = 'yAxis';

    let selectedStates = [];
    if ($("#navStates li.active").attr('id') == 'liMachine'){
        selectedStates = machineStates;
    };

    if ($("#navStates li.active").attr('id') == 'liProduction'){
        selectedStates = productionStates;
    };

    if (xAxis == "line" && yAxis == "machine"){

        let values = new Object();
        lines.forEach(function(line){
            let machineValues = new Object();
            Object.keys(selectedMachineNames).forEach(function(machine){
                let stateValues = new Object();
                Object.keys(selectedStates).forEach(function(state){
                    stateValues[state] = 0;
                });
                machineValues[machine] = stateValues;
            });
            values[line] = machineValues;
        });

        let dataMachine = data.MACHINE;
        jsonData.forEach(function(data){
            if (lineLabel == 'All') dataMachine = data.MACHINE.replace(data.LINE,'').replace('_','');
            if (lines.includes(data.LINE) && Object.values(selectedMachineNames).includes(dataMachine) && endDate >= new Date(data.WORK_DATE) && startDate <= new Date(data.WORK_DATE)){
                const machineValues = values[data.LINE];
                const stateValues = machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === dataMachine)];
                Object.keys(stateValues).forEach(function(state){
                    if (state == 'THEORETICAL_CYCLE_TIME_S' || state == 'PROCESS_CYCLE_TIME_S'){
                        if (stateValues[state] < parseFloat(data[state])){
                            stateValues[state] = parseFloat(data[state]);
                        }
                    } else {
                        stateValues[state] += parseFloat(data[state]);
                    }
                });
                machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === dataMachine)] = stateValues;
                values[data.LINE] = machineValues;
            }
        });

        xAxisName = '라인';
        yAxisName = `설비`;
        let yAxisLabels = [];
        Object.keys(values).forEach(function(xAxisLabel){
            let yAxisValues = new Object();
            yAxisValues = values[xAxisLabel];
            xAxisLabels.push(xAxisLabel)
            yAxisLabels = (Object.keys(yAxisValues).length > yAxisLabels.length) ? Object.keys(yAxisValues) : yAxisLabels;
        });

        yAxisLabels.forEach(function(yAxisLabel){
            let childData = [];
            xAxisLabels.forEach(function(xAxisLabel){
                let nestedChildData = [];
                let childValue = values[xAxisLabel];
                let itemValues = childValue[yAxisLabel];
                Object.keys(itemValues).forEach(function(itemLabel){
                    nestedChildData.push({
                        name: itemLabel,
                        label: selectedStates[itemLabel].label,
                        color: selectedStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(4),
                        unit: selectedStates[itemLabel].unit
                    });
                });
                childData.push(nestedChildData);
            });
            data.push({
                label: yAxisLabel,
                values: childData
            })
        });
    }

    if (xAxis == "machine" && yAxis == "line"){
        let values = new Object();
        lines.forEach(function(line){
            let machineValues = new Object();
            Object.keys(selectedMachineNames).forEach(function(machine){
                let stateValues = new Object();
                Object.keys(selectedStates).forEach(function(state){
                    stateValues[state] = 0;
                });
                machineValues[machine] = stateValues;
            });
            values[line] = machineValues;
        });

        if (lineLabel == 'All'){
            jsonData.forEach(function(data){
                if (lines.includes(data.LINE) && Object.values(selectedMachineNames).includes(data.MACHINE.replace(data.LINE,'').replace('_','')) && endDate >= new Date(data.WORK_DATE) && startDate <= new Date(data.WORK_DATE)){
                    const machineValues = values[data.LINE];
                    const stateValues = machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === data.MACHINE.replace(data.LINE,'').replace('_',''))];
                    Object.keys(stateValues).forEach(function(state){
                        if (state == 'THEORETICAL_CYCLE_TIME_S' || state == 'PROCESS_CYCLE_TIME_S'){
                            if (stateValues[state] < parseFloat(data[state])){
                                stateValues[state] = parseFloat(data[state]);
                            }
                        } else {
                            stateValues[state] += parseFloat(data[state]);
                        }
                    });
                    machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === data.MACHINE.replace(data.LINE,'').replace('_',''))] = stateValues;
                    values[data.LINE] = machineValues;
                }
            });
        } else {
            jsonData.forEach(function(data){
                if (lines.includes(data.LINE) && Object.values(selectedMachineNames).includes(data.MACHINE)){
                    const machineValues = values[data.LINE];
                    const stateValues = machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === data.MACHINE)];
                    Object.keys(stateValues).forEach(function(state){
                        if (state == 'THEORETICAL_CYCLE_TIME_S' || state == 'PROCESS_CYCLE_TIME_S'){
                            if (stateValues[state] < parseFloat(data[state])){
                                stateValues[state] = parseFloat(data[state]);
                            }
                        } else {
                            stateValues[state] += parseFloat(data[state]);
                        }
                    });
                    machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === data.MACHINE)] = stateValues;
                    values[data.LINE] = machineValues;
                }
            });
        }

        xAxisName = '설비';
        yAxisName = `라인`;
        Object.keys(values).forEach(function(xAxisLabel){
            const childData = [];
            let yAxisValues = new Object();
            yAxisValues = values[xAxisLabel];
            Object.keys(yAxisValues).forEach(function(yAxisLabel){
                let nestedChildData = [];
                let itemValues = yAxisValues[yAxisLabel];
                Object.keys(itemValues).forEach(function(itemLabel){
                    nestedChildData.push({
                        name: itemLabel,
                        label: selectedStates[itemLabel].label,
                        color: selectedStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(4),
                        unit: selectedStates[itemLabel].unit
                    });
                });
                xAxisLabels.push(yAxisLabel);
                childData.push(nestedChildData);
            });
            data.push({
                label: xAxisLabel,
                values: childData
            })
        });
    }

    if (xAxis == "line" && yAxis == "date"){

        lines.forEach(function(line){
            let dateValues = new Object();
            let date = new Date(startDate);
            while(date<=endDate){
                let stateValues = new Object();
                Object.keys(selectedStates).forEach(function(state){
                    stateValues[state] = 0;
                });
                switch(interval){
                    case 'year':
                        dateValues[`${date.toISOString().slice(0,10)}|${date.getFullYear()}`] = stateValues;
                        date.setFullYear(date.getFullYear() + 1);
                        break;
                    case 'month':
                        dateValues[`${date.toISOString().slice(0,10)}|${months[date.getMonth()]}`] = stateValues;
                        date.setMonth(date.getMonth() + 1);
                        break;
                    case 'day':
                        dateValues[`${date.toISOString().slice(0,10)}|${date.getDate()}`] = stateValues;
                        date.setDate(date.getDate() + 1);
                        break;
                }
            }
            values[line] = dateValues;
        });

        jsonData.forEach(function(data){
            if (lines.includes(data.LINE) && startDate<=new Date(data.WORK_DATE) && endDate>=new Date(data.WORK_DATE)){
                let key = `${new Date(data.WORK_DATE).getFullYear()}-01-01|${new Date(data.WORK_DATE).getFullYear()}`;
                switch(interval){
                    case 'year':
                        key = `${new Date(data.WORK_DATE).getFullYear()}-01-01|${new Date(data.WORK_DATE).getFullYear()}`;
                        break;
                    case 'month':
                        key = `${new Date(data.WORK_DATE).getFullYear()}-${(`00${new Date(data.WORK_DATE).getMonth() + 1}`).slice(-2)}-01|${months[new Date(data.WORK_DATE).getMonth()]}`;
                        break;
                    case 'day':
                        key = `${data.WORK_DATE}|${new Date(data.WORK_DATE).getDate()}`;
                        break;
                }
                const dateValues = values[data.LINE];
                let stateValues = dateValues[key];
                Object.keys(stateValues).forEach(function(state){
                    if (state == 'THEORETICAL_CYCLE_TIME_S' || state == 'PROCESS_CYCLE_TIME_S'){
                        if (stateValues[state] < parseFloat(data[state])){
                            stateValues[state] = parseFloat(data[state]);
                        }
                    } else {
                        stateValues[state] += parseFloat(data[state]);
                    }
                });
                dateValues[key] = stateValues;
                values[data.LINE] = dateValues;
            }
        });

        xAxisName = '라인';
        yAxisName = `날짜`;
        let yAxisLabels = [];
        Object.keys(values).forEach(function(xAxisLabel){
            let yAxisValues = new Object();
            yAxisValues = values[xAxisLabel];
            xAxisLabels.push(xAxisLabel)
            yAxisLabels = (Object.keys(yAxisValues).length > yAxisLabels.length) ? Object.keys(yAxisValues) : yAxisLabels;
        });

        yAxisLabels.forEach(function(yAxisLabel){
            let childData = [];
            xAxisLabels.forEach(function(xAxisLabel){
                let nestedChildData = [];
                let childValue = values[xAxisLabel];
                let itemValues = childValue[yAxisLabel];
                Object.keys(itemValues).forEach(function(itemLabel){
                    nestedChildData.push({
                        name: itemLabel,
                        label: selectedStates[itemLabel].label,
                        color: selectedStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(4),
                        unit: selectedStates[itemLabel].unit
                    });
                });
                childData.push(nestedChildData);
            });
            data.push({
                label: yAxisLabel,
                values: childData
            })
        });
    }

    if (xAxis == "date" && yAxis == "line"){

        lines.forEach(function(line){
            let dateValues = new Object();
            let date = new Date(startDate);
            while(date<=endDate){
                let stateValues = new Object();
                Object.keys(selectedStates).forEach(function(state){
                    stateValues[state] = 0;
                });
                switch(interval){
                    case 'year':
                        dateValues[`${date.toISOString().slice(0,10)}|${date.getFullYear()}`] = stateValues;
                        date.setFullYear(date.getFullYear() + 1);
                        break;
                    case 'month':
                        dateValues[`${date.toISOString().slice(0,10)}|${months[date.getMonth()]}`] = stateValues;
                        date.setMonth(date.getMonth() + 1);
                        break;
                    case 'day':
                        dateValues[`${date.toISOString().slice(0,10)}|${date.getDate()}`] = stateValues;
                        date.setDate(date.getDate() + 1);
                        break;
                }
            }
            values[line] = dateValues;
        });

        jsonData.forEach(function(data){
            if (lines.includes(data.LINE) && startDate<=new Date(data.WORK_DATE) && endDate>=new Date(data.WORK_DATE)){
                let key = `${new Date(data.WORK_DATE).getFullYear()}-01-01|${new Date(data.WORK_DATE).getFullYear()}`;
                switch(interval){
                    case 'year':
                        key = `${new Date(data.WORK_DATE).getFullYear()}-01-01|${new Date(data.WORK_DATE).getFullYear()}`;
                        break;
                    case 'month':
                        key = `${new Date(data.WORK_DATE).getFullYear()}-${(`00${new Date(data.WORK_DATE).getMonth() + 1}`).slice(-2)}-01|${months[new Date(data.WORK_DATE).getMonth()]}`;
                        break;
                    case 'day':
                        key = `${data.WORK_DATE}|${new Date(data.WORK_DATE).getDate()}`;
                        break;
                }
                const dateValues = values[data.LINE];
                let stateValues = dateValues[key];
                Object.keys(stateValues).forEach(function(state){
                    if (state == 'THEORETICAL_CYCLE_TIME_S' || state == 'PROCESS_CYCLE_TIME_S'){
                        if (stateValues[state] < parseFloat(data[state])){
                            stateValues[state] = parseFloat(data[state]);
                        }
                    } else {
                        stateValues[state] += parseFloat(data[state]);
                    }
                });
                dateValues[key] = stateValues;
                values[data.LINE] = dateValues;
            }
        });

        xAxisName = '날짜';
        yAxisName = `라인`;
        Object.keys(values).forEach(function(xAxisLabel){
            const childData = [];
            let yAxisValues = new Object();
            yAxisValues = values[xAxisLabel];
            Object.keys(yAxisValues).forEach(function(yAxisLabel){
                let nestedChildData = [];
                let itemValues = yAxisValues[yAxisLabel];
                Object.keys(itemValues).forEach(function(itemLabel){
                    nestedChildData.push({
                        name: itemLabel,
                        label: selectedStates[itemLabel].label,
                        color: selectedStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(4),
                        unit: selectedStates[itemLabel].unit
                    });
                });
                xAxisLabels.push(yAxisLabel);
                childData.push(nestedChildData);
            });
            data.push({
                label: xAxisLabel,
                values: childData
            })
        });
    }

    if (xAxis == "machine" && yAxis == "date"){
        let date = new Date(startDate);
        while(date<=endDate){
            let dateValues = new Object();
            Object.keys(selectedMachineNames).forEach(function(machine){
                let stateValues = new Object();
                Object.keys(selectedStates).forEach(function(state){
                    stateValues[state] = 0;
                });
                dateValues[machine] = stateValues;
            });
            switch(interval){
                case 'year':
                    values[`${date.toISOString().slice(0,10)}|${date.getFullYear()}`] = dateValues;
                    date.setFullYear(date.getFullYear() + 1);
                    break;
                case 'month':
                    values[`${date.toISOString().slice(0,10)}|${months[date.getMonth()]}`] = dateValues;
                    date.setMonth(date.getMonth() + 1);
                    break;
                case 'day':
                    values[`${date.toISOString().slice(0,10)}|${date.getDate()}`] = dateValues;
                    date.setDate(date.getDate() + 1);
                    break;
            }
        }

        jsonData.forEach(function(data){
            let machine = (lineLabel == 'All') ? data.MACHINE.replace(data.LINE,'').replace('_','') : data.MACHINE;
            if (Object.values(selectedMachineNames).includes(machine) && startDate<=new Date(data.WORK_DATE) && endDate>=new Date(data.WORK_DATE)){
                let stateValues = new Object();
                let machineValues = new Object();
                let key = `${new Date(data.WORK_DATE).getFullYear()}-01-01|${new Date(data.WORK_DATE).getFullYear()}`;
                switch(interval){
                    case 'year':
                        key = `${new Date(data.WORK_DATE).getFullYear()}-01-01|${new Date(data.WORK_DATE).getFullYear()}`;
                        break;
                    case 'month':
                        key = `${new Date(data.WORK_DATE).getFullYear()}-${(`00${new Date(data.WORK_DATE).getMonth() + 1}`).slice(-2)}-01|${months[new Date(data.WORK_DATE).getMonth()]}`;
                        break;
                    case 'day':
                        key = `${data.WORK_DATE}|${new Date(data.WORK_DATE).getDate()}`;
                        break;
                }
                machineValues = values[key];

                stateValues = machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === machine)];
                Object.keys(stateValues).forEach(function(state){
                    if (state == 'THEORETICAL_CYCLE_TIME_S' || state == 'PROCESS_CYCLE_TIME_S'){
                        if (stateValues[state] < parseFloat(data[state])){
                            stateValues[state] = parseFloat(data[state]);
                        }
                    } else {
                        stateValues[state] += parseFloat(data[state]);
                    }
                });
                machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === machine)] = stateValues;
                values[key] = machineValues;
            }
        });


        xAxisName = '설비';
        yAxisName = `날짜`;

        Object.keys(values).forEach(function(xAxisLabel){
            const childData = [];
            let yAxisValues = new Object();
            yAxisValues = values[xAxisLabel];
            Object.keys(yAxisValues).forEach(function(yAxisLabel){
                let nestedChildData = [];
                let itemValues = yAxisValues[yAxisLabel];
                Object.keys(itemValues).forEach(function(itemLabel){
                    nestedChildData.push({
                        name: itemLabel,
                        label: selectedStates[itemLabel].label,
                        color: selectedStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(4),
                        unit: selectedStates[itemLabel].unit
                    });
                });
                xAxisLabels.push(yAxisLabel);
                childData.push(nestedChildData);
            });
            data.push({
                label: xAxisLabel,
                values: childData
            })
        });

    }

    if (xAxis == "date" && yAxis == "machine"){
        let date = new Date(startDate);
        while(date<=endDate){
            let dateValues = new Object();
            Object.keys(selectedMachineNames).forEach(function(machine){
                let stateValues = new Object();
                Object.keys(selectedStates).forEach(function(state){
                    stateValues[state] = 0;
                });
                dateValues[machine] = stateValues;
            });
            switch(interval){
                case 'year':
                    values[`${date.toISOString().slice(0,10)}|${date.getFullYear()}`] = dateValues;
                    date.setFullYear(date.getFullYear() + 1);
                    break;
                case 'month':
                    values[`${date.toISOString().slice(0,10)}|${months[date.getMonth()]}`] = dateValues;
                    date.setMonth(date.getMonth() + 1);
                    break;
                case 'day':
                    values[`${date.toISOString().slice(0,10)}|${date.getDate()}`] = dateValues;
                    date.setDate(date.getDate() + 1);
                    break;
            }
        }

        jsonData.forEach(function(data){
            let machine = (lineLabel == 'All') ? data.MACHINE.replace(data.LINE,'').replace('_','') : data.MACHINE;
            if (Object.values(selectedMachineNames).includes(machine) && startDate<=new Date(data.WORK_DATE) && endDate>=new Date(data.WORK_DATE)){
                let stateValues = new Object();
                let machineValues = new Object();
                let key = `${new Date(data.WORK_DATE).getFullYear()}-01-01|${new Date(data.WORK_DATE).getFullYear()}`;
                switch(interval){
                    case 'year':
                        key = `${new Date(data.WORK_DATE).getFullYear()}-01-01|${new Date(data.WORK_DATE).getFullYear()}`;
                        break;
                    case 'month':
                        key = `${new Date(data.WORK_DATE).getFullYear()}-${(`00${new Date(data.WORK_DATE).getMonth() + 1}`).slice(-2)}-01|${months[new Date(data.WORK_DATE).getMonth()]}`;
                        break;
                    case 'day':
                        key = `${data.WORK_DATE}|${new Date(data.WORK_DATE).getDate()}`;
                        break;
                }
                machineValues = values[key];
                stateValues = machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === machine)];
                Object.keys(stateValues).forEach(function(state){
                    if (state == 'THEORETICAL_CYCLE_TIME_S' || state == 'PROCESS_CYCLE_TIME_S'){
                        if (stateValues[state] < parseFloat(data[state])){
                            stateValues[state] = parseFloat(data[state]);
                        }
                    } else {
                        stateValues[state] += parseFloat(data[state]);
                    }
                });
                machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === machine)] = stateValues;
                values[key] = machineValues;
            }
        });

        xAxisName = '날짜';
        yAxisName = `설비`;

        let yAxisLabels = [];
        Object.keys(values).forEach(function(xAxisLabel){
            let yAxisValues = new Object();
            yAxisValues = values[xAxisLabel];
            xAxisLabels.push(xAxisLabel)
            yAxisLabels = (Object.keys(yAxisValues).length > yAxisLabels.length) ? Object.keys(yAxisValues) : yAxisLabels;
        });

        yAxisLabels.forEach(function(yAxisLabel){
            let childData = [];
            xAxisLabels.forEach(function(xAxisLabel){
                let nestedChildData = [];
                let childValue = values[xAxisLabel];
                let itemValues = childValue[yAxisLabel];
                Object.keys(itemValues).forEach(function(itemLabel){
                    nestedChildData.push({
                        name: itemLabel,
                        label: selectedStates[itemLabel].label,
                        color: selectedStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(4),
                        unit: selectedStates[itemLabel].unit
                    });
                });
                childData.push(nestedChildData);
            });
            data.push({
                label: yAxisLabel,
                values: childData
            })
        });
    }
    let calculatedData = [];
    data.forEach(function(xAxis){
        let calculatedValues = [];
        xAxis.values.forEach(function(yAxis){
            let calculatedStates = [];

            let stateObject = new Object();
            yAxis.forEach(function(state){
                stateObject[state.name] = state;
            });
            let a = 0;
            let b = 0;

            if ($("#navStates li.active").attr('id') == 'liMachine'){
                a = (stateObject['ACTIVE_TIME_H']) ? parseFloat(stateObject['ACTIVE_TIME_H'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 0;
                stateObject['ACTIVE_RATE'].value = ((b==0 ? 0 : a/b)*100).toFixed(4);

                a = (stateObject['WORKING_NONACTIVE_TIME_H']) ? parseFloat(stateObject['WORKING_NONACTIVE_TIME_H'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 0;
                stateObject['WORKING_NONACTIVE_RATE'].value = ((b==0 ? 0 : a/b)*100).toFixed(4);

                a = (stateObject['FAULT_TIME_H']) ? parseFloat(stateObject['FAULT_TIME_H'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 0;
                stateObject['FAULT_RATE'].value = ((b==0 ? 0 : a/b)*100).toFixed(4);

                a = (stateObject['ALARM_TIME_H']) ? parseFloat(stateObject['ALARM_TIME_H'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 0;
                stateObject['ALARM_RATE'].value = ((b==0 ? 0 : a/b)*100).toFixed(4);
            };

            if ($("#navStates li.active").attr('id') == 'liProduction'){
                a = (stateObject['BYPASSED_PRODUCT']) ? parseFloat(stateObject['BYPASSED_PRODUCT'].value) : 0;
                b = (stateObject['TOTAL_PRODUCT'] && parseFloat(stateObject['TOTAL_PRODUCT'].value)>0) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 0;
                stateObject['BYPASSED_PRODUCT_RATE'].value = ((b==0 ? 0 : a/b)*100).toFixed(4);

                a = (stateObject['TOTAL_PRODUCT']) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 0;
                stateObject['UPH'].value = ((b==0 ? 0 : a/b)*100).toFixed(4);

                a = (stateObject['OK_PRODUCT']) ? parseFloat(stateObject['OK_PRODUCT'].value) : 0;
                b = (stateObject['TOTAL_PRODUCT'] && parseFloat(stateObject['TOTAL_PRODUCT'].value)>0) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 0;
                stateObject['OK_PRODUCT_RATE'].value = ((b==0 ? 0 : a/b)*100).toFixed(4);

                a = (stateObject['NG_PRODUCT']) ? parseFloat(stateObject['NG_PRODUCT'].value) : 0;
                b = (stateObject['TOTAL_PRODUCT'] && parseFloat(stateObject['TOTAL_PRODUCT'].value)>0) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 0;
                stateObject['NG_PRODUCT_RATE'].value = ((b==0 ? 0 : a/b)*100).toFixed(4);

                a = (stateObject['DEFECTIVE_PRODUCT']) ? parseFloat(stateObject['DEFECTIVE_PRODUCT'].value) : 0;
                b = (stateObject['TOTAL_PRODUCT'] && parseFloat(stateObject['TOTAL_PRODUCT'].value)>0) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 0;
                stateObject['DEFECTIVE_PRODUCT_RATE'].value = ((b==0 ? 0 : a/b)*100).toFixed(4);
            };


            Object.keys(selectedStates).forEach(function(state){
                if ($j(`#chb_${state}`).is(':checked')){
                    if (stateObject[state]){
                        calculatedStates.push(stateObject[state]);
                    }
                }
            });
            calculatedValues.push(calculatedStates);
        });
        calculatedData.push({
            label: xAxis.label,
            values: calculatedValues
        });
    });


    //console.log(calculatedData);

    const barData = {
        more: {
            lineLabel: lineLabel,
            machineLabel: machineLabel
        },
        xAxis: xAxisName,
        yAxis: yAxisName,
        labels: xAxisLabels,
        data: calculatedData
    }
    console.log(barData);

    var ddwv = new DDWV("chartContainer");
    ddwv.setBarLabelIsEnabled(false);
    ddwv.setBarLabelIsVisible(false);
    ddwv.setTotalYAxisEnabled(true);
    ddwv.setTotalXAxisEnabled(true);
    ddwv.setAverageIsShown(true);
    ddwv.setXAxisLabelSize(30);
    ddwv.setYAxisLabelSize(30);
    ddwv.setBarLabelSize(30);
    ddwv.setScaleLabelSize(30);
    ddwv.setGridHelperType(false);
    ddwv.setEndOfGridHelperIsEnabled(false);
    //Setting bar label color. Default color is green("#00ff00")
    ddwv.setBarLabelColor("#000000");
    //chartsCGAC.setLoading("/images/loading.svg");
    ddwv.barChart(barData);

}
function setStartDate(date){
    selectStartYear.val(new Date(date).getFullYear().toString()).change();
    selectStartMonth.val((new Date(date).getMonth() + 1).toString()).change();
    selectStartDay.empty();
    for (let i=1; i<=getDays(new Date(date).getFullYear(), new Date(date).getMonth() + 1); i++){
        selectStartDay.append(`<option value="${i}">${i}</option>`);
    }
    selectStartDay.val((new Date(date).getDate()).toString()).change();
}
function getStartDate(){
    let date = "";
    date = (`0000${selectStartYear.val()}`).slice(-4);
    date += '-';
    date += (`00${selectStartMonth.val()}`).slice(-2);
    date += '-';
    date += (`00${selectStartDay.val()}`).slice(-2);
    return date;
}
function setEndDate(date){
    selectEndYear.val(new Date(date).getFullYear().toString()).change();
    selectEndMonth.val((new Date(date).getMonth() + 1).toString()).change();
    selectEndDay.empty();
    for (let i=1; i<=getDays(new Date(date).getFullYear(), new Date(date).getMonth() + 1); i++){
        selectEndDay.append(`<option value="${i}">${i}</option>`);
    }
    selectEndDay.val((new Date(date).getDate()).toString()).change();
}
function getEndDate(){
    let date = "";
    date = (`0000${selectEndYear.val()}`).slice(-4);
    date += '-';
    date += (`00${selectEndMonth.val()}`).slice(-2);
    date += '-';
    date += (`00${selectEndDay.val()}`).slice(-2);
    return date;
}
function sendRequest(){
    let startDate = getStartDate();
    let endDate = getEndDate();
    let lineLabel = selectLine.children(':selected').text();
    let machineLabel = selectMachine.children(':selected').text();
    let xAxis = selectXAxis.val();
    let yAxis = selectYAxis.val();

    console.log('lineLabel: ', lineLabel);
    console.log('machineLabel: ', machineLabel);
    console.log('startDate: ', startDate);
    console.log('endDate: ', endDate);
    console.log('xAxis: ', xAxis);
    console.log('yAxis: ', yAxis);

    getAnalysisData(xAxis, yAxis, lineLabel, machineLabel, startDate);
}

function getAnalysisData(xAxis, yAxis, lineLabel, machineLabel){

    const line = (lineLabel == 'All') ? "ALL" : lineLabel;
    const machine = (machineLabel == 'All') ? "ALL" : machinesName[machineLabel];

    let url = '/';
    let savedData = {};
    let currentNav = 'liMachine';
    if ($("#navStates li.active").attr('id') == 'liMachine'){
        currentNav = 'liMachine';
        savedData = savedDataMachine;
        url = `http://113.198.137.142:8080/v1/api/fukoku/machine-analysis-api?line=${line}&machine=${machine}&start_date=${new Date(startDateOfDatabase).toISOString(0,10)}&end_date=${new Date().toISOString(0,10)}`;
    };

    if ($("#navStates li.active").attr('id') == 'liProduction'){
        currentNav = 'liProduction';
        savedData = savedDataProduction;
        url = `http://113.198.137.142:8080/v1/api/fukoku/production-analysis-api?line=${line}&machine=${machine}&start_date=${new Date(startDateOfDatabase).toISOString(0,10)}&end_date=${new Date().toISOString(0,10)}`;
    };

    if (savedData != null && savedData.date != null && (new Date() - savedData.date) < 4*3600*1000){
        drawChart(xAxis, yAxis, lineLabel, machineLabel, savedData.DATA);
        console.log('data was loaded');
    } else {

        $('#btnSendRequest').prop('disabled', true);
        openLoading();
        $.ajax({
            headers: {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin':'*'
            },
            type: 'GET',
            crossDomain: true,
            url: url,
            success: function(jsonData){
                switch(jsonData.CODE){
                    case "7777":
                        if (currentNav == 'liMachine'){
                            savedDataMachine = {
                                date: new Date(),
                                DATA: jsonData.DATA
                            };
                        };
                        if (currentNav == 'liProduction'){
                            savedDataProduction = {
                                date: new Date(),
                                DATA: jsonData.DATA
                            };
                        };
                        console.log('data was saved');
                        drawChart(xAxis, yAxis, lineLabel, machineLabel, jsonData.DATA);
                        break;
                    default:
                        console.log("Result has been not found!");
                        break;
                }
                closeLoading();
                $('#btnSendRequest').prop('disabled', false);
            }
        });
    }
}

async function getAllLineNames(){
    const lines = [];
    await $.ajax({
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin':'*'
        },
        type: 'GET',
        crossDomain: true,
        url: `http://113.198.137.142:8080/v1/api/fukoku/line?page=1&limit=15`,
        success: function(jsonData){
            jsonData.DATA.forEach(function(data){
                lines.push(data.LINE_NAME);
            })
        }
    });
    currentLines = lines;
    return lines;
}

async function getMachinesByLineName(line){
    const machines = [];
    await $.ajax({
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin':'*'
        },
        type: 'GET',
        crossDomain: true,
        url: `http://113.198.137.142:8080/v1/api/fukoku/machine/select-box?lineName=${line}`,
        success: function(jsonData){
            machinesName = new Object();
            jsonData.DATA.forEach(function(data) {
                machinesName[data.MACHINE_NAME] = data.MAPPING_NAME;
                machines.push(data.MACHINE_NAME);
            })
        }
    });
    currentMachines = machines;
    return machines;
}

async function getAllMachineNames(){
    const machines = [];
    await $.ajax({
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin':'*'
        },
        type: 'GET',
        crossDomain: true,
        url: `http://113.198.137.142:8080/v1/api/fukoku/machine/all/select-box`,
        success: function(jsonData){
            machinesName = new Object();
            jsonData.DATA.forEach(function(data) {
                machinesName[data.MACHINE_NAME] = data.MAPPING_NAME;
                machines.push(data.MACHINE_NAME);
            });
        }
    });
    currentMachines = machines;
    return machines;
}

function boxWasClicked(fullBarLabels){

    if (fullBarLabels.type != 'simple') return;

    $('.back-btn').css('display', 'flex');

    let actions = [];
    if ($("#navStates li.active").attr('id') == 'liMachine'){
        actions = machineActions;
    }
    if ($("#navStates li.active").attr('id') == 'liProduction'){
        actions = productionActions;
    };

    if (actions.length > 0){
        let previousStartDate = new Date(actions[actions.length - 1].startDate.split('|')[0]);
        let previousEndDate = new Date(actions[actions.length - 1].endDate.split('|')[0]);
        if (previousEndDate - previousStartDate <= 86400000) return;

        let interval = actions[actions.length - 1].interval;
        if (actions[actions.length - 1].xAxis == 'line' && actions[actions.length - 1].yAxis == 'date'){

            let startDate = new Date(fullBarLabels.yAxis.split('|')[0]);
            let endDate = new Date(startDate);
            switch(interval){
                case 'year':
                    endDate.setFullYear(endDate.getFullYear() + 1);
                    break;
                case 'month':
                    endDate.setMonth(endDate.getMonth() + 1);
                    break;
                case 'day':
                    endDate.setDate(endDate.getDate() + 1);
                    break;
            }
            endDate.setHours(endDate.getHours() - 10);
            if (endDate > new Date()){
                endDate = new Date();
            }
            setEndDate(endDate.toISOString().slice(0,10));
            setStartDate(startDate.toISOString().slice(0,10));

            getAnalysisData('line', 'machine', 'All', 'All');
            return;
        }
        if (actions[actions.length - 1].xAxis == 'date' && actions[actions.length - 1].yAxis == 'line'){
            let startDate = new Date(fullBarLabels.xAxis.split('|')[0]);
            let endDate = new Date(startDate);
            switch(interval){
                case 'year':
                    endDate.setFullYear(endDate.getFullYear() + 1);
                    break;
                case 'month':
                    endDate.setMonth(endDate.getMonth() + 1);
                    break;
                case 'day':
                    endDate.setDate(endDate.getDate() + 1);
                    break;
            }
            endDate.setHours(endDate.getHours() - 10);
            if (endDate > new Date()){
                endDate = new Date();
            }
            setEndDate(endDate.toISOString().slice(0,10));
            setStartDate(startDate.toISOString().slice(0,10));

            getAnalysisData('machine', 'line', 'All', 'All');
            return;
        }

        if (actions[actions.length - 1].xAxis == 'line' && actions[actions.length - 1].yAxis == 'machine'){
            getAnalysisData('machine', 'date', fullBarLabels.xAxis, 'All');
            return;
        }
        if (actions[actions.length - 1].xAxis == 'machine' && actions[actions.length - 1].yAxis == 'line'){
            getAnalysisData('date', 'machine', fullBarLabels.yAxis, 'All');
            return;
        }

        if (actions[actions.length - 1].xAxis == 'machine' && actions[actions.length - 1].yAxis == 'date'){
            let startDate = new Date(fullBarLabels.yAxis.split('|')[0]);
            let endDate = new Date(startDate);
            switch(interval){
                case 'year':
                    endDate.setFullYear(endDate.getFullYear() + 1);
                    break;
                case 'month':
                    endDate.setMonth(endDate.getMonth() + 1);
                    break;
                case 'day':
                    endDate.setDate(endDate.getDate() + 1);
                    break;
            }
            endDate.setHours(endDate.getHours() - 10);
            if (endDate > new Date()){
                endDate = new Date();
            }
            setEndDate(endDate.toISOString().slice(0,10));
            setStartDate(startDate.toISOString().slice(0,10));
            getAnalysisData('machine', 'date', actions[actions.length - 1].lineLabel, 'All');
            return;
        }

        if (actions[actions.length - 1].xAxis == 'date' && actions[actions.length - 1].yAxis == 'machine'){
            let startDate = new Date(fullBarLabels.xAxis.split('|')[0]);
            let endDate = new Date(startDate);
            switch(interval){
                case 'year':
                    endDate.setFullYear(endDate.getFullYear() + 1);
                    break;
                case 'month':
                    endDate.setMonth(endDate.getMonth() + 1);
                    break;
                case 'day':
                    endDate.setDate(endDate.getDate() + 1);
                    break;
            }
            endDate.setHours(endDate.getHours() - 10);
            if (endDate > new Date()){
                endDate = new Date();
            }
            setEndDate(endDate.toISOString().slice(0,10));
            setStartDate(startDate.toISOString().slice(0,10));

            getAnalysisData('date', 'machine', actions[actions.length - 1].lineLabel, 'All');
            return;
        }
    };

}

function backButtonOnClicked(){

    if ($("#navStates li.active").attr('id') == 'liMachine'){
        machineActions.pop();
        if (machineActions.length > 0){
            let previousMachineAction = machineActions[machineActions.length - 1];
            machineActions.pop();
            if (machineActions.length == 0){
                $('.back-btn').css('display', 'none');
            }
            setStartDate(previousMachineAction.startDate);
            setEndDate(previousMachineAction.endDate);
            getAnalysisData(previousMachineAction.xAxis,
                previousMachineAction.yAxis,
                previousMachineAction.lineLabel,
                previousMachineAction.machineLabel,
                previousMachineAction.startDate)
        }
    };

    if ($("#navStates li.active").attr('id') == 'liProduction'){
        productionActions.pop();
        if (productionActions.length > 0){
            let previousProductionAction = productionActions[productionActions.length - 1];
            productionActions.pop();
            if (productionActions.length == 0){
                $('.back-btn').css('display', 'none');
            }
            setStartDate(previousProductionAction.startDate);
            setEndDate(previousProductionAction.endDate);
            getAnalysisData(previousProductionAction.xAxis,
                previousProductionAction.yAxis,
                previousProductionAction.lineLabel,
                previousProductionAction.machineLabel,
                previousProductionAction.startDate)
        }
    };

}

//init2DGraphScreen: Initialization of info screen
//==============================================================================================//
function init2DGraphScreen(){
    if (!document.getElementById('chartContainer').querySelector("[id='graph'")){
        let graph = document.createElement("div");
        graph.setAttribute("id", "graph");
        graph.style.display = "none";
        graph.style.position = "absolute";
        graph.style.bottom = "0";
        graph.style.left = "0";
        graph.style.width = "100%";
        graph.style.height = "300px";
        graph.style.backgroundColor = "rgba(255,255,255,0.95)";
        let close = document.createElement("img");
        close.setAttribute('src', '/static/admin/integrated_visualization/images/close.svg');
        close.setAttribute('width', '20px');
        close.setAttribute('height', '20px');
        close.setAttribute('alt', 'close button');
        close.setAttribute('onclick', 'close2DGraphScreen()');
        close.style.display = "flex";
        close.style.position = "absolute";
        close.style.top = "10px";
        close.style.right = "10px";
        graph.appendChild(close);
        document.getElementById('chartContainer').appendChild(graph);
    } else {
        show2DGraphScreen(true);
    }
}

function close2DGraphScreen(){
    show2DGraphScreen(false);
}

//setTextToInfoScreen: setting text to info screen
//=================================================================================================//
// function setTextToInfoScreen(message){;
//     let inner = "";
//     Object.keys(message).forEach(function(key){
//         let m = message[key];
//         if (message[key].includes('-') && message[key].includes('|')){
//             m = message[key].split('|')[1];
//         }
//         inner += `<b>${key}:</b> ${m}<br>`;
//     });
//     document.getElementById("infoMessage").innerHTML = inner;
// }

//show2DGraphScreen: controlling visibility of 2D graph screen
//=================================================================================================//
function show2DGraphScreen(isVisible){
    if (isVisible){
        $('#graph').slideDown('slow');
        //document.getElementById("graph").style.display = "flex";
    } else {
        $('#graph').slideUp('slow');
        //document.getElementById("graph").style.display = "none";
    }
}



function draw2DGraph(interval) {
    var stringGraphData = $("ul.context-menu-ddwv__items").attr("data-item");
    var graphData = JSON.parse(decodeURIComponent(stringGraphData));
    console.log(graphData);

    let savedData = {};
    let states = machineStates;

    if ($("#navStates li.active").attr('id') == 'liMachine'){
        savedData = savedDataMachine;
        states = machineStates;
    }
    if ($("#navStates li.active").attr('id') == 'liProduction'){
        savedData = savedDataProduction;
        states = productionStates;
    };


    let state;
    Object.keys(states).forEach(function(key){
        if (states[key].label == graphData.state){
            state = key;
        }
    });

    let values = new Object();
    let workingTime = new Object();
    let totalProduct = new Object();

    let startDate = new Date(getStartDate());
    let endDate = new Date(getEndDate());
    let date = new Date(startDate);

    while (endDate >= date){
        values[date.toISOString().slice(0,10)] = 0;
        workingTime[date.toISOString().slice(0,10)] = 0;
        totalProduct[date.toISOString().slice(0,10)] = 0;
        if (interval == 'week'){
            date.setDate(date.getDate()+7);
        } else {
            date.setDate(date.getDate()+1);
        }

    }
    if (savedData == null || savedData.DATA == null) return;
    savedData.DATA.forEach(function(data){
        if ( (data.LINE == graphData.line || graphData.line == 'All') && (data.MACHINE.includes(machinesName[graphData.machine]) || graphData.machine == 'All') && (new Date(data.WORK_DATE) >= startDate) && (new Date(data.WORK_DATE) <= endDate)){
            if (state == 'THEORETICAL_CYCLE_TIME_S' || state == 'PROCESS_CYCLE_TIME_S'){
                if (values[data.WORK_DATE] < parseFloat(data[state])){
                    values[data.WORK_DATE] = parseFloat(data[state]);
                }
            } else {
                switch (state){
                    case 'ACTIVE_RATE':
                        values[data.WORK_DATE] += parseFloat(data['ACTIVE_TIME_H']);
                        break;
                    case 'WORKING_NONACTIVE_RATE':
                        values[data.WORK_DATE] += parseFloat(data['WORKING_NONACTIVE_TIME_H']);
                        break;
                    case 'FAULT_RATE':
                        values[data.WORK_DATE] += parseFloat(data['FAULT_TIME_H']);
                        break;
                    case 'ALARM_RATE':
                        values[data.WORK_DATE] += parseFloat(data['ALARM_TIME_H']);
                        break;
                    case 'BYPASSED_PRODUCT_RATE':
                        values[data.WORK_DATE] += parseFloat(data['BYPASSED_PRODUCT']);
                        break;
                    case 'UPH':
                        values[data.WORK_DATE] += parseFloat(data['TOTAL_PRODUCT']);
                        break;
                    case 'OK_PRODUCT_RATE':
                        values[data.WORK_DATE] += parseFloat(data['OK_PRODUCT']);
                        break;
                    case 'NG_PRODUCT_RATE':
                        values[data.WORK_DATE] += parseFloat(data['NG_PRODUCT']);
                        break;
                    case 'DEFECTIVE_PRODUCT_RATE':
                        values[data.WORK_DATE] += parseFloat(data['DEFECTIVE_PRODUCT']);
                        break;
                    default:
                        values[data.WORK_DATE] += parseFloat(data[state]);
                        break;
                }
            }
            if (data.WORKING_TIME_H){
                workingTime[data.WORK_DATE] += data.WORKING_TIME_H;
            }
            if (data.TOTAL_PRODUCT){
                totalProduct[data.WORK_DATE] += data.TOTAL_PRODUCT;
            }
        }
    });

    let calculatedValues = values;
    if (state == 'ACTIVE_RATE' || state == 'WORKING_NONACTIVE_RATE' || state == 'FAULT_RATE' || state == 'ALARM_RATE' || state == 'UPH'){
        Object.keys(values).forEach(function(key){
            calculatedValues[key] = 100 * (workingTime[key] == 0 ? 0 : values[key]/workingTime[key]);
        });
    }

    if (state == 'BYPASSED_PRODUCT_RATE' || state == 'OK_PRODUCT_RATE' || state == 'NG_PRODUCT_RATE' || state == 'DEFECTIVE_PRODUCT_RATE'){
        Object.keys(values).forEach(function(key){
            calculatedValues[key] = 100 * (totalProduct[key] == 0 ? 0 : values[key]/totalProduct[key]);
        });
    }

    let maxValue = 0;
    let data = [];
    Object.keys(calculatedValues).forEach(function(key){
        if (calculatedValues[key] > maxValue){
            maxValue = calculatedValues[key];
        }
        data.push({
            date: new Date(key),
            value: +calculatedValues[key]
        });
    });

    init2DGraphScreen();
    show2DGraphScreen(true);
    // 2. Use the margin convention practice
    var margin = {top: 30, right: 30, bottom: 30, left: 50}
        , width = $('#graph').width() - margin.left - margin.right // Use the window's width
        , height = 300 - margin.top - margin.bottom; // Use the window's height

    // The number of datapoints
    var n = 21;

    // 5. X scale will use the index of our data
    var xScale = d3.scaleTime()
        .domain(d3.extent(data, function(d) {return d.date})) // input
        .rangeRound([0, width]); // output

    // 6. Y scale will use the randomly generate number
    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) {return d.value})) // input
        .rangeRound([height, 0]); // output

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d) { return xScale(d.date); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.value); }) // set the y values for the line generator
    //.curve(d3.curveMonotoneX) // apply smoothing to the line



    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    //var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })



    if (document.getElementById('graph').querySelector("[id='d3SVG'")){
        $('#d3SVG').remove();
    }

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("#graph").append("svg:svg")
        .attr('id', 'd3SVG')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)) // Create an axis component with d3.axisBottom
        .select(".domain")
        .remove();

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)) // Create an axis component with d3.axisLeft
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(graphData.state);
    // 9. Append the path, bind the data, and call the line generator

    let color = "#ff0000";
    if (states[state] != null && states[state].color != null){
        color = states[state].color;
    }
    svg.append("path")
        .datum(data) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .style("stroke", color)
        .attr("d", line); // 11. Calls the line generator

    // 12. Appends a circle for each datapoint
    // svg.selectAll(".dot")
    // .data(data)
    // .enter().append("circle") // Uses the enter().append() method
    // .attr("class", "dot") // Assign a class for styling
    // .attr("cx", function(d, i) { return xScale(i) })
    // .attr("cy", function(d) { return yScale(d.y) })
    // .attr("r", 5)
    //     .on("mouseover", function(a, b, c) {
    //             console.log(a)
    //     //this.attr('class', 'focus')
    //     })
    //     .on("mouseout", function() {  })

}

$j(document).ready(async function(){

    selectCompany = $j(`#selectCompany`);

    selectLine = $j(`#selectLine`);
    selectMachine = $j(`#selectMachine`);

    selectStartYear = $j(`#selectStartYear`);
    selectStartMonth = $j(`#selectStartMonth`);
    selectStartDay = $j(`#selectStartDay`);

    selectEndYear = $j(`#selectEndYear`);
    selectEndMonth = $j(`#selectEndMonth`);
    selectEndDay = $j(`#selectEndDay`);

    selectXAxis = $j(`#selectXAxis`);
    selectYAxis = $j(`#selectYAxis`);

    chipsCompany = $j(`#company`);
    chipsLine = $j(`#line`);
    chipsMachine = $j(`#machine`);
    chipsStart = $j(`#startDate`);
    chipsEnd = $j(`#endDate`);

    selectLine.change(async function(){
        const line = selectLine.children("option:selected").text();
        const machines = (line != "All") ? await getMachinesByLineName(line) : await getAllMachineNames();
        setMachines(machines);
    });

    selectStartYear.change(function(){
        let startDate = new Date(startDateOfDatabase);
        selectStartMonth.val((startDate.getMonth() + 1).toString()).change();
        selectStartDay.val(startDate.getDate().toString()).change();
    });

    selectStartMonth.change(function(){
        let year = parseInt(selectStartYear.val());
        let month = parseInt(selectStartMonth.val());

        selectStartDay.empty();
        for (let i=1; i<=getDays(year, month); i++){
            selectStartDay.append(`<option value="${i}">${i}</option>`);
        }
    });

    selectEndYear.change(function(){
        let endDate = new Date();
        selectEndMonth.val((endDate.getMonth() + 1).toString()).change();
        selectEndDay.val(endDate.getDate().toString()).change();
    });

    selectEndMonth.change(function(){
        let year = parseInt(selectEndYear.val());
        let month = parseInt(selectEndMonth.val());

        selectEndDay.empty();
        for (let i=1; i<=getDays(year, month); i++){
            selectEndDay.append(`<option value="${i}">${i}</option>`);
        }
    });

    selectXAxis.change(function(){
        if (selectXAxis.val() == 'line'){
            selectYAxis.children(`[value="line"]`).prop("disabled", true);
            selectYAxis.children(`[value="machine"]`).prop("disabled", false);
            selectYAxis.children(`[value="date"]`).prop("disabled", false).prop("selected", true);
        }
        if (selectXAxis.val() == 'machine'){
            selectYAxis.children(`[value="line"]`).prop("disabled", false);
            selectYAxis.children(`[value="machine"]`).prop("disabled", true);
            selectYAxis.children(`[value="date"]`).prop("disabled", false).prop("selected", true);
        }
        if (selectXAxis.val() == 'date'){
            selectYAxis.children(`[value="line"]`).prop("disabled", false).prop("selected", true);
            selectYAxis.children(`[value="machine"]`).prop("disabled", false);
            selectYAxis.children(`[value="date"]`).prop("disabled", true);
        }
    });

    setStates();
    let windowHeight = $(window).height();
    let topOffset = $j('#mainChartContainer').offset().top;
    $('#mainChartContainer').css(`height`, `${windowHeight - topOffset - 10}px`);

    const lines = await getAllLineNames();
    if (lines.length < 1) return;
    setLines(lines);
    const machines = await getAllMachineNames()
    setMachines(machines);
    setCompany();
    setDate();
    sendRequest();


    $j("#liDayly").on('click', function(){
        draw2DGraph('day');
    });


    $j("#liWeekly").on('click', function(){
        draw2DGraph('week');
    });

    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
        let windowHeight = $(window).height();
        let topOffset = $j('#mainChartContainer').offset().top;
        $('#mainChartContainer').css(`height`, `${windowHeight - topOffset - 10}px`);
    }

});

