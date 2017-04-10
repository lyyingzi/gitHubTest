quiryManagement = {
	//订单管理
	//询价单管理
	inquiryManage: {
		inquiryManageList: function (start) {
			var conName = $("#conName").val(); //会议名称
			var state = localStorage.searchState; //询价单状态
			if($("#state").val() != null && $("#state").val() != "" && $("#state").val() != "-1"){
				state = $('#state option:selected').val();
			}
			var startTime = ""; //会议开始时间
			if($("#overAllStartDate").val() != null && $("#overAllStartDate").val() != ""){
				startTime = util.DateToTimestamp.dateFormat($("#overAllStartDate").val());
			}	
			var endTime = ""; //会议结束时间
			if($("#overAllEndDate").val() != null && $("#overAllEndDate").val() != ""){
				endTime = util.DateToTimestamp.dateFormat($("#overAllEndDate").val());
			}
				
			var xunjiaNo =  $("#xunjiaNo").val(); //询价单号
			var operatorId =  $("#operatorId").val();  //跟进人名称
			var sendComName =  $("#sendComName").val(); //发送方公司名称
			
			localStorage.quiryStartPage = start;
			localStorage.searchConName = conName;
			localStorage.searchState = state;
			localStorage.searchStartTime = startTime;
			localStorage.searchEndTime = endTime;
			localStorage.searchQuiryNo = xunjiaNo;
			localStorage.searchOperatorId = operatorId;
			localStorage.searchSendComName = sendComName;
			var sysData = {uId: AUTOCAR.data_uId, comId: AUTOCAR.data_comId, pageSize:AUTOCAR.data_pageSize, pageNow:start, conName:conName, state:state, startTime:startTime,endTime:endTime, xunjiaNo:xunjiaNo, operatorId:operatorId, sendComName:sendComName};
			interface.inquiryManage.inquiryManageList(sysData, function (data) {
				quiryManagement.inquiryManage.generateInquiryManageTable(start, data);
			});
		},
		generateInquiryManageTable: function (start, data) {
			if (data.success == true) {
				var tr, uId, comId,    xunjiaNo, sendComId, sendComName, sendUserId, sendUserName, cId, conName, conAddress, startTime, conQuiryId, conQuiryName, resComId, resComName, sendQuiryTime, quiryAmount, state, stateDesc, newQuiry, operate, temp = $("<div></div>"); 
				$.each(data.rows, function (i, m) {
					tr = $("<tr uId=" + m.uId + "></tr>");
					xunjiaNo = $('<td>' + m.xunjiaNo + '</td>');	//询价单号
					sendComName = $('<td class="account_table_td" ><span class="name_item01" role="name-item">' + (m.sendComName === null ? '--' : m.sendComName) + '</span><div class="account_table_td_detial">' + (m.sendComName === null ? '--' : m.sendComName) +  '</div></td>');	//发送方
					sendUserName = $('<td class="account_table_td"><span class="name_item02" role="name-item">' + (m.sendUserName === null ? '--' : m.sendUserName) + '</span><div class="account_table_td_detial">' + (m.sendUserName === null ? '--' : m.sendUserName) + '</div></td>');	//发送人
					conName = $('<td class="account_table_td"><span class="name_item02" role="name-item">' + (m.conName === null ? '--' : m.conName) + '</span><div class="account_table_td_detial">' + (m.conName === null ? '--' : m.conName) +  '</div></td>');	//会议名称
					startTime = $('<td>' +  util.data.formatTableData( m.startTime )  + '</td>');	//会议开始时间
					conQuiryName = $('<td>' + m.conQuiryName + '</td>');	//会议资源
					resComName = $('<td class="account_table_td" ><span class="name_item01" role="name-item">' + (m.resComName === null ? '--' : m.resComName) + '</span><div class="account_table_td_detial">' + (m.resComName === null ? '--' : m.resComName) +  '</div></td>');//资源方
					sendQuiryTime = $('<td>' + util.data.formatTableData( m.sendQuiryTime ) + '</td>');	//发送询价时间
					quiryAmount = $('<td>' + (m.quiryAmount == null ? "--" : util.formatCurrency(m.quiryAmount) + "元") + '</td>');	//询价单金额
					stateDesc = $('<td>' + m.stateDesc + '</td>');	//状态
					operate = $("<td><a class='operate_btn' href='javascript:quiryManagement.linkQuiryDetail(\""+m.xunjiaNo+"\","+m.state+");' role='inquiry_manage_detial_label'>查看</a></td>");	//查看操作
					
					tr.append(xunjiaNo).append(sendComName).append(sendUserName).append(conName).append(startTime).append(conQuiryName).append(resComName).append(sendQuiryTime).append(quiryAmount).append(stateDesc).append(operate);
					temp.append(tr);
					
				});
				$("#inquiryManageTBody").empty().append(temp.html());
				util.pages.generatePageNav(data.total, start, "inquiry-manage", ".inquiryManage-page-nav");//分页
			}
			else if (data.code == 0001) {
				$("#inquiryManageTBody,.account_page").empty();
				util.tips.basic(data.message);
			} 
			else if (data.code == 0002) {
				$("#inquiryManageTBody,.account_page").empty();
				util.tips.basic(data.message);
			}
			else {
				util.tips.basic("获取询价单列表失败，请重试");
			}
		},	
	},

	quiryState : function (searchState){
		var sysData = {uId: AUTOCAR.data_uId,dType: 28};
		interface.public.selectSysDict(sysData, function (data) {
			var statsOption = "";
			if (data.success == true) {
				$("#state").append("<option value='-1'></option>");
				$.each(data.rows, function (i, m) {
					if (searchState == m.dCode) {
						statsOption += "<option selected='selected' value='" + m.dCode + "'>" +m.dName+ "</option>";
					} else {
						statsOption += "<option value='" + m.dCode + "'>" +m.dName+ "</option>";
					}
				});
				$("#state").append(statsOption);
			}
		});
	},
	
	linkQuiryDetail : function(quiryNo,state){
		localStorage.quiryNo = quiryNo;
		localStorage.quiryState = state;
		if(state == 400){
			localStorage.operatorType = "01";
			location.href = "../inquiryManage/sendQuiry.html";  
		} else {
			location.href = "../inquiryManage/quiryDetail.html";  
		}
	},
	
	//回复询价、修改询价
	sendQuiryDetail : function (quiryNo,state) {
		var sysData = {uId: AUTOCAR.data_uId, xunjiaNo:quiryNo};
		interface.inquiryManage.inquiryManageDetialList(sysData, function (data) {
			if (data.success == true) {
				$.each(data.rows, function (i, m) {
						var title = "";
						var titleState = "";
						var index = 0;
						var flag = true;
						for (var i = 0 ; i < m.stateList.length; i++){
							var stateList = m.stateList[i];
							title += "<span>"+stateList["stateName"]+"</span>";
							if(m.state == stateList["stateCode"]){
								index = 1;
							}
							
							if(flag && index == 0){
								titleState += "<span class='round light_round'></span>"
								titleState += "<span class='line light_line'></span>"
							} else if  (flag && index == 1){
								if (i == m.stateList.length -1){
									titleState += "<span class='round shine_round_main'><span class='shine_round'></span></span>"
								} else {
									titleState += "<span class='round shine_round_main'><span class='shine_round'></span></span>"
									titleState += "<span class='line'></span>"
								}
							} else {
								if (i == m.stateList.length -1){
									titleState += "<span class='round'></span>"
								} else {
									titleState += "<span class='round'></span>"
									titleState += "<span class='line'></span>"
								}
							}
							if(m.state == stateList["stateCode"]){
								flag = false;
							}
						}
						
						$("#quiryTitle").append(title);
						$("#progressBar").append(titleState);
						
						$("#xunjiaNo").text(m.xunjiaNo);	//询价单号
						$("#data_xunjiaNo").val(m.xunjiaNo);
						$("#sendComName").text(m.sendComName);	//发送方公司名称
						$("#sendUserName").text(m.sendUserName);	//发送人名称
						$("#sendUserPhone").text(m.sendUserPhone);	//发送人手机号
						$("#conName").text(m.conName);	//会议名称
						$("#useCarDesc").text(m.useCarDesc === null ? '' : m.useCarDesc);	//用车方式描述
						if(m.useCarType == "31001"){
							$("#bc_carTypeDescDl").hide();
						} else if (m.useCarType == "31003"){
							$("#endAddressDl").hide();
						}
						$("#airCarTypeDesc").text(m.airCarTypeDesc === null ? '' : m.airCarTypeDesc);	//类型描述（用车方式为接送/包车）有效
						$("#airTrainNo").text(m.airTrainNo === null ? '':m.airTrainNo);	//航班/车次 （用车方式为接送）有效
						$("#useCarTime").text(m.useCarTime === null ? '' :( util.data.formatData(m.useCarTime) ));
						$("#startAddress").text(m.startAddress);	//上车地点名称
						$("#endAddress").text(m.endAddress);		//下车地点名称
						$("#carTypeDesc").text(m.carTypeDesc === null ? '' : m.carTypeDesc);	//用车方式描述
						$("#seatCount").text(m.seatCount);	//座位数量
						$("#requirementDesc").text(m.requirementDesc === null ? '' : m.requirementDesc);	//需求描述
					if(m.state == 401){
						if(localStorage.operatorType == "02"){
							$("#replyButton").show();
						}
						$("#sendQuiry").text("确认修改");
						$("#stopTime").val(util.data.formatData(m.stopTime));
						$("#amount").val(util.formatAmount(m.amount));
						$("#otherDesc").val(m.otherDesc);
						
						var _newitem = "";
						for(var i = 0; i < m.quotePrice.length; i++){
							var costPriceMap = m.quotePrice[i];
							var costPrice = costPriceMap["costPrice"];
							var costName = costPriceMap["costName"];
							if(localStorage.operatorType == "02") {
								_newitem += "<dl class='add_amount_list'><input type='text' class='long_text_input02'  placeholder='花费项目' role='costName' maxlength='10' value=\""+costName+"\"><input type='text' class='long_text_input02 mleft40'  placeholder='花费金额' role='costPrice' value=\""+util.formatAmount(costPrice)+"\"><span class='delete_amount_btn mleft10' id='deleteAmountBtn'></span></dl>";
							} else {
								_newitem += "<dl class='add_amount_list'><input type='text' class='long_text_input02'  placeholder='花费项目' role='costName' maxlength='10' value=\""+costName+"\"><input type='text' class='long_text_input02 mleft40'  placeholder='花费金额' role='costPrice' value=\""+util.formatAmount(costPrice)+"\"></dl>";
							}
						}
						
						if(_newitem != ""){
							$(".add_amount_main").show();
							if(localStorage.operatorType != "02"){
								$("#inquiryAddItem").attr("id","_inquiryAddItem");
							}
							$(".add_amount_cont").append(_newitem);
						}
					} else if (m.state == 400) {
						$("#replyButton").show();
					}
					var vehicleModelId = m.vehicleModelId === null ? "" : m.vehicleModelId;
					quiryManagement.selectVehicleModel(vehicleModelId);//可选车型
				});
			}
		});
	},
	
	selectVehicleModel : function(vehicleModelId) {
		var cardata = {uId: AUTOCAR.data_uId,comId: AUTOCAR.data_comId, pageSize:AUTOCAR.data_pageSize, pageNow:0,};
		interface.infoMaintain.infoMaintainFindCarInfo(cardata, function (data) {
			if (data.success == true) {
				var vehicleModelOption = "";
				$("#vehicleModel").append("<option value='-1'></option>");
				$.each(data.rows, function (i, m) {
					if(vehicleModelId == m.vehicleModelId){
						vehicleModelOption += "<option selected='selected' value='" + m.vehicleModelId + "'>" +m.vehicleModelName+ "</option>";
					} else {
						vehicleModelOption += "<option value='" + m.vehicleModelId + "'>" +m.vehicleModelName+ "</option>";
					}
				});
				$("#vehicleModel").append(vehicleModelOption);
			}
		});
	},
		
	revertQuiry : function (quiryNo,state) {
		var operatorType = "";
		
		if(state == 400){
			operatorType = "01";
		} else if  (401) {
			operatorType = "02";
		}
		
		var isReserve = ""; //确认预订
		var vehicleModelId = "";//可选车型
		var stopTime = "";	//报价时限
		var amount = "";	//总计金额
		var costPrice = ""; //花费金额
		var costName = ""; //花费项
		var otherDesc = "";	//其它说明
		
		isReserve = $("body .btn_limit_yellow_selected").attr("value");
		if (isReserve == "01") {
			isReserve = true;
			
			vehicleModelId = $("#vehicleModel").val();
			if(vehicleModelId == null || vehicleModelId == "" || vehicleModelId == "-1"){
				alert("请选择可选车型");
				return false;
			}
			
			if($("#stopTime").val() == null || $("#stopTime").val() == ""){
				alert("请选择报价时限");
				return false;
			}

			stopTime = util.DateToTimestamp.dateFormat($("#stopTime").val());	//报价时限
			newTime = util.DateToTimestamp.dateFormat(util.nowFormatDate()); //当前时间
			if(stopTime < newTime){
				alert("报价时限不能小于当前时间");
				return false;
			}
			
			amount = $("#amount").val();	//总计金额
			if(amount == null || amount == ""){
				alert("请输入总计金额");
				return false;
			}
			
			if(!util.mRegExp.floatNum.test(amount)){
				alert("总计金额格式不正确");
				return false;
			}
			
			var checkAmount = amount.split(".");
			var checkIndex = true;
			for(var i = 0 ; i < checkAmount.length; i++){
				if(checkAmount[0].length > 7){
					checkIndex = false;
				} ;
			}
			if(!checkIndex){
				alert("总计金额过大");
				return false;
			}
			otherDesc = $("#otherDesc").val();	//其它说明
			if (otherDesc.length > 1000) {
				alert("其他说明已超过最大字数1000字");
				return false;
			}
			var costFlag = true;
			var checkCost = true;
			$("input[role='costPrice']").each(function(){
				if($(this).val() != ""){
					if(!util.mRegExp.floatNum.test($(this).val())){
						costFlag = false;
					} else {
						var costPriceList = $(this).val().split(".");
						if(costPriceList[0].length > 7){
							checkCost = false;
						}
					}
					costPrice += $(this).val() + ",";
				}
				
			});
			
			if(!costFlag){
				alert("花费项金额格式不正确");
				return false;
			}
			
			if(!checkCost){
				alert("花费项金额过大");
				return false;
			}
			
			var checkCostName = true;
			$("input[role='costName']").each(function(){
				if($(this).val() != ""){
					if($(this).val().length > 5){
						checkCostName = false;
					}
					costName += $(this).val()+",";
				}
			});
			
			if (costPrice != "" && costName == "") {
				alert("请输入花费项名称");
				return false;
			}
			
			if (costPrice == "" && costName != "") {
				alert("请输入花费项金额");
				return false;
			}
			
			if (!checkCostName) {
				alert("花费项名称过长");
				return false;
			}
			
			if(costName != "" && costPrice != ""){
				costName = costName.substring(0,costName.length-1);
				costPrice = costPrice.substring(0,costPrice.length-1);
			}
		} else if (isReserve == "00") {
			isReserve = false;
		}
		
		var sysData = {uId: AUTOCAR.data_uId,equipment:3,operatorType:operatorType,state:state, xunjiaNo:quiryNo,isReserve:isReserve,stopTime:stopTime,vehicleModelId:vehicleModelId,amount:amount,costName:costName,costPrice:costPrice,otherDesc:otherDesc};
		interface.inquiryManage.inquiryManageReplyList(sysData, function (data) {
			localStorage.quiryNo = quiryNo;
			localStorage.quiryState = state;
			if(data.success == true){
				alert("回复询价单成功");
				document.location.href = "../inquiryManage/quiryDetail.html";
			} else if (data.success == false){
				alert(data.message);
				document.location.href = "../inquiryManage/quiryDetail.html";
			}
		});
	},
	
	quiryDetail : function (quiryNo,state){
		var sysData = {uId: AUTOCAR.data_uId, xunjiaNo:quiryNo};
		interface.inquiryManage.inquiryManageDetialList(sysData, function (data) {
			if (data.success == true) {
				$.each(data.rows, function (i, m) {
					localStorage.quiryState = m.state;
					var title = "";
					var titleState = "";
					var index = 0;
					var flag = true;
					for (var i = 0 ; i < m.stateList.length; i++){
						var stateList = m.stateList[i];
						title += "<span>"+stateList["stateName"]+"</span>";
						if(m.state == stateList["stateCode"]){
							index = 1;
						}
						
						if(flag && index == 0){
							titleState += "<span class='round light_round'></span>"
							titleState += "<span class='line light_line'></span>"
						} else if  (flag && index == 1){
							if (i == m.stateList.length -1){
								titleState += "<span class='round shine_round_main'><span class='shine_round'></span></span>"
							} else {
								titleState += "<span class='round shine_round_main'><span class='shine_round'></span></span>"
								titleState += "<span class='line'></span>"
							}
						} else {
							if (i == m.stateList.length -1){
								titleState += "<span class='round'></span>"
							} else {
								titleState += "<span class='round'></span>"
								titleState += "<span class='line'></span>"
							}
						}
						if(m.state == stateList["stateCode"]){
							flag = false;
						}
					}
					
					$("#quiryTitle").append(title);
					$("#progressBar").append(titleState);
					
					$("#xunjiaNo").text(m.xunjiaNo);	//询价单号
					$("#data_xunjiaNo").val(m.xunjiaNo);
					$("#sendComName").text(m.sendComName);	//发送方公司名称
					$("#sendUserName").text(m.sendUserName);	//发送人名称
					$("#sendUserPhone").text(m.sendUserPhone);	//发送人手机号
					$("#conName").text(m.conName);	//会议名称
					$("#useCarDesc").text(m.useCarDesc === null ? '' : m.useCarDesc);	//用车方式描述
					if(m.useCarType == "31001"){
						$("#bc_carTypeDescDl").hide();
					} else if (m.useCarType == "31003"){
						$("#endAddressDl").hide();
					}
					$("#airCarTypeDesc").text(m.airCarTypeDesc === null ? '' : m.airCarTypeDesc);	//类型描述（用车方式为接送/包车）有效
					$("#airTrainNo").text(m.airTrainNo === null ? '':m.airTrainNo);	//航班/车次 （用车方式为接送）有效
					$("#useCarTime").text(m.useCarTime === null ? '' :( util.data.formatData(m.useCarTime) ));
					$("#startAddress").text(m.startAddress);	//上车地点名称
					$("#endAddress").text(m.endAddress);		//下车地点名称
					$("#carTypeDesc").text(m.carTypeDesc === null ? '' : m.carTypeDesc);	//用车方式描述
					$("#seatCount").text(m.seatCount);	//座位数量
					$("#requirementDesc").text(m.requirementDesc === null ? '' : m.requirementDesc);	//需求描述
					
					
					if(m.state != 406 && m.state != 400){
						if(m.isReserve == true){
							$("#isReserve").text("能");
						} else if (m.isReserve == false) {
							$("#isReserve").text("不能");
						}
						$("#revertUserName").text(m.revertUserName === null ? '' : m.revertUserName); //回复人
						if(m.state != 405){	
							$("#vehicleModelName").text(m.vehicleModelName === null ? '' : m.vehicleModelName); //可选车型
							var desc1 = m.vehicleModelDesc  + " <br/> 说明：";
							var desc2 = m.vehicleModelOtherDesc === null ? '无' : m.vehicleModelOtherDesc;
							$("#vehicleModelDesc").html(desc1+desc2);					
							$("#stopTime").text(util.data.formatData(m.stopTime));	//报价时限
							//$("#amount").text(util.formatCurrency(m.amount)+"元");	//总计金额
							$("#amount").html(util.formatCurrency(m.amount)+"&nbsp;元");	//总计金额
							$("#otherDesc").text(m.otherDesc === null ? '' : m.otherDesc); //其它说明
							$.each(m.feeStandard, function (j,k) {   //收费标准
								var feeStandardList="<li><a download href=\"" + k + "\">"+(k.split('/'))[k.split('/').length-1]+"</a></li>";
								$("#down_list").append(feeStandardList);
							});
							if(m.quotePrice.length > 0){
								$.each(m.quotePrice, function (i, k) { 
									$("span[role='costName']").eq(i).text(k.costName);
									//$("span[role='costPrice']").eq(i).text(util.formatCurrency(k.costPrice) + "元");
									$("span[role='costPrice']").eq(i).html(util.formatCurrency(k.costPrice) + "&nbsp;元");

								});
							} else if(m.quotePrice.length == 0){
								$("div[role='include-more-read']").remove();
							}
						} else {
							$("#vehicleModelNameDl").hide(); 	
							$("#stopTimeDl").hide();
							$("#amountDl").hide();	
							$("#otherDescDl").hide();
						}
					} else if (m.state == 406 && m.state != 400) {
						$("#sendQuiryDiv").hide(); 		
					} else {
						$("#sendQuiryDiv").hide();
						$("#sendQuiry").show();
					}
					if(m.revertUserId != AUTOCAR.data_uId && m.state != 400){
						$("#updateQuiry").hide();
					}
					if(m.state == 400 || m.state == 405 || m.state == 404 || m.state == 403 || m.state == 406 || m.state == 402){
						$("#updateQuiry").hide();
					}
				});
			}
		});
	},
    //获取文字宽度
    getWidth : function (dom) {
        var text = $(dom).text();
        var val = text.replace(/[^0-9]/g,"");
        var b = text.replace(/[^a-z]/g,"");
        //	说明中数字与字母的个数
        var otherNum = val.length + b.length;
        //	console.log(otherNum);
        //说明中文字的个数
        var textNum = text.length - otherNum;
        //	console.log(otherTextNum);
        //	说明总体的宽度
        //var fs = 1em;
        return textNum * 16 +　otherNum / 2 * 16　;

    }

};