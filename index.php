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
	<div class="indexMesssage">
		Paathshaala developer meetup ! Venue : CSED 301. Monday Oct 3 05:00 PM.
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
</body>
</html>

