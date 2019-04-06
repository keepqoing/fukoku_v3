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
let chipsStart = $j(`#start`);
let chipsEnd = $j(`#end`);



const equipmentStates = new Object();
equipmentStates['ACTIVE_TIME_H'] = {
    label: '부하시간',
    color: '#32CD32',
    unit: 'H',
    isChecked: true
};
equipmentStates['WORKING_NONACTIVE_TIME_H'] = {
    label: '부하비가동시간',
    color: '#FFA500',
    unit: 'H',
    isChecked: true
};
equipmentStates['FAILURE_TIME_H'] = {
    label: '고장시간',
    color: '#FD6347',
    unit: 'H',
    isChecked: false
};
equipmentStates['ALARM_TIME_H'] = {
    label: '알람시간',
    color: '#1E90FF',
    unit: 'H',
    isChecked: false
};
equipmentStates['NUMBER_OF_OPERATIONS'] = {
    label: '가동횟수',
    color: '#228B22',
    unit: '',
    isChecked: false
};
equipmentStates['NUMBER_OF_LOAD_UNAVAILABILITY'] = {
    label: '부하비가동횟수',
    color: '#CD5C5C',
    unit: '',
    isChecked: false
};
equipmentStates['NUMBER_OF_FAILURES'] = {
    label: '고장횟수',
    color: '#6495ED',
    unit: '',
    isChecked: false
};
equipmentStates['NUMBER_OF_ALARMS'] = {
    label: '알람횟수',
    color: '#008B8B',
    unit: '',
    isChecked: false
};
equipmentStates['OPERATING_RATE'] = {
    label: '가동율',
    color: '#228B22',
    unit: '%',
    isChecked: false
};
equipmentStates['LOAD_OPERATING_RATIO'] = {
    label: '부하비가동율',
    color: '#20B2AA',
    unit: '%',
    isChecked: false
};
equipmentStates['FAILURE_RATE'] = {
    label: '고장율',
    color: '#C71585',
    unit: '%',
    isChecked: false
};
equipmentStates['ALARM_RATE'] = {
    label: '알람율',
    color: '#9ACD32',
    unit: '%',
    isChecked: false
};


const productionStates = new Object();
productionStates['PRODUCTION_QUANTITY'] = {
    label: '생산수량',
    color: '#FD6347',
    unit: '개',
    isChecked: false
};
productionStates['DIRECT_QUANTITY'] = {
    label: '직행수량',
    color: '#FD6347',
    unit: '개',
    isChecked: false
};
productionStates['GOOD_QUANTITY'] = {
    label: '양품수량',
    color: '#FD6347',
    unit: '개',
    isChecked: false
};
productionStates['NG_QUANTITY'] = {
    label: 'NG수량',
    color: '#FD6347',
    unit: '개',
    isChecked: false
};
productionStates['POOR_QUANTITY'] = {
    label: '불량수량',
    color: '#FD6347',
    unit: '개',
    isChecked: false
};
productionStates['THEORETICAL_TARGET_QUANTITY'] = {
    label: '이론목표수량',
    color: '#FD6347',
    unit: '개',
    isChecked: false
};
productionStates['DIRECT_RATE'] = {
    label: '직행율',
    color: '#FD6347',
    unit: '%',
    isChecked: false
};
productionStates['YIELD_RATE'] = {
    label: '양품율',
    color: '#FD6347',
    unit: '%',
    isChecked: false
};
productionStates['NG_RATE'] = {
    label: 'NG율',
    color: '#FD6347',
    unit: '%',
    isChecked: false
};
productionStates['DEFFECTIVE_RATE'] = {
    label: '불량율',
    color: '#FD6347',
    unit: '%',
    isChecked: false
};
productionStates['TARGET_QUANTITY'] = {
    label: '목표수량',
    color: '#FD6347',
    unit: '개',
    isChecked: false
};
productionStates['UPH'] = {
    label: 'UPH',
    color: '#FD6347',
    unit: '개',
    isChecked: false
};
productionStates['THEORY_CYCLE_TIME'] = {
    label: '이론사이클타임',
    color: '#FD6347',
    unit: '초',
    isChecked: false
};
productionStates['PROCESS_CYCLE_TIME'] = {
    label: '공정사이클타임',
    color: '#FD6347',
    unit: '초',
    isChecked: false
};


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
    Object.keys(equipmentStates).forEach(function(key, index){
        if (index%numberOfItemsEachRow == 0) {
            currentRowId = `row${Math.floor(index/numberOfItemsEachRow)}`;        
            $j("#zAxisBox1").append(`<div class='row' id=zAxisBox1${currentRowId} style="margin: 5px 0";></div>`);
        }
        $j(`#zAxisBox1${currentRowId}`).append(`
        <div class='col-lg-${Math.floor(12/numberOfItemsEachRow)} col-md-${Math.floor(12/numberOfItemsEachRow)} col-sm-${Math.floor(12/numberOfItemsEachRow)} col-xs-${Math.floor(12/numberOfItemsEachRow)}' style='padding:${((index+1)%numberOfItemsEachRow == 0) ? '0' : '0 10px 0 0'}'>
            <div class='input-group' style='vertical-align: middle;'>
                <span class="input-group-addon" style="background-color: #fff; vertical-align: middle;">
                    <input type="checkbox" style="vertical-align: middle;" id="chb_${key}" ${equipmentStates[key].isChecked ? 'checked': ''}>
                </span>
                <div class="input-group-addon"  style="text-align: left; background-color: #fff; width: 100%;">
                    <label class="input-group-text" style="vertical-align: middle;">${equipmentStates[key].label} (${equipmentStates[key].unit})</label>
                </div>
                <div id="cp_${key}" class="input-group colorpicker-component" data-color="${equipmentStates[key].color}">
                    <span class="input-group-addon" style="background-color: #fff; border-right: 1px solid #ccc; width: min-content;"><i></i></span>
                </div>
            </div>
        </div>
        `);
        $(`#cp_${key}`).colorpicker();
    });
    numberOfItemsEachRow = 5;
    Object.keys(productionStates).forEach(function(key, index){
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
        $(`#cp_${key}`).colorpicker();
    });
}

function setCompany(){
    console.log(selectCompany);
    companies.forEach(function(company, index){
        console.log(company);
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


function setDefault(){    
    chipsCompany.text(selectCompany.children(':selected').text());
    chipsLine.text( rbYAxisLine.is(':checked') ? selectYAxisLine.children(':selected').text() : selectXAxisLine.children(':selected').text());
    chipsMachine.text(rbYAxisMachine.is(':checked') ? selectYAxisMachine.children(':selected').text() : selectXAxisMachine.children(':selected').text());
    chipsYear.text(rbYAxisDate.is(':checked') ? selectYAxisYear.children(':selected').text() : selectXAxisYear.children(':selected').text());
    chipsStart.text("01 January 2019");
    chipsEnd.text("31 December 2019");
}
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


async function drawChart(xAxis, yAxis, stringStartDate, stringEndDate, lineLabel, machineLabel, jsonData){
    //chipsCompany.text(selectCompany.children(':selected').text());
    chipsLine.text(lineLabel);
    chipsMachine.text(machineLabel);
    chipsYear.text(rbYAxisDate.is(':checked') ? selectYAxisYear.children(':selected').text() : selectXAxisYear.children(':selected').text());
    $j('#txtStartDate').val(stringStartDate);
    $j('#txtEndDate').val(stringEndDate);
    
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
    if (xAxis == "line" && yAxis == "machine"){

        let values = new Object();
        lines.forEach(function(line){
            let machineValues = new Object();
            Object.keys(selectedMachineNames).forEach(function(machine){
                let stateValues = new Object();
                Object.keys(equipmentStates).forEach(function(state){
                    if ($j(`#chb_${state}`).is(':checked')){
                        stateValues[state] = 0;
                    }
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
                        stateValues[state] += parseFloat(data[state]);
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
                        stateValues[state] += parseFloat(data[state]);
                    });
                    machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === data.MACHINE)] = stateValues;
                    values[data.LINE] = machineValues;
                }
            });    
        }

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
                        label: equipmentStates[itemLabel].label,
                        color: equipmentStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(1),
                        unit: equipmentStates[itemLabel].unit
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
                Object.keys(equipmentStates).forEach(function(state){
                    if ($j(`#chb_${state}`).is(':checked')){
                        stateValues[state] = 0;
                    }
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
                        stateValues[state] += parseFloat(data[state]);
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
                        stateValues[state] += parseFloat(data[state]);
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
                        label: equipmentStates[itemLabel].label,
                        color: equipmentStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(1),
                        unit: equipmentStates[itemLabel].unit
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
        let startDate = new Date(stringStartDate);
        let endDate = new Date(stringEndDate);
        let values = new Object();
        lines.forEach(function(line){
            let dateValues = new Object();
            for (let year = startDate.getFullYear(); year<=endDate.getFullYear(); year++){
                let stateValues = new Object();
                Object.keys(equipmentStates).forEach(function(state){
                    if ($j(`#chb_${state}`).is(':checked')){
                        stateValues[state] = 0;
                    }
                });
                dateValues[year.toString()] = stateValues;
            }
            values[line] = dateValues;
        });
        
        jsonData.forEach(function(data){
            if (lines.includes(data.LINE) && startDate<=new Date(data.WORK_DATE) && endDate>=new Date(data.WORK_DATE)){
                const dateValues = values[data.LINE];
                const stateValues = dateValues[new Date(data.WORK_DATE).getFullYear().toString()];
                Object.keys(stateValues).forEach(function(state){
                    stateValues[state] += parseFloat(data[state]);
                });
                dateValues[new Date(data.WORK_DATE).getFullYear().toString()] = stateValues;
                values[data.LINE] = dateValues;
            }
        });    
    
        xAxisName = '라인';
        yAxisName = `날짜`;
        console.log(values);
        
        //console.log((endDate-startDate)/(1000*60*60*24), 'days');
        let yAxisLabels = [];
        Object.keys(values).forEach(function(xAxisLabel){
            let yAxisValues = new Object();
            yAxisValues = values[xAxisLabel];    
            xAxisLabels.push(xAxisLabel)
            yAxisLabels = (Object.keys(yAxisValues).length > yAxisLabels.length) ? Object.keys(yAxisValues) : yAxisLabels;
        });

        yAxisLabels.reverse().forEach(function(yAxisLabel){
            let childData = [];
            xAxisLabels.forEach(function(xAxisLabel){
                let nestedChildData = [];
                let childValue = values[xAxisLabel];
                let itemValues = childValue[yAxisLabel];
                Object.keys(itemValues).forEach(function(itemLabel){
                    nestedChildData.push({
                        name: itemLabel,
                        label: equipmentStates[itemLabel].label,
                        color: equipmentStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(1),
                        unit: equipmentStates[itemLabel].unit
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
        
        let startDate = new Date(stringStartDate);
        let endDate = new Date(stringEndDate);
        let values = new Object();
        lines.forEach(function(line){
            let dateValues = new Object();
            for (let year = startDate.getFullYear(); year<=endDate.getFullYear(); year++){
                let stateValues = new Object();
                Object.keys(equipmentStates).forEach(function(state){
                    if ($j(`#chb_${state}`).is(':checked')){
                        stateValues[state] = 0;
                    }
                });
                dateValues[year.toString()] = stateValues;
            }
            values[line] = dateValues;
        });
        
        jsonData.forEach(function(data){
            if (lines.includes(data.LINE) && startDate<=new Date(data.WORK_DATE) && endDate>=new Date(data.WORK_DATE)){
                const dateValues = values[data.LINE];
                const stateValues = dateValues[new Date(data.WORK_DATE).getFullYear().toString()];
                Object.keys(stateValues).forEach(function(state){
                    stateValues[state] += parseFloat(data[state]);
                });
                dateValues[new Date(data.WORK_DATE).getFullYear().toString()] = stateValues;
                values[data.LINE] = dateValues;
            }
        });    
        console.log(values);
        
        xAxisName = '날짜';
        yAxisName = `라인`;
        Object.keys(values).forEach(function(xAxisLabel){
            const childData = [];    
            let yAxisValues = new Object();
            yAxisValues = values[xAxisLabel];
            Object.keys(yAxisValues).reverse().forEach(function(yAxisLabel){
                let nestedChildData = [];
                let itemValues = yAxisValues[yAxisLabel];
                Object.keys(itemValues).forEach(function(itemLabel){
                    nestedChildData.push({
                        name: itemLabel,
                        label: equipmentStates[itemLabel].label,
                        color: equipmentStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(1),
                        unit: equipmentStates[itemLabel].unit
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
        let startDate = new Date(stringStartDate);
        let endDate = new Date(stringEndDate);
        let values = new Object();
        for (let year = startDate.getFullYear(); year<=endDate.getFullYear(); year++) {
            let dateValues = new Object();
            Object.keys(selectedMachineNames).forEach(function(machine){
                let stateValues = new Object();
                Object.keys(equipmentStates).forEach(function(state){
                    if ($j(`#chb_${state}`).is(':checked')){
                        stateValues[state] = 0;
                    }
                });
                dateValues[machine] = stateValues;        
            });
            values[year.toString()] = dateValues;
        }
        
        jsonData.forEach(function(data){
            if (Object.values(selectedMachineNames).includes(data.MACHINE.replace(data.LINE,'').replace('_','')) && startDate<=new Date(data.WORK_DATE) && endDate>=new Date(data.WORK_DATE)){
                const machineValues = values[new Date(data.WORK_DATE).getFullYear().toString()];
                const stateValues = machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === data.MACHINE.replace(data.LINE,'').replace('_',''))];
                Object.keys(stateValues).forEach(function(state){
                    stateValues[state] += parseFloat(data[state]);
                });
                machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === data.MACHINE.replace(data.LINE,'').replace('_',''))] = stateValues;
                values[new Date(data.WORK_DATE).getFullYear().toString()] = machineValues;
            }
        });    
    
        console.log(values);
        
        xAxisName = '설비';
        yAxisName = `날짜`;

        Object.keys(values).reverse().forEach(function(xAxisLabel){
            const childData = [];    
            let yAxisValues = new Object();
            yAxisValues = values[xAxisLabel];
            Object.keys(yAxisValues).forEach(function(yAxisLabel){
                let nestedChildData = [];
                let itemValues = yAxisValues[yAxisLabel];
                Object.keys(itemValues).forEach(function(itemLabel){
                    nestedChildData.push({
                        name: itemLabel,
                        label: equipmentStates[itemLabel].label,
                        color: equipmentStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(1),
                        unit: equipmentStates[itemLabel].unit
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
        console.log(values);
        
    }
    
    if (xAxis == "date" && yAxis == "machine"){
        let startDate = new Date(stringStartDate);
        let endDate = new Date(stringEndDate);
        let values = new Object();
        for (let year = startDate.getFullYear(); year<=endDate.getFullYear(); year++) {
            let dateValues = new Object();
            Object.keys(selectedMachineNames).forEach(function(machine){
                let stateValues = new Object();
                Object.keys(equipmentStates).forEach(function(state){
                    if ($j(`#chb_${state}`).is(':checked')){
                        stateValues[state] = 0;
                    }
                });
                dateValues[machine] = stateValues;        
            });
            values[year.toString()] = dateValues;
        }
        
        jsonData.forEach(function(data){
            if (Object.values(selectedMachineNames).includes(data.MACHINE.replace(data.LINE,'').replace('_','')) && startDate<=new Date(data.WORK_DATE) && endDate>=new Date(data.WORK_DATE)){
                const machineValues = values[new Date(data.WORK_DATE).getFullYear().toString()];
                const stateValues = machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === data.MACHINE.replace(data.LINE,'').replace('_',''))];
                Object.keys(stateValues).forEach(function(state){
                    stateValues[state] += parseFloat(data[state]);
                });
                machineValues[Object.keys(selectedMachineNames).find(key => selectedMachineNames[key] === data.MACHINE.replace(data.LINE,'').replace('_',''))] = stateValues;
                values[new Date(data.WORK_DATE).getFullYear().toString()] = machineValues;
            }
        });    
    
        console.log(values);
        xAxisName = '날짜';
        yAxisName = `설비`;

        let yAxisLabels = [];
        Object.keys(values).reverse().forEach(function(xAxisLabel){
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
                        label: equipmentStates[itemLabel].label,
                        color: equipmentStates[itemLabel].color,
                        value: itemValues[itemLabel].toFixed(1),
                        unit: equipmentStates[itemLabel].unit
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
    
    const barData = {
        xAxis: xAxisName,
        yAxis: yAxisName,
        labels: xAxisLabels,
        data: data
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
    ddwv.setSizeAutoChangeableIsEnabled(false);
    //Setting bar label color. Default color is green("#00ff00")
    ddwv.setFont
    ddwv.setBarLabelColor("#000000");
    //chartsCGAC.setLoading("/images/loading.svg");
    ddwv.barChart(barData);

}

function sendRequest(){

    //drawWithTempValues();
    let endDate = (new Date()).toISOString().slice(0,10);
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

    getAllDatas(xAxis, yAxis, lineLabel, machineLabel, startDate, endDate);
}

function getAllDatas(xAxis, yAxis, lineLabel, machineLabel, startDate, endDate){
    const line = (lineLabel == 'All') ? "ALL" : lineLabel;
    const machine = (machineLabel == 'All') ? "ALL" : machinesName[machineLabel];
    $.ajax({
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin':'*'
        },
        type: 'GET',
        crossDomain: true,
        url: `http://113.198.137.142:8080/v1/api/fukoku/process-analysis?line=${line}&machine=${machine}&start_date=${startDate}&end_date=${endDate}`,
        success: function(jsonData){
            switch(jsonData.CODE){
                case "7777": 
                    drawChart(xAxis, yAxis, startDate, endDate, lineLabel, machineLabel, jsonData.DATA);           
                break;
                default:
                    console.log("Result has been not found!");
                break;
            }
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

// async function getAllStates(){
//     const states = new Object();
//     await $.ajax({
//         headers: {
//             'Access-Control-Allow-Headers': '*',
//             'Access-Control-Allow-Origin':'*'
//         },
//         type: 'GET',
//         crossDomain: true,
//         url: `http://113.198.137.181:8080/v3/api/fukoku/state-name/find`,
//         success: function(jsonData){
//             if (Array.isArray(jsonData.data))
//                 jsonData.data.forEach(function(state){
//                     if (state.api_field_name != null){
//                         states[state.api_field_name] = {
//                             label: state.korean_name,
//                             color: state.color,
//                             unit: state.unit,
//                             isChecked: (state.status == 1)
//                         }
//                     }
//                 });
//         } 
//     });
//     console.log(states);
    
//     return states;
// }


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

function boxWasClicked(){
    getAllDatas("line", "machine", "HB", "All", startDateOfDatabase, new Date().toISOString().slice(0,10));
    
}

// $(document).ready(function(){
//     console.log('jquery 2.1.4');
// })

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
    chipsStart = $j(`#start`);
    chipsEnd = $j(`#end`);


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


    console.log('jquery 3.3.1');
    const lines = await getAllLineNames();
    console.log(lines);
    if (lines.length < 1) return;
    setLines(lines);
    const machines = await getAllMachineNames()
    setMachines(machines);    
    setStates();
    setCompany();
    setDate();
    getAllDatas("line", "date", "All", "All", startDateOfDatabase, new Date().toISOString().slice(0,10));
    console.log('send data');
    $('#startDate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#endDate').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});