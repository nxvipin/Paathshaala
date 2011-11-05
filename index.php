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
	<?php	echo $topBar;
			echo $feedback; ?>
	<div id="indexMesssage">
	We pay our tribute to our <a href="video.php?video=261"><em>inspiration</em></a>. RIP Steve Jobs (February 24, 1955 – October 5, 2011).<span id="cross" class="news">X</span>
	</div>
</div><!-- /container -->

<?php
	echo $bottomBar;
	echo $scripts;
	echo $piwik; 
?>
<script type="text/javascript">
$(document).ready(function() {
	Paathshaala.updateStoryBox('Featured')
	Paathshaala.updateStoryBox('Popular')
	Paathshaala.updateStoryBox('Top Rated')
});
</script>

</body>
</html>

