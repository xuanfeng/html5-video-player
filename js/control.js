$(document).ready(function(){
// HTML5视频
// author：农航亮
// time:2013.4.15


	// 视频初始化
	var video=$("#myVideo");
	var video_width=video.width();
	var video_height=video.height();
	$(".videoContainer").css({width:video_width,height:video_height});
	$(".loading").css({left:video_width/2-51,top:video_height/2-51});

	// 隐藏控制栏
	video[0].removeAttribute("controls");
	$(".control").show();
	$(".loading").fadeIn(500);
	$(".caption").fadeIn(500);

	// 视频加载，可播放前的设置
	video.on('loadedmetadata',function(){

		// 设置视频的时间属性
		$(".current").text(timeFormat(0));
		$(".duration").text(timeFormat(video[0].duration));
		updateVolume(0,0.7);

		// 设置缓冲条
		setTimeout(startBuffer,150);

		// 绑定视频事件
		$(".videoContainer")
		.append('<div id="init"><div class="init_start"></div></div>')
		.hover(function(){
			$(".btmControl").stop(true).animate({height:42},1000).css({overflow:"visible"});
			$(".caption").stop(true).show().animate({top:0},500);
			$(".topControl").animate({"opacity":"1"},500);
		},function(){
			if(!volumeDrag && !timeDrag){
				$(".btmControl").stop(true).delay(2000).animate({height:0},1000).css({overflow:"hidden"});		
				$(".caption").stop(true).show().animate({top:-45},500);
				$(".topControl").delay(2000).animate({"opacity":"0.6"},500);
			}
		})

		$("#init").fadeIn(200);
		$("#init").on('click',function(){
			initOut();
			$(".btnPlay").addClass("paused");
			video[0].play();
		})
	});




	// 显示视频的缓冲进度条
	var startBuffer=function(){
		var currentBuffer=video[0].buffered.end(0);
		var maxduration=video[0].duration;
		var perc=100 * currentBuffer / maxduration;
		$(".bufferBar").css("width",perc+"%");
		if(currentBuffer < maxduration){
			setTimeout(startBuffer,500);
		}
	};

	//显示视频播放时间
	video.on('timeupdate', function() {
		var currentPos = video[0].currentTime;
		var maxduration = video[0].duration;
		var perc = 100 * currentPos / maxduration;
		var prec_han=currentPos / maxduration*$(".progress").width()-8;
		$('.timeBar').css('width',perc+'%');
		$(".progress .time_handle").css('left',prec_han);
		$('.current').text(timeFormat(currentPos));	
	});

	// 控制条事件
	// 视频播放暂停点击监听
	video.on('click',function(){playpause()});
	$(".btnPlay").on('click',function(){playpause()});
	var playpause=function(){
		if(video[0].paused || video[0].ended){
			$(".btnPlay").addClass("paused");
			video[0].play();
			$("#init").fadeOut(200);
			initOut();
		}else{
			$(".btnPlay").removeClass("paused");
			video[0].pause();
			initIn();
		}
	};

	//视频暂停图标的动画效果
	var initIn=function(){
		$("#init").fadeIn(200).css({
				"transform":"scale(0.5,0.5)",
				top:"80%",
				left:"4%",
				"-webkit-transition-duration":"2s"
		});
		$(".video_prev,.video_next").fadeIn(400);
		$(".caption").show().animate({top:0},300);
	}
	var initOut=function(){
		$("#init").fadeOut(100).css({
				"transform":"scale(1,1)",
				top:"50%",
				left:"50%",
				marginTop:-60,
				marginLeft:-60,
				display:"none"
			});
		$(".video_prev,.video_next").fadeOut(400);
		$(".caption").hide().animate({top:-45},300);
	}
	

	// 停止播放按钮处理
	$(".btnStop").on('click',function(){
		$(".btnPlay").removeClass('paused');
		updatebar($(".progress").offset().left);
		video[0].pause();
		initIn();
	});

	// 全屏按钮处理
	$(".btnFS").on('click',function(){
		if($.isFunction(video[0].webkitEnterFullscreen)){
			video[0].webkitEnterFullScreen();
		}else if($.isFunction(video[0].mozRequestFullScreen)){
			video[0].mozRequestFullScreen();
		}else{
			alert("浏览器不支持全屏");
		}
	});

	// 开关灯按钮处理
	$(".btnLight").click(function(){
		$(this).toggleClass("lighton");

		// 如果关灯，创建一个遮罩层
		if(!$(this).hasClass("lighton")){
			$(".btnLight").attr("title","开灯");
			$("body").append('<div class="overlay"></div>');
			$(".overlay").css({
				position:"absolute",
				width:100+"%",
				height:$(document).height(),
				background:"#000",
				opacity:0.9,
				top:0,
				left:0,
				zIndex:11119
			});
			$(".videoContainer").css({zIndex:11120});
		}
		// 开灯则隐藏遮罩层
		else{
			$(".overlay").remove();
			$(".btnLight").attr("title","关灯");
		}
	});

	// 声音按钮的点击，静音处理
	$(".sound").click(function(){
		video[0].muted=!video[0].muted;
		$(this).toggleClass("muted");
		if(video[0].muted){
			$(".volumeBar").css("height",0);
		}else{
			$(".volumeBar").css("height",video[0].volume*100+"%");
		}
	});

	// 视频事件
	// 绑定视频能播放时的事件
	video.on("canplay",function(){
		$(".loading").fadeOut(100);
	});

	
	// 解决chrome缓存流
	var completeloaded=false;
	video.on('canplaythrough',function(){
		completeloaded=true;
	});

	// 视频播放完毕处理
	video.on('ended',function(){
		$(".btnPlay").removeClass("paused");
		video[0].pause();

	});

	// 视频缓冲加载处理
	video.on('seeking',function(){
		if(!completeloaded){
			$(".loading").fadeIn(200);
		}
	});

	// 视频加载完成处理
	video.on('seeked',function(){});

	// 视频加载等待处理
	video.on('waiting',function(){
		$(".loading").fadeIn(200);
	});

	// 视频播放进度条
	// 当进度条点击时
	var timeDrag=false;
	$(".progress,.time_handle").on('mousedown',function(e){
		if(e.which==1){
			timeDrag=true;
			updatebar(e.pageX);
			return false;
		}		
	});
	$(document).on('mouseup',function(e){
		if(timeDrag){
			timeDrag=false;
			updatebar(e.pageX);
		}
	});
	$(document).on('mousemove',function(e){
		if(timeDrag){
			updatebar(e.pageX);
		}
		// 更新time_tip
		updateTime(e.pageX);
	});
	var updatebar=function(x){
		var progress=$(".progress");

		// 计算点击位置并更新视频播放时间
		var maxduration=video[0].duration;
		var position=x-progress.offset().left;
		var percentage=100 * position/progress.width();
		if(percentage>100){
			percentage=100;
		}
		if(percentage<0){
			percentage=0;
		}
		$(".timeBar").css("width",percentage+"%");
		video[0].currentTime=maxduration * percentage / 100;
	};

	// 鼠标hover提示当前进度
	$(".progress").hover(function(e){
		var showtime=updateTime(e.pageX);
		$(".time_tip").show();
	},function(){
		$(".time_tip").hide();
	});
	var updateTime=function(x){
		var progress=$(".progress");
		var maxduration=video[0].duration;
		var position=x-progress.offset().left;
		var currentAll=maxduration*position/progress.width();
		if(currentAll>maxduration){
			currentTime=maxduration;
		}
		if(currentAll<0){
			currentTime="00:00";
		}
		if(currentAll=="undefinded"){
			currentTime="00:00";
		}
		var currentTime=timeFormat(currentAll);
		$(".time_tip").text(currentTime).css({left:x-80});
	}

	// 声音条
	// 声音条事件处理
	$(".volume").hide();
	$(".btnSound").hover(function(){
		$(".btmControl").stop(true).animate({height:42},0).css({overflow:"visible"});
		$(".volume").show();
	},function(){
		$(".volume").hide();
	});
	var volumeDrag=false;
	$(".volume").on('mousedown',function(e){
		if(e.which==1){
			volumeDrag=true;
			video[0].muted=false;
			$(".sound").removeClass("muted");
			updateVolume(e.pageY);
			return false;  //防止点击时选择文本
		}
	});
	$(document).on('mouseup',function(e){
		if(volumeDrag){
			volumeDrag=false;
			updateVolume(e.pageY);
		}
	});
	$(document).on('mousemove',function(e){
		if(volumeDrag){
			updateVolume(e.pageY-4);
		}
		return false;
	});
	var updateVolume=function(x,vol){
		var volume=$(".volume");
		var percentage;
		
		if(vol){
			percentage=vol * 100;
		}else{
			var position=x-volume.offset().top;
			percentage=100-100 * position / volume.height();
		}

		if(percentage>100){
			percentage=100;
		}
		if(percentage<0){
			percentage=0;
		}

		// 更新声音条和声音值
		$(".volumeBar").css("height",percentage+"%");
		video[0].volume=percentage / 100;

		// 基于声音值，改变声音等级图标
		if(video[0].volume ==0){
			$(".sound").attr("class","muted sound btn");
		}else if(video[0].volume > 0.25 && video[0].volume < 0.50){
			$(".sound").attr("class","sound1 sound btn");
		}else if(video[0].volume > 0.50 && video[0].volume < 0.75){
			$(".sound").attr("class","sound2 sound btn");
		}else if(video[0].volume > 0.75){
			$(".sound").attr("class","sound3 sound btn");
		}
	};

	//时间格式设置 - 00:00
	var timeFormat=function(seconds){
		var m=Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60):Math.floor(seconds/60);
		var s=Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
		return m+":"+s;
	};

	// 设置循环
	$(".btnLoop").click(function(){
		$(this).toggleClass("loopon");
		var loop=$("#myVideo").attr("loop");
		if(!loop){
			$("#myVideo").attr("loop","true");
		}else{
			$("#myVideo").removeAttr("loop");
		}
	})

	

});

