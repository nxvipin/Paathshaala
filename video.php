<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala Video</title>
<?php
	include 'source.php';
	include 'functions/ui.php';
	echo $header;
?>
<link rel='stylesheet' href='css/video-js.css'>
<link rel='stylesheet' href='css/video.css'>
</head>
<body>
<div id='topbar'></div>
<img src="pics/load.gif" id='loading'/ style='display:none;'>
<div id='container'>
	<?php	echo $topBar;
			echo $feedback; ?>
	<div class='mainLeft'>
	<div class='videodiv'></div>
	<?php
		if(isset($_GET['video'])){
			echo "<span class='smallSubtitle'>Comments</span>";
			echo "<div class='commentWarp'></div>";
			echo $commentSubmit;
		} else {
			echo "Content not found :-(";
		}
	?>
	</div> <!--/ main left -->
	<div class='mainRight'><!-- main right --></div> 
</div><!-- /container -->
<?php
	echo $bottomBar;
	echo $scripts;
	echo $piwik; 
?>
<script src='js/video.js' type='text/javascript'></script>
<script src='js/comment.js' type='text/javascript'></script>
<script type='text/javascript'>

function getActiveUser() {
	<?php echo "return \"" .$_SESSION['uid']. "\"" ; ?> ;
}

$(document).ready(function() {
	Paathshaala.getVideo( <?php echo $_GET['video'] ?> );
	/* Function calls to update the comments */
	updateComment("/couch/comments/_design/comments/_view/commentbycid?key=\"<?php echo $_GET['video']; ?>\"");
	getNewComment(function(changes){
		//alert(changes.results[0].id);
		updateComment("/couch/comments/_design/comments/_view/commentbyid?key=\""+changes.results[0].id+"\"");
	});
});

</script>
</body>
</html>

