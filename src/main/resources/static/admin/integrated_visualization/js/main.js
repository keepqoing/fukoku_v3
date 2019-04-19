const startDateOfDatabase = "2018-01-01";
const companies = ['보령 댐퍼 공장', '보령 러버 공장'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', "Jun", 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
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
    color: '#1E90FF',
    unit: 'H',
    isChecked: false
};
machineStates['ACTIVE_FREQ'] = {
    label: '가동횟수',
    color: '#1DB81D',
    unit: '개',
    isChecked: false
};
machineStates['WORKING_NONACTIVE_FREQ'] = {
    label: '부하비가동횟수',
    color: '#CCAA0C',
    unit: '개',
    isChecked: false
};
machineStates['FAULT_FREQ'] = {
    label: '고장횟수',
    color: '#E44A2E',
    unit: '개',
    isChecked: false
};
machineStates['ALARM_FREQ'] = {
    label: '알람횟수',
    color: '#0C7EED',
    unit: '개',
    isChecked: false
};
machineStates['ACTIVE_RATE'] = {
    label: '가동율',
    color: '#029D02',
    unit: '%',
    isChecked: false
};
machineStates['WORKING_NONACTIVE_RATE'] = {
    label: '부하비가동율',
    color: '#B29000',
    unit: '%',
    isChecked: false
};
machineStates['FAULT_RATE'] = {
    label: '고장율',
    color: '#CF3519',
    unit: '%',
    isChecked: false
};
machineStates['ALARM_RATE'] = {
    label: '알람율',
    color: '#0072E1',
    unit: '%',
    isChecked: false
};
machineStates['WORKING_TIME_H'] = {
    forCalculation: true
};


const productionStates = new Object();
productionStates['TOTAL_PRODUCT'] = {
    label: '생산수량',
    color: '#B34EE9',
    unit: '개',
    isChecked: true
};
productionStates['BYPASSED_PRODUCT'] = {
    label: '직행수량',
    color: '#1E90FF',
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
    color: '#BA55D3',
    unit: '개',
    isChecked: false
};
productionStates['BYPASSED_PRODUCT_RATE'] = {
    label: '직행율',
    color: '#0C7EED',
    unit: '%',
    isChecked: false
};
productionStates['OK_PRODUCT_RATE'] = {
    label: '양품율',
    color: '#1DB81D',
    unit: '%',
    isChecked: false
};
productionStates['NG_PRODUCT_RATE'] = {
    label: 'NG율',
    color: '#E44A2E',
    unit: '%',
    isChecked: false
};
productionStates['DEFECTIVE_PRODUCT_RATE'] = {
    label: '불량율',
    color: '#CCAA0C',
    unit: '%',
    isChecked: false
};
productionStates['TARGET_PRODUCT_QTY'] = {
    label: '목표수량',
    color: '#9370DB',
    unit: '개',
    isChecked: false
};
productionStates['UPH'] = {
    label: 'UPH',
    color: '#4169E1',
    unit: '개',
    isChecked: false
};
productionStates['THEORETICAL_CYCLE_TIME_S'] = {
    label: '이론사이클타임',
    color: '#008000',
    unit: '초',
    isChecked: false
};
productionStates['PROCESS_CYCLE_TIME_S'] = {
    label: '공정사이클타임',
    color: '#CD5C5C',
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


async function drawChart(xAxis, yAxis, interval, lineLabel, machineLabel, jsonData){

    let startDate = new Date(getStartDate());
    let endDate = new Date(getEndDate());

    let values = new Object();


    //chipsCompany.text(selectCompany.children(':selected').text());
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
            if (lines.includes(data.LINE) && Object.values(selectedMachineNames).includes(dataMachine)){
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
                        value: itemValues[itemLabel].toFixed(1),
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
                if (lines.includes(data.LINE) && Object.values(selectedMachineNames).includes(data.MACHINE.replace(data.LINE,'').replace('_',''))){
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
                        value: itemValues[itemLabel].toFixed(1),
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
                        value: itemValues[itemLabel].toFixed(1),
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
                        value: itemValues[itemLabel].toFixed(1),
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
                        value: itemValues[itemLabel].toFixed(1),
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
                        value: itemValues[itemLabel].toFixed(1),
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
            let b = 1;

            if ($("#navStates li.active").attr('id') == 'liMachine'){
                a = (stateObject['ACTIVE_TIME_H']) ? parseFloat(stateObject['ACTIVE_TIME_H'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 1;
                stateObject['ACTIVE_RATE'].value = ((a/b)*100).toFixed(1);

                a = (stateObject['WORKING_NONACTIVE_TIME_H']) ? parseFloat(stateObject['WORKING_NONACTIVE_TIME_H'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 1;
                stateObject['WORKING_NONACTIVE_RATE'].value = ((a/b)*100).toFixed(1);

                a = (stateObject['FAULT_TIME_H']) ? parseFloat(stateObject['FAULT_TIME_H'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 1;
                stateObject['FAULT_RATE'].value = ((a/b)*100).toFixed(1);

                a = (stateObject['ALARM_TIME_H']) ? parseFloat(stateObject['ALARM_TIME_H'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 1;
                stateObject['ALARM_RATE'].value = ((a/b)*100).toFixed(1);
            };

            if ($("#navStates li.active").attr('id') == 'liProduction'){
                a = (stateObject['BYPASSED_PRODUCT']) ? parseFloat(stateObject['BYPASSED_PRODUCT'].value) : 0;
                b = (stateObject['TOTAL_PRODUCT'] && parseFloat(stateObject['TOTAL_PRODUCT'].value)>0) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 1;
                stateObject['BYPASSED_PRODUCT_RATE'].value = ((a/b)*100).toFixed(1);

                a = (stateObject['TOTAL_PRODUCT']) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 0;
                b = (stateObject['WORKING_TIME_H'] && parseFloat(stateObject['WORKING_TIME_H'].value)>0) ? parseFloat(stateObject['WORKING_TIME_H'].value) : 1;
                stateObject['UPH'].value = ((a/b)*100).toFixed(1);

                a = (stateObject['OK_PRODUCT']) ? parseFloat(stateObject['OK_PRODUCT'].value) : 0;
                b = (stateObject['TOTAL_PRODUCT'] && parseFloat(stateObject['TOTAL_PRODUCT'].value)>0) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 1;
                stateObject['OK_PRODUCT_RATE'].value = ((a/b)*100).toFixed(1);

                a = (stateObject['NG_PRODUCT']) ? parseFloat(stateObject['NG_PRODUCT'].value) : 0;
                b = (stateObject['TOTAL_PRODUCT'] && parseFloat(stateObject['TOTAL_PRODUCT'].value)>0) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 1;
                stateObject['NG_PRODUCT_RATE'].value = ((a/b)*100).toFixed(1);

                a = (stateObject['DEFECTIVE_PRODUCT']) ? parseFloat(stateObject['DEFECTIVE_PRODUCT'].value) : 0;
                b = (stateObject['TOTAL_PRODUCT'] && parseFloat(stateObject['TOTAL_PRODUCT'].value)>0) ? parseFloat(stateObject['TOTAL_PRODUCT'].value) : 1;
                stateObject['DEFECTIVE_PRODUCT_RATE'].value = ((a/b)*100).toFixed(1);
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


    console.log(calculatedData);

    const barData = {
        xAxis: xAxisName,
        yAxis: yAxisName,
        labels: xAxisLabels,
        data: calculatedData
    }
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
    ddwv.setFont
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

    // console.log('lineLabel: ', lineLabel);
    // console.log('machineLabel: ', machineLabel);
    // console.log('startDate: ', startDate);
    // console.log('endDate: ', endDate);
    // console.log('xAxis: ', xAxis);
    // console.log('yAxis: ', yAxis);

    getAnalysisData(xAxis, yAxis, lineLabel, machineLabel, startDate);
}

function getAnalysisData(xAxis, yAxis, lineLabel, machineLabel){
    selectXAxis.val(xAxis);
    selectYAxis.val(yAxis);
    selectLine.val($(`#selectLine option:contains("${lineLabel}")`).val());
    selectMachine.val($(`#selectMachine option:contains("${machineLabel}")`).val());

    const line = (lineLabel == 'All') ? "ALL" : lineLabel;
    const machine = (machineLabel == 'All') ? "ALL" : machinesName[machineLabel];

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

    let url = '/';
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
        url = `http://113.198.137.142:8080/v1/api/fukoku/machine-analysis-api?line=${line}&machine=${machine}&start_date=${getStartDate()}&end_date=${getEndDate()}`;
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
        url = `http://113.198.137.142:8080/v1/api/fukoku/production-analysis-api?line=${line}&machine=${machine}&start_date=${getStartDate()}&end_date=${getEndDate()}`;
    };

    // console.log('lineLabel: ', lineLabel);
    // console.log('machineLabel: ', machineLabel);
    // console.log('startDate: ', getStartDate());
    // console.log('endDate: ', getEndDate());
    // console.log('xAxis: ', xAxis);
    // console.log('yAxis: ', yAxis);


    $('#btnSendRequest').prop('disabled', true);
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
                    drawChart(xAxis, yAxis, interval, lineLabel, machineLabel, jsonData.DATA);
                    break;
                default:
                    console.log("Result has been not found!");
                    break;
            }
            $('#btnSendRequest').prop('disabled', false);
        }
    });
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

    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
        let windowHeight = $(window).height();
        let topOffset = $j('#mainChartContainer').offset().top;
        $('#mainChartContainer').css(`height`, `${windowHeight - topOffset - 10}px`);
    }
});

