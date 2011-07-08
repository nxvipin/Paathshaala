<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala Search</title>

<?php
	include 'source.php';
	echo $header;
?>

<script type='text/javascript'>
$(document).ready(function() {
	var q = getUrlVars()['q'];
	var tag = getUrlVars()['tag'];
	update( q , tag ,++activePage);
});
</script>

<link rel="stylesheet" href="css/video.css" />
<link rel="stylesheet" href="css/search.css" />
</head>
<body>
<div id='topbar'></div>
<div id='feedback'></div>
<img src="pics/load.gif" id='loading'/ style='display:none;'>


<div id='container'>
<?php echo $topNotLoggedIn; ?>

<div class='mainLeft'>

<span class='smallSubtitle'>Search Results</span>

<div id=findStuff></div>
<div id='ShowNext'> Show more results.</div>
<div id=next></div>



</div>

<div class='mainRight'>
</div>


</div><!-- /container -->

<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src='js/ui.js' type='text/javascript' ></script>
<script src='js/search.js' type='text/javascript' ></script>
</body>
</html>
