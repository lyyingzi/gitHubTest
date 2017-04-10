message_util = {
	//消息列表
		message: {
			message: {
				messageList: function (start) {
					var sysData = {uId: AUTOCAR.data_uId, comId: AUTOCAR.data_comId,type:'01', pageSize: AUTOCAR.data_pageSize, pageNow: start,token:05,equipment:3,ver:"001",udid:"002",appver:123456};
					interface.message.carMessageList(sysData, function (data) {
						message_util.message.message.generateMessageTable(start, data);
					});
				},
				generateMessageTable: function (start, data) {
					if (data.success == true) {
						var _li,id,uId,fuxuan,danNo,danTypeId, sendComId,title,content,time,hasRead,caozuo,temp = $(" <div class='message_list msgList' id='message_list_msgList'></div>"),_ul = $("<ul></ul>"); 
						$.each(data.rows, function (i, m) {
							_li = $("<li class='singleList' uid=" + m.uId + " nid="+m.id+"></tr>");
							danhao=$("<span style='display:none'>" + m.danNo + "</span>");
							fuxuan=$("<a href='javascript:void(0)'><i class='circle singleCheck' nid="+m.id+"></i></a>");
							
							if(m.hasRead == 0){
								time = $('<span class="mright40 sub_color_orange">'+timestampToDate(m.time)+'</span>');	//时间
								if(m.content.length>55){
									content = $('<span class="sub_color_orange" title="'+m.content+'">'+m.content.substring(0,55)+'...</span>');	//内容	
								}else{
									content = $('<span class="sub_color_orange"title="'+m.content+'">'+m.content.substring(0,m.content.length)+'</span>');	//时间
								}
							}else{
								time = $('<span class="mright40">'+timestampToDate(m.time)+'</span>');	//时间
								if(m.content.length>55){
									content = $('<span  title="'+m.content+'">'+m.content.substring(0,55)+'...</span>');	//内容	
								}else{
									content = $('<span  title="'+m.content+'">'+m.content.substring(0,m.content.length)+'</span>');	//时间
								}
							}
							
							caozuo=$("<span class='fr sub_color_orange'><a href='#' onclick='qODetail("+m.danTypeId+",\""+m.danNo+"\")' role='inquiry_manage_detial_label' id='inquiry_manage_detial_label' class='sub_color_orange'>查看</a>&nbsp;|&nbsp;<a href='javascript:void(0)' class='sub_color_orange' role='messageList_Delete'>删除</a></span>")
							_li.append(danhao).append(fuxuan).append(time).append(content).append(caozuo);
							_ul.append(_li);
							temp.append(_ul);

						});
						$("#message_list_msgList").html(temp.html());
						//debugger;
						util.pages.generatePageNav(data.total, start, "adsys-message", ".message-page-nav");
					}
					else if (data.code == 0001) {
						$("#message_list_msgList,.account_page").empty();
                    	util.tips.basic(data.message);
                	} 
					else if (data.code == 0002) {
						$("#message_list_msgList,.account_page").empty();
                    	util.tips.basic(data.message);
                	}
					else {
                    	util.tips.basic("获取消息列表失败，请重试");
                	}
					
					
				
				},
				
			},
				
		},
};