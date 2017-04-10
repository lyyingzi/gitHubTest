  function  qiniushow (fileTypeStr,fileName,filePath){
			var photoType = "bmp,jpg,jpeg,png,tiff,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw";
        	var photoTypeStr = photoType.split(",");
			var tdHtml = "";
			for(var j = 0; j < photoTypeStr.length; j++){
						if(fileTypeStr == photoTypeStr[j]){
							tdHtml = "<div style='float:left;margin-right: 10px;' class='hover-btn'>"
											+"<div style='height:30px;'>"
													+"<div class='lock-btn' style='float: left;width: 32px;height: 20px;border: 1px solid #2e5590;border-radius: 100px;color: #2e5590;text-align: center;line-height: 20px;font-size: 12px;margin:0 2px 5px 0;cursor: pointer;display:none'>查看</div>";
							tdHtml = tdHtml + "</div>"
											+"<div style='clear:both'></div>"
											+"<img class='portrait pic' style='width: 56px;height: 52px;;margin-right:30px;cursor: pointer;' src='"+ filePath +"' data-src-wide='"+ filePath +"' alt='BINGOO'>"
											+"<div style='clear:both'></div>"
											+"<span style='font-size:12px;margin-top:8px'>" + fileName + "</span>"
									+"</div>";
						}
			}
			if(tdHtml == ""){
								if(fileTypeStr == "doc" || fileTypeStr == "docx"){
									tdHtml = "<div style=\"float:left;margin-right: 20px;\" class='download-img'>"
													+"<div style='height:30px;'>"
														+"<div class='download-btn' style='float: left;width: 32px;height: 20px;border: 1px solid #2e5590;border-radius: 100px;color: #2e5590;text-align: center;line-height: 20px;font-size: 12px;margin:0 2px 5px 0;cursor: pointer;display:none'><a href='"+filePath+"?attname="+fileName+"'>下载</a></div>";
									tdHtml = tdHtml + "</div>"
													+"<div style=\"clear:both\"></div>"
													+"<img style='width:56px;height:52px;margin-right:30px;;' src='../img/doc.png'>"
													+"<div style=\"clear:both\"></div>"
													+"<span style='font-size:12px;margin-top:8px'>" + fileName+ "</span>"
											+"</div>";
								}else if(fileTypeStr == "html"){
									tdHtml = "<div style=\"float:left;margin-right: 20px;\" class='download-img'>"
												+"<div style='height:30px;'>"
												+"<div class='download-btn' style='float: left;width: 32px;height: 20px;border: 1px solid #2e5590;border-radius: 100px;color: #2e5590;text-align: center;line-height: 20px;font-size: 12px;margin:0 2px 5px 0;cursor: pointer;display:none'><a href='"+filePath+"?attname="+fileName+"'>下载</a></div>";
								tdHtml = tdHtml + "</div>"
												+"<div style=\"clear:both\"></div>"
												+"<img style='width:56px;height:52px;margin-right:30px;' src='../img/html.png'><div style=\"clear:both\"></div>"
												+"<span style='font-size:12px;margin-top:8px'>" + fileName+ "</span>"
											+"</div>";
								}else if(fileTypeStr == "pdf"){
									tdHtml = "<div style=\"float:left;margin-right: 20px;\" class='download-img'>"
												+"<div style='height:30px;'>"
												+"<div class='download-btn' style='float: left;width: 32px;height: 20px;border: 1px solid #2e5590;border-radius: 100px;color: #2e5590;text-align: center;line-height: 20px;font-size: 12px;margin:0 2px 5px 0;cursor: pointer;display:none'><a href='"+filePath+"?attname="+fileName+"'>下载</a></div>";
								tdHtml = tdHtml + "</div>"
												+"<div style=\"clear:both\"></div>"
												+"<img style='width:56px;height:52px;margin-right:30px;' src='../img/pdf.png'>"
												+"<div style=\"clear:both\"></div>"
												+"<span style='font-size:12px;margin-top:8px'>" + fileName+ "</span>"
											+"</div>";
								}else if(fileTypeStr == "ppt"){
									tdHtml = "<div style=\"float:left;margin-right: 20px;\" class='download-img'>"
												+"<div style='height:30px'>"
												+"<div class='download-btn' style='float: left;width: 32px;height: 20px;border: 1px solid #2e5590;border-radius: 100px;color: #2e5590;text-align: center;line-height: 20px;font-size: 12px;margin:0 2px 5px 0;cursor: pointer;display:none'><a href='"+filePath+"?attname="+fileName+"'>下载</a></div>";
								tdHtml = tdHtml + "</div>"
												+"<div style=\"clear:both\"></div>"
												+"<img style='width:56px;height:52px;margin-right:30px;' src='../img/ppt.png'>"
												+"<div style=\"clear:both\"></div>"
												+"<span style='font-size:12px;margin-top:8px'>" + fileName+ "</span>"
											+"</div>";
								}else if(fileTypeStr == "txt"){
									tdHtml = "<div style=\"float:left;margin-right: 20px;\" class='download-img'>"
												+"<div style='height:30px;'>"
												+"<div class='download-btn' style='float: left;width: 32px;height: 20px;border: 1px solid #2e5590;border-radius: 100px;color: #2e5590;text-align: center;line-height: 20px;font-size: 12px;margin:0 2px 5px 0;cursor: pointer;display:none'><a href='"+filePath+"?attname="+fileName+"'>下载</a></div>";
								tdHtml = tdHtml + "</div>"
												+"<div style=\"clear:both\"></div>"
												+"<img style='width:56px;height:52px;margin-right:30px;' src='../img/txt.png'>"
												+"<div style=\"clear:both\"></div>"
												+"<span style='font-size:12px;margin-top:8px'>" + fileName+ "</span>"
											 +"</div>";
								}else if(fileTypeStr == "xls" || fileTypeStr == "xlsx"){
									tdHtml = "<div style=\"float:left;margin-right: 20px;\" class='download-img'>"
												+"<div style='height:30px;'>"
												+"<div class='download-btn' style='float: left;width: 32px;height: 20px;border: 1px solid #2e5590;border-radius: 100px;color: #2e5590;text-align: center;line-height: 20px;font-size: 12px;margin:0 2px 5px 0;cursor: pointer;display:none'><a href='"+filePath+"?attname="+fileName+"'>下载</a></div>";
								tdHtml = tdHtml + "</div>"
												+"<div style=\"clear:both\"></div>"
												+"<img style='width:56px;height:52px;margin-right:30px;' src='../img/xls.png'>"
												+"<div style=\"clear:both\"></div>"
												+"<span style='font-size:12px;margin-top:8px'>" + fileName+ "</span>"
											+"</div>";
								}else if(fileTypeStr == "zip"){
									tdHtml = "<div style=\"float:left;margin-right: 20px;\" class='download-img'>"
												+"<div style='height:30px;'>"
												+"<div class='download-btn' style='float: left;width: 32px;height: 20px;border: 1px solid #2e5590;border-radius: 100px;color: #2e5590;text-align: center;line-height: 20px;font-size: 12px;margin:0 2px 5px 0;cursor: pointer;display:none'><a href='"+filePath+"?attname="+fileName+"'>下载</a></div>";
								tdHtml = tdHtml + "</div>"
												+"<div style=\"clear:both\"></div>"
												+"<img style='width:56px;height:52px;margin-right:30px;' src='../img/zip.png'>"
												+"<div style=\"clear:both\"></div>"
												+"<span style='font-size:12px;margin-top:8px'>" + fileName+ "</span>"
											+"</div>";
								}else{
									tdHtml = "<div style=\"float:left;margin-right: 20px;\" class='download-img'>"
												+"<div style='height:30px;'>"
												+"<div class='download-btn' style='float: left;width: 32px;height: 20px;border: 1px solid #2e5590;border-radius: 100px;color: #2e5590;text-align: center;line-height: 20px;font-size: 12px;margin:0 2px 5px 0;cursor: pointer;display:none'><a href='"+filePath+"?attname="+fileName+"'>下载</a></div>";
								tdHtml = tdHtml + "</div>"
												+"<div style=\"clear:both\"></div>"
												+"<img style='width:56px;height:52px;margin-right:30px;' src='../img/other.png'>"
												+"<div style=\"clear:both\"></div>"
												+"<span style='font-size:12px;margin-top:8px'>" + fileName+ "</span>"
											+"</div>";
								}
				}
				return tdHtml;
  }
   
 function   events(){
		var carrousel = $( ".carrousel" );
        	$(document).on("click",".del-btn",function(){

        	});
			$(document).on("mouseover",".hover-btn",function(){
				var $this=$(this);
				$this.children().children().css("display","block");
			});
			$(document).on("mouseout",".hover-btn",function(){
				var $this=$(this);
				$this.children().children().css("display","none");
			});
			$(document).on("mouseover",".download-img",function(){
				var $this=$(this);
				$this.children().children().css("display","block");
			});
			$(document).on("mouseout",".download-img",function(){
				var $this=$(this);
				$this.children().children().css("display","none");
			});

        	$(document).on("click",".lock-btn",function(){
        	  $this= $(this);
        	  carrousel.find("img").attr( "src", $this.parent().parent().find("img").attr("data-src-wide") );
        	  carrousel.fadeIn( 200 );
        	});

        	carrousel.find( ".close" ).click( function(){
        	  carrousel.find( "img" ).attr( "src", '' );
        	  carrousel.fadeOut( 200 );
        	} );
 }