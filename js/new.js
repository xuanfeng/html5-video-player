$(document).ready(function(){
	$("#list").hide();
	var video=$("#myVideo");
	var video_width=video.width();
	var video_height=video.height();

	var i;
	$(".artist_l li").each(function(i){
		$(this).click(function(){
			var data=$(this).attr("data");
			var video=$("#myVideo");
			var source=$(".video_source");
			video.attr("poster","./media/"+data+".jpg");
			source.attr("src","media/"+data+".mp4");
			video.attr("data",i);
			$("#init").remove();
			video.load();
			$(".caption").show().animate({top:0},300);

			$("body,html").animate({scrollTop:0},1000);
			hide_pn();
			get_caption(i);

			$(".img_output").empty();
			$(".img_select").hide();
			return false;	
		});//click
	});//each	

	$("#quxian a").click(function(){
		$("body,html").animate({scrollTop:0},1000);
	});

	$curtainopen = false;
	$(".rope").click(function(){
		$(".ex").hide("slow");
		if ($curtainopen == false){ 
			$(this).stop().animate({top: '0px' }, {queue:false, duration:350, easing:'easeOutBounce'}); 
			$(".leftcurtain").stop().animate({width:'60px'}, 2000 );
			$(".rightcurtain").stop().animate({width:'60px'},2000 );			
			$("#list").fadeIn(1000);
			$("body,html").stop(true).animate({scrollTop:350},1000);
			$(this).animate({right:10},1000);
			$curtainopen = true;
		}else{
			$(".ex").delay(2000).show("slow");
			$(this).stop().animate({top: '-40px' }, {queue:false, duration:350, easing:'easeOutBounce'}); 
			$(".leftcurtain").stop().animate({width:'50%'}, 2000 );
			$(".rightcurtain").stop().animate({width:'51%'}, 2000 );
			$("#list").fadeOut(1000);
			$(this).animate({right:200},1000);
			$("#myVideo")[0].pause();
			$curtainopen = false;
		}
		return false;
	});

	// 播放完时，显示列表切换
	var current_video=parseInt(video.attr("data"));
	hide_pn();

	$(".video_prev").click(function(){
		hide_pn();
		current_video=parseInt(video.attr("data"));
		$(".artist_l li").eq(current_video-1).trigger("click");
		var li_res=get_caption(current_video);
		$(".caption").text(li_res);
		$(".caption").show().animate({top:0},300);
		$(this).attr("title",get_caption(current_video-1));
	}).mouseover(function(){
		current_video=parseInt(video.attr("data"));
		$(this).attr("title",get_caption(current_video-1));
	});
	$(".video_next").click(function(){
		hide_pn();
		current_video=parseInt(video.attr("data"));
		$(".artist_l li").eq(current_video+1).trigger("click");
		var li_res=get_caption(current_video);
		$(".caption").text(li_res);
		$(".caption").show().animate({top:0},300);
		$(this).attr("title",get_caption(current_video+1));
	}).mouseover(function(){
		current_video=parseInt(video.attr("data"));
		$(this).attr("title",get_caption(current_video+1));
	});


	function hide_pn(){
		current_video=parseInt(video.attr("data"));
		$(".video_prev").show();
		$(".video_next").show();
		if(current_video==0){
			$(".video_prev").hide();
			$(".video_next").show();
		}
		if(current_video==11){
			$(".video_next").hide();
			$(".video_prev").show()
		}
	}

	function get_caption(i){
		var li=$(".artist_l li").eq(i).find("a");
		var li_strong=li.find("strong").text();
		var li_span=li.find("span").text();
		var li_res=li_strong+": 《"+li_span+"》";
		
		return li_res;
	}

	// 生成图像
	var $video, $output;
    var scale = 1;
 
    var initialize = function() {
        $output = $(".img_output");
        $video = $("#myVideo").get(0);
        $(".img_btn").click(captureImage);    
    };
 
    var captureImage = function() {
        var canvas = document.createElement("canvas");
        canvas.width = $video.videoWidth * scale;
        canvas.height = $video.videoHeight * scale;
        canvas.getContext('2d').drawImage($video, 0, 0, canvas.width, canvas.height);
 
        var img = document.createElement("img");
        img.src = canvas.toDataURL();
        $output.prepend(img);

        var img_src=$(".img_output img").attr("src");
		$(".img_save a").attr("href",img_src);
    };
    $(initialize);

    // 开始截图
    $(".img_btn").click(function(){
		$(".img_select").fadeIn(200);
		$("#myVideo")[0].pause();
	});
	// 截图返回
	$(".img_cancel").click(function(){
		$(".img_output").empty();
		$(".img_select").hide();
		$("#myVideo")[0].play();
		return false;
	})

	// 播放完时显示上下视频
	var ended=setInterval(function(){
		if($("#myVideo")[0].ended){
		hide_pn();
		}
	},1000);

	
});




	

