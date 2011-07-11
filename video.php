<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala Video</title>

<?php

	include 'source.php';
	include 'functions/ui.php';
	echo $header;
?>
<script src='js/video.js' type='text/javascript'></script>
<link rel='stylesheet' href='css/video-js.css'>
<link rel='stylesheet' href='css/video.css'>

<script type='text/javascript'>
$(document).ready(function() {
	VideoJS.setupAllWhenReady();
});

function getActiveUser() {
		<?php echo "return \"" .$_SESSION['uid']. "\"" ; ?> ;
}
</script>
</head>
<body>
<div id='topbar'></div>
<div id='feedback'></div>
<img src="pics/load.gif" id='loading'/ style='display:none;'>

<div id='container'>
<?php echo $topNotLoggedIn; ?>

<!--  -->

	<div class='mainLeft'>

	<?php echo getVideoHtml($_GET['video']); ?>

<span class='smallSubtitle'>Comments</span>
<div class='commentWarp'></div>

<?php echo $commentSubmit; ?>

</div> <!--/ main left -->

<div class='mainRight'>

</div> <!-- /main right -->


</div><!-- /container -->



<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src='js/comment.js' type='text/javascript'></script>
<script src='js/related.js' type='text/javascript'></script>
<script src='js/ui.js' type='text/javascript' ></script>
<script src='js/like.js' type='text/javascript'></script>
</body>
</html>
