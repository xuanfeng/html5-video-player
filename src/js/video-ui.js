$(function(){

	var $body = $('body'),
		$win = $(window),
		$doc = $(document);

		// 视频列表
	var artlist = [
		{
			id: 'fk',
			name: '再不疯狂我们就老了',
			artist: '李宇春'
		}, {
			id: 'yc',
			name: '洋葱',
			artist: 'TFBOYS'
		}, {
			id: 'sxdsx',
			name: '剩下的盛夏',
			artist: 'TFBOYS'
		}, {
			id: 'ku',
			name: '李宇春',
			artist: '酷'
		}, {
			id: 'whxn',
			name: '我好想你',
			artist: '苏打绿'
		}, {
			id: 'young',
			name: '样（Young）',
			artist: 'TFBOYS'
		}, {
			id: 'sky',
			name: 'A Sky Full Of Stars',
			artist: 'Coldplay'
		}, {
			id: '1987',
			name: '1987我不知会遇见你',
			artist: 'Chris Lee'
		}, {
			id: 'qwdfj',
			name: '墙外的风景',
			artist: '苏打绿',
		}, {
			id: 'lost',
			name: 'Lost Stars',
			artist: 'Maroon5'
		}, {
			id: 'nzfnsm',
			name: '你在烦恼什么',
			artist: '苏打绿'
		}, {
			id: 'up',
			name: 'Up & Up',
			artist: 'Coldplay'
		}
	];

	var $loading = $('.loading');
	var videoPlayer = new Video({
		loadedmetadata: function(){
			// 设置视频的时间属性
			$(".current_time").text(timeFormat(0));
			$(".duration_time").text(timeFormat(videoPlayer.getDuration()));
			updateVolume(0, 0.7);

			// 设置缓冲条
			updateBuffer();
		},

		canplay: function(){
			$loading.hide();
		},

		seeking: function(){
			$loading.show();
		},

		waiting: function(){
			$loading.show();
		},

		timeupdate: function(currentTime, duration){
			var percentage = 100 * currentTime / duration;
			$('.timeBar').css('width', percentage + '%');
			$(".timeHandle").css('left', currentTime / duration * $progress.width() - 8);
			$('.current_time').text(timeFormat(currentTime));
		},

		ended: function(){
			video.pause();
			$body.removeClass('mod-play').addClass('mod-pause');
		},
	});
	initVideo('fk');

	// 初始化某视频
	function initVideo(id){
		var art = {},
			vindex = 0;
		for(var index in artlist){
			if(artlist[index].id == id){
				art = artlist[index];
				vindex = index;
				break;
			}
		}

		videoPlayer.init({
			src: 'http://ob8l4jfs8.bkt.clouddn.com/video/media/' + id + '.mp4',
			poster: 'http://ob8l4jfs8.bkt.clouddn.com/video/media/' + id + '.jpg',
		});

		showVideoNav(vindex);
		$body.removeClass('mod-play').addClass('mod-pause');
		$('.js_caption').data('index', vindex).text(art.artist + ': 《' + art.name + '》');
	}

	// 显示视频的缓冲进度条
	var bufferTimer = null;
	function updateBuffer(){
		var currentBuffer = videoPlayer.getBuffered();
		var duration = videoPlayer.getDuration();
		var percentage = 100 * currentBuffer / duration;
		$(".bufferBar").css("width", percentage + "%");
		// console.log('buffer ' + percentage);
		if(currentBuffer < duration){
			bufferTimer && clearTimeout(bufferTimer);
			bufferTimer = setTimeout(updateBuffer, 500);
		}
	};

	// 播放/停止
	$('.btnPlay').on('click', function(){
		if(videoPlayer.isPlaying()){
			videoPlayer.pause();
			$body.removeClass('mod-play').addClass('mod-pause');
		}else{
			videoPlayer.play();
			$body.removeClass('mod-pause').addClass('mod-play');
		}
	});

	// 全屏按钮
	$(".btnFS").on('click',function(){
		videoPlayer.fullScreen();
	});

	// 开关灯按钮
	$(".btnLight").click(function(){
		$(this).toggleClass("lighton");
		$body.toggleClass("mod-overlay");
	});

	// 声音按钮-静音
	$(".sound").click(function(){
		$(this).toggleClass("muted");
		var $volumeBar = $(".volumeBar");
		videoPlayer.switchMuted({
			on: function(volume){
				$volumeBar.css("height", volume * 100 + "%");
			},
			off: function(){
				$volumeBar.css("height", 0);
			}
		});
	});

	// 进度条
	var progressDrag = false;
	var $progress = $('.progress');
	$('.progress, .timeHandle').on('mousedown', function(event){
		if(event.which == 1){
			progressDrag = true;
			updatebar(event.pageX);
		}
		return false;
	});

	$doc.on('mousemove', function(event){
		if(progressDrag){
			updatebar(event.pageX);
			return false;
		}
	});

	$doc.on('mouseup', function(event){
		if(progressDrag){
			progressDrag = false;
			updatebar(event.pageX);
			return false;
		}
	});

	// 更新进度条
	function updatebar(pageX){
		var duration = videoPlayer.getDuration();
		var position = pageX - $progress.offset().left;
		var percentage = 100 * position / $progress.width();

		if(percentage > 100){
			percentage = 100;
		}
		if(percentage < 0){
			percentage = 0;
		}

		$('.timeBar').css('width', percentage + '%');

		// 更新播放进度
		videoPlayer.setCurrentTime(duration * percentage / 100);
	}

	// 时间信息tip
	$progress.on('mousemove', function(event){
		updateTime(event.pageX);
	});

	function updateTime(pageX){
		var duration = videoPlayer.getDuration();
		var position = pageX - $progress.offset().left;
		var totalTime = duration * position / $progress.width();
		if(totalTime > duration){
			currentTime = duration;
		}
		if(totalTime < 0 || !totalTime){
			currentTime = "00:00";
		}
		var currentTime = timeFormat(totalTime);
		$(".timeTip").text(currentTime).css({left: position - 16});
	}


	// 音量
	var $volume = $('.volume');
	var volumeDrag = false;
	$volume.on('mousedown', function(event){
		if(event.which == 1){
			volumeDrag = true;
			$('.sound').removeClass('muted');
			updateVolume(event.pageY);
			videoPlayer.switchMuted({
				muted: false
			});
			return false;  //防止点击时选择文本
		}
	});

	$doc.on('mousemove', function(event){
		if(volumeDrag){
			updateVolume(event.pageY - 4);
			return false;
		}
	});

	$doc.on('mouseup', function(event){
		if(volumeDrag){
			volumeDrag = false;
			updateVolume(event.pageY);
		}
	});

	function updateVolume(pageY, volume){
		var percentage;

		if(volume){
			percentage = volume * 100;
		}else{
			var position = pageY - $volume.offset().top;
			percentage = 100 - 100 * position / $volume.height();
		}

		if(percentage > 100){
			percentage = 100;
		}
		if(percentage < 0){
			percentage = 0;
		}

		// 更新声音条和声音值
		$(".volumeBar").css("height", percentage+"%");

		videoPlayer.updateVolume(percentage / 100);

		// 基于声音值，改变声音等级图标
		if(percentage == 0){
			$(".sound").attr("class", "muted sound btn");
		}else if(percentage > 25 && percentage < 50){
			$(".sound").attr("class", "sound1 sound btn");
		}else if(percentage > 50 && percentage < 75){
			$(".sound").attr("class", "sound2 sound btn");
		}else if(percentage > 75){
			$(".sound").attr("class", "sound3 sound btn");
		}
	}

	// 时间格式化 - 00:00
	function timeFormat(seconds){
		var m = Math.floor(seconds/60)<10 ? "0" + Math.floor(seconds/60) : Math.floor(seconds/60);
		var s = Math.floor(seconds-(m*60))<10 ? "0" + Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
		return m + ":" + s;
	}

	// 设置循环
	$(".btnLoop").on('click', function(){
		$(this).toggleClass("loopon");
		var $video = $('#video');
		if(!$video.attr("loop")){
			$video.attr("loop", "true");
		}else{
			$video.removeAttr("loop");
		}
	});


	// 帷幕
	$('.js_rope').on('click', function(){
		$body.toggleClass('mod-open');
	});


	// 视频列表
	function renderList(){
		var artlistTpl = template.compile($('#list_tpl').html());
		$('.js_artList').html(artlistTpl({list: artlist}));
	}
	renderList();

	// 选择视频
	$('.js_artList').on('click', 'li', function(event){
		var target = $(event.currentTarget),
			id = target.data('id');
		initVideo(id);
	});

	// 上下篇
	$('.video_nav').on('click', function(event){
		var type = $(this).data('type');
		var index = parseInt($('.js_caption').data('index'));
		if(type == 'prev'){
			index--;
		}else if(type == 'next'){
			index++;
		}
		initVideo(artlist[index].id);
	});

	function showVideoNav(index){
		index = parseInt(index);
		if(index <= 0){
			$('.video_nav[data-type=prev]').hide();
		}else if(index >= artlist.length-1){
			$('.video_nav[data-type=next]').hide();
		}else{
			$('.video_nav').show();
		}
	}
});