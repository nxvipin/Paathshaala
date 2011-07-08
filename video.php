<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala Video</title>

<?php

	include 'source.php';
	echo $header;
?>
<script src='js/video.js' type='text/javascript'></script>
<link rel='stylesheet' href='css/video-js.css'>
<link rel='stylesheet' href='css/video.css'>

<script type='text/javascript'>
$(document).ready(function() {
	VideoJS.setupAllWhenReady();
});
</script>
</head>
<body>
<div id='topbar'></div>
<div id='feedback'></div>
<img src="pics/load.gif" id='loading'/ style='display:none;'>

<div id='container'>
<?php echo $topNotLoggedIn; ?>

<!--  -->

	<div class='mainLeft'>

	<h2 class='videoTitle'>TED Video 156, Paathshaala. HansRosling 2009STED Video 156, Paathshaala</h2>
	
	<!-- Begin VideoJS -->
		<div class='video-js-box'>
			<video cid='666' poster='content/poster.png' class='video-js' controls preload height='325px' width='550px'>
			<source src='content/ted2.ogv' type='video/ogg; codecs='theora, vorbis'' />
			</video>
		</div>
	<!-- End VideoJS -->
	
	<!-- video bar -->
	
	<div class='videoBar'>
		<img src='pics/vidbar/watch.png' class='VideoBarButton' /><span class='videoBarElement' id='playCount'>Views:1,234</span>
		<img src='pics/vidbar/download.png' title='Download' class='VideoBarButton' style='float:right;' id='downloadButton' />
		<img src='pics/vidbar/bug.png' title='Report issue' class='VideoBarButton' style='float:right;' id='bugButton' />
	</div>
	
	
	<!-- /video bar -->
	
	<img src='pics/vidbar/tag.png' title='tags' style='margin-left:6px;'/>
	<ul class='tags'>
		<li><a href=''>lifeexpectancy</a></li>
		<li><a href=''>statistics</a></li>
		<li><a href=''>hiv</a></li>
		<li><a href=''>ted</a></li>
		<li><a href=''>africa</a></li>
		<li><a href=''>tech</a></li>
		<li><a href=''>Science</a></li>
		<li><a href=''>aids</a></li>
		<li><a href=''>poverty</a></li>
		<li><a href=''>visualizations</a></li>
		<li><a href=''>health</a></li>
		<li><a href=''>presentation</a></li>
		<li><a href=''>globalissues</a></li>
		<li><a href=''>mortality</a></li>
		<li><a href=''>disease</a></li>		
	</ul>

	<div class='VideoDesc'>
		Hans Rosling unveils new data visuals that untangle the complex risk factors of one of the world's deadliest (and most misunderstood) diseases: HIV. He argues that preventing transmissions -- not drug treatments -- is the key to ending the epidemic.
	</div>

<span class='smallSubtitle'>Comments</span>
<div class='commentWarp'></div>

<?php echo $commentSubmit; ?>

</div> <!--/ main left -->

<div class='mainRight'>

</div> <!-- /main right -->


</div><!-- /container -->



<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src='js/comment.js' type='text/javascript'></script>
<script src='js/related.js' type='text/javascript'></script>
<script src='js/ui.js' type='text/javascript' ></script>



</body>
</html>
