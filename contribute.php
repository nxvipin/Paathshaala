<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala Contribute</title>

<?php

	include 'source.php';
	include 'functions/ui.php';
	echo $header;
?>
<script src='js/like.js' type='text/javascript'></script>
<script src='js/video.js' type='text/javascript'></script>
<script src="js/parsevideo.js" type="text/javascript"></script>
<link rel='stylesheet' href='css/video-js.css'>
<link rel='stylesheet' href='css/video.css'>

<script type='text/javascript'>
$(document).ready(function() {
	getVideoHtml();
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

	<div class='mainLeft'>
	<div class='videodiv'></div>
	</div> <!--/ main left -->

<div class='mainRight'>

<div class='message' id='warningMessage' style='background:#bdc7d8;'>
	One small step for a student, one giant leap for student kind.
	Please dont mess up ! <br/>
</div>

<div class='message' id='helpMessage' style='display:none;' >
	We are here to help ! Please fill up the form sensibly.
</div>

<span style='font-size:20px;'> Enter new video details </span>

<form class='newVideoSubmit'>

<input type="text" id="title" placeholder="Enter a title for your new video"/>
<input type="text" id="tags" placeholder="Now few comma seperated tags"/>
<textarea id='desc' placeholder="Now add a good description to make this video searchable and useful for others"></textarea>

<div class='newVideoSubmitButton'>
	Submit video to paathshaala :)
</div>
</form>



</div> <!-- /main right -->



</div><!-- /container -->



<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src='js/comment.js' type='text/javascript'></script>
<script src='js/related.js' type='text/javascript'></script>
<script src='js/ui.js' type='text/javascript' ></script>
</body>
</html>
