interface = {
	//host: '172.16.249.188:8080',	//测试环境
	//host: 'http://test-vehicle.wemeeting.net/service',	//测试环境http://test-vehicle.wemeeting.net/service
	//host: 'http://localhost:8080',	//测试环境http://test-vehicle.wemeeting.net/service
	host: 'http://uat-car.wemeeting.net/service',	
	//hostLogin: 'http://test-vehicle.wemeeting.net',
	//hostLogin: 'http://localhost:8080',
	hostLogin: 'http://uat-car.wemeeting.net',
	//用户模块
	account: {
		
		//用户登录
		login: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/login',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
				//wait: false,
					callback(data);
				}
			});
		},
		
		//修改密码
		changePwd: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/changePwd',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//获取验证码 
		getVerCode: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/getVerCode',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//校验验证码 
		getpwd: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/getpwd',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//重置密码 
		resetPwd: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/resetPwd',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
	},
	
	//询价单管理
	inquiryManage:{
		
		//询价单管理列表
		inquiryManageList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carQuiry/list',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,//JSON.stringify(jsonData),//
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//询价单详情
		inquiryManageDetialList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carQuiry/info',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		
		//回复询价单/修改询价单		
		inquiryManageReplyList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carQuiry/reply',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				cb: function (data) {
					callback(data);
				}
			});
		},
		
	
	},
	
	//订单管理
	orderManage:{
		
		//订单管理列表
		orderManageList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carOrder/list',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,//JSON.stringify(jsonData),//
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},

		//订单详情
		orderManageDetialList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carOrder/info',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},


		//确认订单/修改订单/取消订单
		orderManageReplyList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carOrder/reply',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},

		//订单确认收款
		orderManageConfirmation: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carOrder/confirmation',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
	
	},
	
	//结算账单
	settingBill:{
		
		//结算账单列表
		settingBillBalanceBillList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carOrder/balanceBill',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		
		
	
	},
	
	//信息维护
	infoMaintain:{
		
		//信息维护列表（查询）
		infoMaintainAddCarCompanyList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carCompany/addCarCompany',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//信息维护（修改）
		infoMaintainEditCarCompany: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carCompany/editCarCompany',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		
		//车型管理（列表）
		infoMaintainFindCarInfo: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carCompany/findCarInfo',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//车型管理（列表点击编辑按钮）
		infoMaintainEditCarInfo: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carCompany/editCarInfo',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//车型管理（新增车型/修改车型）
		infoMaintainSaveOrUpdateCarInfo: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carCompany/saveOrUpdateCarInfo',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		
		//车型管理（删除）
		infoMaintainDelCarInfo: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carCompany/delCarInfo',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		
	
	},
	
	//账号及权限管理
	accountsManage:{
		
		//查询账号角色
		accountsManageSelectSysRole: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/selectSysRole',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//账号管理（列表）
		accountsManageList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/accountList',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//账号管理（新建账号/编辑账号）
		accountsManageSaveOrEdit: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/saveOrEditCarUser',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//查询账号角色
		selectCarUserByUserId: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/selectCarUserByUserId',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//账户用户名校验重复
		accountsManageCheckUserName: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/checkUserName',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//账户管理（启用/停用）
		accountsManageUpdateStatus: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/updateStatus',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//判断用户是否有未完成的询价/订单
		accountsManageCheckQuiryOrder: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/checkQuiryOrderByUserId',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//账号管理 （删除）
		accountsManageDeleteStatus: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/deleteStatus',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//账号管理（重置密码）
		accountsManageResetPwd: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carUser/restPwd',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		
		
	
	},
	
	//客户服务-意见反馈
	customerService:{
		//意见反馈
		saveFeedback : function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carCompany/addFeedback',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
	},
	
	
	//消息
	message:{
		
		//消息列表
		carMessageList: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carMess/list',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//修改消息状态
		carMessageUpdate: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carMess/update',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//删除消息
		carMessageDelete: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carMess/del',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		//未读消息条数
		carMessageSelectCount: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/carMess/selCount',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
	},
	
	
	//公共
	public:{
		
		//上传车公司图片
		carPictureGetToken: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/upLoad/carPictureGetToken',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//收费标准上传
		chargeStandardGetToken: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/upLoad/chargeStandardGetToken',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//删除收费标准
		delChargeStandard: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/upLoad/delChargeStandard',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//服务区域接口
		serverArea: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/basic/serverArea',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//省市区接口
		selectSysArea: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/basic/selectSysArea',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//数据字典接口
		selectSysDict: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/basic/selectSysDict',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
		
		//新消息、新询价、新订单查询
		newQuiryOrderMess: function (jsonData, callback) {
			AUTOCAR.request({
				url: interface.host + '/vehiclecenter/basic/newQuiryOrderMess',
				contentType: "application/x-www-form-urlencoded",
				data: jsonData,
				type: 'POST',
				cb: function (data) {
					callback(data);
				}
			});
		},
	},
};