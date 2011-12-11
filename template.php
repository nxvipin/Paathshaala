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
<?php
	echo $topBar;
	echo $feedback; 
?>
</div><!-- /container -->
<?php
	echo $bottomBar;
	echo $scripts;
	echo $piwik; 
?>
</body>
</html>

