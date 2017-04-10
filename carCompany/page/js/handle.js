$(document).ready(function () {
	
	util.sideNavTpl.show();	//侧边栏
	util.menuTpl.show();	//菜单栏
	util.headerTpl.show();	//通用头部
	util.footerTpl.show();
	util.headerTplCount.show();
	
	//点击公司名称，跳转至个人信息页面
	$("body").delegate("span[role='accountsManage']","click",function(){
		location.href='../accountsManage/viewAccount.html';
    });
	//个人信息页面,点击返回，返回至上一页面
	$("body").delegate("a[role='goback']", "click", function () {
		history.go(-1);
	});
	//显示时间
	$("body span[role='show-current-time']").empty().html( util.data.showCurrentTime() );
	//车公司名
	$("body #rName").empty().html(AUTOCAR.data_rName);
	
	//登陆按钮
	$("body").delegate("button[role='login-btn']", "click", function () {
		if ($("#remeber").hasClass("checked")) {
			var username = $("#uName").val();
			$.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie 
			$.cookie("username", username, { expires: 7 }); 
        } else {
			$.cookie("rmbUser", "false", { expire: -1 }); 
			$.cookie("username", "", { expires: -1 }); 
        }
        util.login.processLogin();
    });
	//退出登录
	$("body").delegate(".header_car_bg a[role='logout']", "click", function () {
		location.href='../sign/login.html';
		localStorage.clear();
	});
	//修改密码
	$("body").delegate("a[role='modify-password']", "click", function () {//logoinPwd
		location.href='../sign/modify_password.html';
	});
	//消息闹钟
	$("body").delegate("i[role='message_alarm']", "click", function () {//logoinPwd
		location.href='../message/message.html';
	});
	
	
	
	//忘记密码 下一步按钮
	$("body").delegate("a[role='forget-password-sec']", "click", function () {
		if( $("#phone_num").val() == ""  ){
			util.tips.basic("请输入手机号！");
			$("#phone_num").addClass("text_input_error");
			return;
		}
		else if(  util.mRegExp.phone.test( $("#phone_num").val() ) == false  ){
			util.tips.basic("请输入正确的手机号！");
			$("#phone_num").addClass("text_input_error");
			return;
		}
		if( $("#code").val() == "" ){
			util.tips.basic("请输入验证码！");
			$("#code").addClass("text_input_error");
			return;
		}
		//
		
		var _phone = $("#phone_num").val();
		var _code = $("#code").val();
		
		var rdata = {phone: _phone, yzm:_code, equipment:AUTOCAR.data_equipment};
		
		interface.account.getpwd(rdata, function (data) { 
			
			if (data.code == 0000) {
        		util.tips.basic("校验验证码成功！");
        		location.href='../sign/reset_password.html?phone=' + _phone;
        	}
			else{
				util.tips.basic(data.message);
				return;
			}
			
			
		});
		
	});
	
	//忘记密码 取消按钮
	$("body").delegate("a[role='forget-password-cancel']", "click", function () {
		location.href = '../sign/login.html';
	});
	
	//重置密码 提交按钮
	$("body").delegate("a[role='forget-password-sec-conform']", "click", function () {
		if( $("#newPwd").val() == "" ){
			util.tips.basic("请输入新密码！");
			$("#newPwd").addClass("text_input_error");
			return;
		}
		
		if( $("#confirmPwd").val() == "" ){
			util.tips.basic("请确认新密码！");
			$("#confirmPwd").addClass("text_input_error");
			return;
		}
		
		if( $("#newPwd").val() !== $("#confirmPwd").val() ){
			util.tips.basic("密码不一致！");
			return;
		}
		if(util.mRegExp.pwd.test( $("#newPwd").val() ) == false){
			util.tips.basic("密码格式不正确，只允许输入字母+数字，长度为6-12位！");
			return;
		}
		
		var _phone = $.getUrlParam("phone");
		var _newPwd = $("#newPwd").val();
		var _confirmPwd = $("#confirmPwd").val()
		
		var rdata = {phone: _phone, newPwd:_newPwd, confirmNewPwd:_confirmPwd, equipment:AUTOCAR.data_equipment};
		
		interface.account.resetPwd(rdata, function (data) { 
			
			if (data.success == true) {
        		util.tips.basic("重置密码成功！");
        		location.href='../sign/reset_success.html';
        	}
			else{
				util.tips.basic(data.message);
				return;
			}
			
			
		});
		
		
	});
	
	//重置密码 获取验证码按钮
	$("body").delegate("button[role='send-code']", "click", function () {
		if( $("#phone_num").val() == ""){	//
			util.tips.basic("请输入手机号！");
			//$("#code").addClass("text_input_error");
			$("#phone_num").addClass("text_input_error");
			return;
		}
		else if( util.mRegExp.phone.test( $("#phone_num").val() ) == false ){	//
			util.tips.basic("请输入正确手机号！");
			//$("#code").addClass("text_input_error");
			$("#phone_num").addClass("text_input_error");
			return;
		}
		var _phone = $("#phone_num").val();
		var rdata = {phone: _phone,equipment:AUTOCAR.data_equipment};
		interface.account.getVerCode(rdata, function (data) { 
			if (data.success == true) {
        		util.tips.basic("获取验证码成功！");
        	}
			else{
				util.tips.basic(data.message);
				return;
			}
			
			
		});
		
		
	});
	
	//重置成功登录跳转登录页
	$("body").delegate("a[role='forget-password-finish-login']", "click", function () {
		location.href='../sign/login.html';
	});

	//修改密码模块
	//修改密码 取消按钮
	$("body").delegate("button[role='modify-password-cancel']", "click", function () {
		history.go(-1);
	});
	//修改密码 提交按钮
	$("body").delegate("button[role='update-password-sec-conform']", "click", function () {
		if( $("#oldPwd").val() == "" ){
			util.tips.basic("请输入旧密码！");
			$("#oldPwd").addClass("text_input_error");
			return;
		}
		if( $("#newPwd").val() == "" ){
			util.tips.basic("请输入新密码！");
			$("#newPwd").addClass("text_input_error");
			return;
		}
		
		if( $("#confirmPwd").val() == "" ){
			util.tips.basic("请确认新密码！");
			$("#confirmPwd").addClass("text_input_error");
			return;
		}
		
		if( $("#newPwd").val() !== $("#confirmPwd").val() ){
			util.tips.basic("密码不一致！");
			return;
		}
		if($("#oldPwd").val() == $("#newPwd").val()){
			util.tips.basic("新密码和旧密码不能相同！");
			return;
		}
		if(util.mRegExp.pwd.test( $("#newPwd").val() ) == false){
			util.tips.basic("密码格式不正确，只允许输入字母+数字，长度为6-12位！");
			return;
		}
		var _id=AUTOCAR.data_uId;
		//var _id='6';
		var _oldPwd = $("#oldPwd").val();
		var _newPwd = $("#newPwd").val();
		var _confirmPwd = $("#confirmPwd").val()
		
		var rdata = {uId:_id,uOldPwd:_oldPwd,newPwd:_newPwd,confirmNewPwd:_confirmPwd, equipment:AUTOCAR.data_equipment};
		
		interface.account.changePwd(rdata, function (data) { 
			
			if (data.success == true) {
        		util.tips.basic("修改密码成功！");
        		location.href='../inquiryManage/inquiryManage.html';
        	}
			else{
				util.tips.basic(data.message);
				return;
			}
			
			
		});
		
		
	});
	//nav顶部导航栏 右侧导航栏
	$("body").delegate("ul[role='nav-container-main'] li,ul[role='right-nav'] li,span[role='shouye'] span", "click", function () {
		var _this = $(this);
		var _role = _this.attr("role");

		switch(_role){
			case "inquiry-manage":
				//$("li[role='inquiry-manage']").addClass("inquiry_manage_selected").siblings().removeClass('order_manage_selected setting_bill_selected info_maintain_selected accounts_manage_selected customer_service_selected');
				localStorage.searchConName = "";
				localStorage.searchState = "";
				localStorage.searchStartTime = "";
				localStorage.searchEndTime = "";
				localStorage.searchQuiryNo = "";
				localStorage.searchOperatorId = "";
				localStorage.searchSendComName = "";
				
				localStorage.menuType = "inquiry-manage";
				location.href='../inquiryManage/inquiryManage.html';
				break;

			case "order-manage":
				localStorage.orderStartPage = "";
				localStorage.searchOrderConName = "";
				localStorage.searchOrderState = "";
				localStorage.searchOrderStartTime = "";
				localStorage.searchOrderEndTime = "";
				localStorage.searchOrderNo = "";
				localStorage.searchOrderRevertUserName = "";
				localStorage.searchOrderSendComName = "";
				
				localStorage.menuType = "order-manage";
				//$("li[role='order-manage']").addClass("order_manage_selected").siblings().removeClass('inquiry_manage_selected setting_bill_selected info_maintain_selected accounts_manage_selected customer_service_selected');
				location.href='../orderManage/orderManage.html';
				break;

			case "setting-bill":
				//$("li[role='setting-bill']").addClass("setting_bill_selected").siblings().removeClass('order_manage_selected inquiry_manage_selected info_maintain_selected accounts_manage_selected customer_service_selected');
				localStorage.menuType = "setting-bill";					
				location.href='../settingBill/settingBill.html';
				break;

			case "info-maintain":
				//$("li[role='info-maintain']").addClass("info_maintain_selected").siblings().removeClass('order_manage_selected setting_bill_selected inquiry_manage_selected accounts_manage_selected customer_service_selected');
				localStorage.menuType = "info-maintain";		
				location.href='../infoMaintain/infoMaintain.html';
				break;

			case "accounts-manage":
				//$("li[role='accounts-manage']").addClass("accounts_manage_selected").siblings().removeClass('order_manage_selected setting_bill_selected info_maintain_selected inquiry_manage_selected customer_service_selected');
				localStorage.menuType = "accounts-manage";	
				location.href='../accountsManage/accountsManage.html';
				break;

			case "customer-service":
				//$("li[role='customer-service']").addClass("customer_service_selected").siblings().removeClass('order_manage_selected setting_bill_selected info_maintain_selected accounts_manage_selected inquiry_manage_selected');
				localStorage.menuType = "customer-service";	
				location.href='../customerService/customerService.html';
				break;
		}
	});
	
	//底部导航链接跳转
	$("body").delegate(".about_us_car span", "click", function () {
		var _this = $(this);
		var _role = _this.attr("role");
		
		switch(_role){
			case "feed-back":
			location.href='../about/feed_back.html';
			break;
			
			case "about-us":
			location.href='../about/about_us.html';
			break;
			
			case "contact-us":
			location.href='../about/contact_us.html';
			break;
			
		}
	});
	
	//返回顶部按钮
    $("body").delegate("a[role='to-top']","click",function(){
        $('html,body').animate({scrollTop: 0});
    });
	
	//更多下拉展示
	$("body").delegate("a[role='search-more-arrow']", "click", function(){
	
	  var _this = $(this);
	  var _thisicon = _this.children();
	  var _next = _this.next(".search_select_main");
	  if(_thisicon.hasClass("circle_arrow_down")){
		_next.show();
		_thisicon.removeClass("circle_arrow_down");
		_thisicon.addClass("circle_arrow_up");
	  }else{
		_next.hide();
		_thisicon.addClass("circle_arrow_down");
	  }
	
	});
	
	//搜索按钮联动
	$("body").delegate(".checkbox", "click", function(){//
	  var _this = $(this);
	  var _thisBtn = $("div[role='inquiry-manage-search-btn']");
	  var _thatBtn = $("div[role='order-manage-search-btn']");
	  var _thisHeight = _thisBtn.height();
	  var _thatHeight = _thatBtn.height();
	  var _searchMain = $("div[role='search-main']");
	  var _searchHeight = $("div[role='search-main']").height();
	  
	  _this.each(function () {
		  
		  if( _this.hasClass('selected') == false && _this.attr('option') == _this.index()  && _searchHeight == _thisHeight){
			_this.addClass('selected');
			$("span[role='smoption_"+_this.index()+"']").show();	//
			$("input[role='smoption_"+_this.index()+"']").show();
	
			$(".search_btn").height(_thisHeight + 50);
			$(".search_btn").height(_thatHeight + 50);

			}
			else if( _this.hasClass('selected') == false && _this.attr('option') == _this.index()  && _searchHeight > 70){
				_this.addClass('selected');
				$("span[role='smoption_"+_this.index()+"']").show();
				$("input[role='smoption_"+_this.index()+"']").show();
			}
			else if( _this.hasClass('selected') == true && _this.attr('option') == _this.index()  && _searchHeight == 76) {
				_this.removeClass('selected');
				$("span[role='smoption_"+_this.index()+"']").hide();
				$("input[role='smoption_"+_this.index()+"']").hide();
			}
			else if( _this.hasClass('selected') == true && _this.attr('option') == _this.index()  && _searchHeight > 70) {
				_this.removeClass('selected');
				$("span[role='smoption_"+_this.index()+"']").hide();
				$("input[role='smoption_"+_this.index()+"']").hide();
			}
			
			if( _this.hasClass('selected') == false && _this.attr('option') !== '0' && _this.attr('option') !== '1' && _this.attr('option') !== '2' && _this.attr('option') !== '3' && _thisHeight > 70 &&_thatHeight > 70 && _searchHeight > 70){
			_this.removeClass('selected');
			$("span[role='smoption_"+_this.index()+"']").hide();
			
			$(".search_btn").height(_thisHeight - 50);
			$(".search_btn").height(_thatHeight - 50);
			}
			
			if($(".search_select_main li.selected").length == 0){
					$(".search_btn").height(76);
					$(".content_more").hide();
			}
			else{
				$(".content_more").show();
			}
			
	  });  
	});

	//报价包含

    $("body").delegate("span[role='include-more1']", "mouseover", function(){
       	$(this).next().show();

    });
    $("body").delegate("span[role='include-more1']", "mouseout", function(){

        $(this).next().hide();
    });


        //提示文字气泡
	var timer = null;//定义定时器变量
	//鼠标移入div1或div2都把定时器关闭了，不让他消失
	$("body").delegate(".total_amount_main span[role='car-info-more'],.total_amount_main span[role='car-info-more-pos']", "mouseover", function () {
		
		$(".total_amount_main span[role='car-info-more-pos']").show();
		clearTimeout(timer);
	});
	$("body").delegate(".total_amount_main span[role='car-info-more'],.total_amount_main span[role='car-info-more-pos']", "mouseout", function () {
		timer = setTimeout(function () { 
			$(".total_amount_main span[role='car-info-more-pos']").hide();
		}, 500);
				
	});
	
	$("body").delegate(".total_amount_main span[role='charges-info'],.total_amount_main span[role='charges-info-more-pos']", "mouseover", function () {
		$(".total_amount_main span[role='charges-info-more-pos']").show();
		clearTimeout(timer);
	});
	$("body").delegate(".total_amount_main span[role='charges-info'],.total_amount_main span[role='charges-info-more-pos']", "mouseout", function () {
		timer = setTimeout(function () { 
			$(".total_amount_main span[role='charges-info-more-pos']").hide();
		}, 500);
				
	});
	
	
	
	//添加报价包含
	$("body").delegate("#inquiryAddItem", "click", function(){
		var _newitem= '<dl class="add_amount_list"><input type="text" class="long_text_input02"  placeholder="花费项目" role="costName" maxlength="10"><input type="text" class="long_text_input02 mleft40"  placeholder="花费金额" role="costPrice"><span class="delete_amount_btn mleft10" id="deleteAmountBtn"></span></dl>';
		
		var _itemlength = $(".add_amount_list").length;
		
		if( _itemlength < 3  ){	
			$(".add_amount_cont").append(_newitem);
		}
		else{
			//alert("请输入详细报价的内容，最多三项");
			util.tips.basic("请输入详细报价的内容，最多三项");
		}
	});
	
	//移除报价包含
	$("body").delegate( '#deleteAmountBtn', 'click', function () {
		$(this).parents('.add_amount_list').remove();
	});
	
	//能否预定逻辑
	$("body").delegate("span[role='reply-inquiry-enabled']", "click", function () {
		var _this = $(this);
		_this.parent().parent().siblings().show();
		_this.addClass("btn_limit_yellow_selected").siblings().removeClass("btn_limit_yellow_selected");
		
	});
	$("body").delegate("span[role='reply-inquiry-disabled']", "click", function () {
		var _this = $(this);
		_this.parent().parent().siblings().hide();
		_this.addClass("btn_limit_yellow_selected").siblings().removeClass("btn_limit_yellow_selected");
	});
	
	//表格文字气泡
	$("body").delegate("#inquiryManageTBody span[role='name-item']", "mouseover", function () {
		var _this = $(this);
		_this.next(".account_table_td_detial").show();
	
	});
	
	$("body").delegate("#inquiryManageTBody span[role='name-item']", "mouseout", function () {
		var _this = $(this);
		_this.next(".account_table_td_detial").hide();
	});
	
//分页模块 start
//分页按钮点击
$("body").delegate(".normal-btn", "click", function () {	
	//var offsetTop = getOffsetTop();
	//$("html,body").animate({scrollTop: offsetTop});
	var _this = $(this);
	var curPage = parseInt(_this.html());
	var method = _this.attr("method");
	switch (method) {
		
		case "adsys-advertiser":	//
			util.adsys.advertiserPanel.showAllAdvertisersList(curPage);
			break;
		
		case "inquiry-manage":	//询价单管理
			quiryManagement.inquiryManage.inquiryManageList(curPage);
			break;
		case "order-manage":	//订单管理
			orderManagement.orderManageList(curPage);
			break;
		case "setting_bill":	//结算账单
			settingBill.getPageData(curPage);
			break;
		case "accounts-manage":	//账户列表
			accountsManage.accountsManageList(curPage);
			break;	
		case "adsys-message":	//消息列表
            message_util.message.message.messageList(curPage);
            break;			
		
	}
});

//下一页点击
$("body").delegate(".next-btn", "click", function () {
        //var offsetTop = getOffsetTop(this);


        //$("html,body").animate({scrollTop: offsetTop});
        var _this = $(this);
        var method = _this.attr("method");
        var curPage = parseInt(_this.parent().find(".cur").html());
        switch (method) {
            
            case "adsys-advertiser":
                util.adsys.advertiserPanel.showAllAdvertisersList(curPage + 1);
                break;
            case "inquiry-manage":	//询价单管理
				quiryManagement.inquiryManage.inquiryManageList(curPage + 1);
				break;
			case "order-manage":	//订单管理
				orderManagement.orderManageList(curPage + 1);
				break;
			case "setting_bill":	//结算账单
				settingBill.getPageData(curPage+1);
				break;	
            case "accounts-manage":	//账户列表
				accountsManage.accountsManageList(curPage+1);
				break;
			case "adsys-message":	//消息列表
				message_util.message.message.messageList(curPage+1);
				break;
        }
    });

//上一页点击
$("body").delegate(".prev-btn", "click", function () {
        //var offsetTop = getOffsetTop(this);

        //$("html,body").animate({scrollTop: 200});
        //$("html,body").animate({scrollTop: offsetTop});
        var _this = $(this);
        var method = _this.attr("method");
        var curPage = parseInt(_this.parent().find(".cur").html());
        switch (method) {
            
            case "adsys-advertiser":
                util.adsys.advertiserPanel.showAllAdvertisersList(curPage - 1);
                break;
            case "inquiry-manage":	//询价单管理
				quiryManagement.inquiryManage.inquiryManageList(curPage - 1);
				break;
			case "order-manage":	//订单管理
				orderManagement.orderManageList(curPage - 1);
				break;
			case "setting_bill":	//结算账单
				settingBill.getPageData(curPage - 1);
			break;
			case "accounts-manage":	//账户列表
				accountsManage.accountsManageList(curPage - 1);
				break;
			case "adsys-message":	//消息列表
				message_util.message.message.messageList(curPage - 1);
				break;
            
        }
    });

//分页首页按钮点击
$("body").delegate(".first-page-btn", "click", function () {
        //var offsetTop = getOffsetTop(this);

        //$("html,body").animate({scrollTop: 200});
        //$("html,body").animate({scrollTop: offsetTop});
        var _this = $(this);
        var method = _this.attr("method");
        var curPage = parseInt(_this.parent().find(".cur").html());

        switch (method) {
            
            case "adsys-advertiser":	//广告系统-广告主
                util.adsys.advertiserPanel.showAllAdvertisersList(1);
                break;
            case "inquiry-manage":	//询价单管理
				quiryManagement.inquiryManage.inquiryManageList(1);
				break;
			case "order-manage":	//订单管理
				orderManagement.orderManageList(1);
				break;
            case "setting_bill":	//结算账单
				settingBill.getPageData(1);
			break;
			case "accounts-manage":	//账户列表
				accountsManage.accountsManageList(1);
				break;
			case "adsys-message":	//消息列表
				message_util.message.message.messageList(1);
				break;
        }
    });

//分页末页按钮点击
$("body").delegate(".last-page-btn", "click", function () {
        //var offsetTop = getOffsetTop(this);

        //$("html,body").animate({scrollTop: offsetTop});
        var _this = $(this);
        var method = _this.attr("method");
        var curPage = parseInt(_this.parent().attr("total"));
        switch (method) {
            
            case "adsys-advertiser":	//广告系统-广告主
                util.adsys.advertiserPanel.showAllAdvertisersList(curPage);
                break;
            case "inquiry-manage":	//询价单管理
				quiryManagement.inquiryManage.inquiryManageList(curPage);
				break;
			case "order-manage":	//订单管理
				orderManagement.orderManageList(curPage);
				break;
			case "setting_bill":	//结算账单
				settingBill.getPageData(curPage);
				break;	
            case "accounts-manage":	//账户列表
				accountsManage.accountsManageList(curPage);
				break
			case "adsys-message":	//消息列表
				message_util.message.message.messageList(curPage);
				break;
        }
    });
	//分页模块 end	
	//询价单列表 end

	//表格文字气泡
	$("body").delegate("#orderManageTBody span[role='name-item']", "mouseover", function () {
		var _this = $(this);
		_this.next(".account_table_td_detial").show();

	});

	$("body").delegate("#orderManageTBody span[role='name-item']", "mouseout", function () {
		var _this = $(this);
		_this.next(".account_table_td_detial").hide();
	});
	//鼠标滑过显示手机号
	$("body").delegate("#sendUserName", "mouseover", function () {
		var _this = $(this);
		_this.next("#sendUserPhone").show();

	});

	$("body").delegate("#sendUserName", "mouseout", function () {
		var _this = $(this);
		_this.next("#sendUserPhone").hide();
	});
    //点击po单显示查看和下载
	$("body").delegate("#poDan", "mouseover", function () {
		$("#look_img").show();
		$("#download_img").show();
	});
	$("body").delegate("#poDan", "mouseout", function () {
		$("#look_img").hide();
		$("#download_img").hide();
	});

    //点击po单查看显示
    //点击po单下载文件
    //二维码弹窗显现与隐藏
    $("body").delegate(".ewm","mouseover",function(){
        $(this).siblings(".ewm_popup").show();
    });
    $("body").delegate(".ewm","mouseout",function(){
        $(this).siblings(".ewm_popup").hide();
    });
});