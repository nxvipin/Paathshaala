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
</div><!-- /container -->
<?php	echo $bottomBar; ?>
<div id="bottombar"></div>
<img src='pics/feedback.png' alt='feedback button' title='feedback button' class='feedbackDock' />
<div id='feedback'></div>
<script src="js/ui.js" type="text/javascript"></script>
<script src="js/storybox.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function() {

	updateStoryBox('Featured')
	updateStoryBox('Popular')
	updateStoryBox('TopRated')
});
</script>
</body>
</html>
