/**
 * Created by liuying on 2017/2/9.
 */
$(function () {

    //点击按钮跳转页面
    function refreshTo(current, goal, currentParent) {
        $("body").delegate(current, "click", function () {
            $(goal).show();
            $(this).parents(currentParent).hide();
        })
    }

    //点击“上传照片”进入上传照片页面
    refreshTo(".car_map .carPhoto", ".upload_img_page", ".car_massage_page");

    //点击“车型管理”进入车型管理页面
    //refreshTo(".car_map .car-type",".car_control_page",".car_massage_page");

    //点击“新增车型”进入新增车型页面
    refreshTo(".car_map .carAdd", ".car_add_page", ".car_massage_page");

    //点击上传照片信息维护，跳转到主页面
    refreshTo(".nav_wrap .homePage", ".car_massage_page", ".upload_img_page");

    //点击车型管理信息维护，跳转到主页面
    refreshTo(".nav_wrap .homePage", ".car_massage_page", ".car_control_page");

    //点击新增车型信息维护，跳转到主页面
    refreshTo(".nav_wrap .homePage", ".car_massage_page", ".car_add_page");

    //点击编辑车型信息维护，跳转到主页面
    refreshTo(".nav_wrap .homePage", ".car_massage_page", ".car_edit_page");

    //点击车型管理页面中的新增车型按钮，跳转页面
    refreshTo(".car_control .add_type_btn", ".car_add_page", ".car_control_page");

    //点击车型信息上的编辑按钮，页面跳转到编辑页面
    //refreshTo(".car_control_page .disposeEdit",".car_edit_page",".car_control_page");

    //点击编辑页面上的取消按钮，页面跳转到车型信息页面
    //refreshTo(".car_edit_page .editCancel",".car_control_page",".car_edit_page");

    //点击新增页面上的取消按钮，页面跳转到车型信息页面
    //refreshTo(".car_add_page .addCancel",".car_control_page",".car_add_page");

    //---------------------------------信息维护主页面 --------------------------------------------
   //弹窗样式
    $(".popup").width($(window).width());
    $(".popup").height($(window).height());
    //收费标准
    $(".popupUpload").width($(window).width());
    $(".popupUpload").height($(window).height());
    //修改地图弹窗样式
    $(".popupMap").width($(window).width());
    $(".popupMap").height($(window).height());
    //详情页面地图弹窗
    $(".popupDetailMap").width($(window).width());
    $(".popupDetailMap").height($(window).height());
    //点击图片车公司轮播弹窗
    $(".popupImg").width($(window).width());
    $(".popupImg").height($(window).height());
    //验证填写内容不为空

    //验证车公司省市内容不为空
    var allSelect = $(".car_msg_list select");
    $.each(allSelect, function (index, item) {
        $(item).blur(function () {
            var _this = $(this);
            var text = _this.children("option:selected").text();
            if (text.length == 0) {
                _this.addClass("verify_error");
                util.tips.basic("内容不能为空");
            } else {
                _this.removeClass("verify_error");
            }
        });
    });

    //验证详细地址内容不为空
    $(".car_msg_list .car_address").blur(function () {
        var _this = $(this);
        if (_this.val().length == 0) {
            _this.addClass("verify_error");
            util.tips.basic("内容不能为空");
        } else {
            _this.removeClass("verify_error");
        }
    });
    //固定电话
    //只有填第一个文本框后，第二个才可以填，      提交时校验前2个不能为空，第3个可以为空。
    var firstInput = $(".car_massage .car_tel .car_tel_text").first();
    var secondInput = $(".car_massage .car_tel .car_tel_text").eq(1);
    var thirdInput = $(".car_massage .car_tel .car_tel_text").eq(2);
    var reg = /^[0-9]+$/;
    firstInput.on("blur", function () {
        var _this = $(this);
        if (_this.val().length == 0) {
            _this.addClass("verify_error");
            util.tips.basic("内容不能为空");
            _this.siblings(".car_tel_text").attr("disabled", "true");
        } else {
            _this.removeClass("verify_error");
            _this.siblings(".car_tel_text").removeAttr("disabled");
            var firstVal = _this.val();
            if (!reg.test(firstVal)) {
                _this.addClass("verify_error");
                util.tips.basic("必须填写数字");
            }
        }
    });
    secondInput.on("blur", function () {
        var _this = $(this);
        if (_this.val().length == 0) {
            _this.addClass("verify_error");
            util.tips.basic("内容不能为空");
        } else {
            _this.removeClass("verify_error");
            var secondVal = _this.val();
            if (!reg.test(secondVal)) {
                _this.addClass("verify_error");
                util.tips.basic("必须填写数字");
            }
        }
    });
    thirdInput.on("blur", function () {
        var _this = $(this);
        var thirdVal = _this.val();
        if (reg.test(thirdVal) || thirdVal.length == 0) {
            _this.removeClass("verify_error");
        }
    });



    //服务区域
    //输入关键字后匹配相应城市，点击即选中，使用jquery_ui_autocomplete
    var proposals = [];    //下面列表的值
    var proposalsId = [];    //下面列表id的值
    //$('#searchForm ').bind('input propertychange', function() {
    //$('#searchForm').delegate('input', 'input propertychange', function () {
    //    var _this = $(this);
    //    var data = {
    //        //"uId": "1",
    //        "uId": AUTOCAR.data_uId,
    //        //"areaName": "北"
    //        "areaName": _this.val()
    //    };
    //    $.ajax({
    //        type: "post",
    //        url: interface.host + '/vehiclecenter/basic/serverArea',
    //        cache: false,
    //        async: false,
    //        data: data,
    //        dataType: "json",
    //        success: function (info) {
    //            console.log(info);
    //            var arr = info.rows;
    //            console.log(arr);
    //            //var areaId,areaName;
    //            //proposals=[];
    //            //console.log(proposals + 11);
    //            proposals.length = 0;
    //            $(arr).each(function (index, item) {
    //                //proposals=[];
    //                proposals.push(item.areaName);
    //                //arrId.push(item.areaId);
    //                var html = '<input type="hidden" class="homeAreaId" value="' + item.areaId + '">';
    //                $("#areaMsg").append(html);
    //            });
    //
    //        }
    //    })
    //});

    var dataArea = {
        //"uId": "1",
        "uId": AUTOCAR.data_uId,
        //"areaName": "北"
        "areaName": $('#searchForm input').val()
    };
    $.ajax({
        type: "post",
        url: interface.host + '/vehiclecenter/basic/serverArea',
        cache: false,
        async: false,
        data: dataArea,
        dataType: "json",
        success: function (info) {
            //console.log(info);
            var arr = info.rows;
            //console.log(arr);
            //var areaId,areaName;
            //proposals=[];
            //console.log(proposals + 11);
            proposals.length = 0;
            $(arr).each(function (index, item) {
                //proposals=[];
                proposals.push(item.areaName);
                proposalsId.push(item.areaId);
                //arrId.push(item.areaId);
                //var html = '<input type="hidden" class="homeAreaId" value="' + item.areaId + '">';
                //$("#areaMsg").append(html);
            });

        }
    });

    var indexArea;
    $('#searchForm').autocomplete({
        hints: proposals,
        width: 230,
        height: 35,
        onSubmit: function (text) {
            var areaName = $("#areaMsg .areaName").text();
            //console.log(areaName);
            var textList = areaName.split("市");
            //textList.push();
            //console.log(textList);
            function contains(arr, obj) {
                indexArea = proposals.indexOf(obj);

                var obj = obj.slice(0,-1);
                if ($.inArray(obj, arr) == -1) {
                    $('#areaMsg').append('<span class="area_msg_list"><span class="areaName">' + text + '</span><a href="javascript:void (0)" class="del">x</a></span>');
                } else {
                    alert("不能输入相同的城市名");
                }

            }
            contains(textList,text);
            var htmlAreaId = '<input type="hidden" class="homeAreaId" value="' + proposalsId[indexArea] + '">';
            $("#areaMsg").append(htmlAreaId);
        }
    });


    // 在文本框下方以标签形式显示，点击后面的“X”可删除。
    //$(".area_msg .del").click(function(){
    //    $(this).parent().remove();
    //});
    $(".area_msg").delegate(".del", "click", function () {
        $(this).parent().next("input[type='hidden']").remove();
        $(this).parent().remove();
    });

    //验证服务区域是否为空
    //$(".car_msg_list .areaText").delegate("input", "blur", function () {
    //    var _this = $(this);
    //    if ($(".car_msg_list #areaMsg span").text().length == 0) {
    //        _this.addClass("verify_error");
    //        util.tips.basic("服务区域不能为空");
    //    } else {
    //        _this.removeClass("verify_error");
    //    }
    //});
    $(".car_msg_list .areaText").delegate("input", "blur", function () {
        var _this = $(this);
        if ( !$(".car_msg_list #areaMsg span").text().length == 0) {
            _this.removeClass("verify_error");
        }
    });
    //车公司介绍是否填写
    $(".homeIntroduce").on("blur", function () {
        var _this = $(this);
        if (_this.val().length == 0) {
            _this.addClass("verify_error");
            util.tips.basic("内容不能为空");
        } else {
            _this.removeClass("verify_error");
        }
    });


    //------------------ -----------请求封装 -------------------------------------------
    function ajaxMethod(urlData, data) {
        $.ajax({
            type: "post",
            //url: interface.host + '/vehiclecenter/carCompany/addCarCompany',
            url: interface.host + urlData,
            cache: false,
            async: false,
            data: data,
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    var row = info.rows;
                    detailsList = row;     //信息维护查询返回的数据
                    feeList = row;         //收费标准返回的数据
                    fileList = row;        //收费标准查看接口返回数据
                    managelList = row;     //车型管理列表返回的数据
                    editList = row;       //编辑接口返回的数据
                    detailsMsg = row;     //带有图片的详情页返回的数据
                    urlList = row;        //图片接口返回的数据
                    imgList = row;        //上传图片接口返回的数据
                    provinceList = row;    //省接口返回的数据
                    cityList = row;       //市返回的数据
                    districtList = row;    //区返回的数据
                }
            },
            error: function (e) {
                alert(e);
            }
        })
    }

    //----------------------------信息维护主页面------------------------------------
    //信息维护页面加载时，发送请求，加载信息维护主页面
    //信息查询接口返回的数据
    var detailsList;   //发送ajax返回的数据
    var homeData = {
        //"uId": 1,
        "uId": AUTOCAR.data_uId,
        //"comId": 1
        "comId": AUTOCAR.data_comId
    };
    ajaxMethod("/vehiclecenter/carCompany/addCarCompany", homeData);
    console.log(detailsList);
    var homeList = detailsList[0];
    //console.log(homeList);
    //将返回的数据回显到主页面上
    //车公司名称
    $("#homeCarName").text(homeList.comName);

    //=========================省市区=====================
    //加载省数据
    var provinceList;    //省接口返回的数据
    var provinceData = {
        //"uId" : 1,
        "uId" : AUTOCAR.data_uId,
        "id" : 0
    };
    ajaxMethod("/vehiclecenter/basic/selectSysArea",provinceData);
    console.log(provinceList);
    //将返回的数据加载到页面上
    $("#proId option:gt(0)").remove();
    //$("#proId option").remove();
    $.each(provinceList,function(index,item){
        var html = '<option value="'+ item.id +'">'+ item.name +'</option>';
        $("#proId").append(html);
    });
    //省改变注册事件,获取市的数据
    var cityList;    //返回的市的数据
    $("#proId").change(function(){
        var _this = $(this);
        console.log(_this.children("option:selected").val());
        var data = {
            //"uId" : 1,
            "uId" : AUTOCAR.data_uId,
            "id" : _this.children("option:selected").val()
        };
        ajaxMethod("/vehiclecenter/basic/selectSysArea",data);
        $("#levId option:gt(0)").remove();//市清空
        //$("#levId option").remove();//市清空
        $("#resId option:gt(0)").remove();//区清空
        //$("#resId option").remove();//区清空
        $.each(cityList,function(index,item){
            var html = '<option value="'+ item.id +'">'+ item.name +'</option>';
            $("#levId").append(html);
        });
    });
    //市改变注册事件，获取区的数据
    var districtList;       //区返回的数据
    $("#levId").change(function(){
        var _this = $(this);
        console.log(_this.children("option:selected").val());
        var data = {
            //"uId" : 1,
            "uId" : AUTOCAR.data_uId,
            "id" : _this.children("option:selected").val()
        };
        ajaxMethod("/vehiclecenter/basic/selectSysArea",data);
        $("#resId option:gt(0)").remove();//区清空
        //$("#resId option").remove();//区清空
        $.each(districtList,function(index,item){
            var html = '<option value="'+ item.id +'">'+ item.name +'</option>';
            $("#resId").append(html);
        });
    });
    $(".car_massage_page #proId").children("option[value="+ homeList.provinceId +"]").attr("selected",true);
    var provinceData = {
        //"uId" : 1,
        "uId" : AUTOCAR.data_uId,
        "id" : homeList.provinceId
    };
    ajaxMethod("/vehiclecenter/basic/selectSysArea",provinceData);
    $.each(cityList,function(index,item){
        var html = '<option value="'+ item.id +'">'+ item.name +'</option>';
        $("#levId").append(html);
    });
    $(".car_massage_page #levId").children("option[value="+ homeList.cityId +"]").attr("selected",true);
    var cityData = {
        //"uId" : 1,
        "uId" : AUTOCAR.data_uId,
        "id" : homeList.cityId
    };
    ajaxMethod("/vehiclecenter/basic/selectSysArea",cityData);
    $.each(districtList,function(index,item){
        var html = '<option value="'+ item.id +'">'+ item.name +'</option>';
        $("#resId").append(html);
    });
    $(".car_massage_page #resId").children("option[value="+ homeList.districtId +"]").attr("selected",true);


    $(".car_massage_page #jDizhi").val(homeList.detailAddress);   //详细地址




    //固定电话
    var phoneList = homeList.phone.split("-");
    $.each(phoneList, function (index, item) {
        $(".car_tel input").eq(index).val(item);
    });

    if ($(".car_massage_page .carTelOne").val().length > 0) {

        $(".car_massage_page .carTelOne").siblings(".car_tel_text").removeAttr("disabled");
    }

    //鼠标经过收费标准下载按钮，文字出现
    $(".car_massage_page .car_fee_load").mouseover(function(){
        var _this = $(this);
        _this.siblings(".car_fee_hover").show();
    });
    $(".car_massage_page .car_fee_load").mouseout(function(){
        var _this = $(this);
        _this.siblings(".car_fee_hover").hide();
    });


    //获取收费标准信息
    //var fileList = homeList.feeStandard;
    //上传收费标准
    //fileList
    var feeList;      //收费标准接口返回的数据
    var fileToken;      //返回的token值
    var fileImgKey;
    var fileImgName;     //文件名称

    function getFileUploadToken(){
        var data = {
            //"uId": "1",
            "uId" : AUTOCAR.data_uId,
            //"comId": "1",
            "comId": AUTOCAR.data_comId,
            //"fileName": "1"x
            "fileName": fileImgName
        };
        ajaxMethod("/vehiclecenter/upLoad/chargeStandardGetToken",data);  //
        fileToken = feeList[0].token;
        fileImgKey = feeList[0].key;
        console.log(fileImgKey);
        return fileToken;
    }
    var Q2 = new QiniuJsSDK();
    var uploader1 = Q2.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: 'feeFile',       //上传选择的点选按钮，**必需**
        uptoken_func : getFileUploadToken, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        domain: 'http://7xpx3m.com1.z0.glb.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: true,  //设置上传文件的时候是否每次都重新获取新的token
        //container: 'fileContainer',           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '100mb',           //最大文件体积限制
        flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FilesAdded': function(up, files) {

                fileImgName = files[0].name;
                console.log(fileImgName);
            },
            'BeforeUpload': function(up, file) {
                // 每个文件上传前,处理相关的事情
                console.log('before');
                //alert("-------------------------");
            },
            'UploadProgress': function(up, file) {
                // 每个文件上传时,处理相关的事情
            },
            'FileUploaded': function(up, file, info) {
               // var detailsList;   //发送ajax返回的数据
               // var homeData = {
               //     //"uId": 1,
               //     "uId": AUTOCAR.data_uId,
               //     //"comId": 1
               //     "comId": AUTOCAR.data_comId
               // };
               // ajaxMethod("/vehiclecenter/carCompany/addCarCompany", homeData);
               // fileList = homeList.feeStandard;
               // alert("1");

            },
            'Error': function(up, err, errTip) {
                //上传出错时,处理相关的事情
                console.log('err');
            },
            'UploadComplete': function() {
                //队列文件处理完毕后,处理相关的事情
            },
            'Key': function(up, file) {
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在 unique_names: false , save_key: false 时才生效

                return fileImgKey;
            }
        }
    });


    var fileList;     //查看收费标准返回的数据
    //点击收费标准下载按钮，出现弹窗
    $(".car_massage_page .car_fee_load").click(function() {
        var _this = $(this);
        //收费标准接口
        var fileData = {
            "uId": AUTOCAR.data_uId,
            "comId": AUTOCAR.data_comId
        };
        ajaxMethod("/vehiclecenter/carCompany/selectCarChargeStandard", fileData);
        _this.parents(".car_massage_page").siblings(".popupUpload").show();
        //body隐藏滚动条
        $("body").css("overflow","hidden");
        $(".popupUpload .content").empty();
        $.each(fileList, function (index, item) {
            var html = ' <div>' +
                '            <img src="../img/info/fee_file.png" alt=""/>' +
                '            <a class="fileUrl" href="' + item.feeStandardUrl + '">' + item.feeStandardName + '</a>' +
                '            <a href="javascript:void(0)" style="float:right" class="fileDel">X</a>' +
                '            <input type="hidden" value="' + item.feeStandardId + '">    ' +
                '        </div>';
            $(".popupUpload .content").append(html);
        });
        //点击收费标准删除按钮删除数据
        $(".popupUpload .content").delegate(".fileDel", "click", function () {
            var _this = $(this);
            var fileDelData = {
                "uId": AUTOCAR.data_uId,
                "file": _this.siblings(".fileUrl").attr("href")
            };
            ajaxMethod("/vehiclecenter/upLoad/delChargeStandard", fileDelData);
            //_this.parent().remove();
            //收费标准查询
            var fileData = {
                "uId": AUTOCAR.data_uId,
                "comId": AUTOCAR.data_comId
            };
            ajaxMethod("/vehiclecenter/carCompany/selectCarChargeStandard", fileData);
            $(".popupUpload .content").empty();
            $.each(fileList, function (index, item) {
                var html = ' <div>' +
                    '            <img src="../img/info/fee_file.png" alt=""/>' +
                    '            <a class="fileUrl" href="' + item.feeStandardUrl + '">' + item.feeStandardName + '</a>' +
                    '            <a href="javascript:void(0)" style="float:right" class="fileDel">X</a>' +
                    '            <input type="hidden" value="' + item.feeStandardId + '">    ' +
                    '        </div>';
                $(".popupUpload .content").append(html);
            });
        });
    });

    $(".popupUpload").delegate(".close", "click", function () {
            var _this = $(this);
            _this.parents(".popupUpload").hide();
            $("body").css("overflow","auto");
        });

        //获取服务区域的信息
        var serviceArea = homeList.serviceArea;
        $.each(serviceArea, function (index, item) {
            var html = '<span class="area_msg_list"><span class="areaName">' + item.areaName + '</span>&nbsp;<a href="javascript:void (0)" class="del">x</a></span>' +
                '<input type="hidden" class="homeAreaId" value="' + item.areaId + '">';
            $("#areaMsg").append(html);
        });

//
        //车公司介绍
        $(".car_massage_page .homeIntroduce").val(homeList.introduction);

        //经度纬度
        $("#detailLng").val(homeList.detailLng);
        $("#detailLat").val(homeList.detailLat);


        //------------------------地图---------------------

        function init(container, longitude, latitude, city, flag) {
            var map = new BMap.Map(container);          // 创建地图实例

            var point = new BMap.Point(longitude, latitude);  // 创建点坐标
            map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true);
            map.setCurrentCity(city); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
            map.addControl(new BMap.NavigationControl());    //地图平移缩放
            map.addControl(new BMap.ScaleControl());    //比例尺控件
            map.addControl(new BMap.OverviewMapControl());    //缩略地图控件
            //map.addControl(new BMap.MapTypeControl());   //地图类型控件

            var marker = new BMap.Marker(point); //创建marker对象
            marker.setIcon(new BMap.Icon('../img/info/map_mark.png', new BMap.Size(21, 34)));
            if (flag) {
                marker.enableDragging(); //marker可拖拽
            }
            map.addOverlay(marker);   // 将标注添加到地图中
            //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            return [map, marker];
        }

        //var oriLong="116.403958",oriLat="39.915049";//原始经纬度信息
        var oriLong = $("#detailLng").val(),
            oriLat = $("#detailLat").val();//原始经纬度信息
        //console.log(oriLong);
        //var arr = init("dituContent", oriLong, oriLat, "北京", false);
        var arr = init("dituContent", oriLong, oriLat, homeList.cityId, false);
        var map = arr[0];
        var nowLong, nowLat;//

        //----------------------------------编辑------------------------------------------
        // 定义一个控件类,即function  定义构造函数并继承Controlv
        //编辑
        var map2;

        function ZoomControl() {
            // 默认停靠位置和偏移量
            this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
            this.defaultOffset = new BMap.Size(200, 10); // 距离中间位置
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 确认
        function ZoomControl1() {
            // 默认停靠位置和偏移量
            this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
            this.defaultOffset = new BMap.Size(50, 10); // 距离中间位置
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl1.prototype = new BMap.Control();

        // 取消
        function ZoomControl2() {
            // 默认停靠位置和偏移量
            this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
            this.defaultOffset = new BMap.Size(50, 10); // 距离中间位置
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl2.prototype = new BMap.Control();

        // 查看
        function ZoomControl3() {
            // 默认停靠位置和偏移量
            this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
            this.defaultOffset = new BMap.Size(250, 10); // 距离中间位置
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl3.prototype = new BMap.Control();

        //以上，扩展原型-------------------------------------------------------------

        // 创建控件
        // 编辑
        var myZoomCtrl = new ZoomControl();

        //确认
        var myZoomCtrl1 = new ZoomControl1();

        // 取消
        var myZoomCtrl2 = new ZoomControl2();

        // 查看地图
        var myZoomCtrl3 = new ZoomControl3();


        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function (map) {
            // 创建一个DOM元素
            var button = document.createElement("Button");
            // 添加文字说明
            button.appendChild(document.createTextNode("编 辑"));
            // 设置样式
            button.style.position = "fixed";
            button.style.cursor = "pointer";
            button.style.border = "0 none";
            button.style.width = "92px";
            button.style.height = "36px";
            //button.style.borderRadius="5px";
            button.style.background = "#1DBFAD";
            button.style.opacity = "0.5";
            button.style.color = "#fff";
            button.style.marginLeft = "200px";
            button.style.marginTop = "-10px";

            // 添加DOM元素到地图中
            map.getContainer().appendChild(button);

            // 绑定事件,点击编辑显示确认和取消按钮
            button.onclick = function (e) {
                $(".popupMap").css({
                    display: "block"
                });
                //$("#dituContent").css({
                //    display : "none"
                //});
                var arrBJ = init("container2", oriLong, oriLat, "", true);
                map2 = arrBJ[0];
                //map2.addEventListener("dragend", function(){ //拖动地图后，地图中心的经纬度坐标
                //    var center = map2.getCenter();
                //    alert("地图中心点变更为：" + center.lng + ", " + center.lat);
                //});
                var marker = arrBJ[1];
                marker.addEventListener("mouseup", function (e) {
                    alert("定位成功");
                    nowLong = e.point.lng;
                    nowLat = e.point.lat;
                    console.log(nowLong);
                    console.log(nowLat);
                });

                myZoomCtrl1 = new ZoomControl1();

                //确认
                myZoomCtrl2 = new ZoomControl2();

                // 添加到地图当中
                map2.addControl(myZoomCtrl1);
                // 添加到地图当中
                map2.addControl(myZoomCtrl2);


            };

            // 将DOM元素返回
            return button;
        };

        // 添加"编辑" 到地图当中
        map.addControl(myZoomCtrl);

        //map.addOverlay(marker); //在地图中添加marker
        //-------------------------------------确定--------------------------------------
        ZoomControl1.prototype.initialize = function (map) {
            // 创建一个DOM元素
            var buttonQD = document.createElement("Button");
            // 添加文字说明
            buttonQD.appendChild(document.createTextNode("确 认"));
            // 设置样式
            buttonQD.style.position = "fixed";
            buttonQD.style.cursor = "pointer";
            buttonQD.style.border = "none";
            buttonQD.style.width = "158px";
            buttonQD.style.height = "40px";
            //buttonQD.style.borderRadius="5px";
            buttonQD.style.background = "#1DBFAD";
            //buttonQD.style.opacity="0.5";
            buttonQD.style.color = "#fff";
            buttonQD.style.marginLeft = "500px";
            buttonQD.style.marginTop = "10px";

            // 绑定事件
            buttonQD.onclick = function (e) {
//            map.setZoom(map.getZoom() + 2); // 动作
//            alert("地图已定位，不可更改！");
                $(".popupMap").css({
                    display: "none"
                });
                //$("#dituContent").css({
                //    display : "block"
                //});

                console.log(nowLong);
                console.log(nowLat);
                if (typeof nowLong == "undefined" && typeof nowLat == "undefined") {
                    nowLong = oriLong;
                    nowLat = oriLat;
                    //map = init("dituContent",oriLong,oriLat,"",false)[0];
                    map = init("dituContent", nowLong, nowLat, "", false)[0];
                } else {
                    map = init("dituContent", nowLong, nowLat, "", false)[0];
                    oriLong = nowLong;
                    oriLat = nowLat;
                }
                //给页面详细经纬度赋值
                $("#detailLng").val(nowLong);
                //console.log($("#detailLng").val());
                $("#detailLat").val(nowLat);

                //经纬度转为地址，
                var gc = new BMap.Geocoder();
                var point = new BMap.Point(nowLong, nowLat);//经纬度
                gc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    //$('#address').val(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    //alert(addComp.province  + ' '+ addComp.city + ' '+addComp.district +' '+ addComp.street+ ' '+addComp.streetNumber);
                    //应先判断 省、市、区 数据是否改变，如有改变，则更改下拉框的值
                    if (addComp.province != $("#proId option:selected").text()) {
                        $("#proId option:selected").text(addComp.province);
                    }

                    if (addComp.city != $("#levId option:selected").text()) {
                        $("#levId option:selected").text(addComp.city);
                    }
                    if (addComp.district != $("#resId option:selected").text()) {
                        $("#resId option:selected").text(addComp.district);
                    }
                    //将详细地址设置为此值
                    $("#jDizhi").val(addComp.street + addComp.streetNumber);

                });


                // 创建控件
                var myZoomCtrl = new ZoomControl();
                map.addControl(myZoomCtrl);
                var myZoomCtrl3 = new ZoomControl3();
                map.addControl(myZoomCtrl3);

            };
            // 添加DOM元素到地图中
            map.getContainer().appendChild(buttonQD);

            // 将DOM元素返回
            return buttonQD;
        };
        //-------------------------------------取消--------------------------------------
        ZoomControl2.prototype.initialize = function (map) {
            // 创建一个DOM元素
            var buttonQX = document.createElement("Button");
            // 添加文字说明
            buttonQX.appendChild(document.createTextNode("取 消"));
            // 设置样式
            buttonQX.style.cursor = "pointer";
            buttonQX.style.width = "158px";
            buttonQX.style.height = "40px";
            //buttonQX.style.borderRadius="5px";
            buttonQX.style.border = "0 none";
            buttonQX.style.background = "#1DBFAD";
            //buttonQX.style.opacity="0.5";
            buttonQX.style.color = "#fff";
            buttonQX.style.marginLeft = "550px";
            buttonQX.style.marginTop = "10px";
            buttonQX.style.position = "fixed";

            // 绑定事件
            buttonQX.onclick = function (e) {
                $(".popupMap").css({
                    display: "none"
                });
                //$("#dituContent").css({
                //    display : "block"
                //});
                nowLong = oriLong;
                nowLat = oriLat;
                //map = init("dituContent",oriLong,oriLat,"",false)[0];
                map = init("dituContent", nowLong, nowLat, "", false)[0];

                //给页面详细经纬度赋值
                $("#detailLng").val(nowLong);
                //console.log($("#detailLng").val());
                $("#detailLat").val(nowLat);

                var myZoomCtrl = new ZoomControl();
                map.addControl(myZoomCtrl);
                var myZoomCtrl3 = new ZoomControl3();
                map.addControl(myZoomCtrl3);
            };
            // 添加DOM元素到地图中
            map.getContainer().appendChild(buttonQX);

            // 将DOM元素返回
            return buttonQX;
        };


        //----------------------------------end------------------------------------------

        //详细地址传入后地图进行的操作
        $("#jDizhi").on('change', function () {
            var proId = $("#proId option:selected").text();
            var levId = $("#levId option:selected").text();
            var resId = $("#resId option:selected").text();

            var jDizhi = $("#jDizhi").val();

            var adress = proId + levId + resId + jDizhi;

            var map = new BMap.Map("dituContent");
            var point = new BMap.Point("116.403958", "39.915049");
            map.centerAndZoom(point, 12);

            map.enableScrollWheelZoom(true);

            var marker = new BMap.Marker(point); //创建marker对象
            marker.setIcon(new BMap.Icon('../img/info/map_mark.png', new BMap.Size(21, 34)));

            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(adress, function (point) {
                if (point) {
                    map.centerAndZoom(point, 12);
                    marker = new BMap.Marker(point); //创建marker对象
                    marker.setIcon(new BMap.Icon('../img/info/map_mark.png', new BMap.Size(21, 34)));
                    map.addOverlay(marker); //在地图中添加marker
                    oriLong = point.lng;
                    oriLat = point.lat;
                    //给详细经纬度赋值
                    $("#detailLng").val(oriLong);
                    //console.log($("#detailLng").val());
                    $("#detailLat").val(oriLat);
                } else {
                    alert("您选择地址没有解析到结果!");
                }
            }, proId);
            myZoomCtrl = new ZoomControl();
            // 添加到地图当中
            map.addControl(myZoomCtrl);
            myZoomCtrl3 = new ZoomControl3();
            // 添加到地图当中
            map.addControl(myZoomCtrl3);
        });


        //点击确认按钮，进行操作
        $(".homeAffirm").on("click", function () {
            var _this = $(this);
            //判断有没有未填写的
            //判断是否有未填写的
            if ($(".car_massage_page .province option:selected").text() == "---请选择---") {
                util.tips.basic("请选择车公司省市");
                $(".car_massage_page .province").addClass("verify_error");
                return;
            }
            if ($(".car_massage_page .city option:selected").text() == "---请选择---") {
                util.tips.basic("请选择车公司省市");
                $(".car_massage_page .city").addClass("verify_error");
                return;
            }
            if ($(".car_massage_page .district option:selected").text() == "---请选择---") {
                util.tips.basic("请选择车公司省市");
                $(".car_massage_page .district").addClass("verify_error");
                return;
            }
            if ($(".car_massage_page .car_address").val().length == 0) {
                util.tips.basic("请输入详细地址");
                $(".car_massage_page .car_address").addClass("verify_error");
                return;
            }
			
			if ($(".car_massage_page .car_address").val().length > 20) {
				 util.tips.basic("详细地址超过最大字数20字");
				 return false;
			}
			
            if ($(".car_massage_page .carTelOne").val().length == 0) {
                util.tips.basic("请输入区号");
                $(".car_massage_page .carTelOne").addClass("verify_error");
                return;
            }
            if ($(".car_massage_page .carCarTwo").val().length == 0) {
                util.tips.basic("请输入座机号");
                $(".car_massage_page .carCarTwo").addClass("verify_error");
                return;
            }

            if ($(".car_massage_page .carTelThree").val().length == 0 || reg.test($(".car_massage_page .carTelThree").val())) {

            } else if (!reg.test($(".car_massage_page .carTelThree").val())) {
                $(".car_massage_page .carTelThree").addClass("verify_error");
                util.tips.basic("必须填写数字");
                return
            }
            if ($(".car_massage_page .area_msg").find("span").text().length == 0) {
                util.tips.basic("服务区域不能为空");
                $(".car_massage_page .areaText input").addClass("verify_error");
                return;
            }
            if ($(".car_massage_page .homeIntroduce").val().length == 0) {
                util.tips.basic("车公司介绍不能为空");
                $(".car_massage_page .homeIntroduce").addClass("verify_error");
                return;
            }
            //车公司介绍字数不能超过1000字

            if ($(".car_massage_page .homeIntroduce").val().length > 1000) {
                util.tips.basic("车公司介绍字数不能超过1000字");
                $(".car_massage_page .homeIntroduce").addClass("verify_error");
                return;
            }

            if ($(".car_massage_page").find().hasClass("verify_error")) {
                return;
            }
			
			var phoneList = [], phoneMsg;
			var checkCount = 0;
            $(".car_tel input").each(function (index, item) {
                phoneList.push($(item).val());
				checkCount += $(item).val().length;
            });
            if (phoneList[2] == "") {
                phoneList.pop();
            }
			
			if(checkCount > 25){
				util.tips.basic("固定电话长度过长");
				return false;
			}

            _this.parents(".car_massage_page").hide().siblings(".car_company_page").show();
            //修改后传入后台的数据
            //固定电话处理
			
            phoneMsg = phoneList.join("-");


            //服务区域信息
            var areaList = [];

            $("#areaMsg .homeAreaId").each(function (index, item) {
                areaList.push($(item).val());
            });
            areaList = areaList.join(",");
            console.log(areaList);
            alert(1);

            var changeData = {
                //"uId": 1,
                "uId": AUTOCAR.data_uId,
                //"comId": 1,
                "comId": AUTOCAR.data_comId,
                "provinceId": $(".car_massage_page .province option:selected").val(),
                "provinceName": $(".car_massage_page .province option:selected").text(),
                "cityId": $(".car_massage_page .city option:selected").val(),
                "cityName": $(".car_massage_page .city option:selected").text(),
                "districtId": $(".car_massage_page .district option:selected").val(),
                "districtName": $(".car_massage_page .district option:selected").text(),
                "detailLng": $("#detailLng").val(),     //经度
                "detailLat": $("#detailLat").val(),     //纬度
                "detailAddress": $(".car_massage_page #jDizhi").val(),
                "phone": phoneMsg,
                "serviceArea": areaList,
                "introduction": $(".homeIntroduce").val()

            };
            //给后台发送数据
            ajaxMethod("/vehiclecenter/carCompany/editCarCompany", changeData);
            //获取详情页的信息
            getDetail(AUTOCAR.data_uId, AUTOCAR.data_comId);
        });

        //------------------------------------车公司详情页面-----------------------------------
        //图片弹窗

        //点击图片显示图片弹窗
        $(".car_company_page").delegate(".swiperImg", "click", function () {
            var _this = $(this);
            $(".popupImg").show();
            //$("body").css("overflow","hidden");
            var data = {
                //"uId" : 1,
                "uId": AUTOCAR.data_uId,
                "comId": AUTOCAR.data_comId
            };
            ajaxMethod("/vehiclecenter/carCompany/selectCarPicture", data);
            //urlList//上传返回的数据
            console.log(urlList);
            $.each(urlList, function (index, item) {
                var html = ' <div class="swiper-slide">' +
                    '            <img src="' + item.pictureUrl + '" alt="">' +
                    '        </div>';
                $(".popupImg .view .swiper-wrapper").append(html);
                $(".popupImg .preview .swiper-wrapper").append(html);
            });
            //点击关闭按钮，弹窗消失
            $(".popupImg .pc-slide .close").click(function () {
                var _this = $(this);
                _this.parents(".popupImg").hide();
                //$("body").css("overflow","auto");
            });
            var viewSwiper = new Swiper('.view .swiper-container', {
                onSlideChangeStart: function () {
                    updateNavPosition()
                }
            });

            $('.view .arrow-left,.preview .arrow-left').on('click', function (e) {
                e.preventDefault();
                if (viewSwiper.activeIndex == 0) {
                    viewSwiper.swipeTo(viewSwiper.slides.length - 1, 1000);
                    return
                }
                viewSwiper.swipePrev()
            });
            $('.view .arrow-right,.preview .arrow-right').on('click', function (e) {
                e.preventDefault();
                if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
                    viewSwiper.swipeTo(0, 1000);
                    return
                }
                viewSwiper.swipeNext()
            });


            var previewSwiper = new Swiper('.preview .swiper-container', {
                visibilityFullFit: true,
                slidesPerView: 'auto',
                onlyExternal: true,
                onSlideClick: function () {
                    viewSwiper.swipeTo(previewSwiper.clickedSlideIndex)
                }
            });

            function updateNavPosition() {
                $('.preview .active-nav').removeClass('active-nav')
                var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
                if (!activeNav.hasClass('swiper-slide-visible')) {
                    if (activeNav.index() > previewSwiper.activeIndex) {
                        var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
                        previewSwiper.swipeTo(activeNav.index() - thumbsPerNav)
                    } else {
                        previewSwiper.swipeTo(activeNav.index())
                    }
                }
            }

        });


        //带有图片的详情页面的数据
        var detailsMsg;      //详情页接口返回的数据
        function getDetail(uId, comId) {
            var getDetailData = {
                "uId": uId,
                "comId": comId
            };
            ajaxMethod("/vehiclecenter/carCompany/info", getDetailData);
            detailsMsg = detailsMsg[0];
            //获取公司图片
            var picture = detailsMsg.picture;
            console.log(picture);
            //alert(picture.length);
            if (picture) {
                if (picture.length == 1) {
                    var html1 = '<div class="swiperImg" style="width:790px">' +
                        '               <img style="width:100%" src="' + picture[0] + '" alt=""/>' +
                        '          </div>';
                    $(".car_company_page .swiper-wrapper").append(html1);
                } else {
                    $.each(picture, function (index, item) {
                        var html = '<div class="swiper-slide swiperImg">' +
                            '               <img src="' + item + '" alt=""/>' +
                            '          </div>';
                        $(".car_company_page .swiper-wrapper").append(html);
                    });
                }
            }




            //轮播图
            var mySwiper = new Swiper('.car_company .swiper-container', {
                direction: 'horizontal',     //滑动方向：水平
                loop: true,
                autoplay: 2000,     //自动切换的时间间隔
                speed: 300,     //滑动速度
                width: 790,
                height: 445,
                autoplayDisableOnInteraction: false,    //如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
                //slidesPerView: 2,    //设置slide容器同时显示的slides数量
                //slidesPerGroup: 2,    //设置多少为一组
//        切换效果
                effect: 'fade',       //淡入
                pagination: '.swiper-pagination',   //分页器
                paginationType: 'bullets',    //定义分页样式（自定义）
                //paginationBulletRender: function(swiper,index,className) {
                //    return '<span class='+ className+'>' + (index + 1) + '</span>';
                //},
                paginationClickable: true,    //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
                uniqueNavElements: false,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next'
            });


            //车公司名称
            $(".car_company_page .car_company_msg span:first-child").text(detailsMsg.comName);
            //电话
            $(".car_company_page .company_tel span").text(detailsMsg.phone);
            //服务区域
            if (detailsMsg.serviceArea) {
                alert("1");
                var areaList = detailsMsg.serviceArea;
                areaList = areaList.join("  ");
                $(".car_company_page .coverage_content").text(areaList);
            }

            //详细地址
            var address = detailsMsg.detailAddress;
            //省名称
            var provinceName = detailsMsg.provinceName;
            //市名称
            var cityName = detailsMsg.cityName;
            //区名称
            var districtName = detailsMsg.districtName;
            //将地址信息组合显示在页面上
            var addressArr = [];
            addressArr.push(address);
            addressArr.push(districtName);
            addressArr.push(cityName);
            addressArr.push(provinceName);
            $(".car_company_page .company_address span").text(addressArr.join(","));
            //经纬度
            var lng = detailsMsg.lng;
            var lat = detailsMsg.lat;

            init("container3", lng, lat, cityName, false);
            //点击查看地图，显示弹窗
            $(".car_company_page #lookMap").click(function () {
                var _this = $(this);
                _this.parents(".car_company_page").siblings(".popupDetailMap").show();
                $(".popupDetailMap .map_close").click(function () {
                    $(this).parents(".popupDetailMap").hide();
                });

            });


            //车公司介绍
            var introduction = detailsMsg.introduction;
            $(".car_company_page .textDetails").text(introduction);

            //发送请求获取车型信息
            carList(AUTOCAR.data_uId, AUTOCAR.data_comId, AUTOCAR.data_pageSize, 1);

        };


        //点击取消按钮加载详情页面

        $(".homeCancel").on("click", function () {
            var _this = $(this);
            _this.parents(".car_massage_page").hide().siblings(".car_company_page").show();
            getDetail(AUTOCAR.data_uId, AUTOCAR.data_comId);

        });


        //--------------------------车公司介绍页面 ------------------------------------------
        //公司介绍部分，让传入的信息按句号换行
        //$("#textDetails").
        //车公司介绍，点击右侧按钮可展开全部；再次点击可收起
        //$(".car_company .introduceDetails").click(function () {
        //    var _this = $(this);
        //    _this.parent().siblings(".textDetails").toggleClass("text_hide");
        //});
        $(".car_company .introduceDetails").click(function(){
            var _this = $(this);
            if (_this.text() == "展开") {
                _this.parent().siblings(".textDetails").removeClass("text_hide");
                _this.text("收起");
            } else if (_this.text() == "收起") {
                _this.parent().siblings(".textDetails").addClass("text_hide");
                _this.text("展开");
            }
        });
        //	获取文字宽度的方法
        function  getWidth (dom) {
            var text = $(dom).text();
            var val = text.replace(/[^0-9]/g,"");
            var b = text.replace(/[^a-z]/g,"");
           //	说明中数字与字母的个数
            var otherNum = val.length + b.length;
            //	console.log(otherNum);
            //说明中文字的个数
            var textNum = text.length - otherNum;
            //	console.log(otherTextNum);
            //	说明总体的宽度
            return textNum * 16 +　otherNum / 2 * 16　;

        }
        $(document).ajaxStop(function(){
            //// 根据需求描述文字决定是否显示或隐藏展开
            if (getWidth(".textDetails") < $(".textDetails ").width() || $(".textDetails").text().length == 0) {
                $(".introduceDetails").hide();
            } else {
                $(".introduceDetails").show();
            }
        })



        //-----------------------------------------点击车型管理跳转到车型管理页面------------------------------------

        //点击车型管理按钮，页面跳转到车型列表页，并发送请求将信息展示到页面上
        $(".carType").click(function () {
            var _this = $(this);
            carList(AUTOCAR.data_uId, AUTOCAR.data_comId, AUTOCAR.data_pageSize, 1);
            _this.parents(".car_massage_page").hide().siblings(".car_control_page").show();

        });

        //车型管理页面展示
        function carList(uId, comId, pageSize, pageNow) {
            var dataManage = {
                "uId": uId,
                "comId": comId,
                "pageSize": 100,
                "pageNow": pageNow
            };
            ajaxMethod("/vehiclecenter/carCompany/findCarInfo", dataManage);
            console.log(managelList);
            $(".car_control_page tbody").empty();

            $.each(managelList, function (index, item) {
                var html = '<tr>' +
                    '        <td>' + item.vehicleModelName + '</td>' +
                    '        <td>' + item.vehicleModelDesc + '</td>' +
                    '        <td class="consult_price sub_color_blue"><span>' + item.referencePrice + '</span>&nbsp;<span>起</span></td>' +
                    '        <td class="dispose ">' +
                    '               <input type="hidden" value="' + item.vehicleModelId + '">' +
                    '               <a href="javascript:void(0)" class="sub_color_blue mright20 disposeEdit">编辑</a>' +
                    '               <a href="javascript:void(0)" class="sub_color_blue disposeDel">删除</a>' +
                    '        </td>' +
                    '</tr>';
                var htmlDetail = '<tr>' +
                    '                  <td class="type_name">' + item.vehicleModelName + '</td>' +
                    '                  <td class="type_describe">' + item.vehicleModelDesc + '</td>' +
                    '                  <td class="type_price"><span>' + item.referencePrice + '</span>&nbsp;起</td>' +
                    '              </tr>';
                $(".car_control_page tbody").append(html);
                $(".car_company_page .company_car_type tbody").append(htmlDetail);
            })
        }


        //---------------------------------新增车型页面--------------------------------------
        //判断失去焦点时文本框不为空
        function noEmpty(ele) {
            $(ele).blur(function () {
                var _this = $(this);
                if (_this.val().length == 0) {
                    _this.addClass("verify_error");
                    util.tips.basic("内容不能为空");
                } else {
                    _this.removeClass("verify_error");
                }
            });
        }

        noEmpty("#addModelName");
        noEmpty("#addSeat");
        noEmpty("#addAge");
        noEmpty("#addPrice");
        noEmpty("#addModelName");

        //封装点击新增与编辑页面确认按钮的方法
        function affirmMethod(ele, parentEle, name, seat, age, price, desc, uId, comId) {
            $(ele).click(function () {
                var _this = $(this);
                //判断有没有未填写的，若有则进行处理
                if ($(name).val().length == 0) {
                    $(name).addClass("verify_error");
                    util.tips.basic("请输入车型名称");
                    return;
                }
				if  ($(name).val().length  > 10) {
					util.tips.basic("车型名称已超过最大字数10字");
					return false;
				}
                if ($(seat).val().length == 0) {
                    $(seat).addClass("verify_error");
                    util.tips.basic("请输入座位数");
                    return;
                }
				if  ($(seat).val().length  > 10) {
					util.tips.basic("座位数已超过最大字数10字");
					return false;
				}
                if ($(age).val().length == 0) {
                    $(age).addClass("verify_error");
                    util.tips.basic("请输入车龄");
                    return;
                }
				if  ($(age).val().length  > 10) {
					util.tips.basic("车龄已超过最大字数10字");
					return false;
				}
                if ($(price).val().length == 0) {
                    $(price).addClass("verify_error");
                    util.tips.basic("请输入参考价格");
                    return;
                }
				if  ($(price).val().length  > 20) {
					util.tips.basic("参考价格已超过最大字数20字");
					return false;
				}
                if (_this.parents(parentEle).find().hasClass("verify_error")) {
                    return;
                }
				if ($(desc).val().length > 100) {
					util.tips.basic("其他说明已超过最大字数100字");
					return false;
				}
                //----------------------
                //判断新增车型与编辑车型显现与隐藏，决定传入的参数
                //车型管理id
                var vehicleModelId;
                if ($(".car_add_page").css("display") == "block") {
                    vehicleModelId = "";
                } else if ($(".car_edit_page").css("display") == "block"){
                    vehicleModelId =  $("#editHiddenId").val();
                }

                //获取填入的数据
                //获取车型管理id
                var dataAddModel = {
                    "uId": uId,
                    "comId": comId,
                    "vehicleModelName": $(name).val(),   //车型名称
                    //"vehicleModelName" : "奔驰",   //车型名称
                    "seatCount": $(seat).val(),              //座位数
                    //"seatCount" : "5座",              //座位数
                    "vehicleAge": $(age).val(),              //车龄
                    //"vehicleAge" : "5年以内",              //车龄
                    "referencePrice": $(price).val(),        //参考价格
                    //"referencePrice" : "100.00/天",        //参考价格
                    "otherDesc": $(desc).val(),             //说明
                    "vehicleModelId": vehicleModelId
                };
                console.log(dataAddModel);
                //将信息传给后台
                ajaxMethod("/vehiclecenter/carCompany/saveOrUpdateCarInfo", dataAddModel);

                //将新增车型页面上填写的内容清空
                $(name).val("");
                $(seat).val("");
                $(age).val("");
                $(price).val("");
                $(desc).val("");

                _this.parents(parentEle).hide().siblings(".car_control_page").show();

                //车型管理页面展示
                carList(AUTOCAR.data_uId, AUTOCAR.data_comId, AUTOCAR.data_pageSize, 1);


            });
        }

        //封装点击新增与编辑页面取消按钮的方法

        function cancelMethod(ele, parentEle) {
            $(ele).click(function () {
                var _this = $(this);

                _this.parents(parentEle).hide().siblings(".car_control_page").show();

                //车型管理页面展示
                carList(AUTOCAR.data_uId, AUTOCAR.data_comId, AUTOCAR.data_pageSize, 1);


            });
        }

        //点击确认时，将信息传给后台，页面跳转到车型信息页面并将车型信息展示到页面上
        var addModelList;   //点击确认按钮，新增车型接口返回的数据
        var managelList;   //点击确认按钮，车型管理接口返回的数据
        affirmMethod("#addAffirm", ".car_add_page", "#addModelName", "#addSeat", "#addAge", "#addPrice", "#addDesc", AUTOCAR.data_uId, AUTOCAR.data_comId);
        //点击取消按钮时，页面跳转到车型信息页面并将车型信息展示到页面上
        cancelMethod("#addCancel", ".car_add_page");

        //--------------------------------------------编辑页面------------------------
        //判断有无空文本框
        noEmpty("#editModelName");
        noEmpty("#editCount");
        noEmpty("#editAge");
        noEmpty("#editPrice");
        //noEmpty("#editDesc");
        //点击确认按钮后的操作
        affirmMethod("#editAffirm", ".car_edit_page", "#editModelName", "#editCount", "#editAge", "#editPrice", "#editDesc", AUTOCAR.data_uId, AUTOCAR.data_comId);
        cancelMethod("#editCancel", ".car_edit_page");


        //-------------------------------车型信息页面--------------------------------------
        //点击编辑，进入编辑页面，同时发送请求，将需要编辑的信息显示到编辑页面
        var editList;           //列表点击编辑按钮接口返回的数据
        $(".car_control_page").delegate(".disposeEdit", "click", function () {
            var _this = $(this);
            //编辑接口需要出入的参数
            //编辑所点击的车型的id
            var modelId = _this.prev("input[type=hidden]").val();
            var editData = {
                "uId": AUTOCAR.data_uId,
                "comId": AUTOCAR.data_comId,
                "vehicleModelId": modelId
            };
            //发送请求获取数据
            ajaxMethod("/vehiclecenter/carCompany/editCarInfo", editData);
            console.log(editList);
            //将返回的数据显示到编辑页面
            $("#editHiddenId").val(editList[0].vehicleModelId);   //车型管理id
            $("#editModelName").val(editList[0].vehicleModelName);
            $("#editCount").val(editList[0].seatCount);
            $("#editAge").val(editList[0].vehicleAge);
            $("#editPrice").val(editList[0].referencePrice);
            $("#editDesc").val(editList[0].otherDesc);
            _this.parents(".car_control_page").hide().siblings(".car_edit_page").show();

        });


        //点击删除，将车型信息删除，同时发送请求，将数据在后台删除
        $(".car_control_page").delegate(".disposeDel", "click", function () {
            var _this = $(this);
            _this.parents(".car_control_page").siblings("#confirmDel").show();
            //$("body").css("overflow","hidden");
            $("#confirmDel .popupConfirm").click(function () {
                //删除接口需要出入的参数
                //删除所点击的车型的id
                var modelId = _this.siblings("input[type=hidden]").val();
                var delData = {
                    "uId": AUTOCAR.data_uId,
                    "comId": AUTOCAR.data_comId,
                    "vehicleModelId": modelId
                };
                ajaxMethod("/vehiclecenter/carCompany/delCarInfo", delData);
                //carList(1, 1, 2, 1);//加载列表页
                carList(AUTOCAR.data_uId, AUTOCAR.data_comId, AUTOCAR.data_pageSize, 1);//加载列表页
                $("#confirmDel").hide();
                //$("body").css("overflow","auto");
            });
            $("#confirmDel .popupCancle").click(function () {
                $("#confirmDel").hide();
                //$("body").css("overflow","auto");
            });
        });


        //--------------------------------------------上传图片页面---------------------------------------
        //点击上传图片按钮跳转到上传图片页面并将图片显示到页面上
        //图片接口返回的数据
        var urlList;

        function urlMsg(uId, comId) {
            var data = {
                "uId": uId,
                "comId": comId
            };
            ajaxMethod("/vehiclecenter/carCompany/selectCarPicture", data);
            $(".upload_img_box .img_details_box").remove();
            $.each(urlList, function (index, item) {
                var html = '<li class="img_details img_details_box">' +
                    '           <div class="img_container bxs_bottom">' +
                    '               <img src="' + item.pictureUrl + '">' +
                    '               <input type="hidden" value="' + item.picId + '">' +
                    '           </div>' +
                    '           <p class="img_msg">' +
                    '                  <input class="img_title" type="text" value="' + item.pictureName + '" disabled>' +
                    '                  <span class="img_handle fr">' +
                    '                      <a href="javascript:void(0)" class="sub_color_blue mright10 preserveImg" style="display: none">保存</a>' +
                    '                      <a href="javascript:void(0)" class="sub_color_blue mright10 cancleImg" style="display: none">取消</a>' +
                    '                      <a href="javascript:void(0)" class="sub_color_blue mright10 reName">重命名</a>' +
                    '                      <a href="javascript:void(0)" class="sub_color_blue imgDel" >删除</a>' +
                    '                  </span>' +
                    '            </p>' +
                    '</li>';
                $(".upload_img_box").append(html);
            });
        }

        $(" .car_massage_page .carPhoto").click(function () {
            var _this = $(this);
            _this.parents(".car_massage_page").hide().siblings(".upload_img_page").show();

            urlMsg(AUTOCAR.data_uId, AUTOCAR.data_comId);

        });

        //增加图片


        var imgList;    //上传图片接口返回的数据
        var token;      //返回的token值
        var imgKey;
        var imgName;     //文件名称

        function getImgUploadToken() {
            var data = {
                "uId": AUTOCAR.data_uId,
                "comId": AUTOCAR.data_comId,
                //"fileName": "1"
                "fileName": imgName
            };
            ajaxMethod("/vehiclecenter/upLoad/carPictureGetToken", data);  //
            token = imgList[0].token;
            imgKey = imgList[0].key;
            return token;
        }

        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',    //上传模式,依次退化
            browse_button: 'fileImg',       //上传选择的点选按钮，**必需**
            uptoken_func: getImgUploadToken, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
            domain: 'http://7xpx3m.com1.z0.glb.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
            get_new_uptoken: true,  //设置上传文件的时候是否每次都重新获取新的token
            container: 'uploadContainer',           //上传区域DOM ID，默认是browser_button的父元素，
            max_file_size: '100mb',           //最大文件体积限制
            flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
            max_retries: 3,                   //上传失败最大重试次数
            chunk_size: '4mb',                //分块上传时，每片的体积
            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            init: {
                'FilesAdded': function (up, files) {
                    imgName = files[0].name;

                },
                'BeforeUpload': function (up, file) {
                    // 每个文件上传前,处理相关的事情
                    console.log('before');
                    var count = $(".upload_img_page .img_details").length - 1;
                    console.log(count);
                    if (count >= 10) {
                        alert("最多传十张");
                        uploader.stop();
                    }
                },
                'UploadProgress': function (up, file) {
                    // 每个文件上传时,处理相关的事情
                },
                'FileUploaded': function (up, file, info) {

                    urlMsg(AUTOCAR.data_uId, AUTOCAR.data_comId);

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

                    return imgKey
                }
            }
        });


        //点击重命名修改图片名称
        var imgOldName;     //文件名称
        $(".upload_img_box").delegate(".reName", "click", function () {
            var _this = $(this);
            _this.parent(".img_handle").siblings(".img_title").css("border", "1px solid black").removeAttr("disabled");
            imgOldName = _this.parent(".img_handle").siblings(".img_title").val();
            _this.hide().siblings(".imgDel").hide().siblings(".preserveImg").show().siblings(".cancleImg").show();
        });
        //点击保存，将图片名传给后台
        $(".upload_img_box").delegate(".preserveImg", "click", function () {
            var _this = $(this);
            _this.parent(".img_handle").siblings(".img_title").css({"border": "0 none", "disabled": "true"});
            var reNameData = {
                "uId": AUTOCAR.data_uId,
                "picId": _this.parents(".img_msg").siblings(".img_container").find("input[type=hidden]").val(),
                "newName": _this.parent().siblings(".img_title").val()
            };
            ajaxMethod("/vehiclecenter/upLoad/updateCarPictureName", reNameData);
            urlMsg(AUTOCAR.data_uId, AUTOCAR.data_comId);
        });
        //点击取消，返回原始状态
        $(".upload_img_box").delegate(".cancleImg","click",function(){
            var _this = $(this);
            _this.parent(".img_handle").siblings(".img_title").css({"border": "0 none", "disabled": "true"});
            _this.parent(".img_handle").siblings(".img_title").val(imgOldName);
            _this.hide().siblings(".preserveImg").hide().siblings(".reName").show().siblings(".imgDel").show();
        });
        //点击删除，删除照片
        $(".upload_img_box").delegate(".imgDel", "click", function () {
            var _this = $(this);
            _this.parents(".upload_img_page").siblings(".popupDel").show();
            $(".popupDel .affirmDel").click(function () {
                var _that = $(this);
                //删除接口需要传入的参数
                var data = {
                    "uId": AUTOCAR.data_uId,
                    "file": _this.parents(".img_msg").siblings(".img_container").children("img").attr("src")
                };
                //console.log(_this.parents(".img_msg").siblings(".img_container").children("img").attr("src"));
                ajaxMethod("/vehiclecenter/upLoad/delCarPicture", data);
                _that.parents(".popupDel").hide();

                urlMsg(AUTOCAR.data_uId, AUTOCAR.data_comId);

            });
            $(".popupDel .cancleDel").click(function () {
                $(this).parents(".popupDel").hide();

            });

        });


    });






