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

div#ShowNext {
width:100%;
height:40px;
padding-top:10px;
margin-top:20px;
text-align: center;
color:#555555;
background:#f0f0f0;
background:-webkit-gradient(linear, left top, left bottom, from(#efefef), to(#f9f9f9));
background:-moz-linear-gradient(center top , #efefef 0%, #F1F2F2 33.3333%, #f9f9f9 100%) repeat scroll 0 0 transparent;
-webkit-box-shadow: 0 0 5px 3px #000910;
-webkit-box-shadow: 0 0 5px 2px #999999 inset;
box-shadow: 0 0 5px 3px #000910;
box-shadow: 0 0 5px 2px #999999 inset;
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
