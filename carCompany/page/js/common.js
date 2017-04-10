AUTOCAR = {
    version: '1.0.0',
    isProcessing: false,

    /**
     * AJAX请求
     * @param options
     * url - 地址
     * data - 数据
     * timeout － 超时(5000)
     * wait - 异步
     * type － 类型(POST)
     * cb - 回调
     */
    request: function (options) {
        $.ajax({
            url: options.url,
            contentType : (options.contentType == undefined) ? "application/json;charset=UTF-8" : options.contentType,
            data: options.data,
            dataType: "json",
            //cache: false,
			cache: options.cache || false,
            timeout: options.timeout || 60 * 1000,
            type: (options.type == undefined) ? "POST" : options.type,
            beforeSend: function(){
                if (AUTOCAR.isProcessing) {
                    return;
                }
                AUTOCAR.isProcessing = true;
                if (options.wait == undefined) {
                    options.wait = true
                }
                if (options.wait) {
                    util.tips.show("正在为您请求数据", true);
                }
                options.cb = options.cb || function () {

                };
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                

                util.tips.basic(errorThrown);
            },
            success: function (result) {
                if (result.success == true) {    //&& !util.register.isRegisterPage
				//debugger;
                    //window.location.href = interface.hostLogin + "/sign/login.html";
                }
                if (!result) {
                    return;
                }
                if (typeof options.cb == 'function') {
                    options.cb(result);
					if( (result.message).indexOf('账号') !=-1 || (result.message).indexOf('用户') !=-1){
						$("input[role='uName']").addClass("text_input_error");
					}
					else if(  (result.message).indexOf('密码') !=-1 ){
						$("input[role='uPwd']").addClass("text_input_error");
					}
                    return;
                }
            },
            complete: function(){
                if (options.wait) {
                    util.tips.hide();
                }
                AUTOCAR.isProcessing = false;
            }
        });
    },

    ajax_download:function(url, data) {
        var $iframe,
            iframe_doc,
            iframe_html;

        if (($iframe = $('#download_iframe')).length === 0) {
            $iframe = $("<iframe id='download_iframe'" +
                    " style='display: none' src='about:blank'></iframe>"
            ).appendTo("body");
        }

        iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
        if (iframe_doc.document) {
            iframe_doc = iframe_doc.document;
        }

        iframe_html = "<html><head></head><body><form method='POST' action='" +
            url +"'>"

        Object.keys(data).forEach(function(key){
            iframe_html += "<input type='hidden' name='"+key+"' value='"+data[key]+"'>";

        });

        iframe_html +="</form></body></html>";

        iframe_doc.open();
        iframe_doc.write(iframe_html);
        $(iframe_doc).find('form').submit();
    },
	//添加全局变量
	
	
	data_uId:localStorage.data_uId,	//uId
	data_comId:localStorage.data_comId,	//comId
	data_comName:localStorage.data_comName,	//comName
	data_rName:localStorage.data_rName,	//uName			
					
	//data_uId:"",	//用户ID
	//data_comId:"",	//用户公司ID
	//data_comName:"",
	data_pageSize:"10",	//页大小
	data_pageNow:"",	//当前页
	
	data_equipment:"3",
	
	data_uName:"",
	

	
	//is_pagelink : "",	
	//is_adlink : "",
    //data_type : "",
	//data_typenew:"",
	//data_bread:[{name:'nav1',menu:'a',show:false},{name:'nav2',menu:'b',show:false},{name:'nav3',menu:'c',show:false},{name:'nav4',menu:'d',show:false}],				
	//面包屑导航全局变量
	insert_data_bread:function(){
		var i = 0,
			len = this.data_bread.length,
			str = '<span>';
		for(; i< len; i++){
			if(this.data_bread[i]['show'] ){
				str +='<a href="javascript:;" class="blue-text" menu="'+ this.data_bread[i]['menu'] +'">'+ this.data_bread[i]['name'] +'</a>';
				}
			
		}
		str +='</span>';
		$('.bread-menu').html(str);
	},
};


/**
 * 获取URL中参数(待优化)
 */
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }
})(jQuery);