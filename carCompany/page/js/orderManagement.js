orderManagement = {
	//订单管理
	orderManageList: function (start) {
		var conName = $("#conName").val();
		var orderState = localStorage.searchOrderState;
		if($("#orderState").val() != null && $("#orderState").val() != "" && $("#orderState").val() != "-1"){
			orderState = $("#orderState").val();
		}
		
		var startTime = "";
		if($("#overAllStartDate").val() != null && $("#overAllStartDate").val() != ""){
			startTime = util.DateToTimestamp.dateFormat($("#overAllStartDate").val()  +" 00:00:00");
		}
		
		var endTime = "";
		if($("#overAllEndDate").val() != null && $("#overAllEndDate").val() != ""){
			endTime = util.DateToTimestamp.dateFormat($("#overAllEndDate").val() +" 23:59:59");
		}
		
		var orderNo =  $("#orderNo").val();
		var revertUserName =  $("#revertUserName").val();
		var sendComName =  $("#sendComName").val();
		
		localStorage.orderStartPage = start;
		localStorage.searchOrderConName = conName;
		localStorage.searchOrderState = orderState;
		localStorage.searchOrderStartTime = startTime;
		localStorage.searchOrderEndTime = endTime;
		localStorage.searchOrderNo = orderNo;
		localStorage.searchOrderRevertUserName = revertUserName;
		localStorage.searchOrderSendComName = sendComName;
		
		
		var sysData = {uId: AUTOCAR.data_uId, comId: AUTOCAR.data_comId, pageSize:AUTOCAR.data_pageSize, pageNow:start, conName:conName, state:orderState, startTime:startTime,endTime:endTime, orderNo:orderNo, revertUserName:revertUserName, sendComName:sendComName };

		interface.orderManage.orderManageList(sysData, function (data) {
			orderManagement.generateOrderManageTable(start, data);
		});
	},
	generateOrderManageTable: function (start, data) {
		if (data.success == true) {
			var tr, uId, comId,    orderNo, sendComId, sendComName, sendUserId, sendUserName, cId, conName, conAddress, conStartTime, conQuiryId, conQuiryName, resComId, resComName, sendOrderTime, orderAmount, state, stateDesc, newOrder, operate, temp = $("<div></div>");
			$.each(data.rows, function (i, m) {
				tr = $("<tr uId=" + m.uId + "></tr>");
				orderNo = $('<td>' + m.orderNo + '</td>');	//订单号

				sendComName = $('<td class="account_table_td" ><span class="name_item01" role="name-item">' + m.sendComName + '</span><div class="account_table_td_detial">' + (m.sendComName === null ? '--' : m.sendComName) +  '</div></td>');	//发送方

				sendUserName = $('<td class="account_table_td"><span class="name_item02" role="name-item">' + m.sendUserName + '</span><div class="account_table_td_detial">' + (m.sendUserName === null ? '--' : m.sendUserName) + '</div></td>');	//用户
				conName = $('<td class="account_table_td"><span class="name_item03" role="name-item">' +  m.conName + '</span><div class="account_table_td_detial">' + ( m.conName === null ? '--' :  m.conName) + '</div></td>');	//会议名称
				
				conStartTime = $('<td>' +  util.data.formatData(m.conStartTime) + '</td>');	//会议开始时间
				conQuiryName = $('<td>' + m.conQuiryName + '</td>');	//会议资源
				sendOrderTime = $('<td>' +  util.data.formatData(m.sendOrderTime) + '</td>');	//发送订单时间
				orderAmount = $('<td>' + (m.orderAmount == null ? "--" : util.formatCurrency(m.orderAmount) + "元") + '</td>');	//用车费用
				stateDesc = $('<td class="account_table_td"><span class="name_item02" role="name-item">' + m.stateDesc + '</span><div class="account_table_td_detial">' + (m.stateDesc === null ? '--' : m.stateDesc) + '</div></td>');	//状态
				operate = $("<td><a class='operate_btn' href='javascript:orderManagement.linkOrderDetail(\""+m.orderNo+"\","+m.state+");' role='order_manage_detial_label'>查看</a></td>");	//查看操作

				tr.append(orderNo).append(sendComName).append(sendUserName).append(conName).append(conStartTime).append(conQuiryName).append(sendOrderTime).append(orderAmount).append(stateDesc).append(operate);
				temp.append(tr);

			});
			$("#orderManageTBody").empty().append(temp.html());
			util.pages.generatePageNav(data.total, start, "order-manage", ".orderManage-page-nav");//分页
		}
		else if (data.code == 0001) {
			$("#orderManageTBody,.account_page").empty();
			util.tips.basic(data.message);
		}
		else if (data.code == 0002) {
			$("#orderManageTBody,.account_page").empty();
			util.tips.basic(data.message);
		}
		else {
			util.tips.basic("获取订单列表失败，请重试");
		}
	},
	
	orderState : function (searchState){
		var sysData = {uId: AUTOCAR.data_uId,dType: 29};
		interface.public.selectSysDict(sysData, function (data) {
			var statsOption = "";
			var d_code = "";
		    var d_name = "";
			if (data.success == true) {
				$("#orderState").append("<option value='-1'></option>");
				$.each(data.rows, function (i, m) {
					if(505 == m.dCode || 506 == m.dCode || 507 == m.dCode){
						d_code += m.dCode + ",";
						d_name = m.dName;
					}else{
						if (searchState == m.dCode) {
							statsOption += "<option selected='selected' value='" + m.dCode + "'>" +m.dName+ "</option>";
						} else {
							statsOption += "<option value='" + m.dCode + "'>" +m.dName+ "</option>";
						}
					}
				});
				if(searchState == d_code.substring(0,d_code.length - 1)){
					statsOption += "<option selected='selected' value='"+d_code.substring(0,d_code.length - 1)+"'>"+d_name+"</option>";
				}else{
					statsOption += "<option value='"+d_code.substring(0,d_code.length - 1)+"'>"+d_name+"</option>";
				}
				$("#orderState").append(statsOption);
			}
		});
	},
	
	linkOrderDetail : function(orderNo,state){
		localStorage.orderNo = orderNo;
		localStorage.state = state;
		if(state == 500){
			localStorage.operatorType = "01";
			location.href = "../orderManage/beforConfirm.html";  
		} else {
			location.href = "../orderManage/orderInfo.html";  
		}
	},
	
	orderDetail : function (orderNo,state) {
		var sysData = {uId: AUTOCAR.data_uId, orderNo:orderNo};
		interface.orderManage.orderManageDetialList(sysData, function (data) {
			if (data.success == true) {
				$(".cancleOrder").hide();
				$.each(data.rows, function (i, m) {
					
					var title = "";
					var titleState = "";
					var index = 0;
					var flag = true;
					for (var i = 0 ; i < m.stateList.length; i++){
						var stateList = m.stateList[i];
						title += "<span>"+stateList["stateName"]+"</span>";
						if(state == stateList["stateCode"]){
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
						if(state == stateList["stateCode"]){
							flag = false;
						}
					}
					
					$(".order_title").append(title);
					$(".progress_bar").append(titleState);
					
					$("#orderNo").text(m.orderNo);	//订单号
					$("#sendComName").text(m.sendComName);	//发送方公司名称
					$("#sendUserName").text(m.sendUserName);	//发送人名称
					$("#sendUserPhone").text(m.sendUserPhone);	//发送人手机号
					$("#conName").text(m.conName);	//会议名称
					$("#conCode").text(m.conCode);	//会议编码
					//$("#poDan").attr("src", "m.poDan");	//会议po单
					
					//PO单展示
					var poName_ = [];
					var poFile = m.poDan;
					var filePath = "";
					var fileName = "";
					if(null != poFile && poFile.length > 0){
						for(var i = 0; i < poFile.length; i++){
							filePath = poFile[i].poUrl;
							fileName = poFile[i].poName;
							//var fileTypeStr = fileName.substring(fileName.lastIndexOf(".") + 1,fileName.length);
							//var tdHtml = qiniushow(fileTypeStr,fileName,filePath);
							//poName_.push(tdHtml);
                            var html = '<div>'+
                                    '<img src="../img/orderManageImg/order_file.png" alt="" style="margin-right:20px;vertical-align: middle"/>' +
                                    '<a download href="'+ filePath +'">'+ fileName +'</a>'+
                                    '</div>';
                            $('#poDan').append(html);
						}
					} else {
						$("#poDanAmount").css("display","none");
						$("#poDanLi").css("display","none");
					}
					//$('#poDan').html('').append(poName_.join(''));
					 events();
					
					$("#poPrice").text(m.poPrice == null ? "0" : util.formatCurrency(m.poPrice));	//po单金额
					$("#sendAmount").text(util.formatCurrency(m.sendAmount));	//总计金额
					$("#useCarType").val(m.useCarType);	//用车方式
					$("#useCarDesc").text(m.useCarDesc);	//用车方式描述
					$("#bc_carTypeDesc").text(m.airCarTypeDesc);	//类型描述（用车方式为接送/包车）有效
					//$("#airTrainNo").text(m.airTrainNo === null ? '无' : m.airTrainNo);	//航班/车次 （用车方式为接送）有效
					$("#useCarTime").text(util.data.formatData(m.useCarTime));	//用车时间（时间戳）精确到秒
					$("#startAddress").text(m.startAddress);	//上车地点名称
					$("#endAddress").text(m.endAddress);		//下车地点名称
					if(m.useCarType == "31001"){
						$("#bc_carTypeDescLi").hide();
					} else if (m.useCarType == "31003"){
						$("#endAddressLi").hide();
					}
					
					$("#carTypeDesc").text(m.carTypeDesc);		//车型选择
					$("#vehicleModelName").text(m.vehicleModelName === null ? '无' : m.vehicleModelName);	//可选车型名称
					//$("#vehicleModelDesc").text(m.vehicleModelDesc +<br/>+ m.vehicleModelOtherDesc);
					var desc1 = m.vehicleModelDesc  + "<br/> 说明：";
					var desc2 = m.vehicleModelOtherDesc === null ? '无' : m.vehicleModelOtherDesc;
					$("#vehicleModelDesc").html(desc1+desc2);
					//$("#vehicleModelOtherDesc").text(m.vehicleModelOtherDesc);
					$("#seatCount").text(m.seatCount);	//座位数量
					$("#vehicleModelId").text(m.vehicleModelId);	//可选车型
					$("#amount").text(util.formatCurrency(m.amount));	//总计金额
					$("#passengeName").text(m.passengeName);	//乘车人姓名
					$("#passengePhone").text(m.passengePhone);	//乘车人电话
					$("#requirementDesc").text(m.requirementDesc);	//需求描述
					$("#totalAmount").val(util.formatAmount(m.amount));	//总计金额
					
					if(state == "500"){
						$("#amountControl").hide();
						var _newitem = "";
						for(var i = 0; i < m.quotePrice.length; i++){
							var costPriceMap = m.quotePrice[i];
							var costPrice = costPriceMap["costPrice"];
							var costName = costPriceMap["costName"];
							_newitem += "<dl class='add_amount_list'><input type='text' class='long_text_input02'  placeholder='花费项目' role='costName' maxlength='10' value=\""+costName+"\"><input type='text' class='long_text_input02 mleft40'  placeholder='花费金额' role='costPrice' value=\""+util.formatAmount(costPrice)+"\"><span class='delete_amount_btn mleft10' id='deleteAmountBtn'></span></dl>";
						}
						
						if(_newitem != ""){
							$(".add_amount_main").show();
							$(".add_amount_cont").append(_newitem);
						}
						$("#replyButton").show();
						if(m.revertUserId != AUTOCAR.data_uId){
							$("#sendOrder").hide();
							$("#sendOrderDiv").css("display","none");
						}
					}
					if(state == "501"){
						
						$("#confirmContext").html("修改订单");
						$("#sendOrder").html("确认修改");
                        //---by ly
						//$("#vehicleModelControl").css("display","block");
						$("#vehicleModelControl").css("display","inline-block");
						var vehicleModelId = m.vehicleModelId === null ? "" : m.vehicleModelId;
						orderManagement.selectVehicleModel(vehicleModelId);//可选车型
                        //总计金额样式上调
                        $("#sendOrderDiv li:nth-last-of-type(2)").css({"float":"left","margin-right":"5px"});

                    }
					if(state == "501" || state == "504" || state == "507"){				
						if (localStorage.operatorType == "02" || localStorage.operatorType == "01") {//修改
							if(m.isConfirm == true){
								$("body span[role='reply-inquiry-enabled']").addClass("btn_limit_yellow_selected");
								$("body span[role='reply-inquiry-disabled']").removeClass("btn_limit_yellow_selected");
								$("#stopTime").val(util.data.formatData(m.stopTime));	//取消时限
								$("#driverName").val(m.driverName);	//司机姓名
								$("#driverPhone").val(m.driverPhone);	//司机电话
								$("#vehicleNo").val(m.vehicleNo);	//车牌号码
								
								$("#otherInfo").text(m.otherDesc);	//其它说明
								
								var _newitem = "";
								for(var i = 0; i < m.quotePrice.length; i++){
									var costPriceMap = m.quotePrice[i];
									var costPrice = costPriceMap["costPrice"];
									var costName = costPriceMap["costName"];
									if (localStorage.operatorType == "02") {
										_newitem += "<dl class='add_amount_list'><input type='text' class='long_text_input02'  placeholder='花费项目' role='costName' maxlength='10' value=\""+costName+"\"><input type='text' class='long_text_input02 mleft40'  placeholder='花费金额' role='costPrice' value=\""+util.formatAmount(costPrice)+"\"><span class='delete_amount_btn mleft10' id='deleteAmountBtn'></span></dl>";
									} else if (localStorage.operatorType == "01") {
										_newitem += "<dl class='add_amount_list'><input type='text' class='long_text_input02'  placeholder='花费项目' role='costName' maxlength='10' value=\""+costName+"\"><input type='text' class='long_text_input02 mleft40'  placeholder='花费金额' role='costPrice' value=\""+util.formatAmount(costPrice)+"\"></dl>";
									}
									
								}
								
								if(_newitem != ""){
									$(".add_amount_main").show();
									if(localStorage.operatorType == "01"){
										$("#inquiryAddItem").attr("id","_inquiryAddItem");
									}
									$(".add_amount_cont").append(_newitem);
								}
							} else if (m.isConfirm == false) {
								$("body span[role='reply-inquiry-enabled']").removeClass("btn_limit_yellow_selected");
								$("body span[role='reply-inquiry-disabled']").addClass("btn_limit_yellow_selected");
								
								var _this = $("body span[role='reply-inquiry-disabled']");
								_this.parent().parent().siblings().hide();
							}
							
							if(localStorage.operatorType == "02"){
								$("#replyButton").show();
							}
							
						} else if (localStorage.operatorType == "00") {//取消
							$(".updateOrder").hide();
							$(".cancleOrder").show();
							
							$("#cancleStopTime").text(util.data.formatData(m.stopTime));	//取消时限
							$("#cancleDriverName").text(m.driverName);	//司机姓名
							$("#cancleDriverPhone").text(m.driverPhone);	//司机电话
							$("#cancleVehicleNo").text(m.vehicleNo);	//车牌号码
							$("#cancleTotalAmount").text(util.formatCurrency(m.amount));	//总计金额
							$("#cancleOtherInfo").val(m.otherDesc);	//其它说明
							
							var _newitem = "";
							for(var i = 0; i < m.quotePrice.length; i++){
								var costPriceMap = m.quotePrice[i];
								var costPrice = costPriceMap["costPrice"];
								var costName = costPriceMap["costName"];
								_newitem += "<dl class='add_amount_list'><span class=''  placeholder='花费项目' role='costName' maxlength='10'>"+costName+"</span><span class='mleft40'  placeholder='花费金额' role='costPrice'>"+util.formatCurrency(costPrice)+"元</span></dl>";
							}
							
							if(_newitem != ""){
								//$(".add_amount_main").show();
								$("#quotePrice").append(_newitem);
							}
							if(state == "501"){
								$("#cancelButton").show();
							}
						}
						if(m.revertUserId != AUTOCAR.data_uId){
							$("#sendOrder").hide();
						}
						$("#amountControl").css("display","none");
					}
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
	revertOrder : function (orderNo,state) {
		var operatorType = "";
		if(state == "500"){
			operatorType = localStorage.operatorType;
		} else if (state == "501") {
			operatorType = localStorage.operatorType;
		}
		var isConfirm = ""; //确认预订
		var stopTime = "";	//取消时限
		var driverName = "";	//司机姓名
		var driverPhone = "";	//司机电话
		var vehicleNo = "";	//车牌号码
		var amount = "";	//总计金额
		var otherDesc = "";	//其它说明
		var costPrice = ""; //花费金额
		var costName = ""; //花费项
		var extraCost = ""; //追加扣款
		var vehicleModelId = ""; //可选车型
		
		if (operatorType != "00"){
			isConfirm = $("body .btn_limit_yellow_selected").attr("value");
			if (isConfirm == "01") {
				isConfirm = true;
				
				if($("#stopTime").val() == null || $("#stopTime").val() == ""){
					alert("请选择取消时限");
					return false;
				} 
				stopTime = util.DateToTimestamp.dateFormat($("#stopTime").val());	//取消时限
				newTime = util.DateToTimestamp.dateFormat(util.nowFormatDate()); //当前时间
				if(stopTime < newTime){
					alert("取消时限不能小于当前时间");
					return false;
				}
				vehicleModelId = $("#vehicleModel option:selected").val();
				if( vehicleModelId == -1){
					alert("请选择车型");
					return false;
				}
				driverName = $("#driverName").val();	//司机姓名
				if(driverName == null || driverName == ""){
					alert("请输入司机姓名称");
					return false;
				}
				driverPhone = $("#driverPhone").val();	//司机电话
				if(driverPhone == null || driverPhone == ""){
					alert("请输入司机电话");
					return false;
				}
				
				if(!util.mRegExp.phone.test(driverPhone)){
					alert("司机电话格式不正确");
					return false;
				}
				
				vehicleNo = $("#vehicleNo").val();	//车牌号码
				if(vehicleNo == null || vehicleNo == ""){
					alert("请输入车牌号码");
					return false;
				}
				amount = $("#totalAmount").val();	//总计金额
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

				otherDesc = $("#otherInfo").val();	//其它说明
				
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
				
			} else if (isConfirm == "00") {
				isConfirm = false;
			}
		} else {
			extraCost = $("#extraCost").val();
			if(extraCost.trim() != "" && extraCost.trim() <= 0){
				extraCost = "";
			}
			otherDesc = $("#cancleOtherInfo").val();
		}
		
		if (otherDesc.length > 1000) {
			alert("其他说明已超过最大字数1000字");
			return false;
		}
		

		var sysData = {uId: AUTOCAR.data_uId,equipment:3,operatorType:operatorType,state:state, orderNo:orderNo,isConfirm:isConfirm,stopTime:stopTime,driverName:driverName,driverPhone:driverPhone,vehicleNo:vehicleNo,amount:amount,otherDesc:otherDesc,costPrice:costPrice,costName:costName,extraCost:extraCost,vehicleModelId:vehicleModelId};
		interface.orderManage.orderManageReplyList(sysData, function (data) {
			localStorage.orderNo = orderNo;
			localStorage.state = state;
			if(data.success == true){
				document.location.href = "orderInfo.html";
			} else if (data.success == false){
				alert(data.message);
				document.location.href = "orderInfo.html";
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
		return textNum * 16 +　otherNum / 2 * 16　;

	}
};