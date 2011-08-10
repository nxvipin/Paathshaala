<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala Intro</title>

<?php

	include 'source.php';
	echo $header;
?>

</head>
<body>
<div id='topbar'></div>
<img src="pics/load.gif" id='loading'/ style='display:none;'>


<div id='container'>
	<?php	echo $topNotLoggedIn;
			echo $feedback; ?>

<div class='mainLeft'>

<span style='font-size:20px;'>Information & Frequently Asked questions</span>

<p class='q'>What is Paathshaala?</p>
<p class='ans'>Paathshaala is a platform to share educational videos and resources, we are aiming to develop a very interactive educational portal.</p>


<p class='q'>Sharing videos? Emmm.. so how is this different from YouTube?</p>
<p class='ans'>This work will be available over NITC lan only due to content copy right issues. Unlike YouTube, Paathshaala will focus more on academic related content than general videos.Also this is an open source project,anybody who wants to contribute to the project is welcome to do so.</p>

<p class='q'>Why doesn't this website work for me?</p>
<p class='ans'>This is a work under beta stage; there can be bugs, so please cooperate with us.Please post a
 <a href='feedback.php' class='text'>feedback</a>, if you face any problem. Feedback will help us to improve the overall quality of the work. If your problem is inability to play the videos, please go through this <a href='http://en.wikipedia.org/wiki/Wikipedia:Media_help_%28Ogg%29' class='text'> article</a> by wikipedia on playing ogg container files.</p>


<p class='q'>How is this made?</p>
<p class='ans'>This page is made using the latest web technologies and standards like HTML5 and CSS3, developed from scratch.</p>


<p class='q'>What are the software and tools used?</p>
<p class='ans'>This project is a complete foss project , all software and tools used are free and open source.

<ul class='ans sw' >
<li>Server : HP Prolient DL 385 G5p , running on Ubuntu 10.04 LTS.</li>
<li>Programming languages and tools: php5, html5, CSS3, javascript,ajax, jquery, SQL, XML etc.<br/></li>
<li>Database : PostgreSQL 8.4.7.<br/></li>
<li>Webserver:Apache web server 2.<br/></li>
<li>Video conversion: ffmpeg and ffmpeg2theora.<br/></li>
<li>Video thumbnail generation: totem-video-thumbnailer.<br/></li>
<li>CSS and JS Optimisation:csstidy , yui-compressor.<br/></li>
<li>Design:Gimp , firebug.<br/></li>
<li>Analysis:yslow plugin, gnome-system-monitor, mausezahn.<br/></li>
</ul>

</p>


<p class='q'>Why do I have to upgrade my browser to view the content?</p>
<p class='ans'>We are using the latest standards; your browser may not support all the features completely, if not upgraded. the main requirement is the ability of the browser to play videos using theora codec.</p>


<p class='q'>Why is IE not supported?</p>
<p class='ans'>We believe that IE is the least updated browser and thus doesn’t support the latest web technologies. Please have a look at this <a href='http://www.findmebyip.com/litmus/' class='text'>page </a>for an overview on your browser and also to know why IE is not supported. One main issue is that IE cant handle theora, vorbis codecs.</p>


<p class='q'>Do I need to install any plug-ins to play videos?</p>
<p class='ans'>No, we use the an open source format called ogv which allow us to play videos in the native HTML5 player in the web browser. You wont even need adobe flash player. May be this will be the first video you may play on web without flash player.</p>


<p class='q'>Who is building this?</p>
<p class='ans'>Please visit our credits page for a full list of <a href='credits.php' class='text' >contributors</a> of the project.</p>


<p class='q'>What system requirements are needed to watch videos on Paathshaala?</p>
<p class='ans'>Any normal computer in NITC must be able to play videos in this website. You will need a modern web browser like Firefox 3.6+, Google Chrome 9+, or Opera 10.63+, Native support for theora, vorbis codecs. <a href='http://fmbip.com/#target-selector' class='text' > Test your browser.</a>Internet Explorer cant play theora videos, so we are not supporting the project for IE now. Any computer which can run the above must be able to play the videos.</p>


<p class='q'> What's this Theora, Vorbis etc? I have never used this before I guess. Why cant you guys use avi mp4 or something?</p>
<p class='ans'>There was no standard way of playing video on the web before html5 [Yeah, I'm not kidding ]. Every video played on web used one of the proprietary codecs like Apple quick time or Adobe flash player.Playing avi or mp4 will need some codec like that, so we went for these formats. This is not really an odd idea which just came up with, we just found out wikipedia is just doing the same thing. View their <a href='http://en.wikipedia.org/wiki/Wikipedia:Media_help' class='text'> article</a> explaining why they use ogg, we have the same reasons to say.</p>


<p class='q'>How can I contribute / help?</p>
<p class='ans'>Promote this page among your friends and help us with more visitors and quality feedback.<br/>
We have thousands of videos in our archive with us.The site database is under construction with these videos.The primary help you can do is to help us organise content. Please visit <a href='contribute.php' class='text'>Contribute page</a>, select a video, watch it and submit the form associated with it. This will add the content to the custom built database which will enable searching and ordering of the content later. Even if you don't want to help, please don't mess up, just ignore the page. May be some day, this whole project will be useful to you. You may search and a find a javascript tutorial or a cad demonstration which you contributed.<br/>
You may even help us with html, php or CSS development. Feel free to give us a <a href='feedback.php' class='text'> feedback</a> and we will get back to you.<br/>
Got a kick ass idea? just <a href='feedback.php' class='text'>tell us</a></p>


<p class='q'>So, if I have a good video how can I share it here?</p>
<p class='ans'>You cannot add any videos now, we have a lot of videos with us now,first we have to organise that and then you will be notified. This project is under construction.We will scale this project with more functionalities and features later like uploading user videos.We aim to build this like wikipedia, contribution from the community will keep the portal active. But now there is a huge probability that you are wanting to share a video which we already have.You can get a login and publish the videos in our database.Anybody with a login can add proper title , description and tags and publish a video , and your name will come up in our <a href='credits.php' class='text' >contributors</a> page also.</p>


<p class='q'>So i would love to work , can i have a login ?</p>
<p class='ans'>Please join our <a href='http://groups.google.com/group/paathshaala_tuw' class='text'> mailing list</a> for details. If you have any trouble , please contact Paul Alex. Mail : paul.alex.pax@gmail.com Mob : +91 81291 65 789.</p>

<p class='q'>I want to know something which is not here. What do I do?</p>
<p class='ans'>Join our <a href='http://groups.google.com/group/paathshaala_tuw' class='text'> mailing list</a> or <a href='feedback.php#question' class='text'>ask a question</a>.</p>

</div>

<div class='mainLeft'>
</div>

</div><!-- /container -->

<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src='js/ui.js' type='text/javascript' ></script>
</body>
</html>

