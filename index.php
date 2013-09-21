<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>轩枫阁-Video Player</title>
	<meta name="robots" content="index,follow" />
    <meta name="description" content="结合html5技术，及优雅的界面，旨在展示MV的精彩瞬间，还等什么，赶紧来欣赏下有什么好看的MV吧！" />
    <meta name="keywords" content="轩枫阁,轩枫阁MV,轩枫阁视频" />
    <link rel="icon" type="image/ico" href="favicon.ico">
    <link rel="stylesheet" href="css/common.css" type="text/css" />
    <link rel="stylesheet" href="css/list.css" type="text/css">

    <script type="text/javascript" src="js/jquery-1.8.1.js"></script>
    <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
	
    <script type="text/javascript" src="js/new.js"></script>
    <script type="text/javascript" src="js/list.js"></script>
    <script type="text/javascript" src="js/control.js"></script>  



    <!--[if lte IE 8]> 
    <script src="IE/jquery.js" type="text/javascript"></script>
    <script src="IE/iealert.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="IE/iealert/style.css" />
    <script type="text/javascript">
      $(document).ready(function() {
        $("body").iealert();
      });
    </script>
    <![endif]-->
</head>

<body>
	<div class="ex">
        <p class="hide">Welcome to the MV Show~</p>
        <div id="pe"></div>
    </div>
	<div class="leftcurtain"><img src="images/frontcurtain.jpg"/></div>
	<div class="rightcurtain"><img src="images/frontcurtain.jpg"/></div>
    
	<a class="rope" href="#">
		<img src="images/rope.png"/>
	</a>

    <div id="content">     
        <div id="scr_content">          
            <div class="videoContainer">
                <!-- video -->
                <video id="myVideo"  preload="auto" poster="./media/lovestory.jpg" width="1218" height="480" data="0">
                    <source class="video_source" src="./media/lovestory.mp4" type="video/mp4"></source>
                    <p>Your browser is not support the video~</p>
                </video>
                <!-- img_select -->
                <div class="img_select">
                    <div class="img_output"></div>
                    <div class="img_save"><a href="" target="_blank"><i></i>保存</a></div>
                    <div class="img_cancel"><a href="" title="返回"><i></i>返回</a></div>
                </div>
                <!-- caption -->
                <div class="caption">Taylor Swift: 《Love Story》</div>
                <!-- control -->
                <div class="control">
                    <div class="topControl">
                        <div class="progress">
                            <span class="bufferBar"></span>
                            <span class="timeBar"></span>
                            <span class="time_handle"></span>
                            <span class="time_tip"></span>
                        </div>
                    </div><!--topControl-->

                    <div class="btmControl">
                        <div class="btnPlay btn" title="播放/暂停视频"></div>
                        <div class="btnSound">
                            <div class="sound sound2 btn" title="静音"></div>
                            <div class="volume" title="音量">
                                <span class="volume_wrap"><span class="volumeBar"></span></span>
                            </div>
                        </div>
                        <div class="time">
                            <span class="current"></span> / 
                            <span class="duration"></span> 
                        </div>

                        <div class="btnFS btn" title="全屏"></div>
                        <div class="btnLoop btn" title="循环播放"></div>
                        <div class="btnLight lighton btn" title="关灯"><div class="light_btn"></div></div>
                        <div class="img_btn btn" title="截图"></div>
                    </div><!--btnControl-->

                </div><!--control-->
                <div class="loading"> 
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div> <!--loading-->

                <!-- prev_next -->
                <div class="video_prev"></div>
                <div class="video_next"></div>

            </div>
        </div><!--src_content-->
        
        <div id="list">
        	<?php include("list.php");?>
            <div id="quxian"><a href="#"></a></div> 
        </div><!--sidebar-->

    </div><!--content-->
<div id="footer">©轩枫阁 2013</div>
</body>

</html>