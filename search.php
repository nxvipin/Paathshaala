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
<style type="text/css" media="screen">

div#next {
width:100%;
height:250px;
top:-250px;
position:relative;
}

div.relatedVideo {
width:100%;
height:80px;
}

div.relatedVideoContent {
width: 525px;
}

</style>




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
<div id='ShowNext' style='width:100%; height:30px; padding:10px 30px'>
	Put a huge show more button here. <br/>
	No need of js in this because it is already in the main next div, just hide it in the end :)
</div>
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
