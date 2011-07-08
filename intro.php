<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala</title>
<?php
	include 'source.php';
	echo $header;
?>
<link rel="stylesheet" href="css/storybox.css" />
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
	updateFeatured();
	updatePopular();
	updateTopRated();
});
</script>
</body>
</html>
