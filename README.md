HTML5-MV show
==========

##demo地址：[轩枫阁-MV show](http://www.xuanfengge.com/funny/html5/video/)


------------------
###2016.08更新

- 更改写法，代码更加优雅
- 播放器功能与UI交互分离
- 更新视频
- 构建工具基于[Weflow](https://weflow.io/)


###主要功能

- 视频播放基本功能
- 播放
- 暂停
- 调整声音
- 点击进度播放
- 缓冲loading提示
- 预加载进度条提示
- 关灯效果
- 设置循环播放
- 全屏播放
- 播放完时可左右切换视频
- 开幕/闭幕效果
- 播放进度显示
- 视频截图

####本地如何预览效果
- 需要基于php的服务器
- 视频数据部分填充在list.php中（包括视频静态截图、视频标题、视频作者等）
- 将视频与视频截图已字母命名放在media（新建）文件夹里边
- chrome支持mp4格式的


####制作过程
- 基于HTML5的video API
- 基于CSS3的全新的UI制作
- 自行设计的动态视频列表
- 利用canvas进行视频截图
- 竖状音量控制条
