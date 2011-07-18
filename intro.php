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
	<?php echo $topNotLoggedIn; ?>
</div><!-- /container -->
<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src="js/ui.js" type="text/javascript"></script>
<script src="js/storybox.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function() {

	updateStoryBox( 'Featured' , 4)
	updateStoryBox( 'Popular' , 8)
	updateStoryBox( 'TopRated' , 4)
});
</script>
</body>
</html>
