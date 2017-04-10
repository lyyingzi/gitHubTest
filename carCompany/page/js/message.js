/**
 * Created by liuying on 2017/2/16.
 */
// $(function(){
	// });
    //console.log($(".allCheck"));
    //点击全选圆，自己的选中状态且其他圆的选中状态
    $(".allCheck").click(function(){
        var _this = $(this);
        if (_this.hasClass("bg")) {
            _this.removeClass("bg");
            _this.parents(".msgTitle").siblings(".msgList").find(".singleCheck").removeClass("bg");
        } else {
            _this.addClass("bg");
            _this.parents(".msgTitle").siblings(".msgList").find(".singleCheck").addClass("bg");
        }
    });
    //单个圆被选中的时候，全选圆不被选中，当所有的圆都被选中，那全选圆被选中
    
    //console.log(_single.length);
    //$.each(_single,function(index,item){
    //    console.log(item);
    //    //$(".msgList").delegate(item,"click",function(){
    //    //    item.addClass("bg");
    //    //})
    //    item.click(function(){
    //        item.addClass("bg");
    //    })
    //});
	//取消全选
    $(".msgList").delegate(".singleCheck","click",function(){
        var _this = $(this);
		var _singleArr = $(".singleCheck");
        if (_this.hasClass("bg")) {
            _this.removeClass("bg");
            for (var i = 0; i < _singleArr.length; i++) {
                var _single = _singleArr[i];
                if (_single.hasClass("bg")) {
                    $(".allCheck").addClass("bg");
                } else {

                }
            }
        } else {
            _this.addClass("bg");
        }
    });
	
	//时间戳转换
	function timestampToDate(timestamp){
		var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
		var h = d.getHours() + "";
		var m = d.getMinutes() + "";
		if(h.length == 1){
			h = "0" + d.getHours();
		}
		if(m.length == 1){
			m = "0" + d.getMinutes();
		}
		var date = (d.getFullYear()) + "-" + 
				   (d.getMonth() + 1) + "-" +
				   (d.getDate()) + "-" + 
				   h + ":" + 
				   m;
		return date;
	};
	//查询询价单列表
	function qyeryMessageList(start){
		if (localStorage.messStart != "") {
			start = localStorage.messStart;
		}
		message_util.message.message.messageList(start);
		localStorage.messStart = "";
	}
	//删除消息
	$("body").delegate("a[role='messageList_Delete']", "click", function () {
		//判断是否删除当前信息
		if (confirm("确定删除当前消息吗")==true){
			var _id = $(this).parent().parent().attr("nid");
			var sysData = {id: _id,token:05,equipment:3,ver:"001",udid:"002",appver:123456};
			interface.message.carMessageDelete(sysData, function (data) { 
				if (data.success == true) {
					util.tips.basic("删除成功！");
					var _singleArr = $(".allCheck");
					if (_singleArr.hasClass("bg")) {
						_singleArr.removeClass("bg");
					}
					util.headerTplCount.show();
					message_util.message.message.messageList($("body .cur").text());
				}
				else{
					util.tips.basic(data.message);//通用提示框
					return;
				}
			});
		}else{
			return false;
		}
		
	});
	//批量删除
	$("body").delegate("a[role='deleteList']","click",function(){
		
			var deIdList="";
			var _singleArr = $(".singleCheck");
			for (var i = 0; i < _singleArr.length; i++) {
				var _single = _singleArr[i];
				if ($(_single).hasClass("bg")) {
					deIdList+=$(_single).parent().parent().attr("nid");
					deIdList+=','
				} 
			}
			deIdList=deIdList.substr(0,(deIdList.length-1));
			if(deIdList==""){
				util.tips.basic("请至少勾选一条消息！");
				return false;
			}
			if (confirm("确定删除当前所勾选的消息吗")==true){
				var sysData = {id: deIdList,token:05,equipment:3,ver:"001",udid:"002",appver:123456};
				interface.message.carMessageDelete(sysData, function (data) { 
					if (data.success == true) {
						util.tips.basic("删除成功！");
						var _singleArr = $(".allCheck");
						if (_singleArr.hasClass("bg")) {
							_singleArr.removeClass("bg");
						}
						util.headerTplCount.show();
						message_util.message.message.messageList($("body .cur").text());
					}
					else{
						util.tips.basic(data.message);
						return;
					}
				});
			}else{
				return false;
			}
    });
	//批量修改状态（已读）
	$("body").delegate("a[role='updateList']","click",function(){
			var deIdList="";
			var _singleArr = $(".singleCheck");
			for (var i = 0; i < _singleArr.length; i++) {
				var _single = _singleArr[i];
				if ($(_single).hasClass("bg")) {
					deIdList+=$(_single).parent().parent().attr("nid");
					deIdList+=','
				} 
			}
			deIdList=deIdList.substr(0,(deIdList.length-1));
			if(deIdList==""){
				util.tips.basic("请至少勾选一条消息！");
				return false;
			}
			if (confirm("确定将当前所勾选的消息置为已读吗")==true){
				var sysData = {id: deIdList,hasRead:'1',token:05,equipment:3,ver:"001",udid:"002",appver:123456};
				interface.message.carMessageUpdate(sysData, function (data) { 
					if (data.success == true) {
						util.tips.basic("标记为已读成功！");
						var _singleArr = $(".allCheck");
						if (_singleArr.hasClass("bg")) {
							_singleArr.removeClass("bg");
						}
						util.headerTplCount.show();
						message_util.message.message.messageList($("body .cur").text());
					}
					else{
						util.tips.basic(data.message);
						return;
					}
				});
			}else{
				return false;
			}
    });
