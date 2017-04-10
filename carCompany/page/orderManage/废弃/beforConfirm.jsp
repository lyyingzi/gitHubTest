<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <title>待确认订单</title>
    <meta name="author" content="hexiaobao"/>
    <link rel="stylesheet" type="text/css" href="../css/base.css" />
    <link rel="stylesheet" type="text/css" href="../css/common.css">
    <link rel="stylesheet" type="text/css" href="../css/orderManage.css">
    <link rel="stylesheet" type="text/css" href="../css/jquery-ui.min.css">
</head>

<body>
<!--header start-->
<div class="header_car_bg">
    <div class="header_car center">
        <div class="header_logo_main">
            <a href="#"><img class="header_logo" src="../img/com_logo.png" width="103" height="102"></a>
            <span class="com_name">假日酒店,您好,欢迎登录WeMeeting</span>
            <div class="clear"></div>
        </div>
        <div class="header_car_alarm">
            <span>2016年12月09日 16:33:55 星期五</span>
            <i class="icon_car_alarm"></i>
            <div class="car_message">8</div>
        </div>
        <a class="logout">退出登录</a>
        <a class="logoin_pwd" >修改密码</a>

    </div>
</div>
<!--header end-->

<!--body start-->
<div class="nav_wrap bg_array01">
    <div class="nav_bread font-array02  center">当前位置：<span>订单管理</span>>订单</div>
    <!-- 6个tag-->
    <div class="nav_main center">
        <ul class="nav_list_short" role="nav-container-main">
            <li  role="inquiry-manage"><i class="inquiry_manage"></i><span>询价单管理</span></li>
            <li  class="order_manage_selected" role="order-manage"><i class="order_manage"></i><span>订单管理</span></li>
            <li role="setting-bill"><i class="setting_bill"></i><span>结算账单</span></li>
            <li role="info-maintain"><i class="info_maintain"></i><span>信息维护</span></li>
            <li role="accounts-manage"><i class="accounts_manage"></i><span>账号及权限管理</span></li>
            <li role="customer-service"><i class="customer_service"></i><span>客户服务</span></li>
        </ul>
    </div>
    <!-- serch-->
    <div class="search_wrap affirm_search">
        <div class="search_main">
            <div class="search_input fl">
                <div class="fl">
                    <span class="mleft7">订单号：</span><span id="orderNo"></span>
                    <span class="mleft130">发送人：</span>
                    <span class="mright15" id="sendComName"></span>
                    <span class="mright15" id="sendUserName"></span>
                    <span id="sendUserPhone"></span>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
    <!-- progress bar-->
    <div class="list_content c">
        <div class="order_status">
            <p class="order_title">
                <span>客户已提交预定</span>
                <span>已完成预定</span>
                <span>客户已支付</span>
                <span>已收款</span>
            </p>
            <p class="progress_bar">
                <span class="round shine_round_main"><span class="shine_round"></span></span>
                <span class="line"></span>
                <span class="round "></span>
                <span class="line"></span>
                <span class="round "></span>
                <span class="line"></span>
                <span class="round "></span>
            </p>
        </div>
    </div>

    <!--content -->
    <div class="account_wrap center">
        <div class="c">
            <div class="meeting_info">
                <ul>
                    <li><span class="content_mark">会议名称</span><span id="conName"></span></li>
                    <li><span class="content_mark">会议编码</span><span id="conCode"></span></li>
                    <li><span class="content_mark">会议po单</span><span class="po" id="poDan"><img src="./../img/orderManageImg/orderManagePo.png" alt="po单"/></span></li>
                    <li><span class="content_mark">PO单限额</span><span id="poPrice"></span>元</li>
                </ul>
            </div>
            <div class="total_money">
                <div class="total_money_top">
                    <span class="total_money_img"></span>
                    <span class="total_money_title">订单总费用预算</span>
                </div>
                <ul class="total_money_bottom">
                    <li><span class="content_mark">总计金额</span><span id="sendAmount"></span>元</li>
                </ul>
            </div>
            <div class="use_car">
                <div class="use_car_top">
                    <span class="use_car_img"></span>
                    <span class="use_car_title">用车</span>
                </div>
                <ul class="use-car-bottom">
                    <li><span class="content_mark">用车方式</span><span id="useCarType"></span></li>
                    <li><span class="content_mark">用车时间</span><span id="useCarTime">2015年10月30日 9:30</span></li>
                    <li><span class="content_mark">上车地点</span><span id="startAddress"></span></li>
                    <li><span class="content_mark">下车地点</span><span id="endAddress"></span></li>
                    <li><span class="content_mark">车型选择</span><span id="carTypeDesc"></span></li>
                    <li><span class="content_mark">座位数量</span><span id="seatCount"></span></li>
                    <li><span class="content_mark">可选车型</span><span id="vehicleModelName"></span><span class="mleft60 font_yellow include_more " role="include-more">车型描述<i class="circle_arrow_right"></i></span></li>
                    <li><span class="content_mark">总计金额</span><span id="amount"></span>元</li>
                    <li><span class="content_mark">乘车人姓名</span><span id="passengeName"></span></li>
                    <li><span class="content_mark">乘车人电话</span><span id="passengePhone"></span></li>
                    <li><span class="content_mark">需求描述</span><span id="requirementDesc"></span></li>
                </ul>
            </div>
            <div class="affirm_order">
                <div class="affirm_order_top">
                    <span class="affirm_order_img"></span>
                    <span class="affirm_order_title">确认订单</span>
                </div>
                <ul class="affirm_order_bottom">
                    <li>
                        <dt class="reply_inquiry_detial_label">确认预订</dt>
                        <dd class="reply_inquiry_detial_value">
                            <span class="btn_limit_array btn_limit_yellow_selected" role="reply-inquiry-enabled">确认</span>
                            <span class="btn_limit_array mleft15" role="reply-inquiry-disabled">取消</span>
                        </dd>
                    </li>
                    <li>
                        <dt class="reply_inquiry_detial_label">取消时限</dt>
                        <dd class="reply_inquiry_detial_value">
                            <input  class="long_text_input date-input" id="stopTime" readonly>
                        </dd>
                    </li>
                    <li>
                        <dt class="reply_inquiry_detial_label">司机姓名</dt>
                        <dd class="reply_inquiry_detial_value">
                            <input type="text" class="long_text_input" id="driverName">
                        </dd>
                    </li>
                    <li>
                        <dt class="reply_inquiry_detial_label">司机电话</dt>
                        <dd class="reply_inquiry_detial_value">
                            <input type="text" class="long_text_input" id="driverPhone">
                        </dd>
                    </li>
                    <li>
                        <dt class="reply_inquiry_detial_label">车牌号码</dt>
                        <dd class="reply_inquiry_detial_value">
                            <input type="text" class="long_text_input" id="vehicleNo">
                        </dd>
                    </li>
                    <li>
                        <dt class="reply_inquiry_detial_label">总计金额</dt>
                        <dd class="reply_inquiry_detial_value total_amount_main">
                            <div>
                                <input type="text" class="short_text_input" id="totalAmount" placeholder="1,000.00">
                                <span class="mleft5">元</span>
                                <span class="mleft60 font_yellow include_more " role="include-more">报价包含 <i class="circle_arrow_right"></i></span>
                                <span class="include_more_info">输入详细报价，最多三项</span>
                            </div>
                            <div class="add_amount_main">
                                <span class="add_btn_yellow_limit" id="inquiryAddItem">添加项目</span>
                                <div class="add_amount_cont">

                                </div>
                            </div>
                        </dd>
                    </li>
                    <li >
                        <dt class="reply_inquiry_detial_label">其他说明</dt>
                        <dd class="reply_inquiry_detial_value">

                            <textarea name="" cols="" rows=" " id="otherInfo" class="short_text_textarea" placeholder="可输入车辆相关信息及说明"></textarea>
                            <div></div>
                        </dd>
                    </li>
                    <div class="clear"></div>
                </ul>
            </div>
            <div class="replay_button">
                <button class="send_replay" role="order-reply-btn">发送回复</button>
               <button class="send_replay" role="modify-order">修改订单</button>
			   <button class="cancle" role="cancle-order">取消订单</button>
            </div>
        </div>
        <!-- right-nav-->


    </div>
</div>
<!--body end-->

<!--footer start-->
<div class="footer_car_bg bg_blue">
    <div class="footer_car center bg_blue">
        <div class="about_us_car">
            <span class="span_right"><a href="#">意见反馈</a></span>
            <span class="span_right"><a href="#">关于我们</a></span>
            <span class=""><a href="#">联系我们</a></span>
            <div class="imice_logo_main mtop20">
                <div class="imice_logo fl mleft60"></div>
                <div class="fl mleft40">
                    <p class=" align-center line-height40">客服热线：010-57074011</p>
                    <p class="align-center">服务邮箱：wemeeting@i-mice.cn</p>
                </div>
            </div>
        </div>
        <div class=" align-center font-array01 copy_right_car">京ICP备16027591号-2&nbsp;&nbsp;|&nbsp;&nbsp;中青博联整合营销顾问股份有限公司&nbsp; &nbsp;北京爱麦思科技有限公司</div>
    </div>
</div>
<!--footer end-->

<!--right_nav 右侧导航-->
<div class="right_nav">
  <ul role="right-nav">
    <li><a href="javascript:void(0);" class="to_top" role="to-top"></a></li>
    <li class="inquiry_manage" role="inquiry-manage"><a href="javascript:void(0);" class="inquiry_manage"></a></li>
    <li class="order_manage_selected" role="order-manage"><a href="javascript:void(0);" class="order_manage"></a></li>
    <li class="setting_bill" role="setting-bill"><a href="javascript:void(0);" class="setting_bill"></a></li>
    <li class="info_maintain" role="info-maintain"><a href="javascript:void(0);" class="info_maintain"></a></li>
    <li class="accounts_manage" role="accounts-manage"><a href="javascript:void(0);" class="accounts_manage"></a></li>
    <li class="customer_service" role="customer-service"><a href="javascript:void(0);" class="customer_service"></a></li>
    <li><a href="javascript:void(0);" class="ewm"></a></li>
  </ul>
</div>

<script type="text/javascript" src="../js/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="../js/jquery-ui.min.js"></script>
<script type="text/javascript" src="../js/jquery.page.js"></script>
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../js/interface.js"></script>
<script type="text/javascript" src="../js/util.js"></script>
<script type="text/javascript" src="../js/handle.js"></script>
<script>
    util.data.generateTimeString();

    $(function(){

        var dataUpload = {
            "uId": "1",
            "comId": "2",
            "conName": "3",
            "orderNo": "4",
            "operatorId": "5",
            "sendComName": "6",
            "pageSize": "2",
            "pageNow": "1",
            "state": "500",
            "startTime": 20170202,
            "endTime": 20170204
        };
        $.ajax({
            type: "post",
            url: interface.host + '/vehiclecenter/carOrder/list',
            cache: false,
            async: false,
            data: dataUpload,
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    var row = info.rows[0];
                    $("#amount").text(formatCurrency(row.amount));
                    var billList = row.settlementList;
                    $("tbody").empty();

                }
            }
        });
    })
//    取消订单回首页
    $("button[role='close-order-reply-btn']").on("click", function () {
        window.history.go(-1);
    });
</script>

</body>
</html>
