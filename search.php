<!DOCTYPE HTML>
<html>
<head>
	<title>Paathshaala Search</title>
	<?php
		include 'source.php';
		echo $header;
	?>
	<link rel="stylesheet" href="css/video.css" />
	<link rel="stylesheet" href="css/search.css" />
</head>
<body>
<div id='topbar'></div>
<img src="pics/load.gif" id='loading' style='display:none;'>
<div id='container'>
<?php
	echo $topBar;
	echo $feedback; 
?>
<div class='mainLeft'>
	<span class='smallSubtitle'>Search Results</span>
	<div id=findStuff></div>
	<div id='ShowNext'> Show more results.</div>
	<div id=next></div>
</div>
<div class='mainRight'>
</div>
</div><!-- /container -->
<?php
	echo $bottomBar;
	echo $scripts;
	echo $piwik; 
?>
<script src='js/search.js' type='text/javascript' ></script>
<script type='text/javascript'>
$(document).ready(function() {
	var q = getUrlVars()['q'];
	var tag = getUrlVars()['tag'];
	update( q , tag ,++activePage);
});
</script>
</body>
</html>

