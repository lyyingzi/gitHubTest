accountsManage = {
	//订单管理
	accountsManageList: function (start) {
		var roleId = "";
		if($("#roleState").val() != null && $("#roleState").val() != "" && $("#roleState").val() != "-1"){
			roleId = $("#roleState").val();
		}
		var userstatus = ""
		if($("#userState").val() != null && $("#userState").val() != "" && $("#userState").val() != "-1"){
			userstatus = $("#userState").val();
		}
		var sysData = {uId: AUTOCAR.data_uId, comId: AUTOCAR.data_comId, pageSize:AUTOCAR.data_pageSize, pageNow:start, roleId:roleId,userStatus:userstatus};

		interface.accountsManage.accountsManageList(sysData, function (data) {
			accountsManage.generateAccountsManageTable(start, data);
		});
	},
	generateAccountsManageTable: function (start, data) {
		if (data.success == true) {
			var temp = $("<div></div>");
			$.each(data.rows, function (i, m) {
				var tr,comName,bj,sc,cz,st, busUserName, busRealName, userStatus, roleDesc, operatorTime, operatorLog,operate
				tr = $("<tr busUserId=" + m.busUserId + "></tr>");
				comName = $('<td>' + m.comName + '</td>');	//公司名称
				busUserName = $('<td>' + m.busUserName + '</td>');	//用户名
				busRealName = $('<td>' + m.busRealName + '</td>');	//真实姓名
				if(m.userStatus  == "00"){
					userStatus = $('<td>停用</td>');	//账号状态
					st = $("<a class='font_blue' href='javascript:accountsManage.updateState("+m.busUserId+",\""+m.userStatus+"\");'>启用</a>");
				} else if (m.userStatus  == "01") {
					userStatus = $('<td>启用</td>');	//账号状态
					st = $("<a class='font_blue' href='javascript:accountsManage.updateState("+m.busUserId+",\""+m.userStatus+"\");'>停用</a>");
					bj = $("<a class='font_blue' href='javascript:editAccountManage("+m.busUserId+");'>编辑</a>");
					sc = $("<a class='font_blue' href='javascript:accountsManage.deleteStatus("+m.busUserId+");'>删除</a>");
					cz = $("<a class='font_blue' href='javascript:accountsManage.restPwd("+m.busUserId+");'>重置密码</a>");
				}
				roleDesc = $('<td>' + m.roleDesc + '</td>');	//账号角色
				operatorTime = $('<td>' +  util.data.formatData(m.operatorTime) + '</td>');	//操作时间
				operatorLog = $('<td>' + m.operatorLog + '</td>');	//操作日志
				operate = $("<td></td>");
				operate.append(bj).append(st).append(sc).append(cz);
				tr.append(comName).append(busUserName).append(busRealName).append(userStatus).append(roleDesc).append(operatorTime).append(operatorLog).append(operate);
				temp.append(tr);

			});
			$("#accountsManageTBody").empty().append(temp.html());
			util.pages.generatePageNav(data.total, start, "accounts-manage", ".accountsManage-page-nav");//分页
		} else {
			util.tips.basic("获取账户列表失败，请重试！！！");
		}
	},
	
	roleState : function (index,roleId){
		var sysData = {uId: AUTOCAR.data_uId};
		interface.accountsManage.accountsManageSelectSysRole(sysData, function (data) {
			var statsOption = "";
			if (data.success == true) {
				if(index == 1) {
					$("#roleState").append("");
					$.each(data.rows, function (i, m) {
						statsOption += "<option value='" + m.roleId + "'>" +m.roleName+ "</option>";
					});
					$("#roleState").append(statsOption);
				} else if (index == 2) {
					$.each(data.rows, function (i, m) {
						if (m.roleType != 00) {
							statsOption += "<input type='checkbox' id=\"_"+m.roleId+"\" name='roleName' value=\""+m.roleId+"\" style='width: 15px;height:15px;margin-right:10px;vertical-align:middle'/><span>"+m.roleName+"</span>";
						}
					});
				}else if (index == 3) {
					var roleIds = roleId.split(",");
					$.each(data.rows, function (i, m) {
						if (m.roleType != 00) { //roleType=0  是管理员角色
							var count = 0;
							for (var j = 0; j < roleIds.length; j++ ) {
								if(m.roleId == roleIds[j]){
									count = 1;
									statsOption += "<input type='checkbox' checked='checked' id=\"_"+m.roleId+"\" name='roleName' value=\""+m.roleId+"\" style='width: 15px;height:15px;margin-right:10px;vertical-align:middle'/><span>"+m.roleName+"</span>";
								}
							}
							if(count == 0) {
								statsOption += "<input type='checkbox' id=\"_"+m.roleId+"\" name='roleName' value=\""+m.roleId+"\" style='width: 15px;height:15px;margin-right:10px;vertical-align:middle'/><span>"+m.roleName+"</span>";
							}							
						} else {
							for (var k = 0; k < roleIds.length; k++ ) {
								if (m.roleId == roleIds[k]) {
									statsOption += "<input type='checkbox' checked='checked' disabled = 'disabled' id=\"_"+m.roleId+"\" name='roleName' value=\""+m.roleId+"\" style='width: 15px;height:15px;margin-right:10px;vertical-align:middle'/><span>"+m.roleName+"</span>";
								}
							}	
						}
					});
				}
				$("#_roleState").append(statsOption);
			}
		});
	},
	
	linkSaveOrUpdate : function (busUserId) {
		$("#_comName").text(localStorage.data_comName);
		$("#comName").text(localStorage.data_comName);
		if(busUserId != null && busUserId != ""){
			var sysData = {uId: AUTOCAR.data_uId,busUserId:busUserId};
				interface.accountsManage.selectCarUserByUserId(sysData, function (data) {
					if(data.success == true){
						$.each(data.rows, function (i, m) {
							$("#busUserName").val(m.busUserName);
							$("#busUserName").attr("disabled",true);
							$("#busUserPassword").val("********");
							$("#busRealName").val(m.busRealName);
							$("#busPhone").val(m.busPhone);
							//$('input:radio:checked').val(); 
							accountsManage.roleState(3,m.roleId);
						});
					} else if (data.success == false){
						alert("查询用户信息失败！！！");
					}
				});
		} else {
			accountsManage.roleState(2);
		}
	},
	
	
	restPwd : function (busUserId){
		var sysData = {uId: AUTOCAR.data_uId,busUserId:busUserId};
		interface.accountsManage.accountsManageResetPwd(sysData, function (data) {
			if (data.success == true) {
				alert("重置密码成功");
				document.location.href = "../accountsManage/accountsManage.html";
			} else{
				alert("重置密码时 出现异常！！！");
			}
		});
	},
	
	deleteStatus : function (busUserId){
		if(confirm("确定删除该用户吗？？？")){
			var sysData = {uId: AUTOCAR.data_uId,busUserId:busUserId};
			interface.accountsManage.accountsManageDeleteStatus(sysData, function (data) {
				if (data.success == true) {
					alert("删除该用户成功");
					document.location.href = "../accountsManage/accountsManage.html";
				} else{
					alert("删除用户时 出现异常！！！");
				}
			});
		}
	},
	
	saveOrUpdate : function (busUserId) {
		var busUserId = busUserId;
		var busUserName = $("#busUserName").val();
		var busUserPassword = $("#busUserPassword").val();
		var busRealName = $("#busRealName").val();
		var busPhone = $("#busPhone").val();
		var roleId = "";
		
		$('input:checkbox:checked').each(function(){
			roleId += $(this).val() + ",";
		});
		
		if(busUserName == null || busUserName == ""){
			alert("请输入用户名");
			return false;
		}
		
		if(!util.mRegExp.phone.test(busUserName)){
			alert("用户名格式不正确");
			return false;
		}
		
		if(busUserPassword == null || busUserPassword == ""){
			alert("请输入密码");
			return false;
		}
		
		if(busRealName == null || busRealName == ""){
			alert("请输入真实姓名");
			return false;
		}
		
		if(busPhone == null || busPhone == ""){
			alert("请输入联系电话");
			return false;
		}
		
		if(!util.mRegExp.phone.test(busPhone)){
			alert("联系电话格式不正确");
			return false;
		}
		
		if(roleId == "" ){
			alert("请选择角色");
			return false;
		}
		roleId = roleId.substring(0,roleId.length-1);

		//校验用户名是否重复
		var sysData = {uId: AUTOCAR.data_uId,busUserName:busUserName,busUserId:busUserId};
		interface.accountsManage.accountsManageCheckUserName(sysData, function (data) {
			if(data.success == true && data.code == 0){
				var sysData = {uId: AUTOCAR.data_uId,comId:AUTOCAR.data_comId,busUserId:busUserId,busUserName:busUserName, busUserPassword:busUserPassword,busRealName:busRealName,busPhone:busPhone,roleId:roleId};
				interface.accountsManage.accountsManageSaveOrEdit(sysData, function (data) {
					if(data.success == true){
						alert("新建/编辑账号成功");
						document.location.href = "../accountsManage/accountsManage.html";
					} else if (data.success == false){
						alert("新建/编辑账号失败");
					}
				});
			} else if (data.success == false && data.code == 0){
				alert("该用户名已存在");
				return false;
			} else {
				alert("校验用户名重复时出现异常");
				return false;
			}
		});
	},
		
	updateState : function (busUserId,userStatus) {
		var sysData = {uId: AUTOCAR.data_uId,busUserId:busUserId};
		interface.accountsManage.accountsManageCheckQuiryOrder(sysData, function (data) {
			if(data.success == true && data.code == 0){
				var sysData = {uId: AUTOCAR.data_uId,busUserId:busUserId,userStatus:userStatus};
				interface.accountsManage.accountsManageUpdateStatus(sysData, function (data) {
					if(data.success == true){
						alert("操作成功");
						document.location.href = "../accountsManage/accountsManage.html";
					} else if (data.success == false){
						alert("操作失败");
					}
				});
			} else if (data.success == false && data.code == 0){
				alert("该用户有询价单或订单不能停用");
				return false;
			} else {
				alert("查询该用户下是否有询价/订单异常");
				return false;
			}
		});

	},
	selectCarUserByUserId : function () {
		var sysData = {uId: AUTOCAR.data_uId,busUserId:AUTOCAR.data_uId};
		interface.accountsManage.selectCarUserByUserId(sysData, function (data) {
			if(data.success == true){
				$.each(data.rows, function (i, m) {
					$("#user_Id").text(m.busUserName);
					$("#real_user_Name").text(m.busRealName);
					$("#user_Phone").text(m.busPhone);
					$("#user_company").text(localStorage.data_comName);
                    if (m.userImage) {
                        $("#imgDetail").attr("src",function(){
                            //console.log(m.userImage);
                            return  m.userImage;
                        })
                    } else {
                        $("#imgDetail").attr("src","../img/car_icon.png");
                    }

				});
			} else if (data.success == false){
				alert("查询用户信息失败");
			}
		});
	},
	
};