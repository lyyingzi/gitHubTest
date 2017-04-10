util = {
	/*正则表达式校验*/
	mRegExp: {
		email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		pwd: /^[a-zA-Z0-9]{6,16}$/,
		phone:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/  ,	//  /^\d{11}$/
		checkIdCard: /^\d{17}[xX0-9]$/,
		chineseChar: /^[\u4e00-\u9fa5]+$/,
		enterpriseName: /^[\u4e00-\u9fa5\(\)\（\）]+$/,
		enterpriseCode: /^[\d\-]+$/,
		tel: /^(\d{11})$|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
		httpsrc: /^(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?$/,
		floatNum:/^[0-9]+(\.[0-9]{2})?$/,  //包括0的数字和两位小数		//	不包括0的数字和小数  /^([1-9]+(\.[0-9]{2})?|0\.[1-9][0-9]|0\.0[1-9])$/ 不允许0的话//正则表达式 验证数字格式  非负数 小数点后保留两位   /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/
		intNum:/^\+?(0|[1-9][0-9]*)$/, //正则表达式 验证数字格式 正整数包括0 不包括0的可以这样写 /^[0-9]*[1-9][0-9]*$/
		
	},
	
	//分页组件
	pages: {	
        isIndexPage: false,
        generatePageNav: function (data, start, method, pagectn) {
            var pages = Math.ceil(data / 10); //获取总页数
            var pageDom = (pagectn == undefined) ? $(".page-nav") : $(pagectn);
            pageDom.empty();
            var temp = $("<div></div>"), _li;

            if (pages != 0) {
                _li = $("<li method='" + method + "' class='active first-page-btn'>首页</li>");
                temp.append(_li);
            }

            if (start != 1) {
                _li = $("<li method='" + method + "' class='active prev-btn'>上一页</li>");
                temp.append(_li);
            }

            start = parseInt(start);
            if (pages > 5) {
                if (pages - start > 2) {
                    if (start > 3) {
                        var stag = start - 2;
                        var ltag = start + 2;
                        for (var i = stag; i <= ltag; i++) {
                            if (i == start) {
                                _li = $("<li method='" + method + "' class='normal-btn cur'>" + i + "</li>");
                            } else {
                                _li = $("<li method='" + method + "' class='normal-btn'>" + i + "</li>");
                            }
                            temp.append(_li);
                        }
                    } else { //直接输出前五个
                        for (var i = 1; i <= 5; i++) {
                            if (i == start) {
                                _li = $("<li method='" + method + "' class='normal-btn cur'>" + i + "</li>");
                            } else {
                                _li = $("<li method='" + method + "' class='normal-btn'>" + i + "</li>");
                            }
                            temp.append(_li);
                        }
                    }
                } else {
                    for (var i = pages - 4; i <= pages; i++) {
                        if (i == start) {
                            _li = $("<li method='" + method + "' class='normal-btn cur'>" + i + "</li>");
                        } else {
                            _li = $("<li method='" + method + "' class='normal-btn'>" + i + "</li>");
                        }
                        temp.append(_li);
                    }
                }
            } else {
                for (var i = 1; i <= pages; i++) {
                    if (i == start) {
                        _li = $("<li method='" + method + "' class='normal-btn cur'>" + i + "</li>");
                    } else {
                        _li = $("<li method='" + method + "' class='normal-btn'>" + i + "</li>");
                    }
                    temp.append(_li);
                }
            }

            if (pages > 1 && start != pages) {
                _li = $("<li method='" + method + "' class='active next-btn'>下一页</li>");
                temp.append(_li);
            }

            if (pages == 0) {
                pages = 1;
            } else {
                _li = $("<li method='" + method + "' class='active last-page-btn'>末页</li>");
                temp.append(_li);
            }

            pageDom.html(temp.html()).attr("total", pages);
        }
    },
	
	//login登录
	login: {
		
		processLogin: function () {
            //检测用户名是否为空
            if ( $("input[role='uName']").val() == "") {
				util.tips.basic("请输入用户名,用户名不能为空!");
				$("input[role='uName']").addClass("text_input_error");
                return;
            }
			else{
				$("input[role='uName']").removeClass("text_input_error");
			}

            //检测密码是否为空
            if ( $("input[role='uPwd']").val() == "" ) {
				util.tips.basic("请输入密码,密码不能为空!");
				$("input[role='uPwd']").addClass("text_input_error");
                return;
            }
			else{
				$("input[role='uPwd']").removeClass("text_input_error");
			}

            
            var _uName= $("input[role='uName']").val();
            var _uPwd = $("input[role='uPwd']").val();
            var _equipment = AUTOCAR.data_equipment;
			var sysData = {uName: _uName, uPwd: _uPwd,equipment:_equipment};
			//debugger;
            interface.account.login(sysData, util.login.callback);
			console.log(sysData);
			
        },

		callback: function (data) {
            if (data.success == true) {
				var _imDetailData = data.rows[0];
				localStorage.data_uId =_imDetailData.uId;	//通过sessionStorage存储数据
				localStorage.data_comId =_imDetailData.comId;
				localStorage.data_comName =_imDetailData.comName;
				localStorage.data_rName =_imDetailData.rName;
				var menuList = JSON.stringify(_imDetailData.menu);
				localStorage.setItem("menuList",menuList);
				//console.log(localStorage.data_uId + " " + localStorage.data_comId + " " + localStorage.data_comName);
				
				//清空询价单记录
				localStorage.quiryStartPage = "";
				localStorage.searchConName = "";
				localStorage.searchState = "";
				localStorage.searchStartTime = "";
				localStorage.searchEndTime = "";
				localStorage.searchQuiryNo = "";
				localStorage.searchOperatorId = "";
				localStorage.searchSendComName = "";
				//清空订单记录
				localStorage.orderStartPage = "";
				localStorage.searchOrderConName = "";
				localStorage.searchOrderState = "";
				localStorage.searchOrderStartTime = "";
				localStorage.searchOrderEndTime = "";
				localStorage.searchOrderNo = "";
				localStorage.searchOrderRevertUserName = "";
				localStorage.searchOrderSendComName = "";
				
				localStorage.userImage = _imDetailData.userImage;
				//清空菜单选中状态
				localStorage.menuType = "inquiry-manage";
				localStorage.messStart = "";//消息列表分页页码
                window.location.href = interface.hostLogin+'/inquiryManage/inquiryManage.html';
				console.log(interface.hostLogin);
				
				util.tips.basic(data.message);
            } 
			else{
				util.tips.basic(data.message);
			}
		},

		showUserName: function () {
			operator.account.getEmail(function (data) {
				if (data.error_code == 0) {
					var useremail = data.data;
					if (useremail.name) {
						$("#curLoginEMail").html(useremail.name);
						
						}
					}
				});
			}
		},

	/*通用信息提示*/
	tips: {
        timer: null,

        basicTimer: null,

        basic: function (text) {
            if ($(".basic-toast").length > 0) {
                $(".basic-toast").text(text).show();
            } else {
                var toast = $('<div class="basic-toast">' + text + '</div>');
                $("body").append(toast);
            }

            clearTimeout(util.tips.basicTimer);
            util.tips.basicTimer = setTimeout(function () {
                $(".basic-toast").fadeOut();
            }, 3000);
        },

        show: function (text, isGifShow) {
            if ($(".toast-ctn").length == 0) {
                var tipsDom = $("<div class='toast-ctn'><span class='toast'>" + text + "</span></div>");
                if (isGifShow) {
                    var lGif = $("<i class='loadingGif'></i>");
                    $(".toast", tipsDom).addClass("toast-gif").append(lGif);
                } else {
                    $(".toast", tipsDom).removeClass("toast-gif");
                    $(".loadingGif", tipsDom).remove();
                }
                $("body").append(tipsDom);
            } else {
                if (isGifShow) {
                    $(".toast-ctn").append($("<span class='toast toast-gif'><i class='loadingGif'></i>" + text + "</span>"));
                } else {
                    $(".toast-ctn").append($("<span class='toast'>" + text + "</span>"));
                }
                $(".toast-ctn").show();
            }
            if ($(".toast").length > 1) {
                $(".toast").eq(0).fadeOut().remove();
            }
        },

        hide: function () {
            $(".toast-ctn").fadeOut();
        }
    },
	
	/*时间组件*/
    data: {
		generateTimeString: function (s, e) {
            var edString = s ? s : ".date-input:odd",
                sdString = e ? e : ".date-input:even",
				//yesterday = new Date().getTime() + 1000 * 60 * 60 * 24 * 10;
                //yesterday = new Date().getTime() - 1000 * 60 * 60 * 24;
				yesterday = new Date().getTime();
            $(edString).datepicker({
                dateFormat: "yy-mm-dd",
                showWeek: true,
                autoSize: true
            }).datepicker("setDate", new Date(yesterday));
            $(sdString).datepicker({
                dateFormat: "yy-mm-dd",
                showWeek: true,
                autoSize: true
            //}).datepicker("setDate", new Date(yesterday - 60 * 60 * 24 * 1000 * 6));
			}).datepicker("setDate", new Date(yesterday));
			//}).datepicker("setDate", "");
        },
		
		formatData:function(time){
			var _timestring = time;
			var newDate = new Date();
			newDate.setTime(_timestring * 1000);
			
			//var formatTime = newDate.getFullYear() + "-" + ( ( (newDate.getMonth() + 1) >= 10) ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1)) + "-" + ( ( (newDate.getDate() + 1) >= 10) ? newDate.getDate() : ("0" + newDate.getDate()) ) + " " + (  ( newDate.getHours() >=10  )? newDate.getHours() : ( "0" +  newDate.getHours() )  ) + ":" + ( ( newDate.getMinutes() >=10  )? newDate.getMinutes() : ( "0" +  newDate.getMinutes() )  ) + ":" + ( ( newDate.getSeconds() >=10  )? newDate.getSeconds() : ( "0" +  newDate.getSeconds() )   );
			
			var formatTime = newDate.getFullYear() + "-" + ( ( (newDate.getMonth() + 1) >= 10) ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1)) + "-" + ( ( (newDate.getDate() + 1) >= 10) ? newDate.getDate() : ("0" + newDate.getDate()) ) + " " + (  ( newDate.getHours() >=10  )? newDate.getHours() : ( "0" +  newDate.getHours() )  ) + ":" + ( ( newDate.getMinutes() >=10  )? newDate.getMinutes() : ( "0" +  newDate.getMinutes() )  ) ;
			
			console.log(formatTime);
			return formatTime;
			
			
		},
		//格式化表格时间戳
		formatTableData:function(time){
			var _timestring = time;
			var newDate = new Date();
			newDate.setTime(_timestring * 1000);
			
			
			var formatTime = newDate.getFullYear() + "-" + ( ( (newDate.getMonth() + 1) >= 10) ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1)) + "-" + ( ( (newDate.getDate() + 1) >= 10) ? newDate.getDate() : ("0" + newDate.getDate()) ) ;
			//console.log(formatTime);
			
			return formatTime;
			
		},
		
		showCurrentTime:function(){
			var newDate = new Date(); 
			var Week = ['日','一','二','三','四','五','六'];
			var formatTime = newDate.getFullYear() + "年"
			+ ( ( (newDate.getMonth() + 1) >= 10) ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1)) + "月" +
			( ( (newDate.getDate() + 1) >= 10) ? newDate.getDate() : ("0" + newDate.getDate()) ) + "日 " + 
			(  ( newDate.getHours() >=10  )? newDate.getHours() : ( "0" +  newDate.getHours() )  ) + ":" + 
			( ( newDate.getMinutes() >=10  )? newDate.getMinutes() : ( "0" +  newDate.getMinutes() )  ) + 
			":" + ( ( newDate.getSeconds() >=10  )? newDate.getSeconds() : ( "0" +  newDate.getSeconds() ) ) + " " + " 星期" + Week[newDate.getDay()];

   		return formatTime;
  
			
		},
		
	},
	
	/*格式化金额千分位*/
	formatCurrency:function(num){  
		if(null != num){
			num = num.toString().replace(/\$|\,/g,'');  
		    if(isNaN(num))  
		        num = "0";  
		    sign = (num == (num = Math.abs(num)));  
		    num = Math.floor(num*100+0.50000000001);  
		    cents = num%100;  
		    num = Math.floor(num/100).toString();  
		    if(cents<10)  
		    cents = "0" + cents;  
		    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
		    num = num.substring(0,num.length-(4*i+3))+','+  
		    num.substring(num.length-(4*i+3));  
		    return (((sign)?'':'-') + num + '.' + cents);  
		} 
	},
	
	//小数点后保留两位
	formatAmount : function(num){
		num += '';  
        num = num.replace(/[^0-9|\.]/g, '');   
        if(/^0+/) 
            num = num.replace(/^0+/, '');  
        if(!/\./.test(num))  
            num += '.00';  
        if(/^\./.test(num))  
            num = '0' + num;  
        num += '00';         
        num = num.match(/\d+\.\d{2}/)[0];  
		return num;	
	},
	
	//当前前时间后一天
	nowFormatDate : function() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	},
	
	//new 时间插件中文版
	JqueryTime : {
		getJqueryTimeCN : function () {
			//时间控件中文版 new
			$.datepicker.regional["zh-CN"] = { 
			closeText: "关闭", 
			prevText: "&#x3c;上月", 
			nextText: "下月&#x3e;", 
			currentText: "今天", 
			monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], 
			monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"], 
			dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], 
			dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], 
			dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"], 
			weekHeader: "周", 
			dateFormat: "yy-mm-dd", 
			firstDay: 1, 
			isRTL: !1, 
			showMonthAfterYear: !0, 
			yearSuffix: "年" 
			}
			$.datepicker.setDefaults($.datepicker.regional["zh-CN"]);
				var datePicker = $("#ctl00_BodyMain_txtDate").datepicker({
				showOtherMonths: true,
				selectOtherMonths: true            
			});
			//end
			}
		},
		
		//时间格式转时间戳（秒）
		DateToTimestamp : {
			dateFormat : function (dateTime){
				var timestamp = Date.parse(new Date(dateTime));
				return timestamp / 1000;
			}
		},
		
		//通用头部
		headerTpl: {
			show:function(){
				var tpl = "<div class='header_car center'><div class='header_logo_main'><a href='#' style='width:103px;height:100px;border: 1px solid #fff;-webkit-border-radius: 50px;-moz-border-radius: 50px;border-radius: 50px;display:inline-block;float:left;overflow:hidden;'><img class='header_logo' src=\""+localStorage.userImage+"\" width='103' height='102'></a><span class='com_name'><span id='rName' role='accountsManage' style='color:#E49C3A;cursor: pointer'></span>,您好,欢迎登录WeMeeting</span><div class='clear'></div></div><div class='header_car_alarm'><span role='show-current-time'></span><i class='icon_car_alarm' role='message_alarm'></i><div class='car_message' id='car_message_count'>99+</div></div><a class='logout' role='logout'>退出登录</a><a class='logoin_pwd' role='modify-password'>修改密码</a></div>";
				
				$("body .header_car_bg").empty().append(tpl);
			}
		},
		//条数
		headerTplCount: {
			show:function(){
				var rdata = {token:05,uId:AUTOCAR.data_uId,equipment:3,ver:"001",udid:"002",appver:123456};
				interface.message.carMessageSelectCount(rdata, function (data) {
					if (data.success == true) {
						$("body #car_message_count").empty().html(data.total);//总条数
					}
				});
			}
		},
		//通用尾部
		footerTpl: {
			show:function(){
				var tpl = '<div class="footer_car center bg_blue"><div class="about_us_car"><span class="span_right" role="feed-back">意见反馈</span><span class="span_right" role="about-us">关于我们</span><span class="" role="contact-us">联系我们</span><div class="imice_logo_main mtop20"><div class="imice_logo fl mleft60"></div><div class="fl mleft40"><p class=" align-center line-height40">客服热线：010-57074011</p><p class="align-center">服务邮箱：wemeeting@i-mice.cn</p></div></div></div><div class=" align-center font-array01 copy_right_car">京ICP备16027591号-2&nbsp;&nbsp;|&nbsp;&nbsp;中青博联整合营销顾问股份有限公司&nbsp; &nbsp;北京爱麦思科技有限公司</div></div>';
				
				$("body .footer_car_bg").empty().append(tpl);
			}
		},

		//菜单栏
		menuTpl: {
			show:function(){
				var menuCheck = localStorage.menuType;
				var menuList = localStorage.getItem("menuList");
				var backMenu = JSON.parse(menuList);
				var instance =  "<ul class='nav_list_short' role='nav-container-main'>";
				if (backMenu != null && backMenu != "") {
					for(var i = 0; i < backMenu.length; i++){
						//alert(backMenu[i].menuId);
						switch(backMenu[i].menuId){
							case 1:	
								if(menuCheck == "inquiry-manage"){
									instance += "<li role='inquiry-manage' class='inquiry_manage_selected'><i class='inquiry_manage'></i><span>询价单管理</span></li>";
								} else {
									instance += "<li role='inquiry-manage'><i class='inquiry_manage'></i><span>询价单管理</span></li>";
								}
								break;
							case 2:
								if(menuCheck == "order-manage"){
									instance += "<li role='order-manage' class = 'order_manage_selected'><i class='order_manage'></i><span>订单管理</span></li>";
								} else {
									instance += "<li role='order-manage'><i class='order_manage'></i><span>订单管理</span></li>";
								}
								break;
							case 3:
								if (menuCheck == "setting-bill") {
									instance += "<li role='setting-bill' class='setting_bill_selected'><i class='setting_bill'></i><span>结算账单</span></li>";
								} else {
									instance += "<li role='setting-bill'><i class='setting_bill'></i><span>结算账单</span></li>";
								}
								break;
							case 4:
								if(menuCheck == "info-maintain"){
									instance += "<li role='info-maintain' class='info_maintain_selected'><i class='info_maintain'></i><span>信息维护</span></li>";
								} else {
									instance += "<li role='info-maintain'><i class='info_maintain'></i><span>信息维护</span></li>";
								}
								break;
							case 5:
								if(menuCheck == "accounts-manage") {
									instance += "<li role='accounts-manage' class='accounts_manage_selected'><i class='accounts_manage'></i><span>账号及权限管理</span></li>";
								} else {
									instance += "<li role='accounts-manage'><i class='accounts_manage'></i><span>账号及权限管理</span></li>";
								}
								break;
							case 6:
								if (menuCheck == "customer-service") {
									instance += "<li role='customer-service' class='customer_service_selected'><i class='customer_service'></i><span>客户服务</span></li>";
								} else {
									instance += "<li role='customer-service'><i class='customer_service'></i><span>客户服务</span></li>";
								}
								break;
						}
					}
					
				}

				instance += "</ul>";
				
				$("body .nav_main").empty().append(instance);
			}
		},	
		
		//右侧边栏
		sideNavTpl: {
			show:function(){
				var menuList = localStorage.getItem("menuList");
				var backMenu = JSON.parse(menuList);
				var instance =  "<ul role='right-nav'><li><a href='javascript:void(0);' class='to_top' role='to-top'></a></li>";
				if (backMenu != null && backMenu != "") {
					for(var i = 0; i < backMenu.length; i++){
						switch(backMenu[i].menuId){
							case 1:
								instance += "<li class='inquiry_manage' role='inquiry-manage'><a href='javascript:void(0);' class='inquiry_manage'></a></li>";
							break;
							
							case 2:
								instance += "<li class='order_manage' role='order-manage'><a href='javascript:void(0);' class='order_manage'></a></li>";
							break;
							
							case 3:
								instance += "<li class='setting_bill' role='setting-bill'><a href='javascript:void(0);' class='setting_bill'></a></li>";
							break;
							
							case 4:
								instance += "<li class='info_maintain' role='info-maintain'><a href='javascript:void(0);' class='info_maintain'></a></li>";
							break;
							
							case 5:
								instance += "<li class='accounts_manage' role='accounts-manage'><a href='javascript:void(0);' class='accounts_manage'></a></li>";
							break;
							
							case 6:
								instance += "<li class='customer_service' role='customer-service'><a href='javascript:void(0);' class='customer_service'></a></li>";
							break;
							
						}
					}
				}
				instance += "<li><a href='javascript:void(0);' class='ewm'></a><span class='ewm_popup'> <img src='../img/rCode.png'> </span></li></ul>";
				
				$("body .right_nav").empty().append(instance);
			}
		},		
};