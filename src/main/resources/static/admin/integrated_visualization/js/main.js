const startDateOfDatabase = "2018-01-01";
const companies = ['보령 댐퍼 공장', '보령 러버 공장'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', "Jun", 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
let currentLines = [];
let currentMachines = [];
let machinesName = new Object();
let states = new Object();

let selectCompany = $j(`#selectCompany`);

//xAxis
let selectXAxisLine = $j(`#selectHorizontalLine`);
let selectXAxisMachine = $j(`#selectHorizontalMachine`);
let selectXAxisYear = $j(`#selectHorizontalYear`);
let selectXAxisMonth = $j(`#selectHorizontalMonth`);
let selectXAxisDay = $j(`#selectHorizontalDay`);
let rbXAxisLine = $j(`#rbHorizontalLine`);
let rbXAxisMachine = $j(`#rbHorizontalMachine`);
let rbXAxisDate = $j(`#rbHorizontalDate`);
let rblXAxisLine = $j(`#rblHorizontalLine`);
let rblXAxisMachine = $j(`#rblHorizontalMachine`);
let rblXAxisDate = $j(`#rblHorizontalDate`);

//yAxis
let selectYAxisLine = $j(`#selectVerticalLine`);
let selectYAxisMachine = $j(`#selectVerticalMachine`);
let selectYAxisYear = $j(`#selectVerticalYear`);
let selectYAxisMonth = $j(`#selectVerticalMonth`);
let selectYAxisDay = $j(`#selectVerticalDay`);
let rbYAxisLine = $j(`#rbVerticalLine`);
let rbYAxisMachine = $j(`#rbVerticalMachine`);
let rbYAxisDate = $j(`#rbVerticalDate`);
let rblYAxisLine = $j(`#rblVerticalLine`);
let rblYAxisMachine = $j(`#rblVerticalMachine`);
let rblYAxisDate = $j(`#rblVerticalDate`);

let chipsCompany = $j(`#company`);
let chipsLine = $j(`#line`);
let chipsMachine = $j(`#machine`);
let chipsYear = $j(`#year`);
let chipsMonth = $j(`#month`);



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
    //xAxis
    selectXAxisLine.append(`<option value="all" selected>All</option>`);
    lines.forEach(function(line, index){
        selectXAxisLine.append(`<option value="${index + 1}">${line}</option>`);
    });

    //yAxis
    selectYAxisLine.append(`<option value="all" selected>All</option>`);
    lines.forEach(function(line, index){
        selectYAxisLine.append(`<option value="${index + 1}">${line}</option>`);
    });
}


function setMachines(machines){
    currentMachines = machines;
    //xAxis
    selectXAxisMachine.empty();
    selectXAxisMachine.append(`<option value="all" selected>All</option>`);
    machines.forEach(function(machine, index){
        selectXAxisMachine.append(`<option value="${index + 1}">${machine}</option>`);
    });

    //yAxis
    selectYAxisMachine.empty();
    selectYAxisMachine.append(`<option value="all" selected>All</option>`);
    machines.forEach(function(machine, index){
        selectYAxisMachine.append(`<option value="${index + 1}">${machine}</option>`);
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
    selectXAxisYear.append(`<option value="all" selected>All</option>`);
    selectYAxisYear.append(`<option value="all" selected>All</option>`);
    for (let year=new Date().getFullYear(); year>=startDate.getFullYear(); year--){
        selectXAxisYear.append(`<option value="${year}">${year}</option>`);
        selectYAxisYear.append(`<option value="${year}">${year}</option>`);
    }
    selectXAxisMonth.append(`<option value="all" selected>All</option>`);
    selectYAxisMonth.append(`<option value="all" selected>All</option>`);
    months.forEach(function(month, index){
        selectXAxisMonth.append(`<option value="${index + 1}">${month}</option>`);
        selectYAxisMonth.append(`<option value="${index + 1}">${month}</option>`);
    });
    selectXAxisDay.append(`<option value="all" selected>All</option>`);
    selectYAxisDay.append(`<option value="all" selected>All</option>`);
};


//xAxis

function controlXAxisLine(isDisable){
    if (isDisable){
        rblXAxisLine.addClass('radio-button-label-disabled');
    } else {
        rblXAxisLine.removeClass('radio-button-label-disabled');
    }
    selectXAxisLine.prop('disabled', isDisable);
    selectXAxisLine.val('all').change;;
}

function controlXAxisMachine(isDisable){
    if (isDisable){
        rblXAxisMachine.addClass('radio-button-label-disabled');
    } else {
        rblXAxisMachine.removeClass('radio-button-label-disabled');
    }
    selectXAxisMachine.prop('disabled', isDisable);
    selectXAxisMachine.val('all').change;;
}

function controlXAxisDate(isDisable){
    if (isDisable){
        rblXAxisDate.addClass('radio-button-label-disabled');
    } else {
        rblXAxisDate.removeClass('radio-button-label-disabled');
    }
    selectXAxisYear.prop('disabled', isDisable);
    selectXAxisMonth.prop('disabled', isDisable || selectXAxisYear.val()=='all');
    selectXAxisDay.prop('disabled', isDisable || selectXAxisYear.val()=='all' || selectXAxisMonth.val()=='all');
    selectXAxisYear.val('all').change;
    selectXAxisMonth.val('all').change;
    selectXAxisDay.val('all').change;
}



function controlYAxisLine(isDisable){
    if (isDisable){
        rblYAxisLine.addClass('radio-button-label-disabled');
    } else {
        rblYAxisLine.removeClass('radio-button-label-disabled');
    }
    selectYAxisLine.prop('disabled', isDisable);
    selectYAxisLine.val('all').change;
}

function controlYAxisMachine(isDisable){
    if (isDisable){
        rblYAxisMachine.addClass('radio-button-label-disabled');
    } else {
        rblYAxisMachine.removeClass('radio-button-label-disabled');
    }
    selectYAxisMachine.prop('disabled', isDisable);
    selectYAxisMachine.val('all').change;
}

function controlYAxisDate(isDisable){
    if (isDisable){
        rblYAxisDate.addClass('radio-button-label-disabled');
    } else {
        rblYAxisDate.removeClass('radio-button-label-disabled');
    }
    selectYAxisYear.prop('disabled', isDisable);
    selectYAxisMonth.prop('disabled', isDisable || selectYAxisYear.val()=='all');
    selectYAxisDay.prop('disabled', isDisable || selectYAxisYear.val()=='all' || selectYAxisMonth.val()=='all');
    selectYAxisYear.val('all').change;
    selectYAxisMonth.val('all').change;
    selectYAxisDay.val('all').change;
}


async function drawChart(xAxis, yAxis, stringStartDate, interval, lineLabel, machineLabel, jsonData){

    let stringEndDate = $j('#txtEndDate').val();
    let startDate = new Date(stringStartDate);
    let endDate = new Date(stringEndDate);

    let values = new Object();


    //chipsCompany.text(selectCompany.children(':selected').text());
    chipsLine.text(lineLabel);
    chipsMachine.text(machineLabel);
    switch (interval){
        case 'year':
            chipsYear.text('All');
            chipsMonth.text('All');
            break;
        case 'month':
            chipsYear.text(startDate.getFullYear().toString());
            chipsMonth.text('All');
            break;
        case 'day':
            chipsYear.text(startDate.getFullYear().toString());
            chipsMonth.text(months[startDate.getMonth()]);
            break;
    }
    setStartDate(stringStartDate);

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
                console.log(values);

                console.log(key);
                machineValues = values[key];
                console.log(machineValues);

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

    console.log(data);

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

function sendRequest(){
    let endDate = $j('#txtEndDate').val();
    let lineLabel = 'All';
    let machineLabel = 'All';
    let startDate = new Date(startDateOfDatabase).toISOString().slice(0,10);
    let xAxis = `line`;
    let yAxis = `machine`;
    let year = (`0000${new Date(startDateOfDatabase).getFullYear()}`).slice(-4);
    let month = (`00${new Date(startDateOfDatabase).getMonth() + 1}`).slice(-2);
    let day = (`00${new Date(startDateOfDatabase).getDay()}`).slice(-2);

    if (rbXAxisLine.is(':checked')){
        lineLabel = selectXAxisLine.children(':selected').text();
        xAxis = `line`;
    }
    if (rbXAxisMachine.is(':checked')){
        machineLabel = selectXAxisMachine.children(':selected').text();
        xAxis = `machine`;
    }
    if (rbXAxisDate.is(':checked')){
        if (selectXAxisYear.children(':selected').text() != 'All') {
            year = (`0000${selectXAxisYear.children(':selected').text()}`).slice(-4);
            month = `01`;
            day = `01`;
        }
        if (selectXAxisMonth.children(':selected').text() != 'All') {
            month = (`00${selectXAxisMonth.children(':selected').val()}`).slice(-2);
        }
        if (selectXAxisDay.children(':selected').text() != 'All') {
            day = (`00${selectXAxisDay.children(':selected').text()}`).slice(-2);
        }
        startDate = `${year}-${month}-${day}`;
        xAxis = `date`;
    }

    if (rbYAxisLine.is(':checked')){
        lineLabel = selectYAxisLine.children(':selected').text();
        yAxis = `line`;
    }
    if (rbYAxisMachine.is(':checked')){
        machineLabel = selectYAxisMachine.children(':selected').text();
        yAxis = `machine`;
    }
    if (rbYAxisDate.is(':checked')){
        if (selectYAxisYear.children(':selected').text() != 'All') {
            year = (`0000${selectYAxisYear.children(':selected').text()}`).slice(-4);
            month = `01`;
            day = `01`;
        }
        if (selectYAxisMonth.children(':selected').text() != 'All') {
            month = (`00${selectYAxisMonth.children(':selected').val()}`).slice(-2);
        }
        if (selectYAxisDay.children(':selected').text() != 'All') {
            day = (`00${selectYAxisDay.children(':selected').text()}`).slice(-2);
        }
        startDate = `${year}-${month}-${day}`;
        yAxis = `date`;
    }

    console.log('lineLabel: ', lineLabel);
    console.log('machineLabel: ', machineLabel);
    console.log('startDate: ', startDate);
    console.log('endDate: ', endDate);
    console.log('xAxis: ', xAxis);
    console.log('yAxis: ', yAxis);

    getAnalysisData(xAxis, yAxis, lineLabel, machineLabel, startDate);
}

function getAnalysisData(xAxis, yAxis, lineLabel, machineLabel, stringStartDate){

    let stringEndDate = $j('#txtEndDate').val();
    const line = (lineLabel == 'All') ? "ALL" : lineLabel;
    const machine = (machineLabel == 'All') ? "ALL" : machinesName[machineLabel];

    let interval = 'year';
    let startDate = new Date(stringStartDate);
    let endDate = new Date(stringEndDate);
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
            startDate: stringStartDate,
            endDate: stringEndDate,
            interval: interval
        });
        url = `http://113.198.137.142:8080/v1/api/fukoku/machine-analysis-api?line=${line}&machine=${machine}&start_date=${stringStartDate}&end_date=${stringEndDate}`;
    };

    if ($("#navStates li.active").attr('id') == 'liProduction'){
        productionActions.push({
            xAxis: xAxis,
            yAxis: yAxis,
            lineLabel: lineLabel,
            machineLabel: machineLabel,
            startDate: stringStartDate,
            endDate: stringEndDate,
            interval: interval
        });
        url = `http://113.198.137.142:8080/v1/api/fukoku/production-analysis-api?line=${line}&machine=${machine}&start_date=${stringStartDate}&end_date=${stringEndDate}`;
    };

    console.log('lineLabel: ', lineLabel);
    console.log('machineLabel: ', machineLabel);
    console.log('startDate: ', stringStartDate);
    console.log('endDate: ', stringEndDate);
    console.log('xAxis: ', xAxis);
    console.log('yAxis: ', yAxis);


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
                    console.log(jsonData.DATA);

                    drawChart(xAxis, yAxis, stringStartDate, interval, lineLabel, machineLabel, jsonData.DATA);
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

    console.log(machineActions);

    console.log(`xAxis: ${fullBarLabels.xAxis}`);
    console.log(`yAxis: ${fullBarLabels.yAxis}`);

    $('.back-btn').css('display', 'flex');

    let actions = [];
    if ($("#navStates li.active").attr('id') == 'liMachine'){
        actions = machineActions;
    }
    if ($("#navStates li.active").attr('id') == 'liProduction'){
        actions = productionActions;
    };
    let currentEndDate = $j('#txtEndDate').val();

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
            if (endDate < new Date(currentEndDate)){
                $j('#txtEndDate').val(endDate.toISOString().slice(0,10))
            }
            getAnalysisData('line', 'machine', 'All', 'All', startDate.toISOString().slice(0,10));
            return;
        }
        if (actions[actions.length - 1].xAxis == 'date' && actions[actions.length - 1].yAxis == 'line'){
            let startDate = new Date(fullBarLabels.xAxis.split('|')[0]);
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
            if (endDate < new Date(currentEndDate)){
                $j('#txtEndDate').val(endDate.toISOString().slice(0,10))
            }
            getAnalysisData('machine', 'line', 'All', 'All', startDate.toISOString().slice(0,10));
            return;
        }

        if (actions[actions.length - 1].xAxis == 'line' && actions[actions.length - 1].yAxis == 'machine'){
            getAnalysisData('machine', 'date', fullBarLabels.xAxis, 'All', actions[actions.length - 1].startDate.split('|')[0]);
            return;
        }
        if (actions[actions.length - 1].xAxis == 'machine' && actions[actions.length - 1].yAxis == 'line'){
            getAnalysisData('date', 'machine', fullBarLabels.yAxis, 'All', actions[actions.length - 1].startDate.split('|')[0]);
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
            if (endDate < new Date(currentEndDate)){
                $j('#txtEndDate').val(endDate.toISOString().slice(0,10))
            }
            getAnalysisData('machine', 'date', actions[actions.length - 1].lineLabel, 'All', startDate.toISOString().slice(0,10));
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
            if (endDate < new Date(currentEndDate)){
                $j('#txtEndDate').val(endDate.toISOString().slice(0,10))
            }
            getAnalysisData('date', 'machine', actions[actions.length - 1].lineLabel, 'All', startDate.toISOString().slice(0,10));
            return;
        }
    };


}

function setStartDate(stringStartDate){
    console.log(stringStartDate);

    $j("#txtStartDate").val(stringStartDate);
    let startDate = new Date(stringStartDate);
    if (rbXAxisDate.is(':checked')){
        if (stringStartDate == startDateOfDatabase){
            selectXAxisYear.val('all').change();
        } else {
            if (startDate.getDate() == 1){
                selectXAxisYear.val(startDate.getFullYear().toString()).change();
                console.log((startDate.getMonth() + 1).toString());

                selectXAxisMonth.val((startDate.getMonth() + 1).toString()).change();
                selectXAxisDay.val('all').change();
            } else {
                console.log((startDate.getMonth() + 1).toString());
                selectXAxisYear.val(startDate.getFullYear().toString()).change();
                selectXAxisMonth.val((startDate.getMonth() + 1).toString()).change();
                selectXAxisDay.val(startDate.getDate().toString()).change();
            }
        }
    }
    if (rbYAxisDate.is(':checked')){
        if (stringStartDate == startDateOfDatabase){
            selectYAxisYear.val('all').change();
        } else {
            if (startDate.getMonth() == 0 && startDate.getDate() == 1){
                selectYAxisYear.val(startDate.getFullYear().toString()).change();
                selectYAxisMonth.val('all').change();
                selectYAxisDay.val('all').change();
            } else {
                if (startDate.getDate() == 1){
                    selectYAxisYear.val(startDate.getFullYear().toString()).change();
                    selectYAxisMonth.val((startDate.getMonth() + 1).toString()).change();
                    selectYAxisDay.val('all').change();
                } else {
                    selectYAxisYear.val(startDate.getFullYear().toString()).change();
                    selectYAxisMonth.val((startDate.getMonth() + 1).toString()).change();
                    selectYAxisDay.val(startDate.getDate().toString()).change();
                }
            }

        }
    }
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
            $j('#txtEndDate').val(previousMachineAction.endDate);
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
            $j('#txtEndDate').val(previousProductionAction.endDate);
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

    //xAxis
    selectXAxisLine = $j(`#selectHorizontalLine`);
    selectXAxisMachine = $j(`#selectHorizontalMachine`);
    selectXAxisYear = $j(`#selectHorizontalYear`);
    selectXAxisMonth = $j(`#selectHorizontalMonth`);
    selectXAxisDay = $j(`#selectHorizontalDay`);
    rbXAxisLine = $j(`#rbHorizontalLine`);
    rbXAxisMachine = $j(`#rbHorizontalMachine`);
    rbXAxisDate = $j(`#rbHorizontalDate`);
    rblXAxisLine = $j(`#rblHorizontalLine`);
    rblXAxisMachine = $j(`#rblHorizontalMachine`);
    rblXAxisDate = $j(`#rblHorizontalDate`);

    //yAxis
    selectYAxisLine = $j(`#selectVerticalLine`);
    selectYAxisMachine = $j(`#selectVerticalMachine`);
    selectYAxisYear = $j(`#selectVerticalYear`);
    selectYAxisMonth = $j(`#selectVerticalMonth`);
    selectYAxisDay = $j(`#selectVerticalDay`);
    rbYAxisLine = $j(`#rbVerticalLine`);
    rbYAxisMachine = $j(`#rbVerticalMachine`);
    rbYAxisDate = $j(`#rbVerticalDate`);
    rblYAxisLine = $j(`#rblVerticalLine`);
    rblYAxisMachine = $j(`#rblVerticalMachine`);
    rblYAxisDate = $j(`#rblVerticalDate`);

    chipsCompany = $j(`#company`);
    chipsLine = $j(`#line`);
    chipsMachine = $j(`#machine`);
    chipsYear = $j(`#year`);
    chipsMonth = $j(`#month`);


    rbXAxisLine.change(function(){
        controlXAxisLine(false);
        controlXAxisMachine(true);
        controlXAxisDate(true);

        rbYAxisLine.prop('disabled', true);
        rbYAxisMachine.prop('disabled', false);
        rbYAxisDate.prop('disabled', false);

        if (rbYAxisLine.is(':checked')){
            rbYAxisMachine.prop("checked", true);
            controlYAxisMachine(false);
            controlYAxisLine(true);
        }
        if (!rbXAxisLine.is('checked')){
            selectXAxisLine.change();
        }
    });
    rbXAxisMachine.change(function(){
        controlXAxisLine(true);
        controlXAxisMachine(false);
        controlXAxisDate(true);

        rbYAxisLine.prop('disabled', false);
        rbYAxisMachine.prop('disabled', true);
        rbYAxisDate.prop('disabled', false);

        if (rbYAxisMachine.is(':checked')){
            rbYAxisLine.prop("checked", true);
            controlYAxisLine(false);
            controlYAxisMachine(true);
        }
        if (!rbXAxisMachine.is('checked')){
            selectXAxisLine.change();
        }
    });
    rbXAxisDate.change(function(){
        controlXAxisLine(true);
        controlXAxisMachine(true);
        controlXAxisDate(false);

        rbYAxisLine.prop('disabled', false);
        rbYAxisMachine.prop('disabled', false);
        rbYAxisDate.prop('disabled', true);

        if (rbYAxisDate.is(':checked')){
            rbYAxisLine.prop("checked", true);
            controlYAxisLine(false);
            controlYAxisDate(true);
        }
        if (!rbXAxisDate.is('checked')){
            selectXAxisLine.change();
        }
    });

    selectXAxisLine.change(async function(){
        const line = selectXAxisLine.children("option:selected").text();
        const machines = (line != "All") ? await getMachinesByLineName(line) : await getAllMachineNames();
        setMachines(machines);
    });

    selectYAxisLine.change(async function(){
        const line = selectYAxisLine.children("option:selected").text();
        const machines = (line != "All") ? await getMachinesByLineName(line) : await getAllMachineNames();
        setMachines(machines);
    });

    selectXAxisYear.change(function(){
        selectXAxisMonth.prop('disabled', selectXAxisYear.val()=='all');
        selectXAxisMonth.val('all').change();
        selectXAxisDay.val('all').change();
    });

    selectXAxisMonth.change(function(){

        selectXAxisDay.empty();
        selectXAxisDay.append(`<option value="all" selected>All</option>`);

        if (selectXAxisMonth.val() == "all"){
            selectXAxisDay.prop('disabled', true);
        } else {
            selectXAxisDay.prop('disabled', false);
            if (selectXAxisMonth.val() == 2){
                if (selectXAxisYear.val()%4 == 0){
                    for (let day=1; day<=29; day++){
                        selectXAxisDay.append(`<option value="${day}">${day}</option>`);
                    }
                } else {
                    for (let day=1; day<=28; day++){
                        selectXAxisDay.append(`<option value="${day}">${day}</option>`);
                    }
                }
            } else {
                if (selectXAxisMonth.val() == 4 || selectXAxisMonth.val() == 6 || selectXAxisMonth.val() == 9 || selectXAxisDay.val() == 11){
                    for (let day=1; day<=30; day++){
                        selectXAxisDay.append(`<option value="${day}">${day}</option>`);
                    }
                } else {
                    for (let day=1; day<=31; day++){
                        selectXAxisDay.append(`<option value="${day}">${day}</option>`);
                    }
                }
            }
        }
    });


    //yAxis
    rbYAxisLine.change(function(){
        controlYAxisLine(false);
        controlYAxisMachine(true);
        controlYAxisDate(true);
        if (!rbYAxisLine.is('checked')){
            selectYAxisLine.change();
        }
    });
    rbYAxisMachine.change(function(){
        controlYAxisLine(true);
        controlYAxisMachine(false);
        controlYAxisDate(true);
        if (!rbYAxisMachine.is('checked')){
            selectYAxisLine.change();
        }
    });
    rbYAxisDate.change(function(){
        controlYAxisLine(true);
        controlYAxisMachine(true);
        controlYAxisDate(false);
        if (!rblYAxisDate.is('checked')){
            selectYAxisLine.change();
        }
    });

    selectYAxisYear.change(function(){
        selectYAxisMonth.prop('disabled', selectYAxisYear.val()=='all');
        selectYAxisMonth.val('all').change();
        selectYAxisDay.val('all').change();

    });

    selectYAxisMonth.change(function(){

        selectYAxisDay.empty();
        selectYAxisDay.append(`<option value="all" selected>All</option>`);

        if (selectYAxisMonth.val() == "all"){
            selectYAxisDay.prop('disabled', true);
        } else {
            selectYAxisDay.prop('disabled', false);
            if (selectYAxisMonth.val() == 2){
                if (selectYAxisYear.val()%4 == 0){
                    for (let day=1; day<=29; day++){
                        selectYAxisDay.append(`<option value="${day}">${day}</option>`);
                    }
                } else {
                    for (let day=1; day<=28; day++){
                        selectYAxisDay.append(`<option value="${day}">${day}</option>`);
                    }
                }
            } else {
                if (selectYAxisMonth.val() == 4 || selectYAxisMonth.val() == 6 || selectYAxisMonth.val() == 9 || selectYAxisDay.val() == 11){
                    for (let day=1; day<=30; day++){
                        selectYAxisDay.append(`<option value="${day}">${day}</option>`);
                    }
                } else {
                    for (let day=1; day<=31; day++){
                        selectYAxisDay.append(`<option value="${day}">${day}</option>`);
                    }
                }
            }
        }
    });


    const lines = await getAllLineNames();
    if (lines.length < 1) return;
    setLines(lines);
    const machines = await getAllMachineNames()
    setMachines(machines);
    setStates();
    setCompany();
    setDate();

    console.log('send data');
    $('#startDate').datetimepicker({
        format: 'YYYY-MM-DD',
        defaultDate: new Date(startDateOfDatabase),
        minDate: new Date(startDateOfDatabase),
        maxDate: new Date()
    }).on('dp.change', function(e){ setStartDate(e.date.toISOString().slice(0,10))})
    $('#endDate').datetimepicker({
        format: 'YYYY-MM-DD',
        defaultDate: new Date(),
        minDate: new Date(startDateOfDatabase),
        maxDate: new Date()
    });
    sendRequest();
});