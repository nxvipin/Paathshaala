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

<span style='font-size:24px; color:#3A75AF'> Contribute to paathshaala</span> <span id="helpTrigger" style='font-size:14px'> [help] </span>

<div id='helpMessage' class='message' style='border:0px; display:none'>
	We have a lot of unpublished videos with us which is not yet searchable. Your contribution will make this video public and useful for others.<i>One small step for a student, one giant leap for student kind.</i><br />
	Please dont mess up !
</div>


	<div class='mainLeft'>
	<div class='videodiv'></div>
	</div> <!--/ main left -->

<div class='mainRight'>



<div class='message' id='helpMessage' >
	Describe video details along
</div>


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
