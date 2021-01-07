/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var config = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === "https:"
};
require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});


require(["js/qlik"], function(qlik) {
    qlik.setOnError(function(error) {
        $('#popupText').append(error.message + "<br>");
        $('#popup').fadeIn(1000);
    });
    $("#closePopup").click(function() {
        $('#popup').hide();
    });

    //-------------------------------- OPENING QS APPLICATION ---------------------------------


    //open apps -- inserted here --
    var app1 = qlik.openApp(appID, config);

	var app = qlik.openApp('SCORE.qvf', config);

    //-------------------------------- DEFINING LOADING FUNCTIONS ---------------------------------
    function buildTimeBeforeLaunch(page, tab) {
        function takeTimeBeforeLaunch(reply, app) {
            $("#fltPosition0").html('<div class="dropdown">' +
                '<button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" id="ddMenuBtn" aria-haspopup=true aria-expanded="false">' +
                '<span class="fltSelected">Time before Launch</span>' +
                '<span class="caret fltObjects"></span></button>' +
                '<ul class="dropdown-menu" aria-labelledby="ddMenuBtn">' +
                '</ul>' +
                '</div>');

            $.each(reply.qListObject.qDataPages[0].qMatrix, function() {
                var item = this[0];
                $("#fltPosition0 .dropdown-menu").append('<li data-value="' + item.qText + '" class="dropdown-item"><a>' + item.qText + '</a></li>');
            });
            $("#fltPosition0 .dropdown-menu > li").on('click', function() {
                var selection = $(this).attr("data-value");
                objectStatus[page][tab].fltPosition0 = selection;
                if (selection == "Time before Launch") {
                    app1.field("Time before launch").clear();
                } else {
                    app1.field("Time before launch").selectMatch(selection.trim(), false);
                }
            });
        }

        app1.createList({
            "qFrequencyMode": "V",
            "qDef": {
                "qFieldDefs": [
                    "Time before launch"
                ]
            },
            "qExpressions": [],
            "qInitialDataFetch": [{
                "qHeight": 6,
                "qWidth": 1
            }],
            "qLibraryId": "5c7fdcad-6804-4372-ab5e-502cb7fb0767"
        }, takeTimeBeforeLaunch);
    }

    function buildTimeAfterLaunch(page, tab) {
        function takeTimeAfterLaunch(reply, app) {
            $("#fltPosition0").html('<div class="dropdown">' +
                '<button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" id="ddMenuBtn" aria-haspopup=true aria-expanded="false">' +
                '<span class="fltSelected">Time after Launch</span>' +
                '<span class="caret fltObjects"></span></button>' +
                '<ul class="dropdown-menu" aria-labelledby="ddMenuBtn">' +
                '</ul>' +
                '</div>');
            $.each(reply.qListObject.qDataPages[0].qMatrix, function() {
                var item = this[0];
                $("#fltPosition0 .dropdown-menu").append('<li data-value="' + item.qText + '" class="dropdown-item"><a>' + item.qText + '</a></li>');
            });
            $("#fltPosition0 .dropdown-menu > li").on('click', function() {
                var selection = $(this).attr("data-value");
                objectStatus[page][tab].fltPosition0 = selection;
                if (selection == "Time after Launch") {
                    app1.field("Time after launch").clear();
                } else {
                    app1.field("Time after launch").selectMatch(selection.trim(), false);
                }
            });
        }
        app1.createList({
            "qFrequencyMode": "V",
            "qDef": {
                "qFieldDefs": [
                    "Time after launch"
                ]
            },
            "qExpressions": [],
            "qInitialDataFetch": [{
                "qHeight": 6,
                "qWidth": 1
            }],
            "qLibraryId": "kxyBvjQ"
        }, takeTimeAfterLaunch);
    }

    function buildPreLeFlt() {
        $("#objPosition1 .fltPosition1").html('<div class="dropdown">' +
            '<button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" id="ddMenuBtn" aria-haspopup=true aria-expanded="false">' +
            '<span class="fltSelected">% of M&S Expenditures of all expenditures</span>' +
            '<span class="caret fltObjects"></span></button>' +
            '<ul class="dropdown-menu" aria-labelledby="ddMenuBtn">' +
            '<li data-value="1" class="dropdown-item"><a>% of M&S Expenditures of all expenditures</a></li>' +
            '<li data-value="2" class="dropdown-item"><a>KOL /MSLs Ratio</a></li>' +
            //'<li data-value="3" class="dropdown-item"><a>Nb of Targeted KOLs</a></li>' +
            //'<li data-value="4" class="dropdown-item"><a>Nb of MSLs HCs Actuals</a></li>' +
            '</ul>' +
            '</div>');

        $("#objPosition1 .fltPosition1 .dropdown-menu li").on('click', function() {
            var selection = $(this).attr("data-value");
            $("#objPosition1 .fltPosition1 .dropdown .fltSelected").text($(this).text());
            objectStatus.inMarketPerformancePage.tab1.objects.obj1.fltValue = selection;
            objectStatus.inMarketPerformancePage.tab1.objects.obj1.object = objectsMap["PreLExp" + selection];
            $("#qsObject1").empty();
            app1.getObject("qsObject1", objectStatus.inMarketPerformancePage.tab1.objects.obj1.object);
        });
        /*$("#objPosition1 .fltPosition1").html('<select class="form-control">'+
        	'<option value="1">% of M&S Expenditures of all expenditures </option>'+
        	'<option value="2">KOL /MSLs Ratio </option>'+
        	'<option value="3">Nb of Targeted KOLs </option>'+
        	'<option value="4">Nb of MSLs HCs Actuals</option>'+
        	'</select>');*/
        /*$("#objPosition1 .fltPosition1 > select").on('change', function() {
        	var selection = $(this).val();
        	objectStatus.inMarketPerformancePage.tab1.objects.obj1.fltValue = selection;
        	objectStatus.inMarketPerformancePage.tab1.objects.obj1.object = objectsMap["PreLExp"+selection];
        	$("#qsObject1").empty();
        	app1.getObject("qsObject1", objectStatus.inMarketPerformancePage.tab1.objects.obj1.object);
        });*/
    }

    function buildHCPsFlt() {
        $("#objPosition2 .fltPosition1").html('<div class="dropdown">' +
            '<button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" id="ddMenuBtn" aria-haspopup=true aria-expanded="false">' +
            '<span class="fltSelected">Number of HCPs in Trials</span>' +
            '<span class="caret fltObjects"></span></button>' +
            '<ul class="dropdown-menu" aria-labelledby="ddMenuBtn">' +
            '<li data-value="HCP" class="dropdown-item"><a>Number of HCPs in Trials</a></li>' +
            '<li data-value="Centers" class="dropdown-item"><a>Number of Centers in Clinical Trials</a></li>' +
            '</ul>' +
            '</div>');
        $("#objPosition2 .fltPosition1 .dropdown-menu li").on('click', function() {
            var selection = $(this).attr("data-value");
            $("#objPosition2 .fltPosition1 .dropdown .fltSelected").text($(this).text());
            objectStatus.inMarketPerformancePage.tab1.objects.obj2.fltValue = selection;
            $("#qsObject2").empty();
            var objectName = "NumberOf" + selection;
            objectStatus.inMarketPerformancePage.tab1.objects.obj2.object = objectsMap[objectName];
            objectStatus.inMarketPerformancePage.tab1.objects.obj2.objectUniverse = objectsMap[objectName + "Universe"];
            app1.getObject("qsObject2", objectStatus.inMarketPerformancePage.tab1.objects.obj2.object);
            app1.getObject("qsObject2hdn", objectStatus.inMarketPerformancePage.tab1.objects.obj2.objectUniverse);
        });

        /*$("#objPosition2 .fltPosition2").html('<select class="form-control">'+
        	'<option value="HCP">Number of HCPs in Trials</option>'+
        	'<option value="Centers">Number of Centers in Clinical Trials</option>'+
        '</select>');
        $("#objPosition2 .fltPosition2 > select").on('change', function() {
        	var selection = $(this).val();
        	objectStatus.inMarketPerformancePage.tab1.objects.obj2.fltValue = selection;
        	$("#qsObject2").empty();
        	var objectName = "NumberOf"+selection;
        	objectStatus.inMarketPerformancePage.tab1.objects.obj2.object = objectsMap[objectName];
        	objectStatus.inMarketPerformancePage.tab1.objects.obj2.objectUniverse = objectsMap[objectName+"Universe"];
        	app1.getObject("qsObject2", objectStatus.inMarketPerformancePage.tab1.objects.obj2.object);
        	app1.getObject("qsObject2hdn", objectStatus.inMarketPerformancePage.tab1.objects.obj2.objectUniverse);
        });*/
    }

    function buildSwitchBtn(obj, btnPosition, tab) {
        var selector = "#objPosition" + obj + " .fltPosition" + btnPosition;
        var objJS = objectStatus[objectStatus.currentPage][tab].objects["obj" + obj];
        if (objJS.switchBtn == "off") {
            $(selector).html('<div class="switchBtn"><p><span class="switchBtnText">' +
                objJS.switchBtnLabel + '</span>' +
                '<img class="switchBtn" src="images/switch_off.png"/></p></div>');
        } else {
            $(selector).html('<div class="switchBtn"><p><span class="switchBtnText">' +
                objJS.switchBtnLabel + '</span>' +
                '<img class="switchBtn" src="images/switch_on.png"/></p></div>');
        }
        $(selector + " img").on('click', function() {
            var objJS = objectStatus[objectStatus.currentPage][tab].objects["obj" + obj];
            var objName = objJS.objectName;
            var brandValue = objectStatus.filterBar.brand.replace(" ", "");
            var fltValue = objJS.fltValue;
            switch (objName) {
                case "Heatmap":
                    brandValue = "";
                    countryValue = "";
                    break;
                case "PreLExp":
                    brandValue = "";
                    break;
                case "NumberOf":
                    brandValue = "";
                    break;
                case "RxBreadth":
                    switch (brandValue) {
                        case "COSENTYXPSA":
                            brandValue = "COSENTYXSPA";
                            fltValue = "";
                            break;
                        case "COSENTYXPSO":
                            brandValue = "COSENTYXPSO";
                            fltValue = "";
                            break;
                        case "COSENTYXSPA":
                            brandValue = "COSENTYXSPA";
                            fltValue = "";
                            break;    
                
                    }
                    break;
                case "RxDepth":
                    if(switchValue == 'Line'){
                        $('#objPosition2 .legend').show()
                    }else{
                        $('#objPosition2 .legend').hide()
                    }
                    console.log(objJS.switchValue)
                    break;
                case "SalesPerCapita":
                    if (brandValue == "COSENTYXAS" || brandValue == "COSENTYXPSA" || brandValue == "COSENTYXPSO") {
                        brandValue = "Cosentyx";
                    }
                    break;
                case "HighImpactLeadership":
                    brandValue = "";
                    break;
                case "CallPlanAdherence":
                    brandValue = "";
                    break;                    
                case "ShareOfVoice":
                    brandValue = '';
                    break;
                    // if (brandValue == "COSENTYXAS" || brandValue == "COSENTYXPSA") {
                    //     brandValue = "COSENTYXSPA";
                    //     break;
                    // }
                    // if (brandValue != "COSENTYXSPA") {
                    //     brandValue = "COSENTYXPSO";
                    //     break;
                    // }
                case 'TgtPatShareNaive':
                    if (brandValue == 'COSENTYX' || brandValue == 'COSENTYXAS' || brandValue == 'COSENTYXPSA' || brandValue == 'COSENTYXSPA' || brandValue == 'COSENTYXPSO' ) {
                        brandValue = "COSENTYX";
                    }
                    break;
                case 'TgtPatShareNRxMark':
                    if (brandValue == 'COSENTYX' || brandValue == 'COSENTYXAS' || brandValue == 'COSENTYXPSA' || brandValue == 'COSENTYXSPA' || brandValue == 'COSENTYXPSO' ) {
                        brandValue = "COSENTYX";
                    }
                    break;
                case 'TgtPatShareSwitch':
                    if (brandValue == 'COSENTYX' || brandValue == 'COSENTYXAS' || brandValue == 'COSENTYXPSA' || brandValue == 'COSENTYXSPA' || brandValue == 'COSENTYXPSO' ) {
                        brandValue = "COSENTYX";
                    }
                    break;                                        
                default:
                    switch (brandValue) {
                        case "COSENTYXAS":
                            break;
                        case "COSENTYXPSA":
                            break;
                        case "COSENTYXPSO":
                            break;
                        default:
                            brandValue = "";
                            break;
                    }
            }

            var fullObjName = objName + brandValue + fltValue;
            console.log(objName)
            switch (objJS.switchBtn) {
                case "off":
                    if (objJS.switchBtnLabel.indexOf("History") != -1) {
                        $("#qsObject" + obj + "hdn").show();
                        objJS.switchValue = "";
                    }
                    if (objJS.switchBtnLabel.indexOf("Country") != -1) {
                        objJS.switchValue = "Brand";
                    }
                    if (objJS.switchBtnLabel.indexOf("Universe") != -1) {
                        $("#qsObject" + obj + "hdn").show();
                        objJS.switchValue = "";
                    }
                    if (objJS.switchBtnLabel.indexOf("Line") != -1) {
                        objJS.switchValue = "Line";
                    }
                    if (objJS.switchBtnLabel.indexOf("Bar") != -1) {
                        objJS.switchValue = "Bar";
                    }
                    var switchValue = objJS.switchValue;
                    if (switchValue == "Line" && objName == "ShareOfVoice") {
                        fullObjName = objName;
                    }
                    var fullObjName = fullObjName + switchValue;
                    objJS.object = objectsMap[fullObjName];
                    $("#qsObject" + obj).empty();
                    console.log(fullObjName)
                    if (objJS.object) {
                        app1.getObject("qsObject" + obj, objJS.object);
                    }
                    $(selector + " img").attr("src", "images/switch_on.png");
                    
                    objJS.switchBtn = "on";
                    break;

                case "on":
                    if (objJS.switchBtnLabel.indexOf("History") != -1) {
                        $("#qsObject" + obj + "hdn").hide();
                        objJS.switchValue = "";
                    }
                    if (objJS.switchBtnLabel.indexOf("Country") != -1) {
                        objJS.switchValue = "Country";
                    }
                    if (objJS.switchBtnLabel.indexOf("Universe") != -1) {
                        $("#qsObject" + obj + "hdn").hide();
                        objJS.switchValue = "";
                    }
                    if (objJS.switchBtnLabel.indexOf("Line") != -1) {
                        objJS.switchValue = "Bar";
                    }
                    if (objJS.switchBtnLabel.indexOf("Bar") != -1) {
                        objJS.switchValue = "Line";
                    }
                    var switchValue = objJS.switchValue;
                    if (switchValue == "Line" && objName == "ShareOfVoice") {
                        fullObjName = objName;
                    }
                    var fullObjName = fullObjName + switchValue;
                    objJS.object = objectsMap[fullObjName];
                    $("#qsObject" + obj).empty();
                    if (objJS.object) {
                        app1.getObject("qsObject" + obj, objJS.object);
                    }
                    $(selector + " img").attr("src", "images/switch_off.png");
                    
                    objJS.switchBtn = "off";
                    break;
            }
            if (switchValue == "Line" && objName == "RxDepth") {
                $('#objPosition2 #legend2').hide()
            }
            if (switchValue == "Bar" && objName == "RxDepth") {
                $('#objPosition2 #legend2').show()
            }

            if (switchValue == "Line" && objName == "RxBreadth") {
                $('#objPosition1 #legend1').hide()
            }
            if (switchValue == "Bar" && objName == "RxBreadth") {
                $('#objPosition1 #legend1').show()
            }
            console.log(objName, switchValue)
            qlik.resize();
        });

 
    }

    function buildToPFlt() {
        $("#objPosition1 .fltPosition1").html('<div class="dropdown">' +
            '<button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" id="ddMenuBtn" aria-haspopup=true aria-expanded="false">' +
            '<span class="fltSelected">Filter on type of physician</span>' +
            '<span class="caret fltObjects"></span></button>' +
            '<ul class="dropdown-menu" aria-labelledby="ddMenuBtn">' +
            '<li data-value="HF" class="dropdown-item"><a>HF Specialists</a></li>' +
            '<li data-value="PC" class="dropdown-item"><a>Primary Care</a></li>' +
            '</ul>' +
            '</div>');

            $("#qsObject1").empty();
            var objName = objectStatus.inMarketPerformancePage.tab2.objects.obj1.objectName;
            var switchValue = objectStatus.inMarketPerformancePage.tab2.objects.obj1.switchValue;
            var brandValue = objectStatus.filterBar.brand;
            if (brandValue != "COSENTYXAS" && brandValue != "COSENTYXPSA" && brandValue != "COSENTYXPSO") {
                brandValue = "ENTRESTO";
            }
            var fullObjName = objName + brandValue + "HF" + switchValue;
            console.log(fullObjName)
            objectStatus.inMarketPerformancePage.tab2.objects.obj1.object = objectsMap[fullObjName];
            app1.getObject("qsObject1", objectStatus.inMarketPerformancePage.tab2.objects.obj1.object);

        $("#objPosition1 .fltPosition1 .dropdown-menu li").on('click', function() {
            var selection = $(this).attr("data-value");
            objectStatus.inMarketPerformancePage.tab2.objects.obj1.fltValue = selection;
            $("#qsObject1").empty();
            var objName = objectStatus.inMarketPerformancePage.tab2.objects.obj1.objectName;
            var switchValue = objectStatus.inMarketPerformancePage.tab2.objects.obj1.switchValue;
            var brandValue = objectStatus.filterBar.brand;
            if (brandValue != "COSENTYXAS" && brandValue != "COSENTYXPSA" && brandValue != "COSENTYXPSO") {
                brandValue = "ENTRESTO";
            }
            var fullObjName = objName + brandValue + selection + switchValue;
            objectStatus.inMarketPerformancePage.tab2.objects.obj1.object = objectsMap[fullObjName];
            app1.getObject("qsObject1", objectStatus.inMarketPerformancePage.tab2.objects.obj1.object);
        });
    }

    function prepareHeader() {
        $("#navLogo").click(function() {
            loadPage1();
        });        
        $(".homeBtn").click(function() {
            loadPage1();
        });
        $(".impBtn").click(function() {
            loadPage2(1);
        });
        $(".opeBtn").click(function() {
            loadPage3(1);
        });
        $(".leBtn").click(function() {
            loadPage5(1);
        });
        $(".teBtn").click(function() {
            loadPage4(1);
        });
    }

    function updateTabs() {
                var currentPage = objectStatus.currentPage;
                var currentTab = objectStatus.currentTab;
                console.log(objectStatus.filterBar.brand, 1, currentPage, currentTab)
                switch (currentPage) {
                    case "inMarketPerformancePage":
                        for (var QSobj in objectStatus[currentPage][currentTab].objects) {
                            var currentObject = "qsObject" + QSobj.replace("obj", "");
                            var objName = objectStatus[currentPage][currentTab].objects[QSobj].objectName;
                            var switchValue = objectStatus[currentPage][currentTab].objects[QSobj].switchValue;
                            var fltValue = objectStatus[currentPage][currentTab].objects[QSobj].fltValue;
                            var brandValue = objectStatus.filterBar.brand.replace(" ", "");
							$('#fltPosition5').html(('<div class="dropdown">' +
                                '<button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" id="ddMenuBtn" aria-haspopup=true aria-expanded="false">' +
                                '<span class="fltSelected">Cosentyx / Biologics</span>' +
                                '<span class="caret fltObjects"></span></button>' +
                                '<ul class="dropdown-menu" aria-labelledby="ddMenuBtn">' +
                                '<li data-value="1" class="dropdown-item" id="fltPos5"><a>Cosentyx / Biologics</a></li>' +
                                '<li data-value="2" class="dropdown-item" ><a id="fltPos6">Biologics / Population</a></li>' +
                                '</ul>' +
                                '</div>')).hide();
							$('#fltPosition6').text('').hide();

                            if (brandValue != "COSENTYXAS" && brandValue != "COSENTYXPSA" && brandValue != "COSENTYXPSO") {
								if (currentTab == "tab3" && brandValue == "COSENTYX") {
                               		//brandValue = brandValue;
									$('#fltPosition5').show();
									$('#fltPosition6').show();
									//app1.getObject('fltPos5', objectStatus[currentPage][currentTab].fltPosition5)
									//app1.getObject('fltPosition6', objectStatus[currentPage][currentTab].fltPosition6)
                            	}
                            }
                            if (currentTab == "tab1") {
                                if (objName == "PreLExp" || objName == "NumberOf") {
                                    brandValue = "";
                                }
                            }
                            if (currentTab == "tab2") {
                                
                                if (brandValue == "ENTRESTO") {
                                    
                                    $(".fltPosition1").show();
                                    if($('#objPosition1 .fltPosition2b').length === 0){
                                        $("#objPosition1").append('<div class="objFilters" style="margin-top: 30px">	<table><tbody><tr><td class="" style=""></td><td class="fltPosition2b" switchvalue="off" style="display: table-cell;"><div class="switchBtn"><p><span class="switchBtnText">Show Data in Bar Chart</span><img class="switchBtn" src="images/switch_off.png"></p></div></td></tr></tbody></table></div><div id="qsObject1hdn" class="qvobject qvobjectHdn"></div>');
                                        $('.fltPosition2b img').on('click', function() {
                                            console.log(1)
                                            $("#qsObject1hdn").empty();
                                            if($('.fltPosition2b').attr('switchvalue') == 'off'){
                                                $('.fltPosition2b').attr('switchvalue', 'on')
                                                $('.fltPosition2b img').attr("src", "images/switch_on.png");
                                                app1.getObject('qsObject1hdn', objectStatus.inMarketPerformancePage.tab2.objects.obj1.objectByBrandBar);
                                                setTimeout(function(){
                                                    $('#qsObject1hdn').append('<div class="legend" id="legend1" style=""><div class="legend-square" style="background-color:#e74c3c"></div><div class="legend-text">below 70%</div><div class="legend-square" style="background-color:#f1c40e"></div><div class="legend-text">80-70%</div><div class="legend-square" style="background-color:#2ecc71"></div><div class="legend-text">90-80%</div><div class="legend-square" style="background-color:#20854b"></div><div class="legend-text">100-90%</div></div>')
                                                }, 500)
                                                
                                            }else{
                                                $('.fltPosition2b').attr('switchvalue', 'off')
                                                $('.fltPosition2b img').attr("src", "images/switch_off.png");
                                                app1.getObject('qsObject1hdn', objectStatus.inMarketPerformancePage.tab2.objects.obj1.objectByBrand);
                                            }
                                                
                                        });
                                    }
                                    $('#qsObject1hdn').show();
                                    buildToPFlt();
                                    
                                    app1.getObject('qsObject1hdn', objectStatus.inMarketPerformancePage.tab2.objects.obj1.objectByBrand);
                                }
                                if ( brandValue && brandValue != 'Brand' ) {
                                    buildSwitchBtn(1, 2, 'tab2');
                                    buildSwitchBtn(2, 2, 'tab2');
                                    $('.fltPosition2').show()
                                }else{ 
                                    $('.fltPosition2').hide()
                                }
                                if (brandValue != "ENTRESTO") {
                                    $('#qsObject1hdn').hide();
                                    fltValue = "";
                                    $(".fltPosition1").hide()
                                }
                                if (objName == "RxBreadth" && (brandValue == "COSENTYXAS" || brandValue == "COSENTYXPSA")) {
                                    //brandValue = "COSENTYXSPA";
                                    $(".fltPosition4").hide();
                                }
                                if (objName == "RxBreadth" && brandValue == "ENTRESTO") {
                                    $(".fltPosition4").show();
                                }
                            }

                            if(brandValue == 'Brand'){
                                brandValue = ''
                            }

                            var fullObjName = objName + brandValue + fltValue + switchValue;
                            objectStatus[currentPage][currentTab].objects[QSobj].object = objectsMap[fullObjName];
                            if(objectStatus[currentPage][currentTab].objects[QSobj].object){
                                app1.getObject(currentObject, objectStatus[currentPage][currentTab].objects[QSobj].object);
                                $('#'+currentObject).parent().parent().find('.fltPosition2').removeClass('hidden')
                            }else{
                                if(brandValue == ''){
                                    $('#'+currentObject).html('<center>Please select a Brand</center>') 
                                }else{
                                    $('#'+currentObject).html('<center>The selection generated no data</center>') 
                                }
                                $('.legend, .legendLabel').hide()
                                $('#'+currentObject).parent().parent().find('.fltPosition2').addClass('hidden')
                                console.log($('#'+currentObject).parent().parent().find('.fltPosition2'))
                            }
                            if(objectStatus.inMarketPerformancePage[currentTab].objects['obj1'].switchValue === 'Line'){
                                $("#objPosition1 #legend").hide()
                            }

                            if(objectStatus.inMarketPerformancePage[currentTab].objects['obj2'].switchValue === 'Line'){
                                $("#objPosition2 #legend").hide()
                            }

							if(currentTab == "tab3" && brandValue == "COSENTYX"){
								$('#fltPosition5 #fltPos5').click(function(){
									app1.getObject('qsObject1', objectsMap['PPvPCOSENTYXLine']);
									app1.getObject('qsObject2', objectsMap['PPvPCOSENTYXBar']);
                                    $('.fltSelected').text($(this).text())
								});
								$('#fltPosition5 #fltPos6').click(function(){
									app1.getObject('qsObject1', objectsMap['PPvPCOSENTYXLineBP']);
									app1.getObject('qsObject2', objectsMap['PPvPCOSENTYXBarBP']);
                                    $('.fltSelected').text($(this).text())

								});								
							}
                        }
                        break;
                    case "operationalExecutionPage":
                        $('#fltPosition5').hide();
                        for (var QSobj in objectStatus[currentPage][currentTab].objects) {
                            var currentObject = "qsObject" + QSobj.replace("obj", "");
                            var objName = objectStatus[currentPage][currentTab].objects[QSobj].objectName;
                            var switchValue = objectStatus[currentPage][currentTab].objects[QSobj].switchValue;
                            var fltValue = objectStatus[currentPage][currentTab].objects[QSobj].fltValue;
                            var brandValue = objectStatus.filterBar.brand.replace(" ", "");
                            var switchValue = '';
                            if (currentTab == 'tab1') {
                                var switchValue = QSobj.replace("obj", "") == 1 ? 'Line' : 'Bar';
                            }
                            if (brandValue == 'Brand') {
                                brandValue = "";
                                $('#fltPosition5').hide()
                            }

                            if (currentTab == 'tab1' && (brandValue == 'COSENTYX' || brandValue == 'COSENTYXAS' || brandValue == 'COSENTYXPSA' || brandValue == 'COSENTYXSPA' || brandValue == 'COSENTYXPSO') ) {
                                brandValue = "COSENTYX";
                                $('#fltPosition5').html(('<div class="dropdown">' +
                                '<button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" id="ddMenuBtn" aria-haspopup=true aria-expanded="false">' +
                                '<span class="fltSelected">Dynamic ' + fltValue + ' Share</span>' +
                                '<span class="caret fltObjects"></span></button>' +
                                '<ul class="dropdown-menu" aria-labelledby="ddMenuBtn">' +
                                '<li data-value="Naive" class="dropdown-item" id="fltPos5"><a>Dynamic Naive Share</a></li>' +
                                '<li data-value="Switch" class="dropdown-item" ><a id="fltPos6">Dynamic Switch Share</a></li>' +
                                '<li data-value="Market" class="dropdown-item" ><a id="fltPos7">Dynamic Market Share</a></li>' +
                                '</ul>' +
                                '</div>')).show()

                                $("#fltPosition5 .dropdown-menu li").on('click', function() {
                                    var selection = $(this).attr("data-value");
                                    fltValue = selection;
                                    $("#qsObject1").empty();
                                    $("#qsObject2").empty();
                                    $('#fltPosition5 .fltSelected').text('Dynamic ' + fltValue + ' Share')                                   
                                    var fullObjName1 = objName + fltValue + brandValue + 'Line';
                                    var fullObjName2 = objName + fltValue + brandValue + 'Bar';
                                    objectStatus[currentPage][currentTab].objects['obj1'].object = objectsMap[fullObjName1];
                                    objectStatus[currentPage][currentTab].objects['obj2'].object = objectsMap[fullObjName2];
                                    console.log(fullObjName1, fullObjName2)
                                    app1.getObject('qsObject1', objectStatus[currentPage][currentTab].objects['obj1'].object);
                                    app1.getObject('qsObject2', objectStatus[currentPage][currentTab].objects['obj2'].object);
                                });
                                $('.legend').show()
                            }

                            if (currentTab == 'tab1' && brandValue == 'ENTRESTO' ) {
                                fltValue = 'NRx';
                                $('#fltPosition5').html(('<div class="dropdown">' +
                                '<button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" id="ddMenuBtn" aria-haspopup=true aria-expanded="false">' +
                                '<span class="fltSelected">Entresto ' + fltValue + '</span>' +
                                '<span class="caret fltObjects"></span></button>' +
                                '<ul class="dropdown-menu" aria-labelledby="ddMenuBtn">' +
                                '<li data-value="Naive" class="dropdown-item" id="fltPos5"><a>Entrersto Naive</a></li>' +
                                '<li data-value="NRx" class="dropdown-item" ><a id="fltPos6">Entrersto NRx</a></li>' +
                                '</ul>' +
                                '</div>')).hide()

                                $("#fltPosition5 .dropdown-menu li").on('click', function() {
                                    var selection = $(this).attr("data-value");
                                    fltValue = selection;
                                    $("#qsObject1").empty();
                                    $("#qsObject2").empty();
                                    $('#fltPosition5 .fltSelected').text('Entresto ' + fltValue)                                   
                                    var fullObjName1 = objName + fltValue + brandValue + 'Line';
                                    var fullObjName2 = objName + fltValue + brandValue + 'Bar';
                                    objectStatus[currentPage][currentTab].objects['obj1'].object = objectsMap[fullObjName1];
                                    objectStatus[currentPage][currentTab].objects['obj2'].object = objectsMap[fullObjName2];
                                    console.log(fullObjName1, fullObjName2)
                                    app1.getObject('qsObject1', objectStatus[currentPage][currentTab].objects['obj1'].object);
                                    app1.getObject('qsObject2', objectStatus[currentPage][currentTab].objects['obj2'].object);
                                });
                                $('.legend').show()
                            }

                            if (currentTab == "tab3") {
                                
                                if (brandValue == "ENTRESTO") {
                                    
                                    $(".fltPosition1").show();
                                    if($('#objPosition1 .fltPosition2b').length === 0){
                                        $("#objPosition1").append('<div class="objFilters" style="margin-top: 30px">	<table><tbody><tr><td class="" style=""></td><td class="fltPosition2b" switchvalue="off" style="display: table-cell;"><div class="switchBtn"><p><span class="switchBtnText">Show Data in Bar Chart</span><img class="switchBtn" src="images/switch_off.png"></p></div></td></tr></tbody></table></div><div id="qsObject1hdn" class="qvobject qvobjectHdn"></div>');
                                        $('.fltPosition2b img').on('click', function() {
                                            console.log(1)
                                            $("#qsObject1hdn").empty();
                                            if($('.fltPosition2b').attr('switchvalue') == 'off'){
                                                $('.fltPosition2b').attr('switchvalue', 'on')
                                                $('.fltPosition2b img').attr("src", "images/switch_on.png");
                                                app1.getObject('qsObject1hdn', objectStatus.operationalExecutionPage.tab2.objects.obj1.objectByBrandBar);
                                                setTimeout(function(){
                                                    $('#qsObject1hdn').append('<div class="legend" id="legend1" style=""><div class="legend-square" style="background-color:#e74c3c"></div><div class="legend-text">below 70%</div><div class="legend-square" style="background-color:#f1c40e"></div><div class="legend-text">80-70%</div><div class="legend-square" style="background-color:#2ecc71"></div><div class="legend-text">90-80%</div><div class="legend-square" style="background-color:#20854b"></div><div class="legend-text">100-90%</div></div>')
                                                }, 500)
                                                
                                            }else{
                                                $('.fltPosition2b').attr('switchvalue', 'off')
                                                $('.fltPosition2b img').attr("src", "images/switch_off.png");
                                                app1.getObject('qsObject1hdn', objectStatus.operationalExecutionPage.tab2.objects.obj1.objectByBrand);
                                            }
                                                
                                        });
                                    }
                                    $('#qsObject1hdn').show();
                                    buildToPFlt();
                                    
                                    app1.getObject('qsObject1hdn', objectStatus.operationalExecutionPage.tab2.objects.obj1.objectByBrand);
                                }
                                if ( brandValue && brandValue != 'Brand' ) {
                                    buildSwitchBtn(1, 2, 'tab2');
                                    buildSwitchBtn(2, 2, 'tab2');
                                    $('.fltPosition2').show()
                                }else{ 
                                    $('.fltPosition2').hide()
                                }
                                if (brandValue != "ENTRESTO") {
                                    $('#qsObject1hdn').hide();
                                    fltValue = "";
                                    $(".fltPosition1").hide()
                                }
                                if (objName == "RxBreadth" && (brandValue == "COSENTYXAS" || brandValue == "COSENTYXPSA")) {
                                    //brandValue = "COSENTYXSPA";
                                    $(".fltPosition4").hide();
                                }
                                if (objName == "RxBreadth" && brandValue == "ENTRESTO") {
                                    $(".fltPosition4").show();
                                }
                            }

                            if(brandValue == 'Brand'){
                                brandValue = ''
                            }

                            if (currentTab == 'tab2') {
                                brandValue = '';
                            }

                            var fullObjName = objName + fltValue + brandValue + switchValue;
                            console.log(fullObjName);
                            objectStatus[currentPage][currentTab].objects[QSobj].object = objectsMap[fullObjName];
                            if(objectStatus[currentPage][currentTab].objects[QSobj].object){
                                app1.getObject(currentObject, objectStatus[currentPage][currentTab].objects[QSobj].object);
                                $('#'+currentObject).parent().parent().find('.fltPosition2').removeClass('hidden')
                            }else{
                                if(brandValue == ''){
                                    $('#'+currentObject).html('<center>Please select a Brand</center>') 
                                }else{
                                    $('#'+currentObject).html('<center>The selection generated no data</center>') 
                                }
                                $('.legend, .legendLabel').hide()
                                $('#'+currentObject).parent().parent().find('.fltPosition2').addClass('hidden')
                                console.log($('#'+currentObject).parent().parent().find('.fltPosition2'))
                            }
                            if(objectStatus.operationalExecutionPage[currentTab].objects['obj1'].switchValue === 'Line'){
                                $("#objPosition1 #legend").hide()
                            }

                            if(objectStatus.operationalExecutionPage[currentTab].objects['obj2'].switchValue === 'Line'){
                                $("#objPosition2 #legend").hide()
                            }

                            if(currentTab == 'tab1'){
                                if(brandValue == '' || brandValue == 'AIMOVIG'){
                                    $('#qsObject1, #qsObject2').html('<center>Please select ENTRESTO<br>or any COSENTYX brand</center>');
                                    $('.legend').hide()
                                }
                            }
                        }
                        break;
                    case "launchExecutionPage":
                        for (var QSobj in objectStatus[currentPage][currentTab].objects) {
                            var currentObject = "qsObject" + QSobj.replace("obj", "");
                            var objName = objectStatus[currentPage][currentTab].objects[QSobj].objectName;
                            var switchValue = objectStatus[currentPage][currentTab].objects[QSobj].switchValue;
                            var fullObjName = objName + switchValue;
                            objectStatus[currentPage][currentTab].objects[QSobj].object = objectsMap[fullObjName];
                            if(objectStatus[currentPage][currentTab].objects[QSobj].object){
                                app1.getObject(currentObject, objectStatus[currentPage][currentTab].objects[QSobj].object);
                            }
                        }
                        break;
                    case 'teamEngagementPage':
                        $('#fltPosition5').hide()
                        for (var QSobj in objectStatus[currentPage][currentTab].objects) {

                            var currentObject = "qsObject" + QSobj.replace("obj", "");
                            var objName = objectStatus[currentPage][currentTab].objects[QSobj].objectName;
                            var switchValue = objectStatus[currentPage][currentTab].objects[QSobj].switchValue;
                            var fullObjName = objName + switchValue;
                            var fltValue = $('#fltPosition5 .fltSelected').attr('data-value');
                            objectStatus[currentPage][currentTab].objects[QSobj].object = objectsMap[fullObjName];
    
                            $('#' + currentObject).parent().parent().find('.legend').hide()
                            console.log(fullObjName)
                           
                            if(objectStatus[currentPage][currentTab].objects[QSobj].object){

                                app1.getObject(currentObject, objectStatus[currentPage][currentTab].objects[QSobj].object);
                                $('#' + currentObject).parent().parent().find('.legend').show()
                                console.log($('#' + currentObject).parent().parent().find('.legend'))
                                console.log( currentObject)
                            }
                            console.log(fltValue)
                        }
                    default:
                }
                prepareBreadcrumb(currentPage)
    }

    function prepareFilterBar() {
        app1.getObject('CurrentSelections', 'CurrentSelections');

        function takeBrand(reply, app) {
            $("#brandFlt .dropdown-menu").empty();
            //$("#brandFlt .dropdown-menu").append('<li data-value="Brand"><a>Select Brand</a></li>');
            var ii = 0;
            $.each(reply.qListObject.qDataPages[0].qMatrix, function() {
                var item = this[0];
                $("#brandFlt .dropdown-menu").append('<li data-value="' + (item.qText ? item.qText.toUpperCase() : 'Brand') + '" class="dropdown-item"><a>' + (item.qText ? item.qText.toUpperCase() : '--- No Brand Selected ---') + '</a></li>');
                if (item.qState == "O") {
                    if (ii < 1) {
                        $("#brandTitle").text("  >  " + item.qText);
                        ii++;
                    } else if (ii >= 1) {
                        $("#brandTitle").text("");
                        objectStatus.filterBar.brand = "Brand";
                        $("#brandFlt .labelText").text(objectStatus.filterBar.brand);
                    }
                }
            });

            $("#brandFlt .dropdown-menu li").on('click', function() {
                var selection = $(this).attr("data-value");
                objectStatus.filterBar.brand = selection;
                $("#brandFlt .labelText").text(objectStatus.filterBar.brand);
                app1.field("Novartis Brand").selectMatch(objectStatus.filterBar.brand.trim(), false);

                if (objectStatus.currentPage == "inMarketPerformancePage" && objectStatus.currentTab == 'tab2') {
                    $("#qsObject1").empty();
                    $("#qsObject2").empty();                
                }
                //$("#qsObject1").empty();
                //$("#qsObject2").empty();
                updateTabs()

            });

        }

        function takeCountry(reply, app) {
            $("#countryFlt .dropdown-menu").empty();
            $("#countryFlt .dropdown-menu").append('<li data-value="Country"><a>--- No Country Selected ---</a></li>');
            $.each(reply.qListObject.qDataPages[0].qMatrix, function() {
                var item = this[0];
                $("#countryFlt .dropdown-menu").append('<li data-value="' + item.qText + '" class="dropdown-item"><a>' + item.qText + '</a></li>');
                if (item.qState == "S") {
                    $("#countryTitle").text("  >  " + item.qText);
                }
                if (item.qState == "O") {
                    $("#countryTitle").text("");
                    objectStatus.filterBar.country = "Country";
                    $("#countryFlt .labelText").text(objectStatus.filterBar.country);
                }
            });
            $("#countryFlt .dropdown-menu li").on('click', function() {
                var selection = $(this).attr("data-value");
                objectStatus.filterBar.country = selection;
                $("#countryFlt .labelText").text(selection);
                //$("#countryFlt .labelText").text(selection);
                app1.field("Country").selectMatch(selection.trim(), false);
            });
        }

        function takeIndication(reply, app) {
            $("#indicationFlt .dropdown-menu").empty();
            //$("#regionFlt").append('<option value="Region">Region</option>');
            $.each(reply.qListObject.qDataPages[0].qMatrix, function() {
                var item = this[0];
                if (item.qText == objectStatus.filterBar.region) {
                    $("#indicationFlt .dropdown-menu").append('<li data-value="' + item.qText + '" class="dropdown-item"><a>' + item.qText + '</a></li>');
                } else {
                    $("#indicationFlt .dropdown-menu").append('<li data-value="' + item.qText + '" class="dropdown-item"><a>' + item.qText + '</a></li>');
                }
            });
            $("#indicationFlt .dropdown-menu li").on('click', function() {
                var selection = $(this).attr("data-value");
                objectStatus.filterBar.region = selection;
                $("#indicationFlt .labelText").text(selection);
                app1.field("Indication").selectMatch(selection.trim(), false);
            });
        }

        $('#openFilter, #filterBar .close').click(function() {
            $('#filterBarWrapper .slider').toggle('');
        })
        $('#clearFilter').click(function() {
            app1.clearAll();
        })

        app1.clearAll();


        app1.createList({
            "qFrequencyMode": "V",
            "qDef": {
                "qFieldDefs": [
                    "Country"
                ]
            },
            "qExpressions": [],
            "qInitialDataFetch": [{
                "qHeight": 10,
                "qWidth": 1
            }],
            "qLibraryId": "sLrxhpA"
        }, takeCountry);
        // app1.createList({
        //     "qFrequencyMode": "V",
        //     "qDef": {
        //         "qFieldDefs": [
        //             "Brand"
        //         ]
        //     },
        //     "qExpressions": [],
        //     "qInitialDataFetch": [{
        //         "qHeight": 15,
        //         "qWidth": 1
        //     }],
        //     "qLibraryId": "b95adbd6-917f-46c1-b061-35b5d85eee01"
        // }, takeBrand);
        app1.createList({
            "qFrequencyMode": "V",
            "qDef": {
                    "qFieldDefs": [
                            "Brand In filter"
                    ]
            },
            "qExpressions": [],
            "qInitialDataFetch": [
                    {
                            "qHeight": 20,
                            "qWidth": 1
                    }
            ],
            "qLibraryId": "AkhwWPM"
        },takeBrand);
        app1.createList({
            "qFrequencyMode": "V",
            "qDef": {
                "qFieldDefs": [
                    "Indication"
                ]
            },
            "qExpressions": [],
            "qInitialDataFetch": [{
                "qHeight": 20,
                "qWidth": 1
            }],
            "qLibraryId": "eDwnMna"
        }, takeIndication);
    }

    function updateStatus() {
        var hash = window.location.hash;
        console.log(hash)
        switch(hash){
            case '#home':
                loadPage1()
                console.log(objectStatus)
                break;
            case '#inMarketPerformance':
                loadPage2(1)
                console.log(objectStatus);
                break;                
            case '#launchExecution':
                loadPage5(1);
                console.log(objectStatus);
                break;
            case '#operational':
                loadPage3(1);
                console.log(objectStatus);
                break;
            case '#sentiment':
                loadPage4(1);
                console.log(objectStatus);
                break;
        }
    }

    function prepareFiler0() {
        setTimeout(function() {
            if ($('#fltPosition0').empty()) {
                $('#fltPosition0').addClass('hidden');
            } else {
                $('#fltPosition0').removeClass('hidden');
            }
        }, 500);
    }

    function prepareBreadcrumb(pageTitle){
        switch(pageTitle){
            case 'inMarketPerformancePage':
                pageTitle = 'In Market Performance';
                break;
            case 'launchExecutionPage':
                pageTitle = 'Launch Execution';
                break;
            case 'operationalExecutionPage':
                pageTitle = 'Operationale Execution';
                break;
            case 'teamEngagementPage':
                pageTitle = 'Team Engagement';
                break;
            default:
                pageTitle = pageTitle;
        }
        $("#pageTitle").text(pageTitle);
        if (objectStatus.filterBar.brand != "Brand") {
            $("#brandTitle").text("  >  " + objectStatus.filterBar.brand);
        } else {
            $("#brandTitle").text("");
        }
        if (objectStatus.filterBar.country != "Country") {
            $("#countryTitle").text("  >  " + objectStatus.filterBar.country);
        } else {
            $("#countryTitle").text("");
        }
    }

    function updateHistory(path){
        if(window.location.hash != path){  
            history.pushState(objectStatus, null, path);
            objectStatus = window.history.state;
        }
        window.onhashchange = function (event) {  
            updateStatus()                
        }
    }

    function populateSubItems(el){

        el.append('<div><div id="QV02kpihdn1" class="obj"></div><span class="KPIname">Ciao</span></div>')
        for (var QSobj in objectStatus.page1.QSobjects) {
            if(QSobj.indexOf('Name') === -1){
                app1.getObject(QSobj, objectStatus.page1.QSobjects[QSobj]);
            }
        }
    }

    function switchKPIto(view){
        for (var QSobj in objectStatus.page1.QSobjects) {
            if(QSobj.indexOf('Name') !== -1){
                var position = QSobj.substring(0, QSobj.indexOf('Name'));
                var objectName = objectStatus.page1.QSobjects[QSobj] + view;
                var object = objectsMap[objectName];
                app1.getObject(position, object);
            }     
        }
    }

    function preparePage1() {
        objectStatus.currentPage = "page1";

        $('#fltPosition0').hide()
        for (var QSobj in objectStatus.page1.QSobjects) {
            if(QSobj.indexOf('Name') === -1){
                app1.getObject(QSobj, objectStatus.page1.QSobjects[QSobj]);
            }
        }
        app1.field("Novartis Brand").selectMatch(objectStatus.filterBar.brand.trim(), false);

        $(document).ready(function() {
            var arrow1 = true;
            var arrow2 = true;
            var arrow3 = true;
            var arrow1a = true;
            var arrow2a = true;
            $(".icon_arrow").click(function() {
                var arrowClicked = $(this).attr("id");
                switch (arrowClicked) {
                    case "arrow1":
                        if (arrow1) {
                            $("#hdnKPI1").show();
                            $(this).attr("src", "images/icon_arrowup.png");
                            arrow1 = false;
                            break;
                        } else {
                            $("#hdnKPI1").hide();
                            $(this).attr("src", "images/icon_arrowdown.png");
                            arrow1 = true;
                            break;
                        }
                    case "arrow2":
                        if (arrow2) {
                            $("#hdnKPI2").show();
                            $(this).attr("src", "images/icon_arrowup.png");
                            arrow2 = false;
                            break;
                        } else {
                            $("#hdnKPI2").hide();
                            $(this).attr("src", "images/icon_arrowdown.png");
                            arrow2 = true;
                            break;
                        }
                    case "arrow3":
                        if (arrow3) {
                            $("#hdnKPI3").show();
                            $(this).attr("src", "images/icon_arrowup.png");
                            arrow3 = false;
                            break;
                        } else {
                            $("#hdnKPI3").hide();
                            $(this).attr("src", "images/icon_arrowdown.png");
                            arrow3 = true;
                            break;
                        }
                    case "arrow1a":
                        if (arrow1a) {
                            $("#hdnKPI1a").show();
                            $(this).attr("src", "images/icon_arrowup.png");
                            arrow1a = false;
                            break;
                        } else {
                            $("#hdnKPI1a").hide();
                            $(this).attr("src", "images/icon_arrowdown.png");
                            arrow1a = true;
                            break;
                        }
                    case "arrow2a":
                        if (arrow2a) {
                            $("#hdnKPI2a").show();
                            $(this).attr("src", "images/icon_arrowup.png");
                            arrow2a = false;
                            break;
                        } else {
                            $("#hdnKPI2a").hide();
                            $(this).attr("src", "images/icon_arrowdown.png");
                            arrow2a = true;
                            break;
                        }
                }
                setTimeout(
                    function() {
                        qlik.resize();
                    }, 100);
            });
            $("#hKPI1t1").click(function() {
                loadPage2(1);
                setTimeout(function() {
                    $("#page2 .nav a").removeClass("active");
                    $(".launchReadiness").find("a").addClass("active");
                }, 200);
            });
            $("#hKPI1t2").click(function() {
                loadPage2(2);
                setTimeout(function() {
                    $("#page2 .nav a").removeClass("active");
                    $(".customerAdoption").find("a").addClass("active");
                }, 200);
            });
            $("#hKPI1t3").click(function() {
                loadPage2(3);
                setTimeout(function() {
                    $("#page2 .nav a").removeClass("active");
                    $(".patientPotential").find("a").addClass("active");
                }, 200);
            });
            $("#hKPI2t1").click(function() {
                loadPage3(1);
                setTimeout(function() {
                    $("#page3 .nav a").removeClass("active");
                    $(".targetPatientShare").find("a").addClass("active");
                }, 200);
            });
            $("#hKPI2t2").click(function() {
                loadPage3(2);
                setTimeout(function() {
                    $("#page3 .nav a").removeClass("active");
                    $(".spreadOfPerformance").find("a").addClass("active");
                }, 200);
            });
            $("#hKPI2t3").click(function() {
                loadPage3(3);
                setTimeout(function() {
                    $("#page3 .nav a").removeClass("active");
                    $(".fieldForceEffectiveness").find("a").addClass("active");
                }, 200);
            });
            $("#hKPI3t1").click(function() {
                loadPage4(1);
                setTimeout(function() {
                    $("#page4 .nav a").removeClass("active");
                    $(".HCPSentiment").find("a").addClass("active");
                }, 200);
            });
            $("#hKPI3t2").click(function() {
                loadPage4(2);
                setTimeout(function() {
                    $("#page4 .nav a").removeClass("active");
                    $(".patientSentiment").find("a").addClass("active");
                }, 200);
            });
            $("#hKPI3t3").click(function() {
                loadPage4(3);
                setTimeout(function() {
                    $("#page4 .nav a").removeClass("active");
                    $(".teamEngagement").find("a").addClass("active");
                }, 200);
            });

            $('.KPI.KPIsrow3').click(function() {
                if($(this).hasClass('expanded')){
                    $(this).removeClass('expanded')
                    var el = $(this).find('.subitems')
                    el.empty();
                }else{
                    $(this).addClass('expanded')
                    var el = $(this).find('.subitems')
                    populateSubItems(el)
                }
                
            })

            $('#homeSwitchBtn').click(function(){
                if($(this).data('state') == 'off'){
                    $(this).data('state', 'on')
                    $(this).attr('data-state', 'on')                
                    $(this).find('img').attr('src', 'images/switch_on.png');
                    switchKPIto('B')
                }else{
                    $(this).data('state', 'off')                
                    $(this).attr('data-state', 'off')                
                    $(this).find('img').attr('src', 'images/switch_off.png');
                    switchKPIto('C')
                }
                
            })

            updateHistory('#home')
            updateTabs()
            prepareZoomButton()
        });
    }

    function preparePage2(tabSelected) {
        //app1.field("Brand").clear();
        prepareBreadcrumb('In Market Performance');
        objectStatus.currentPage = "inMarketPerformancePage";

        
        $(".objectsContainer").empty();

		$('#fltPosition5').text('').hide();
		$('#fltPosition6').text('').hide();

        var tab = "tab" + tabSelected;
        var nObjectsDisplayed = 12 / Object.keys(objectStatus.inMarketPerformancePage[tab].objects).length;
        var i = 0;
        for (var QSobj in objectStatus.inMarketPerformancePage[tab].objects) {
            i++;
            $(".objectsContainer").append('' +
                '<div id="objPosition' + i + '" class="col-sm-' + nObjectsDisplayed + '">' +
                '<div class="objFilters">' +
                '	<table>' +
                '<tr>' +
                '<td class="fltPosition1"></td>' +
                '<td class="fltPosition2"></td>' +
                '</tr>' +
                '<tr>' +
                '<td class="fltPosition3"></td>' +
                '<td class="fltPosition4"></td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '<div class="objFrame">' +
                '<div id="qsObject' + i + '" class="qvobject">' +
                '</div>' +
                '</div>' +
                '<div class="legend" id="legend' + i + '">' +
                '</div>' +
                '<div class="legendLabel" id="legendLabel' + i + '">' +
                '</div>' +
                '</div>' +
                '');
            var idElement = 'qsObject' + i;
            if (objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend != "") {
                $("#objPosition" + i + " .legendLabel").text(objectStatus[objectStatus.currentPage][tab].objects[QSobj].legendLabel);
                for (var color in objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend) {
                    $("#objPosition" + i + " .legend").append('<div class= "legend-square" style= "background-color:' + color + '"></div>' +
                        '<div class="legend-text">' + objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend[color] + '</div>');
                }
            }

            var brandValue = objectStatus.filterBar.brand.replace(" ", "");
            // if (brandValue == "COSENTYXAS" || brandValue == "COSENTYXPSO" || brandValue == "COSENTYXPSA" || brandValue == "COSENTYXSPA") {
            //     brandValue = brandValue;
            // } else {
            //     brandValue = "ENTRESTO";
            // }
            // if (tab == "tab1") {
            //     brandValue = ""
            // };
			// if(tab == "tab3" && brandValue == "COSENTYX"){
            //     brandValue = "COSENTYX"
            // }
            var objName = objectStatus.inMarketPerformancePage[tab].objects[QSobj].objectName;
            // if (objName == "RxBreadth" && (brandValue == "COSENTYXAS" || brandValue == "COSENTYXPSA")) {
            //     brandValue = "COSENTYXSPA";
            // }
            if(brandValue == 'Brand'){
                brandValue = '';
            }
            var fltValue = objectStatus.inMarketPerformancePage[tab].objects[QSobj].fltValue;
            if (objName == "RxBreadth" && brandValue != "ENTRESTO") {
                fltValue = "";
            }
            var switchValue = objectStatus.inMarketPerformancePage[tab].objects[QSobj].switchValue;
            var fullObjName = objName + brandValue + fltValue + switchValue;
            objectStatus.inMarketPerformancePage[tab].objects[QSobj].object = objectsMap[fullObjName];
            if(objectStatus.inMarketPerformancePage[tab].objects[QSobj].object){
                app1.getObject(idElement, objectStatus.inMarketPerformancePage[tab].objects[QSobj].object);
                $('.legend').show()
            }else{
                $('.legend, .legendLabel').hide()
                if(brandValue == ''){
                    $('#'+idElement).html('<center>Please select a Brand</center>') 
                }else{
                    $('#'+idElement).html('<center>The selection generated no data</center>') 
                }
            }

        }

        if (tab == "tab1") {
            objectStatus.currentTab = "tab1";
            $("#objPosition2 .objFrame").append('<div id="qsObject2hdn" class="qvobjectHdn"></div>');
            $("#objPosition1").append('<div id="qsObject1hdn" class="qvobject qvobjectHdn"></div>');
            app1.getObject('qsObject2hdn', objectStatus.inMarketPerformancePage.tab1.objects.obj2.universeObject);
            app1.getObject('qsObject1hdn', objectStatus.inMarketPerformancePage.tab1.objects.obj1.objectBrandsHistory);
            buildTimeBeforeLaunch("inMarketPerformancePage", tab);
            buildPreLeFlt();
            buildHCPsFlt();
            buildSwitchBtn(1, 2, tab);
            buildSwitchBtn(2, 2, tab);
            $("#fltPosition0").show();
        }
        if (tab == "tab2") {
            objectStatus.currentTab = "tab2";
            $('.legend').hide()
            if(objectStatus.inMarketPerformancePage[tab].objects['obj1'].switchValue == 'Bar'){
                 $("#objPosition1 .legend").show()
            }

            if(objectStatus.inMarketPerformancePage[tab].objects['obj2'].switchValue == 'Bar'){
                 $("#objPosition2 .legend").show()
            }
            if ( brandValue && brandValue != 'Brand') {
                buildSwitchBtn(1, 2, tab);
                buildSwitchBtn(2, 2, tab);
                $('.fltPosition2').show()
            }else{ 
                $('.fltPosition2').hide()
            }
            $("#fltPosition0").hide();
            if (brandValue == "ENTRESTO") {
               if($('#objPosition1 .fltPosition2b').length === 0){
                    $("#objPosition1").append('<div class="objFilters" style="margin-top: 30px">	<table><tbody><tr><td class="" style=""></td><td class="fltPosition2b" switchvalue="off" style="display: table-cell;"><div class="switchBtn"><p><span class="switchBtnText">Show Data in Bar Chart</span><img class="switchBtn" src="images/switch_off.png"></p></div></td></tr></tbody></table></div><div id="qsObject1hdn" class="qvobject qvobjectHdn"></div>');
                    $('.fltPosition2b img').on('click', function() {
                        console.log(1)
                        $("#qsObject1hdn").empty();
                        if($('.fltPosition2b').attr('switchvalue') == 'off'){
                            $('.fltPosition2b').attr('switchvalue', 'on')
                            $('.fltPosition2b img').attr("src", "images/switch_on.png");
                            app1.getObject('qsObject1hdn', objectStatus.inMarketPerformancePage.tab2.objects.obj1.objectByBrandBar);
                            setTimeout(function(){
                                $('#qsObject1hdn').append('<div class="legend" id="legend1" style=""><div class="legend-square" style="background-color:#e74c3c"></div><div class="legend-text">below 70%</div><div class="legend-square" style="background-color:#f1c40e"></div><div class="legend-text">80-70%</div><div class="legend-square" style="background-color:#2ecc71"></div><div class="legend-text">90-80%</div><div class="legend-square" style="background-color:#20854b"></div><div class="legend-text">100-90%</div></div>')
                            }, 500)
                            
                        }else{
                            $('.fltPosition2b').attr('switchvalue', 'off')
                            $('.fltPosition2b img').attr("src", "images/switch_off.png");
                            app1.getObject('qsObject1hdn', objectStatus.inMarketPerformancePage.tab2.objects.obj1.objectByBrand);
                        }
                            
                    });
                }
            }else{
                $('#qsObject1hdn').hide();
            }
        }
        if (tab == "tab3") {
            objectStatus.currentTab = "tab3";
            buildTimeAfterLaunch("inMarketPerformancePage", tab);
            //buildSwitchBtn(1,2,tab);
            $("#fltPosition0").hide();
        }

            if(window.location.hash != '#inMarketPerformance'){  
                history.pushState(objectStatus, null, "#inMarketPerformance");
                objectStatus = window.history.state;
            }
            window.onhashchange = function (event) {  
                updateStatus()                
            }
        updateTabs()
    }

    function preparePage3(tabSelected) {
        //app1.field("Brand").clear();
        objectStatus.currentPage = "operationalExecutionPage";
        
        prepareBreadcrumb("Operetional Execution")
        $(".objectsContainer").empty();
        $("#fltPosition0").empty();
        $('#fltPosition5').text('').hide();
        var tab = "tab" + tabSelected;
        var nObjectsDisplayed = 12 / Object.keys(objectStatus.operationalExecutionPage[tab].objects).length;

        if (nObjectsDisplayed == 12) {
            nObjectsDisplayed = 6;
        }
        var i = 0;
        for (var QSobj in objectStatus.operationalExecutionPage[tab].objects) {
            i++;
            $(".objectsContainer").append('' +
                '<div id="objPosition' + i + '" class="col-sm-' + nObjectsDisplayed + '">' +
                '<div class="objFilters">' +
                '	<table>' +
                '<tr>' +
                '<td class="fltPosition1"></td>' +
                '<td class="fltPosition2"></td>' +
                '</tr>' +
                '<tr>' +
                '<td class="fltPosition3"></td>' +
                '<td class="fltPosition4"></td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '<div class="objFrame">' +
                '<div id="qsObject' + i + '" class="qvobject">' +
                '</div>' +
                '</div>' +
                '<div class="legend" id="legend' + i + '">' +
                '</div>' +
                '<div class="legendLabel" id= "legendLabel' + i + '">' +
                '</div>' +
                '</div>' +
                '');
            var idElement = 'qsObject' + i;
            if (objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend != "") {
                $("#objPosition" + i + " .legendLabel").text(objectStatus[objectStatus.currentPage][tab].objects[QSobj].legendLabel);
                for (var color in objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend) {
                    $("#objPosition" + i + " .legend").append('<div class= "legend-square" style= "background-color:' + color + '"></div>' +
                        '<div class="legend-text">' + objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend[color] + '</div>');
                }
            }

            var brandValue = objectStatus.filterBar.brand.replace(" ", "");

            var objName = objectStatus.operationalExecutionPage[tab].objects[QSobj].objectName;

            var fltValue = objectStatus.operationalExecutionPage[tab].objects[QSobj].fltValue;
            var switchValue = '';
            if(tab == 'tab1'){
               var switchValue = i == 1 ? 'Line' : 'Bar';
            }

            if (brandValue == 'Brand') {
                brandValue = "";
            }

            if (brandValue == 'COSENTYX' || brandValue == 'COSENTYXAS' || brandValue == 'COSENTYXPSA' || brandValue == 'COSENTYXSPA' || brandValue == 'COSENTYXPSO' ) {
                brandValue = "COSENTYX";
                
            }

            if(tab == 'tab2'){
                brandValue = '';
                $('#page3 .legendLabel').addClass('hidden');
            }

            if(tab == 'tab3'){
                brandValue = '';
                switchValue = objectStatus.operationalExecutionPage[tab].objects[QSobj].switchValue
            }

            var fullObjName = objName + fltValue + brandValue + switchValue;
            console.log(fullObjName)
            objectStatus.operationalExecutionPage[tab].objects[QSobj].object = objectsMap[fullObjName];
            if(objectStatus.operationalExecutionPage[tab].objects[QSobj].object){
                app1.getObject(idElement, objectStatus.operationalExecutionPage[tab].objects[QSobj].object);
                $('.legend').show()
            }else{
                $('.legend, .legendLabel').hide()
                if(brandValue == ''){
                    $('#'+idElement).html('<center>Please select a Brand</center>') 
                }else{
                    $('#'+idElement).html('<center>The selection generated no data</center>') 
                }
            }
            if(tab == 'tab1'){
                if(brandValue == '' || brandValue == 'AIMOVIG'){
                    $('#qsObject1, #qsObject2').html('<center>Please select ENTRESTO<br>or any COSENTYX brand</center>');
                }
            }
        }

        if (tab == "tab1") {

            objectStatus.currentTab = "tab1";
            buildTimeAfterLaunch(objectStatus.currentPage, tab);
            //buildSwitchBtn(1,2,tab);
            $("#fltPosition0").hide();
        }
        if (tab == "tab2") {
            objectStatus.currentTab = "tab2";
            $("#fltPosition0").hide();
        }
        if (tab == "tab3") {
            objectStatus.currentTab = "tab3";
            buildSwitchBtn(1, 2, tab);
            buildSwitchBtn(2, 2, tab);
            buildSwitchBtn(3, 2, tab);
            $("#objPosition1").append('<div id="qsObject1hdn" class="qvobjectHigher"></div>');            
            $("#objPosition2").append('<div id="qsObject2hdn" class="qvobjectHigher"></div>');
            $("#objPosition3").append('<div id="qsObject3hdn" class="qvobjectHigher"></div>');
            app1.getObject('qsObject3hdn', objectStatus.operationalExecutionPage.tab3.objects.obj3.objectByBrand);
            $("#fltPosition0").hide();
        }
        var btnExist = 0;
        $(".fltPosition2").each(function() {
            if ($(this).text() != "") {
                btnExist = true;
            }
        });
        if (btnExist && $(window).width() > 999) {
            $(".fltPosition2").css("height", "56px");
        }
        if(window.location.hash != '#operational'){  
            history.pushState(objectStatus, null, "#operational");
            objectStatus = window.history.state;
        }
        window.onhashchange = function (event) {  
            updateStatus()                
        }        
        updateTabs()
    }

    function preparePage4(tabSelected) {
        //app1.field("Brand").clear();
        objectStatus.currentPage = "teamEngagementPage";
        
        prepareBreadcrumb("teamEngagementPage");

        $(".objectsContainer").empty();
        $("#fltPosition0").empty();
        var tab = "tab" + tabSelected;
        var nObjectsDisplayed = 12 / Object.keys(objectStatus.teamEngagementPage[tab].objects).length;
        if (nObjectsDisplayed == 12) {
            nObjectsDisplayed = 6;
        }
        var i = 0;

        for (var QSobj in objectStatus.teamEngagementPage[tab].objects) {
            i++;

            $(".objectsContainer").append('' +
                '<div id="objPosition' + i + '" class="col-sm-' + nObjectsDisplayed + '">' +
                '<div class="objFilters">' +
                '	<table>' +
                '<tr>' +
                '<td class="fltPosition1"></td>' +
                '<td class="fltPosition2"></td>' +
                '</tr>' +
                '<tr>' +
                '<td class="fltPosition3"></td>' +
                '<td class="fltPosition4"></td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '<div class="objFrame">' +
                '<div id="qsObject' + i + '" class="qvobject">' +
                '</div>' +
                '</div>' +
                '<div class="legend" id="legend' + i + '">' +
                '</div>' +
                '<div class="legendLabel" id= "legendLabel' + i + '">' +
                '</div>' +
                '<div class="legend1" id="legend1' + i + '">' +
                '</div>' +
                '<div class="legendLabel1" id= "legendLabel1' + i + '">' +
                '</div>' +
                '</div>' +
                '');
            var idElement = 'qsObject' + i;
            if (objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend != "") {
                if(objectStatus[objectStatus.currentPage][tab].objects[QSobj].legendLabel != ''){
                    $("#objPosition" + i + " .legendLabel").text(objectStatus[objectStatus.currentPage][tab].objects[QSobj].legendLabel);
                }else{
                    $("#objPosition" + i + " .legendLabel").addClass('hidden')
                }
                for (var color in objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend) {
                    $("#objPosition" + i + " .legend").append('<div class= "legend-square" style= "background-color:' + color + '"></div>' +
                        '<div class="legend-text">' + objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend[color] + '</div>');
                }
            }

            var brandValue = objectStatus.filterBar.brand.replace(" ", "");

            var objName = objectStatus.teamEngagementPage[tab].objects[QSobj].objectName;
 
            var fltValue = objectStatus.teamEngagementPage[tab].objects[QSobj].fltValue;
            var switchValue = objectStatus.teamEngagementPage[tab].objects[QSobj].switchValue;


            $('#' + idElement).parent().parent().find('.legend').hide()
            if(objectStatus.teamEngagementPage[tab].objects[QSobj].object){
                app1.getObject(idElement, objectStatus.teamEngagementPage[tab].objects[QSobj].object);
                $('#' + idElement).parent().parent().find('.legend').show()
            }
        }

        if (tab == "tab1") {
            objectStatus.currentTab = "tab1";
            buildSwitchBtn(1, 1, tab);
            $("#fltPosition0").hide();

        }
        if (tab == "tab2") {
            objectStatus.currentTab = "tab2";
            $("#fltPosition0").hide();
        }
 
        var btnExist = 0;
        $(".fltPosition2").each(function() {
            if ($(this).text() != "") {
                btnExist = true;
            }
        });
        if (btnExist && $(window).width() > 999) {
            $(".fltPosition2").css("height", "56px");
        }
        if(window.location.hash != '#teamengagement'){  
            history.pushState(objectStatus, null, "#teamengagement");
            objectStatus = window.history.state;
        }
        window.onhashchange = function (event) {  
            updateStatus()        
        }
        updateTabs()
    }

    function preparePage5(tabSelected) {
        //app1.field("Brand").clear();
        objectStatus.currentPage = "launchExecutionPage";
        prepareBreadcrumb("Launch Execution");
        
        $(".objectsContainer").empty();
        $("#fltPosition0").empty();
        var tab = "tab" + tabSelected;
        var nObjectsDisplayed = 12 / Object.keys(objectStatus.launchExecutionPage[tab].objects).length;
        var i = 0;
        for (var QSobj in objectStatus.launchExecutionPage[tab].objects) {
            i++;
            $(".objectsContainer").append('' +
                '<div id="objPosition' + i + '" class="col-sm-' + nObjectsDisplayed + '">' +
                '<div class="objFilters">' +
                '	<table>' +
                '<tr>' +
                '<td class="fltPosition1"></td>' +
                '<td class="fltPosition2"></td>' +
                '</tr>' +
                '<tr>' +
                '<td class="fltPosition3"></td>' +
                '<td class="fltPosition4"></td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '<div class="objFrame">' +
                '<div id="qsObject' + i + '" class="qvobject launchExecutionObject">' +
                '</div>' +
                '</div>' +
                '<div class="legendLabel" id="legendPopup">' +
                '</div>' +
                '<div class="legend">' +
                '</div>' +
                '</div>' +
                '');
            var idElement = 'qsObject' + i;
            if (objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend != "") {
                $("#objPosition" + i + " .legendLabel").text(objectStatus[objectStatus.currentPage][tab].objects[QSobj].legendLabel);
                for (var color in objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend) {
                    $("#objPosition" + i + " .legend").append('<div class= "legend-square" style= "background-color:' + color + '"></div>' +
                        '<div class="legend-text">' + objectStatus[objectStatus.currentPage][tab].objects[QSobj].legend[color] + '</div>');
                }
            }
            app1.getObject(idElement, objectStatus.launchExecutionPage[tab].objects[QSobj].object);
        }
        if (tab == "tab1") {
            objectStatus.currentTab = "tab1";
            $('#fltPosition0').hide()
            function thFromTd(td) {
                var ofs = td.offset().left;
                var table = td.closest('table');
                var trh = table.find('tr:nth-child(2)');
                var positions = cacheThPositions(trh); console.log(table, trh, positions)
                    matches = positions.filter(function(eldata) {
                    return eldata.left <= ofs;
                    }),
                    match = matches[matches.length-1];
                    var matchEl = $(match.el);
                    
                return matchEl.text() ;
            }
            function cacheThPositions(thead) {
                var data = thead.data('cached-pos'),
                    allth;
                if (data)
                return data;
                allth = thead.children('th');
                data = allth.map(function() {
                var th = $(this);
                return {
                    el: this,
                    left: th.offset().left
                };
                }).toArray();
                //thead.data('cached-pos', data);
                return data;
            }
            setTimeout(function(){
                $('body').delegate('tbody td div.value.ng-binding', 'click', function(){
                        $(this).parent().css('cursor', 'pointer')
                        var a = $(this).parent().parent().find('td:nth-child(2)').attr('title');
                        var i = $(this).parent().index();
                        var c = thFromTd($(this).parent());
                        //var c = $('tr:nth-child(2) th:nth-child(' + (parseInt(i)) + ') span');
                        var b = $('tr:nth-child(3) th:nth-child(' + (parseInt(i)) + ') span');
                        $(this).parent().attr('row', a);
                        $(this).parent().attr('col', b.text());

                        console.log(a, c, b.text(), i)

                        objectStatus.filterBar.country = c;
                        app1.field("Country").selectMatch(objectStatus.filterBar.country.trim(), false);
                        if(b.text()){
                            objectStatus.filterBar.brand = b.text();
                            app1.field("Novartis Brand").selectMatch(objectStatus.filterBar.brand.trim(), false);
                        }
                        $("#countryFlt .labelText").text(objectStatus.filterBar.country);

                        switch(a) {
                            case 'In Market Performance':
                                loadPage2(1);
                                setTimeout(function() {
                                    $("#page2 .nav a").removeClass("active");
                                    $(".launchReadiness").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'Customer Adoption':
                                loadPage2(2);
                                setTimeout(function() {
                                    $("#page2 .nav a").removeClass("active");
                                    $(".customerAdoption").find("a").addClass("active");
                                }, 200);
                            break;
                            case 'Launch Readiness':
                                loadPage2(1);
                                setTimeout(function() {
                                    $("#page2 .nav a").removeClass("active");
                                    $(".launchReadiness").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'Patient Penetration':
                                loadPage2(3);
                                setTimeout(function() {
                                    $("#page2 .nav a").removeClass("active");
                                    $(".patientPotential").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'Profitable Growth':
                                loadPage3(1);
                                setTimeout(function() {
                                    $("#page3 .nav a").removeClass("active");
                                    $(".targetPatientShare").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'Field Force Effectiveness':
                                loadPage3(3);
                                setTimeout(function() {
                                    $("#page3 .nav a").removeClass("active");
                                    $(".fieldForceEffectiveness").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'Spread of performance':
                                loadPage3(2);
                                setTimeout(function() {
                                    $("#page3 .nav a").removeClass("active");
                                    $(".spreadOfPerformance").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'New Patient':
                                loadPage3(1);
                                setTimeout(function() {
                                    $("#page3 .nav a").removeClass("active");
                                    $(".targetPatientShare").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'Sentiment':
                                loadPage4(1);
                                setTimeout(function() {
                                    $("#page4 .nav a").removeClass("active");
                                    $(".HCPSentiment").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'HCP Sentiment':
                                loadPage4(1);
                                setTimeout(function() {
                                    $("#page4 .nav a").removeClass("active");
                                    $(".HCPSentiment").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'Patient Sentiment':
                                loadPage4(2);
                                setTimeout(function() {
                                    $("#page4 .nav a").removeClass("active");
                                    $(".patientSentiment").find("a").addClass("active");
                                }, 350);
                            break;
                            case 'Team Engagement':
                                loadPage4(3);
                                setTimeout(function() {
                                    $("#page4 .nav a").removeClass("active");
                                    $(".teamEngagement").find("a").addClass("active");
                                }, 350);
                            break;
                        }
                })
                $('tbody td div.value.ng-binding').each(function(){
                    $(this).css('cursor', 'pointer')
                    

                    $(this).click(function(){
                        $(this).parent().css('cursor', 'pointer')
                        var a = $(this).parent().parent().find('td:nth-child(2)').attr('title');
                        var i = $(this).parent().index();
                        var b = jQuery('.last-top-row th:nth-child(' + (parseInt(i)) + ') span');
                        $(this).parent().attr('row', a);
                        $(this).parent().attr('col', b.text());

                        console.log(a, b.text())
                        
                        
                    })
                })
            }, 1500)

        }
        if (tab == "tab2") {}
        if (tab == "tab3") {}
        if(window.location.hash != '#launchExecution'){  
            history.pushState(objectStatus, null, "#launchExecution");
            objectStatus = window.history.state;
        }
        window.onhashchange = function (event) {  
            updateStatus()                
        }
        updateTabs()

    }

    function loadPage1() {
        $("#header_container").load("templates/header.html #header_full_mod", prepareHeader);
        $("#content").load("templates/homepage.html", preparePage1);
    }

    function loadPage2(tab) {
        $("#header_container").load("templates/header.html #header_full_mod", prepareHeader);
        $("#content").load("templates/page2.html", function() {
            preparePage2(tab);
        });
        setTimeout(function() {
            $(".launchReadiness").click(
                function() {
                    $("#page2 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage2(1)
                }
            );
            $(".customerAdoption1").click(
                function() {
                    $("#page2 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage2(2);
                }
            );
            $(".patientPotential").click(
                function() {
                    $("#page2 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage2(3)
                }
            );
        }, 500);
    }

    function loadPage3(tab) {
        $("#header_container").load("templates/header.html #header_full_mod", prepareHeader);
        $("#content").load("templates/page3.html", function() {
            preparePage3(tab);
        });
        setTimeout(function() {
            $(".fieldForceExecution").click(
                function() {
                    $("#page3 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage3(1);
                }
            );
            $(".spreadOfPerformance").click(
                function() {
                    $("#page3 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage3(2);
                }
            );
            $(".customerAdoption").click(
                function() {
                    $("#page3 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage3(3);
                }
            );
            $(".mslExecution").click(
                function() {
                    $("#page3 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage3(4);
                }
            );            
        }, 500);
    }

    function loadPage4(tab) {
        $("#header_container").load("templates/header.html #header_full_mod", prepareHeader);
        $("#content").load("templates/page4.html", function() {
            preparePage4(tab);
        });
        setTimeout(function() {
            $(".HCPSentiment").click(
                function() {
                    $("#page4 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage4(1);
                }
            );
            $(".patientSentiment").click(
                function() {
                    $("#page4 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage4(2);
                }
            );
            $(".teamEngagement").click(
                function() {
                    $("#page4 .nav a").removeClass("active");
                    $(this).find("a").addClass("active");
                    preparePage4(3);
                }
            );
        }, 500);
    }

    function loadPage5(tab) {
        $("#header_container").load("templates/header.html #header_full_mod", prepareHeader);
        $("#content").load("templates/page5.html", function() {
            preparePage5(tab);
        });
    }

    function prepareZoomButton(){
        $('.zoom').click(function(){
            var objID = '#' + $(this).attr('for');
            $(objID).parent().parent().show();
            $(objID).addClass('zoomed');
            $('.zoomed')
                .prepend('<span class="close">×</span>');
                $('.zoomed .close').click(function(){
                    $('.zoomed').removeClass('zoomed');
                    $('.close').remove();
                    qlik.resize();
                })
            qlik.resize();
        })
    }
    
    // Global variables definitions
    $(document).ready(function(){
        $("#header_container").load("templates/header.html #header_full", prepareHeader);
        $("#filterBar_container").load("templates/filterBar.html #filterBarWrapper", prepareFilterBar);
        loadPage1();
    })
    
});