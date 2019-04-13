(function (){
    var DDWV = function (containerId) {

        //installing empty scene
        const scene = new THREE.Scene();

        let container = document.getElementById(containerId);
        let width = container.clientWidth;
        let height = container.clientHeight;

        let xAxisLabelIsEnabled = true;
        let xAxisLabelSize = 16;
        let xAxisLabelColor = "#ff0000";

        let yAxisLabelIsEnabled = true;
        let yAxisLabelSize = 16;
        let yAxisLabelColor = "#0000ff";

        let barLabelIsEnabled = true;
        let barLabelIsVisible = false;
        let barLabelOnMouseHoverIsEnabled = true;
        let barLabelSize = 16;
        let barLabelColor = "#000000";

        let scaleLabelIsEnabled = true;
        let scaleLabelSize = 16;
        let scaleLabelColor = "#000000";

        let distanceBetweenChildBoxes = 10;

        let loadingText = "LOADING...";

        let barWidth = 100;
        let barLength = 100;
        let padding = 20;
        let paddingTotal = 50;

        const cubes = [];
        const barLabels = [];
        const fullBarLabels = [];

        //camera
        let fov = 45;
        let near = 0.01;
        let far = 1000000;

        let maxWidth = 0;
        let maxLength = 0;
        let maxHeight = 0;
        let mult = 1;
        //total
        let totalYAxisEnabled = false;
        let totalXAxisEnabled = false;
        let averageIsShown = false;

        let endOfGridHelperIsEnabled = true;
        let gridHelperType = true;

        let opacity = 0.8;
        //x Axis
        //===========================================================================================//
        function getYAxisLength(barData){
            return Object.keys(barData.data).length;
        }

        //z Axis
        //===========================================================================================//
        function getXAxisLength(barData){
            let xAxis = 0;
            barData.data.forEach(function(yAxisItem){
                let values = yAxisItem.values;
                if (values.length > xAxis) {
                    xAxis = values.length;
                }
            });
            return xAxis;
        }

        //y Axis
        //===========================================================================================//
        function getBarHeight(barData){
            let barHeight = 0;
            barData.data.forEach(function(yAxisItem){
                var values = yAxisItem.values;
                values.forEach(function(xAxisItems){
                    xAxisItems.forEach(function(xAxisItem){
                        if (parseFloat(xAxisItem.value) > parseFloat(barHeight)){
                            barHeight = xAxisItem.value;
                        }
                    })
                });
            });
            return barHeight;
        }

        //maxWidth: calculating maximum width of plane and setting global variable
        //===========================================================================================//
        function setMaxWidth(yAxis){
            maxWidth = yAxis * (barWidth + 2 * padding)
        }

        //maxLength: calculating maximum length of plane and setting global variable
        //===========================================================================================//
        function setMaxLength(xAxis){
            maxLength = xAxis * (barLength + 2 * padding)
        }

        //maxHeight: calculating maximum height of plane and setting global variable
        //===========================================================================================//
        function setMaxHeight(barHeight){
            maxHeight = barHeight;
        }

        //aspect: calculating aspect of camera
        //===========================================================================================//
        function getAspect(){
            return (window.innerWidth > window.innerHeight)
                ? (window.innerWidth / window.innerHeight)
                : (window.innerHeight / window.innerWidth);
        }
        //camera
        //===========================================================================================//
        function getCamera(){
            const camera = new THREE.PerspectiveCamera(fov, getAspect(), near, far);
            camera.position.z = Math.pow(maxWidth*maxWidth + maxLength*maxLength + maxHeight*maxHeight, 1/2);
            camera.position.y = Math.pow(maxWidth*maxWidth + maxLength*maxLength + maxHeight*maxHeight, 1/2);
            camera.position.x = Math.pow(maxWidth*maxWidth + maxLength*maxLength + maxHeight*maxHeight, 1/2);
            return camera;
        }


        //drawing Bar Chart
        //===========================================================================================//
        function drawBarChart(barData, yAxis){
            for (var i=0; i<yAxis; i++) {
                const yAxisItem = barData.data[i];
                const xAxisItems = yAxisItem.values;

                xAxisItems.forEach(function(childItems, j) {
                    const numberOfChildren = childItems.length;
                    const numberOfChildXAxises = Math.ceil(Math.sqrt(numberOfChildren));
                    const numberOfChildYAxises = Math.ceil(numberOfChildren/numberOfChildXAxises);
                    const childBoxWidth = (barWidth-(numberOfChildYAxises-1)*distanceBetweenChildBoxes)/numberOfChildYAxises;
                    const childBoxLength = (barLength-(numberOfChildXAxises-1)*distanceBetweenChildBoxes)/numberOfChildXAxises;

                    childItems.forEach(function(childItem, index){
                        let p = Math.floor(index/numberOfChildXAxises);
                        let q = index%numberOfChildXAxises;
                        let height = childItem.value/mult;
                        let color = childItem.color;
                        if (height > 0) {
                            let geometry = new THREE.BoxGeometry( childBoxWidth, height, childBoxLength);
                            let material = new THREE.MeshPhongMaterial( { color: color, transparent: true } );
                            material.opacity = opacity;
                            let cube = new THREE.Mesh( geometry, material );
                            cube.receiveShadow = true;
                            cube.castShadow = true;
                            cube.position.y = height/2 - maxHeight/2;
                            cube.position.x = -1 * (barLength/2 + padding + j * (barLength + 2 * padding) - maxLength/2 + (p - (numberOfChildYAxises-1)/2) * (childBoxWidth + distanceBetweenChildBoxes));
                            cube.position.z = -1 * (barWidth/2 + padding + i * (barWidth + 2 * padding) - maxWidth/2 + (q - (numberOfChildXAxises-1)/2) * (childBoxLength + distanceBetweenChildBoxes));
                            scene.add( cube );
                            const info = new Object();
                            info[barData.xAxis] = barData.labels[j];
                            info[barData.yAxis] = barData.data[i].label;
                            info["항목"] = childItem.label;
                            info["데이터값"] = `${childItem.value} (${childItem.unit})`;
                            fullBarLabels.push({
                                type: 'simple',
                                xAxis: barData.labels[j],
                                yAxis: barData.data[i].label,
                                info: info
                            });
                            cubes.push( { cube: cube, color: color, value: childItem.value } );
                        }
                    });
                });
            }
        }

        //yAxisTotal: Getting Total Sum of yAxis Values
        //=============================================================================================================//
        function getYAxisTotal(barData, yAxis){
            const yAxisTotal = [];
            for (var i=0; i<yAxis; i++) {
                const yAxisItem = barData.data[i];
                const xAxisItems = yAxisItem.values;
                xAxisItems.forEach(function(childItems, j) {
                    childItems.forEach(function(childItem){
                        if (yAxisTotal[i] == null){
                            yAxisTotal[i] = new Object();
                        }
                        let isKeyExist = false;
                        Object.keys(yAxisTotal[i]).forEach(function(key){
                            if (key.toString()==childItem.name){
                                isKeyExist = true;
                            }
                        });
                        if (isKeyExist){
                            let previousColor = yAxisTotal[i][childItem.name].color;
                            let previousCount = yAxisTotal[i][childItem.name].count;
                            let previousValue = yAxisTotal[i][childItem.name].value;
                            let previousLabel = yAxisTotal[i][childItem.name].label;
                            let previousUnit = yAxisTotal[i][childItem.name].unit;
                            previousValue += parseFloat(childItem.value);
                            previousCount = parseInt(previousCount) + 1;
                            yAxisTotal[i][childItem.name] = {
                                xAxis: barData.labels[j],
                                yAxis: barData.data[i].label,
                                color: previousColor,
                                count: previousCount,
                                value: previousValue,
                                label: previousLabel,
                                unit: previousUnit
                            }
                        } else {
                            yAxisTotal[i][childItem.name] = {
                                xAxis: barData.labels[j],
                                yAxis: barData.data[i].label,
                                color: childItem.color,
                                count: 1,
                                value: parseFloat(childItem.value),
                                label: childItem.label,
                                unit: childItem.unit
                            }
                        }
                    });
                });
            }
            return yAxisTotal;
        }

        //xAxisTotal: getting total sum of xAxis values
        //====================================================================================================//
        function getXAxisTotal(barData, yAxis){
            const xAxisTotal = [];
            for (var i=0; i<yAxis; i++) {
                const yAxisItem = barData.data[i];
                const xAxisItems = yAxisItem.values;
                xAxisItems.forEach(function(childItems, j) {
                    childItems.forEach(function(childItem, index){
                        if (xAxisTotal[j] == null){
                            xAxisTotal[j] = new Object();
                        }
                        isKeyExist = false;
                        Object.keys(xAxisTotal[j]).forEach(function(key){
                            if (key==childItem.name){
                                isKeyExist = true;
                            }
                        });
                        if (isKeyExist){
                            let previousColor = xAxisTotal[j][childItem.name].color;
                            let previousCount = xAxisTotal[j][childItem.name].count;
                            let previousValue = xAxisTotal[j][childItem.name].value;
                            let previousLabel = xAxisTotal[j][childItem.name].label;
                            let previousUnit = xAxisTotal[j][childItem.name].unit;
                            previousValue += parseFloat(childItem.value);
                            previousCount = parseInt(previousCount) + 1;
                            xAxisTotal[j][childItem.name] = {
                                xAxis: barData.labels[j],
                                yAxis: barData.data[i].label,
                                color: previousColor,
                                count: previousCount,
                                value: previousValue,
                                label: previousLabel,
                                unit: previousUnit
                            }
                        } else {
                            xAxisTotal[j][childItem.name] = {
                                xAxis: barData.labels[j],
                                yAxis: barData.data[i].label,
                                color: childItem.color,
                                count: 1,
                                value: parseFloat(childItem.value),
                                label: childItem.label,
                                unit: childItem.unit
                            }
                        }
                    });
                });
            }
            return xAxisTotal;
        }

        //drawBarChartYAxisTotal: drawing bar chart to visualize Total Sum of YAxis values
        //==============================================================================================//
        function drawBarChartYAxisTotal(yAxisTotal, barData){
            yAxisTotal.forEach(function(yAxisTotalObject, i){
                const numberOfChildren = Object.keys(yAxisTotalObject).length;
                const numberOfChildXAxises = Math.ceil(Math.sqrt(numberOfChildren));
                const numberOfChildYAxises = Math.ceil(numberOfChildren/numberOfChildXAxises);
                const childBoxWidth = (barWidth-(numberOfChildYAxises-1)*distanceBetweenChildBoxes)/numberOfChildYAxises;
                const childBoxLength = (barLength-(numberOfChildXAxises-1)*distanceBetweenChildBoxes)/numberOfChildXAxises;

                Object.keys(yAxisTotalObject).forEach(function(key, index){
                    let p = Math.floor(index/numberOfChildXAxises);
                    let q = index%numberOfChildXAxises;
                    let height = (averageIsShown) ? yAxisTotalObject[key].value/yAxisTotalObject[key].count : yAxisTotalObject[key].value;
                    height = height/mult;
                    let color = yAxisTotalObject[key].color;
                    if (height > 0) {
                        var geometry = new THREE.BoxGeometry( childBoxWidth, height, childBoxLength);
                        var material = new THREE.MeshPhongMaterial( { color: color, transparent: true } );
                        material.opacity = opacity;
                        var cube = new THREE.Mesh( geometry, material );
                        cube.receiveShadow = true;
                        cube.castShadow = true;
                        let distance = (endOfGridHelperIsEnabled)
                            ? ((maxWidth > maxLength) ? maxWidth : maxLength)
                            : maxLength;
                        cube.position.y = height/2 - maxHeight/2;
                        cube.position.x = (- barLength/2 - paddingTotal - distance/2 - (p - (numberOfChildYAxises-1)/2) * (childBoxWidth + distanceBetweenChildBoxes));
                        cube.position.z = (- barWidth/2 - padding - i * (barWidth + 2 * padding) + maxWidth/2 - (q - (numberOfChildXAxises-1)/2) * (childBoxLength + distanceBetweenChildBoxes));
                        scene.add( cube );

                        const info = new Object();
                        info[barData.yAxis] = yAxisTotalObject[key].yAxis;
                        info["항목"] = yAxisTotalObject[key].label;
                        info["합계"] = `${yAxisTotalObject[key].value.toFixed(1)} (${yAxisTotalObject[key].unit})`;
                        if (averageIsShown) info["평균"] = `${(yAxisTotalObject[key].value/yAxisTotalObject[key].count).toFixed(1)} (${yAxisTotalObject[key].unit})`;
                        fullBarLabels.push({
                            type: 'total',
                            xAxis: '',
                            yAxis: yAxisTotalObject[key].yAxis,
                            info: info
                        });

                        cubes.push( { cube: cube, color: color, value: height } );
                    }
                });
            });
        }

        //drawBarChartXAxisTotal: drawing bar chart to visualize Total Sum of XAxis Values
        //===============================================================================================//
        function drawBarChartXAxisTotal(xAxisTotal, barData){
            xAxisTotal.forEach(function(xAxisTotalObject, j){
                const numberOfChildren = Object.keys(xAxisTotalObject).length;
                const numberOfChildXAxises = Math.ceil(Math.sqrt(numberOfChildren));
                const numberOfChildYAxises = Math.ceil(numberOfChildren/numberOfChildXAxises);
                const childBoxWidth = (barWidth-(numberOfChildYAxises-1)*distanceBetweenChildBoxes)/numberOfChildYAxises;
                const childBoxLength = (barLength-(numberOfChildXAxises-1)*distanceBetweenChildBoxes)/numberOfChildXAxises;
                Object.keys(xAxisTotalObject).forEach(function(key, index){
                    let p = Math.floor(index/numberOfChildXAxises);
                    let q = index%numberOfChildXAxises;
                    let height = (averageIsShown) ? xAxisTotalObject[key].value/xAxisTotalObject[key].count : xAxisTotalObject[key].value;
                    height = height/mult;
                    let color = xAxisTotalObject[key].color;
                    if (height > 0) {
                        var geometry = new THREE.BoxGeometry( childBoxWidth, height, childBoxLength);
                        var material = new THREE.MeshPhongMaterial( { color: color, transparent: true } );
                        material.opacity = opacity;
                        var cube = new THREE.Mesh( geometry, material );
                        cube.receiveShadow = true;
                        cube.castShadow = true;
                        let distance = (endOfGridHelperIsEnabled)
                            ? ((maxWidth > maxLength) ? maxWidth : maxLength)
                            : maxWidth;

                        cube.position.y = height/2 - maxHeight/2;
                        cube.position.x = ( - barLength/2 - padding - j * (barLength + 2 * padding) + maxLength/2 - (p - (numberOfChildYAxises-1)/2) * (childBoxWidth + distanceBetweenChildBoxes));
                        cube.position.z = (- barWidth/2 - paddingTotal - distance/2 - (q - (numberOfChildXAxises-1)/2) * (childBoxLength + distanceBetweenChildBoxes));

                        scene.add( cube );
                        const info = new Object();
                        info[barData.xAxis] = xAxisTotalObject[key].xAxis;
                        info["항목"] = xAxisTotalObject[key].label;
                        info["합계"] = `${xAxisTotalObject[key].value.toFixed(1)} (${xAxisTotalObject[key].unit})`;
                        if (averageIsShown) info["평균"] = `${(xAxisTotalObject[key].value/xAxisTotalObject[key].count).toFixed(1)} (${xAxisTotalObject[key].unit})`;
                        fullBarLabels.push({
                            type: 'total',
                            xAxis: xAxisTotalObject[key].xAxis,
                            yAxis: '',
                            info: info
                        });
                        cubes.push( {cube: cube, color: color, value: height } );
                    }
                });
            });
        }
        //drawYAxisLabel: drawing label of yAxis
        //==============================================================================================//
        function drawYAxisLabel(barData, yAxis, font){
            for (var i=0; i<yAxis; i++) {
                var yAxisItem = barData.data[i];
                var geometry = new THREE.TextGeometry( yAxisItem.label, {
                    font: font,
                    size: yAxisLabelSize,
                    height: 0.1
                });
                var material = new THREE.MeshPhongMaterial( { color: yAxisLabelColor } );
                var text = new THREE.Mesh(geometry, material);
                text.rotateX(-Math.PI/2);
                var box = new THREE.Box3().setFromObject( text );
                var size = new THREE.Vector3();

                text.position.y = -maxHeight/2;
                let distance = (endOfGridHelperIsEnabled)
                    ? ((maxWidth > maxLength) ? maxWidth : maxLength)
                    : maxLength;
                text.position.x = distance/2 + padding;
                text.position.z = -1 * (- maxWidth/2 + padding + i * (barWidth + 2 * padding) + barWidth/2) + box.getSize(size).z/2;
                scene.add(text);
            }
        }

        //drawYAxisTotalLabel: drawing label of total sum of raw values
        //===============================================================================================//
        function drawYAxisTotalLabel(font){
            let label = (averageIsShown) ? "평균 \n(합계)" : "합계"
            var geometry = new THREE.TextGeometry( label, {
                font: font,
                size: yAxisLabelSize,
                height: 0.1
            });
            var material = new THREE.MeshPhongMaterial( { color: yAxisLabelColor } );
            var text = new THREE.Mesh(geometry, material);
            text.rotateX(-Math.PI/2);
            text.rotateZ(Math.PI/2);
            var box = new THREE.Box3().setFromObject( text );
            var size = new THREE.Vector3();
            let distance = (endOfGridHelperIsEnabled)
                ? ((maxWidth > maxLength) ? maxWidth : maxLength)
                : maxLength;
            text.position.y = -maxHeight/2;
            text.position.x =  - barLength/2 - paddingTotal - distance/2 - box.getSize(size).x/2 + xAxisLabelSize;
            text.position.z = maxWidth/2 + padding + box.getSize(size).z;
            scene.add(text);
        }

        //drawXAxisLabel: drawing the label of xAxis
        //===============================================================================================//
        function drawXAxisLabel(barData, xAxis, font){
            barData.labels.forEach(function(label, i) {
                if (i + 1 > xAxis) return;
                var geometry = new THREE.TextGeometry( label, {
                    font: font,
                    size: xAxisLabelSize,
                    height: 0.1
                });
                var material = new THREE.MeshPhongMaterial( { color: xAxisLabelColor } );
                var text = new THREE.Mesh(geometry, material);
                text.rotateX(-Math.PI/2);
                text.rotateZ(Math.PI/2);
                var box = new THREE.Box3().setFromObject( text );
                var size = new THREE.Vector3();
                let distance = (endOfGridHelperIsEnabled)
                    ? ((maxWidth > maxLength) ? maxWidth : maxLength)
                    : maxWidth;
                text.position.y = -maxHeight/2;
                text.position.x = -1 * (barLength/2 + padding + i * (barWidth + 2 * padding) - maxLength/2) + box.getSize(size).x/2;
                text.position.z = distance/2 + padding + box.getSize(size).z;
                scene.add(text);
            });
        }

        //drawXAxisTotalLabel: drawing the label of the total sum of xAxis values
        //===============================================================================================//
        function drawXAxisTotalLabel(font){
            let label = (averageIsShown) ? "평균 \n(합계)" : "합계"
            var geometry = new THREE.TextGeometry( label, {
                font: font,
                size: xAxisLabelSize,
                height: 0.1
            });
            var material = new THREE.MeshPhongMaterial( { color: xAxisLabelColor } );
            var text = new THREE.Mesh(geometry, material);
            text.rotateX(-Math.PI/2);
            var box = new THREE.Box3().setFromObject( text );
            var size = new THREE.Vector3();
            let distance = (endOfGridHelperIsEnabled)
                ? ((maxWidth > maxLength) ? maxWidth : maxLength)
                : maxWidth;
            text.position.y = -maxHeight/2;
            text.position.x = maxLength/2 + padding;
            text.position.z = - distance/2 - paddingTotal - barWidth/2 - box.getSize(size).z/2 + yAxisLabelSize;
            scene.add(text);
        }

        //drawBarChartLabel: drawing the label of bar chart
        //===============================================================================================//
        function drawBarChartLabel(barData, yAxis, font){
            for (var i=0; i<yAxis; i++) {
                const yAxisItem = barData.data[i];
                const xAxisItems = yAxisItem.values;

                xAxisItems.forEach(function(childItems, j) {
                    const numberOfChildren = childItems.length;
                    const numberOfChildXAxises = Math.ceil(Math.sqrt(numberOfChildren));
                    const numberOfChildYAxises = Math.ceil(numberOfChildren/numberOfChildXAxises);
                    const childBoxWidth = (barWidth-(numberOfChildYAxises-1)*distanceBetweenChildBoxes)/numberOfChildYAxises;
                    const childBoxLength = (barLength-(numberOfChildXAxises-1)*distanceBetweenChildBoxes)/numberOfChildXAxises;

                    childItems.forEach(function(childItem, index){
                        let p = Math.floor(index/numberOfChildXAxises);
                        let q = index%numberOfChildXAxises;

                        var geometry = new THREE.TextGeometry( childItem.value.toString(), {
                            font: font,
                            size: barLabelSize,
                            height: 0.1
                        });

                        var material = new THREE.MeshPhongMaterial( { color: barLabelColor } );
                        var text = new THREE.Mesh(geometry, material);

                        var box = new THREE.Box3().setFromObject( text );
                        var size = new THREE.Vector3();
                        text.position.y = childItem.value/mult - maxHeight/2 + distanceBetweenChildBoxes;
                        text.position.x = -1 * (barLength/2 + padding + j * (barLength + 2 * padding) - maxLength/2 + (p - (numberOfChildYAxises-1)/2) * (childBoxWidth + distanceBetweenChildBoxes)) - box.getCenter(size).x;
                        text.position.z = -1 * (barWidth/2 + padding + i * (barWidth + 2 * padding) - maxWidth/2 + (q - (numberOfChildXAxises-1)/2) * (childBoxLength + distanceBetweenChildBoxes));
                        text.visible = barLabelIsVisible;
                        barLabels.push(text);
                        scene.add(text);
                    });
                });
            }
        }

        //drawScaleLabel: drawing the label of scale
        //================================================================================================//
        function drawScaleLabel(font){
            let interval = scaleIntervals[scaleIntervals.length - 1];
            for (let scaleInterval of scaleIntervals){
                if (parseFloat(maxHeight*mult/scaleInterval) <= 10) {
                    interval = scaleInterval;
                    break;
                }
            };
            for (var i=interval; i <= (parseFloat(maxHeight*mult) + interval); i+=interval) {
                var geometry = new THREE.TextGeometry( (i).toString(), {
                    font: font,
                    size: scaleLabelSize,
                    height: 0.1
                });
                var material = new THREE.MeshPhongMaterial( { color: scaleLabelColor } );
                var text = new THREE.Mesh(geometry, material);
                var box = new THREE.Box3().setFromObject( text );
                var size = new THREE.Vector3();
                text.position.y = i/mult - maxHeight/2 - box.getCenter(size).y;
                text.position.z = - maxWidth/2;
                text.position.x = padding + maxLength/2;
                scene.add(text);
            }
        }

        //drawScaleLine: drawing the line of scale
        //================================================================================================//
        function drawScaleLine(){
            let interval = scaleIntervals[scaleIntervals.length - 1];
            for (let scaleInterval of scaleIntervals){
                if (parseFloat((maxHeight*mult)/scaleInterval) <= 10) {
                    interval = scaleInterval;
                    break;
                }
            };
            for (var i=interval; i <= (parseFloat(maxHeight*mult) + interval); i+=interval) {
                var material = new THREE.LineBasicMaterial( { color: "#000000" } );
                var geometry = new THREE.Geometry();

                geometry.vertices.push(new THREE.Vector3( maxLength/2, - maxHeight/2 + i/mult, -maxWidth/2 ) );
                geometry.vertices.push(new THREE.Vector3( - maxLength/2, - maxHeight/2 + i/mult, -maxWidth/2 ) );
                geometry.vertices.push(new THREE.Vector3( - maxLength/2, - maxHeight/2 + i/mult, maxWidth/2 ) );

                var line = new THREE.Line( geometry, material );
                scene.add(line)
            }
        }

        //drawBarChartLabelYAxisTotal: drawing a label of total sum of yAxis values to each bar chart
        //================================================================================================//
        function drawBarChartLabelYAxisTotal(yAxisTotal, font){
            yAxisTotal.forEach(function(yAxisTotalObject, i){

                const numberOfChildren = Object.keys(yAxisTotalObject).length;

                const numberOfChildXAxises = Math.ceil(Math.sqrt(numberOfChildren));
                const numberOfChildYAxises = Math.ceil(numberOfChildren/numberOfChildXAxises);
                const childBoxWidth = (barWidth-(numberOfChildYAxises-1)*distanceBetweenChildBoxes)/numberOfChildYAxises;
                const childBoxLength = (barLength-(numberOfChildXAxises-1)*distanceBetweenChildBoxes)/numberOfChildXAxises;

                Object.keys(yAxisTotalObject).forEach(function(key, index){
                    let p = Math.floor(index/numberOfChildXAxises);
                    let q = index%numberOfChildXAxises;
                    let label = (averageIsShown)
                        ? `${(yAxisTotalObject[key].value/yAxisTotalObject[key].count).toFixed(1)}\n(${yAxisTotalObject[key].value.toFixed(1)})`
                        : yAxisTotalObject[key].value.toFixed(1);
                    var geometry = new THREE.TextGeometry( label, {
                        font: font,
                        size: barLabelSize,
                        height: 0.1
                    });
                    var material = new THREE.MeshPhongMaterial( { color: barLabelColor } );
                    var text = new THREE.Mesh(geometry, material);
                    var box = new THREE.Box3().setFromObject( text );
                    var size = new THREE.Vector3();
                    let height = (averageIsShown) ? yAxisTotalObject[key].value/yAxisTotalObject[key].count : yAxisTotalObject[key].value;
                    height = height/mult;
                    let distance = (endOfGridHelperIsEnabled)
                        ? ((maxWidth > maxLength) ? maxWidth : maxLength)
                        : maxLength;

                    text.position.y = height - maxHeight/2 + box.getSize(size).y;
                    text.position.x = (-box.getSize(size).x/2 - barLength/2 - paddingTotal - distance/2 - (p - (numberOfChildYAxises-1)/2) * (childBoxWidth + distanceBetweenChildBoxes));
                    text.position.z = (- barWidth/2 - padding - i * (barWidth + 2 * padding) + maxWidth/2 - (q - (numberOfChildXAxises-1)/2) * (childBoxLength + distanceBetweenChildBoxes));

                    text.visible = false;
                    barLabels.push(text);
                    scene.add(text);
                });
            });
        }


        //drawBarChartLabelXAxisTotal: drawing a label of total sum of xAxis values to each bar chart
        //================================================================================================//
        function drawBarChartLabelXAxisTotal(xAxisTotal, font){

            xAxisTotal.forEach(function(xAxisTotalObject, j){

                const numberOfChildren = Object.keys(xAxisTotalObject).length;

                const numberOfChildXAxises = Math.ceil(Math.sqrt(numberOfChildren));
                const numberOfChildYAxises = Math.ceil(numberOfChildren/numberOfChildXAxises);
                const childBoxWidth = (barWidth-(numberOfChildYAxises-1)*distanceBetweenChildBoxes)/numberOfChildYAxises;
                const childBoxLength = (barLength-(numberOfChildXAxises-1)*distanceBetweenChildBoxes)/numberOfChildXAxises;

                Object.keys(xAxisTotalObject).forEach(function(key, index){
                    let p = Math.floor(index/numberOfChildXAxises);
                    let q = index%numberOfChildXAxises;
                    let label = (averageIsShown)
                        ? `${(xAxisTotalObject[key].value/xAxisTotalObject[key].count).toFixed(1)}\n(${xAxisTotalObject[key].value.toFixed(1)})`
                        : xAxisTotalObject[key].value.toFixed(1);
                    var geometry = new THREE.TextGeometry( label, {
                        font: font,
                        size: barLabelSize,
                        height: 0.1
                    });
                    var material = new THREE.MeshPhongMaterial( { color: barLabelColor } );
                    var text = new THREE.Mesh(geometry, material);
                    var box = new THREE.Box3().setFromObject( text );
                    var size = new THREE.Vector3();
                    let height = (averageIsShown) ? xAxisTotalObject[key].value/xAxisTotalObject[key].count : xAxisTotalObject[key].value;
                    height = height/mult;
                    let distance = (endOfGridHelperIsEnabled)
                        ? ((maxWidth > maxLength) ? maxWidth : maxLength)
                        : maxWidth;
                    text.position.y = height - maxHeight/2 + box.getSize(size).y;
                    text.position.x = (- box.getSize(size).x/2 - barLength/2 - padding - j * (barLength + 2 * padding) + maxLength/2 - (p - (numberOfChildYAxises-1)/2) * (childBoxWidth + distanceBetweenChildBoxes));
                    text.position.z = (- barWidth/2 - paddingTotal - distance/2 - (q - (numberOfChildXAxises-1)/2) * (childBoxLength + distanceBetweenChildBoxes));

                    text.visible = false;
                    barLabels.push(text);
                    scene.add(text);
                });
            });
        }

        //initLoading: Initialization of Loading screen
        //==============================================================================================//
        function initLoading(){
            if (!container.querySelector("[id='loading'")){
                let loading = document.createElement("div");
                loading.setAttribute("id", "loading");
                loading.style.display = "flex";
                loading.style.justifyContent = "center";
                loading.style.alignItems = "center";
                loading.style.position = "absolute";
                loading.style.top = "0";
                loading.style.left = "0";
                loading.style.zIndex = "100";
                loading.style.width = "100%";
                loading.style.height = "100%";
                loading.style.backgroundColor = "#ffffff";
                loading.style.opacity = 0.8;
                let loadingMessage = document.createElement("h4");
                loadingMessage.textContent = loadingText;
                loading.appendChild(loadingMessage);
                container.appendChild(loading);
            } else {
                showLoading(true);
            }
        }

        //showLoading: controlling visibility of loading screen
        //=================================================================================================//
        function showLoading(isVisible){
            if (isVisible){
                document.getElementById("loading").style.display = "flex";
            } else {
                document.getElementById("loading").style.display = "none";
            }
        }

        //initInfoScreen: Initialization of info screen
        //==============================================================================================//
        function initInfoScreen(){
            if (!container.querySelector("[id='infoScreen'")){
                let info = document.createElement("div");
                info.setAttribute("id", "infoScreen");
                info.style.display = "none";
                info.style.position = "absolute";
                info.style.top = "0";
                info.style.left = "0";
                info.style.padding = "10px";
                info.style.zIndex = "100";
                info.style.width = "auto";
                info.style.height = "auto";
                info.style.backgroundColor = "rgba(0,151,19,0.1)";
                let infoMessage = document.createElement("p");
                infoMessage.setAttribute("id", "infoMessage");
                infoMessage.style.margin = "0px";
                info.appendChild(infoMessage);
                container.appendChild(info);
            } else {
                showLoading(true);
            }
        }

        //setTextToInfoScreen: setting text to info screen
        //=================================================================================================//
        function setTextToInfoScreen(message){;
            let inner = "";
            Object.keys(message).forEach(function(key){
                inner += `<b>${key}:</b> ${message[key]}<br>`;
            });
            document.getElementById("infoMessage").innerHTML = inner;
        }

        //showinfoScreen: controlling visibility of info screen
        //=================================================================================================//
        function showInfoScreen(isVisible){
            if (isVisible){
                document.getElementById("infoScreen").style.display = "flex";
            } else {
                document.getElementById("infoScreen").style.display = "none";
            }
        }


        //initErrorScreen: Initialization of error screen
        //==============================================================================================//
        function initErrorScreen(){
            if (!container.querySelector("[id='errorScreen'")){
                let error = document.createElement("div");
                error.setAttribute("id", "errorScreen");
                error.style.display = "none";
                error.style.position = "absolute";
                error.style.top = "0";
                error.style.right = "0";
                error.style.padding = "10px";
                error.style.zIndex = "100";
                error.style.width = "auto";
                error.style.height = "auto";
                error.style.backgroundColor = "rgba(255,0,0,0.1)";
                let errorMessage = document.createElement("p");
                errorMessage.setAttribute("id", "errorMessage");
                errorMessage.style.margin = "0px";
                errorMessage.innerHTML = `<b>3D Bar Chart</b>`;
                error.appendChild(errorMessage);
                container.appendChild(error);
            } else {
                showLoading(true);
            }
        }

        //setTextToErrorScreen: setting text to error screen
        //=================================================================================================//
        function setTextToErrorScreen(message){;
            let inner = "";
            Object.keys(message).forEach(function(key){
                inner += `<b>${key}:</b> ${message[key]}<br>`;
            });
            document.getElementById("errorMessage").innerHTML = inner;
        }

        //showErrorScreen: controlling visibility of error screen
        //=================================================================================================//
        function showErrorScreen(isVisible){
            if (isVisible){
                document.getElementById("errorScreen").style.display = "flex";
            } else {
                document.getElementById("errorScreen").style.display = "none";
            }
        }




        const scaleIntervals = [1,3,5,10,20,50,100,200,500,1000,2000,5000,10000,20000,50000,100000, 200000, 500000, 1000000, 2000000, 50000000, 10000000];

        return {
            setWidth: function(width){
                width = width;
            },
            setHeight: function(height){
                height = height;
            },
            setXAxisLabelIsEnabled: function(isEnabled){
                xAxisLabelIsEnabled = isEnabled
            },
            setXAxisLabelSize: function(size){
                xAxisLabelSize = size;
            },
            setXAxisLabelColor: function(color){
                xAxisLabelColor = color;
            },
            setYAxisLabelIsEnabled: function(isEnabled){
                yAxisLabelIsEnabled = isEnabled
            },
            setYAxisLabelSize: function(size){
                yAxisLabelSize = size;
            },
            setYAxisLabelColor: function(color){
                yAxisLabelColor = color;
            },
            setBarLabelIsEnabled: function(isEnabled){
                barLabelIsEnabled = isEnabled
            },
            setBarLabelIsVisible: function(isVisible){
                barLabelIsVisible = isVisible
            },
            setBarLabelOnMouseHoverIsEnabled: function(isEnabled){
                barLabelOnMouseHoverIsEnabled = isEnabled
            },
            setBarLabelSize: function(size){
                barLabelSize = size;
            },
            setBarLabelColor: function(color){
                barLabelColor = color;
            },
            setScaleLabelIsEnabled: function(isEnabled){
                scaleLabelIsEnabled = isEnabled
            },
            setScaleLabelSize: function(size){
                scaleLabelSize = size;
            },
            setScaleLabelColor: function(color){
                scaleLabelColor = color;
            },
            setLoading: function(text){
                loadingText = text;
            },
            setBarWidth: function(width){
                barWidth = width;
            },
            setBarLength: function(length){
                barLength = length;
            },
            setPadding: function(padding){
                padding = padding;
            },
            setPaddingTotal: function(paddingTotal){
                paddingTotal = paddingTotal;
            },

            //begin:camera
            setCameraFov: function(fov){
                fov = fov;
            },
            setCameraNear: function(near){
                near = near;
            },
            setCameraFar: function(far){
                far = far;
            },
            //end:camera

            setTotalYAxisEnabled: function(boolean){
                totalYAxisEnabled = boolean;
            },
            setTotalXAxisEnabled: function(boolean){
                totalXAxisEnabled = boolean;
            },
            setAverageIsShown: function(boolean){
                averageIsShown = boolean;
            },
            setEndOfGridHelperIsEnabled: function(boolean){
                endOfGridHelperIsEnabled = boolean;
            },
            setGridHelperType: function(boolean){
                gridHelperType = boolean;
            },
            setOpacity: function(value){
                opacity = value;
            },
            barChart: function(barData){

                //getting xAxis, yAxis and barHeight

                var yAxis = getYAxisLength(barData);
                var xAxis = getXAxisLength(barData);
                var barHeight = getBarHeight(barData);

                //mult = (barHeight > 500) ? barHeight/500 : barHeight;
                //let mult = 1;
                if (barHeight > 500){
                    mult = barHeight/500;

                    barHeight /= mult;
                } else {
                    let m = barHeight/500;
                    barLength *= m;
                    barWidth *= m;
                    padding *= m;
                    distanceBetweenChildBoxes *= m;
                    paddingTotal *= m;
                    yAxisLabelSize *= m;
                    barLabelSize *= m;
                    xAxisLabelSize *= m;
                    scaleLabelSize *= m;
                }


                //setting maxWidth, maxLength, maxHeight
                setMaxWidth(yAxis);
                setMaxLength(xAxis);
                setMaxHeight(barHeight);

                //installing camera
                const camera = getCamera();
                //Installing AmbientLight
                var ambientLight = new THREE.AmbientLight( "#ffffff", 0.1 );
                scene.add( ambientLight );

                //Installing PointLight
                var pointLight = new THREE.PointLight( "#ffffff", opacity, 18);
                pointLight.position.set( -3, 6, -3);
                pointLight.castShadow = true;
                pointLight.shadow.camera.near = 0.1;
                pointLight.shadow.camera.far = 25;
                scene.add(pointLight);

                //Installing DirectionalLight
                var directionalLight = new THREE.DirectionalLight( {color: "#ffffff" } );
                directionalLight.position.set( 3, 3, 3 );
                scene.add( directionalLight );

                // Create a renderer with Antialiasing
                var renderer = new THREE.WebGLRenderer({antialias:true});
                // Configure renderer clear color
                renderer.setClearColor("#ffffff");
                // Configure renderer size
                renderer.setSize(width, height);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.BasicShadowMap;

                //Installing OrbitControls
                const controls = new THREE.OrbitControls( camera, renderer.domElement );
                controls.enableKeys = false;
                //position of lights is updated
                controls.addEventListener( 'change', function() {
                    directionalLight.position.copy( camera.position );
                    pointLight.position.copy( camera.position );
                    ambientLight.position.copy( camera.position );
                });

                // Append Renderer to DOM

                while (container.firstChild){
                    container.removeChild(container.firstChild);
                }
                initLoading();
                initInfoScreen();
                initErrorScreen();
                const loadingManager = new THREE.LoadingManager( () => {
                    showLoading(false);
            });
                container.appendChild(renderer.domElement);


                //Drawing BarChart
                drawBarChart(barData, yAxis);
                const yAxisTotal = getYAxisTotal(barData, yAxis);
                const xAxisTotal = getXAxisTotal(barData, yAxis);


                if (totalYAxisEnabled){
                    drawBarChartYAxisTotal(yAxisTotal, barData);
                }
                if (totalXAxisEnabled){
                    drawBarChartXAxisTotal(xAxisTotal, barData);
                }

                var loader = new THREE.FontLoader(loadingManager);
                loader.load('/static/admin/integrated_visualization/fonts/Malgun Gothic_Regular.json',

                    function(font){
                        showErrorScreen(false);
                        if (yAxisLabelIsEnabled) {
                            drawYAxisLabel(barData, yAxis, font);
                        }

                        if (xAxisLabelIsEnabled){
                            drawXAxisLabel(barData, xAxis, font);
                        }

                        if (barLabelIsEnabled) {
                            drawBarChartLabel(barData, yAxis, font);
                        }

                        if (scaleLabelIsEnabled){
                            drawScaleLabel(font);
                        }

                        if (totalYAxisEnabled){
                            drawYAxisTotalLabel(font);
                            drawBarChartLabelYAxisTotal(yAxisTotal, font);
                        }

                        if (totalXAxisEnabled){
                            drawXAxisTotalLabel(font);
                            drawBarChartLabelXAxisTotal(xAxisTotal, font);
                        }
                    },
                    // onProgress callback
                    function ( xhr ) {
                        //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                    },
                    // onError callback
                    function(err) {
                        const error = new Object();
                        error["Error"] = "An error happened. Font is not found";
                        setTextToErrorScreen(error);
                        showErrorScreen(true);
                    }
                );

                const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
                if (barLabelOnMouseHoverIsEnabled){
                    cubes.forEach(function(cubeData, i) {
                        domEvents.addEventListener(cubeData.cube, 'mouseover', event => {
                            cubeData.cube.material.color.set("#ff0000");
                        if (document.getElementById("infoScreen").style.display == 'none') {
                            document.getElementById("infoScreen").style.display = 'flex';
                        }
                        setTextToInfoScreen(fullBarLabels[i].info);
                        if (barLabelIsEnabled) barLabels[i].visible = !barLabelIsVisible;
                    });
                        domEvents.addEventListener(cubeData.cube, 'mouseout', event => {
                            cubeData.cube.material.color.set(cubeData.color);
                        if (barLabelIsEnabled) barLabels[i].visible = barLabelIsVisible;
                    });
                        domEvents.addEventListener(cubeData.cube, 'click', event => {
                            boxWasClicked(fullBarLabels[i]);
                    })
                        domEvents.addEventListener(cubeData.cube, 'contextmenu', event => {
                            e = window.event;

                        var pageX = e.pageX - document.body.scrollLeft - document.documentElement.scrollLeft;
                        var pageY = e.pageY - document.body.scrollTop - document.documentElement.scrollTop;


                        // IE 8
                        if (pageX === undefined) {
                            pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                            pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                        }

                        pageX -= Math.floor(container.getBoundingClientRect().left);
                        pageY -= Math.floor(container.getBoundingClientRect().top);

                        boxContextMenuWasCalled(pageX, pageY);
                    });
                    });
                }

                const axesHelper = new THREE.AxesHelper(200);
                axesHelper.position.y = - maxHeight/2;
                scene.add(axesHelper);

                if (gridHelperType){
                    const gridHelper = new THREE.GridHelper((maxWidth > maxLength) ? maxWidth : maxLength , (xAxis > yAxis) ? xAxis : yAxis);
                    gridHelper.position.y = - maxHeight/2;
                    scene.add(gridHelper);
                } else {
                    for (let i=0; i<yAxis; i++){
                        for (let j=0; j<xAxis; j++){
                            const gridHelper = new THREE.GridHelper(barWidth + 2*padding , 1);
                            gridHelper.position.y = - maxHeight/2;
                            gridHelper.position.z = (i + 0.5) * (barWidth + 2*padding) - maxWidth/2;
                            gridHelper.position.x = (j + 0.5) * (barWidth + 2*padding) - maxLength/2;
                            scene.add(gridHelper);
                        }
                    }
                }

                drawScaleLine();

                var geo = new THREE.PlaneBufferGeometry(maxWidth, maxLength);
                var mat = new THREE.MeshBasicMaterial({ color: "#d3d3d3", side: THREE.DoubleSide });
                var plane = new THREE.Mesh(geo, mat);
                plane.rotateX(- Math.PI/2);
                plane.receiveShadow = true;

                // Render Loop
                var render = function () {
                    requestAnimationFrame( render );
                    // Render the scene
                    renderer.render(scene, camera);
                    //update();
                };
                render();

                window.addEventListener( 'resize', onWindowResize, false );

                function onWindowResize(){

                    camera.aspect = getAspect();
                    camera.updateProjectionMatrix();

                    renderer.setSize( container.clientWidth, container.clientHeight);

                }
            }
        }
    };
    if(!window.DDWV) window.DDWV = DDWV;
})();