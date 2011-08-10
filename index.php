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
<script type="text/javascript">
$(document).ready(function() {
	updateStoryBox('Featured')
	updateStoryBox('Popular')
	updateStoryBox('TopRated')
});
</script>
</body>
</html>

