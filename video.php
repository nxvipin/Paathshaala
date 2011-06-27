<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala Intro</title>

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
		$("time.timeago").timeago();
		$('img.metaImage').error().attr('src','pics/default.png');
	$('.commentBoxText').each(function() { /* Expand parent wrt to child */
		var ht = $(this).height();
		$(this).parent().height(ht);
	});
	var titleHt = $(".video_title").height(); /* Position side title at correct place */
	$("span.sideMainTitle").css({"top" :-titleHt });
});
</script>
</head>
<body>
<div id='topbar'></div>
<div id='feedback'></div>
<img src="pics/load.gif" id='loading'/ style='display:none;'>

<div id='container'>
<?php echo $topNotLoggedIn; ?>


</div><!-- /container -->

<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src='js/ui.js' type='text/javascript' ></script>
</body>
</html>
