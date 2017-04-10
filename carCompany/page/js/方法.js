/**
 * Created by liuying on 2017/2/25.
 */
$("#addAffirm").click(function(){
    var _this = $(this);
    //判断有没有未填写的，若有则进行处理
    if ($("#addModelName").val().length == 0) {
        $("#addModelName").addClass("verify_error");
        util.tips.basic("车型名称不能为空");
    } else if ($("#addSeat").val().length == 0) {
        $("#addSeat").addClass("verify_error");
        util.tips.basic("座位数不能为空");
    } else if ($("#addAge").val().length == 0) {
        $("#addAge").addClass("verify_error");
        util.tips.basic("车龄不能为空");
    } else if ($("#addPrice").val().length == 0) {
        $("#addPrice").addClass("verify_error");
        util.tips.basic("参考价格不能为空");
    } else if (!_this.parents(".car_add_page").find().hasClass("verify_error")) {
        //获取填入的数据
        var dataAddModel = {
            "uId" : 1,
            "comId" : 1,
            "vehicleModelName" : $("#addModelName").val(),   //车型名称
            //"vehicleModelName" : "奔驰",   //车型名称
            "seatCount" : $("#addSeat").val(),              //座位数
            //"seatCount" : "5座",              //座位数
            "vehicleAge" : $("#addAge").val(),              //车龄
            //"vehicleAge" : "5年以内",              //车龄
            "referencePrice" : $("#addPrice").val(),        //参考价格
            //"referencePrice" : "100.00/天",        //参考价格
            "otherDesc" : $("#otherDesc").val()             //说明
        };
        console.log(dataAddModel);
        //将信息传给后台
        ajaxMethod("/vehiclecenter/carCompany/saveOrUpdateCarInfo",dataAddModel);

        //将新增车型页面上填写的内容清空
        $("#addModelName").val("");
        $("#addSeat").val("");
        $("#addAge").val("");
        $("#addPrice").val("");
        $("#otherDesc").val("");


        //页面跳转到车型信息页面并将车型信息展示到页面上
        //车型管理接口需传入的参数
        var dataManage = {
            "uId" : 1,
            "comId" : 1,
            "pageSize" : "2",
            "pageNow" : 1
        };
        ajaxMethod("/vehiclecenter/carCompany/findCarInfo",dataManage);
        console.log(managelList);
        _this.parents(".car_add_page").hide().siblings(".car_control_page").show();
        $(".car_control_page tbody").empty();
        $.each(managelList,function(index,item){
            var html = '<tr>'+
                '        <td>'+ item.vehicleModelName +'</td>'+
                '        <td>'+ item.vehicleModelDesc+'</td>'+
                '        <td class="consult_price sub_color_blue"><span>'+ item.referencePrice+'</span>&nbsp;<span>起</span></td>'+
                '        <td class="dispose ">'+
                '               <input type="hidden" value="'+ item.vehicleModelId +'">'+
                '               <a href="javascript:void(0)" class="sub_color_blue mright20 disposeEdit">编辑</a>'+
                '               <a href="javascript:void(0)" class="sub_color_blue disposeDel">删除</a>'+
                '        </td>'+
                '</tr>';
            $(".car_control_page tbody").append(html);
        })
    }

});   //点击新增页面确认后的步骤

$("#addCancel").click(function(){
    var _this = $(this);
    //车型管理接口需传入的参数
    var dataManage = {
        "uId" : 1,
        "comId" : 1,
        "pageSize" : "2",
        "pageNow" : 1
    };
    ajaxMethod("/vehiclecenter/carCompany/findCarInfo",dataManage);
    console.log(managelList);
    _this.parents(".car_add_page").hide().siblings(".car_control_page").show();
    $(".car_control_page tbody").empty();
    $.each(managelList,function(index,item){
        var html = '<tr>'+
            '        <td>'+ item.vehicleModelName +'</td>'+
            '        <td>'+ item.vehicleModelDesc+'</td>'+
            '        <td class="consult_price sub_color_blue"><span>'+ item.referencePrice+'</span>&nbsp;<span>起</span></td>'+
            '        <td class="dispose ">'+
            '               <input type="hidden" value="'+ item.vehicleModelId +'">'+
            '               <a href="javascript:void(0)" class="sub_color_blue mright20 disposeEdit">编辑</a>'+
            '               <a href="javascript:void(0)" class="sub_color_blue disposeDel">删除</a>'+
            '        </td>'+
            '</tr>';
        $(".car_control_page tbody").append(html);
    })

});          //点击取消后的步骤