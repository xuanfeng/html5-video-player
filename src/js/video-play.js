;(function(root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.Video = factory.call(root);
    }
}(this, function() {
    'use strict';

    // 视频播放控制
	function Video(options){
		this.options = $.extend({
			video: $('#video'),
			loadedmetadata: $.noop,
			canplay: $.noop,
			canplaythrough: $.noop,
			seeking: $.noop,
			ended: $.noop,
			seeked: $.noop,
			waiting: $.noop,
		}, options);

	}

	Video.prototype = {
		init: function(options){
			this.video = this.options.video[0];
			this.completeloaded = false;

			options.src && $(this.video).attr('src', options.src);
			options.poster && $(this.video).attr('poster', options.poster);
			this.listenEvents();
		},

		listenEvents: function(){
			var self = this;

			// 视频加载，可播放前的设置
			$(this.video).on('loadedmetadata', this.options.loadedmetadata);

			// 视频能播放
			$(this.video).on('canplay', this.options.canplay);

			// 解决chrome缓存流
			$(this.video).on('canplaythrough', function(){
				self.completeloaded = true;
				self.options.canplaythrough();
			});

			// 视频缓冲加载
			$(this.video).on('seeking', function(){
				if(self.completeloaded){
					self.options.seeking();
				}
			});

			// 更新视频播放时间
			$(this.video).on('timeupdate', function(){
				self.options.timeupdate(self.video.currentTime, self.video.duration);
			});

			// 视频播放完毕
			$(this.video).on('ended', this.options.ended);

			// 视频加载完成
			$(this.video).on('seeked', this.options.seeked);

			// 视频加载等待
			$(this.video).on('waiting', this.options.seeked);
		},

		play: function(){
			this.video.play();
		},

		pause: function(){
			this.video.pause();
		},

		setCurrentTime: function(time){
			this.video.currentTime = time;
		},

		// 调节音量
		updateVolume: function(volume){
			this.video.volume = volume;
		},

		// 全屏
		fullScreen: function(){
			if($.isFunction(this.video.webkitEnterFullscreen)){
				this.video.webkitEnterFullScreen();
			}else if($.isFunction(this.video.mozRequestFullScreen)){
				this.video.mozRequestFullScreen();
			}else{
				alert("浏览器不支持全屏");
			}
		},

		// 静音
		switchMuted: function(options){
			this.video.muted = options.muted || !this.video.muted;
			if(this.video.muted){
				options.off && options.off(this.video.volume);
			}else{
				options.on && options.on(this.video.volume);
			}
		},

		// 获取视频总播放时间
		getDuration: function(){
			return this.video.duration || 0;
		},

		// 获取缓冲进度
		getBuffered: function(){
			return this.video.buffered.end(0);
		},

		// 是否正在播放
		isPlaying: function(){
			return !this.video.paused && !this.video.ended;
		},

		getvideo: function(){
			return this.video;
		}

	}

    return Video;
}));
