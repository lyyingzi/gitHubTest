/**
 * Created by liuying on 2017/3/29.
 */
//var token;  //返回的token值
//var key;
//var name;
//var uploader;
$(function(){

    var data,nameParameter,domId,parentDomId,token,key,name;
    //data : "",
    //nameParameter : "",
    //domId : "",
    //parentDomId : "",
    //startDom : "",
    //token : "",
    //key : "",
    //name : "",
        //七牛上传SDK

        //qiniuUpload : function (data,nameParameter,domId,parentDomId,startDom) {
        //
        //    upload.data = data;
        //    upload.nameParameter = nameParameter;
        //    upload.domId = domId;
        //    upload.parentDomId = parentDomId;
        //    upload.startDom = startDom;
        //    //alert(domId);
        //},

    function getUploadToken(){
        var newName = "{"+"'"+ uploadFiles.nameParameter +"'" +":"+ "'"+name+"'"  +"  }";
        console.log(newName);
        var dataInfo = eval("(" + newName + ")");
        //var dataInfo = eval('([' + newName + '])');
        console.log(dataInfo);
        console.log(uploadFiles.data);

        var dataAll = $.extend({}, dataInfo,uploadFiles.data);
        interface.public.uploadBill(dataAll,function(info) {
            console.log(info);
            token = info.rows[0].token;
            key = info.rows[0].key;
            return token;
        });
    };
     var uploader = Qiniu.uploader({

        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: "uplaodFiles",       //上传选择的点选按钮，**必需**
        //uptoken_func: function() {
        //    var newName = "{"+"'"+ upload.nameParameter +"'" +":"+ "'"+upload.name+"'"  +"  }";
        //    console.log(newName);
        //    var dataInfo = eval("(" + newName + ")");
        //    //var dataInfo = eval('([' + newName + '])');
        //    console.log(dataInfo);
        //    console.log(upload.data);
        //
        //    var dataAll = $.extend({}, dataInfo,upload.data);
        //    interface.public.uploadBill(dataAll,function(info){
        //        console.log(info);
        //        upload.token = info.rows[0].token;
        //        upload.key = info.rows[0].key;
        //        return upload.token;
        //    });
        //
        //}, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
         uptoken_func : getUploadToken,
        domain: 'http://7xpx3m.com1.z0.glb.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: true,  //设置上传文件的时候是否每次都重新获取新的token
        container: "uploadContent",           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '100mb',           //最大文件体积限制
        flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: false,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FilesAdded': function (up, files) {
                name = files[0].name;

            },
            'BeforeUpload': function (up, file) {
                // 每个文件上传前,处理相关的事情
                console.log('before');

            },
            'UploadProgress': function (up, file) {
                // 每个文件上传时,处理相关的事情
            },
            'FileUploaded': function (up, file, info) {

                //urlMsg(AUTOCAR.data_uId, AUTOCAR.data_comId);

            },
            'Error': function (up, err, errTip) {
                //上传出错时,处理相关的事情
                console.log('err');
            },
            'UploadComplete': function () {
                //队列文件处理完毕后,处理相关的事情
            },
            'Key': function (up, file) {
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在 unique_names: false , save_key: false 时才生效

                return key
            }
        }
    });

});

var uploadFiles = {
    data : "",
    nameParameter : "",
    start : function (data,nameParameter,domId,parentDomId) {
        uploadFiles.data = data;
        uploadFiles.nameParameter = nameParameter;
        uploader.start();
    }
};
