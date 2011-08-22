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
<img src="pics/load.gif" id='loading' style='display:none;'>
<div id='container'>
	<?php	echo $topNotLoggedIn;
			echo $feedback; ?>
</div><!-- /container -->

<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src='js/ui.js' type='text/javascript' ></script>
</body>
</html>

