/**
 * Created by liuying on 2017/2/9.
 */
settingBill = {
    getPageData : function (pno) {
        //判断开始时间是否大于结束时间
        var startTime = $(".datePrev").val();
        var endTime = $(".dateNext").val();

		if (startTime) {
			startTime = Date.parse(new Date(startTime + " 00:00:00")) / 1000;
		}
        if (endTime) {
            endTime = Date.parse(new Date(endTime + " 23:59:59")) / 1000;
        } else {
            endTime = "";
        }
        //if (startTime > endTime) {
        //    alert("开始时间不能大于结束时间");
        //    return;
        //}
        console.log(startTime);
        console.log(endTime);
        var dataUpload = {
            //"uId": "1",
            "uId": AUTOCAR.data_uId,
            "ver": "1",
            "appver": "1",
            "equipment": "1",
            "token": "1",
            "udid": "1",
            "pageSize": AUTOCAR.data_pageSize,
            "pageNow": "1",
            "pageNow" : pno,
            "sendComName": $(".bill_search .sendComName").val(),
            "startTime": startTime,
            "endTime": endTime,
			"comId":AUTOCAR.data_comId
        };
        $.ajax({
            type: "post",
            //url:"http://test-vehicle.wemeeting.net/service/vehiclecenter/carOrder/balanceBill",
            url: interface.host + '/vehiclecenter/carOrder/balanceBill',
            cache: false,
            async: false,
            data: dataUpload,
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    var row = info.rows[0];
                    $("#amount").text("+"+util.formatCurrency(row.amount));
                    var billList = row.settlementList;
                    $("tbody").empty();
                    $.each(billList, function (index, item) {

                        var html = '<tr>' +
                            '                        <td>' +
                            '                            <p><a href="javascript:settingBill.linkOrderDetail(\''+item.orderNo+'\')" class="sub_color_red">订单号：<sapn>' + item.orderNo + '</sapn></a></p>' +
                            '                            <p>' + item.sendComName + '</p>' +
                            '                        </td>' +
                            '                        <td>' +
                            '                            <p>' + settingBill.getTimeStr2(item.orderCreateTime) + '</p>' +
                            '                            <p>' + item.resDesc + '</p>' +
                            //'                             <input type="hidden" id="'+ item.resId +'" value="'+ item.resId +'">'+
                            '                        </td>' +
                            '                        <td>' +
                            '                            <p>' +
                            '                                <span>会议名称：</span>' +
                            //'                                <input type="hidden" value=' + item.cId + ' id="'+ item.cId +'"/>' +
                            '                                <span class="meeting_name mright50 meetingName">' + item.conName + '</span>' +
                            '                                <span>状态：</span>' +
                            //'                                <input type="hidden" id="'+ item.state +' value="'+ item.state +'">'+
                            '                                <span class="bill_state">' + item.stateDesc + '</span>' +
                            '                            </p>' +
                            '                            <p>' +
                            '                                <span>' + settingBill.timestampToDate(item.startTime) + '</span>' +
                            '                                <span>-</span>' +
                            '                                <span>' + settingBill.timestampToDate(item.endTime) + '</span>' +
                            '                            </p>' +
                            '                        </td>';
                        var carAmount = '';
                        var carFare = '';
                        if (item.extraCost) {
                            carAmount = "扣款：";
                            carFare = "+"+util.formatCurrency(item.extraCost);

                        } else {
                            carAmount = "车费：";

                            carFare = "+"+util.formatCurrency(item.orderAmount);

                        }
                        html +='                        <td>' +
                            '                            <span class="carAmount">'+ carAmount +'</span>' +
                            '                            <span class="sub_color_red car_fare" id="carFare">'+ carFare +'</span>' +
                            '                            <span class="sub_color_red" style="font-size:22px">元</span>' +
                            '                        </td>' +
                            '                    </tr>';

                        $("tbody").append(html);
                    });
					util.pages.generatePageNav(info.total, pno, "setting_bill", ".settingBill-page-nav");//分页
                }
            }
        });
    },

    getTimeStr : function (time) {//参数为精确到秒的时间戳
        var date = new Date();
        date.setTime(time);
        return settingBill.dateformat(date,"yyyy-MM-dd hh:mm:s")
    },
  /*  function timestampToDate(timestamp){
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "年" +
            (d.getMonth() + 1) + "月" +
            (d.getDate()) + "日" +
            (d.getHours()) + ":" +
            (d.getMinutes());
        return date;
    }*/
    timestampToDate : function (timestamp){
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "年" +
            (d.getMonth() + 1) + "月" +
            (d.getDate()) + "日";

        return date;
    },
    getTimeStr2 : function(time) {//参数为精确到毫秒的时间戳
        var date = new Date();
        date.setTime(time * 1000);
        return settingBill.dateformat(date,"yyyy-MM-dd hh:mm:ss")
    },

    dateformat : function (dateTime,format) {
        var date = {
            "M+": dateTime.getMonth() + 1,
            "d+": dateTime.getDate(),
            "h+": dateTime.getHours(),
            "m+": dateTime.getMinutes(),
            "s+": dateTime.getSeconds(),
            "q+": Math.floor((dateTime.getMonth() + 3) / 3),
            "S+": dateTime.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    },
	
	linkOrderDetail : function(orderNo,state){
		localStorage.orderNo = orderNo;
		location.href = "../orderManage/orderInfo.html";  
	},
}