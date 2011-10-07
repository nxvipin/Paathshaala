<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala</title>
<?php
	include 'source.php';
	echo $header;
?>
</head>
<body>
<div id='topbar'></div>
<div id='container'>
	<?php	echo $topNotLoggedIn;
			echo $feedback; ?>
	<div id="indexMesssage">
	We pay our tribute to our <a href="video.php?video=261"><em>inspiration</em></a>. RIP Steve Jobs (February 24, 1955 – October 5, 2011).<span id="cross" class="news">X</span>
	</div>
</div><!-- /container -->
<?php	echo $bottomBar; ?>
<div id="bottombar"></div>
<script type="text/javascript">
$(document).ready(function() {
	updateStoryBox('Featured')
	updateStoryBox('Popular')
	updateStoryBox('TopRated')
});
</script>
<script src='js/ui.js' type='text/javascript'></script>
<?php	echo $piwik; ?>
</body>
</html>

