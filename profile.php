<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala Profile</title>

<?php

	include_once 'source.php';
	include_once 'functions/functions.php';
	include_once 'functions/class.user.php';
	if(!checksession()){
		redirect();
	}
	else{
		$u = new user ($_SESSION['uid']);
	}
	echo $header;
?>
<link rel='stylesheet' href='css/profile.css'>
<script src='js/myvideos.js' type='text/javascript' ></script>
<script src="js/storybox.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function() {
	updatemyVideos();
	updateStoryBox('Liked');
	updateStoryBox('Disliked');
});
</script>


</head>
<body>
<div id='topbar'></div>
<div id='feedback'></div>
<img src="pics/load.gif" id='loading'/ style='display:none;'>
<div id='container'>
<?php echo $topNotLoggedIn; ?>

<div id='editProfile'></div>

<div id='profileBox'>
	<img id='editProfileButton' src='pics/settings.png'/ >
	<div id='snapShot'>
		<img src="<?php echo $u->getUserPicture(); ?>"/>
		<div id='picUname'><?php echo $_SESSION['fullname']; ?> </div>
	</div>
	
	<div id='profileInfo'>
		I am : <span id=''><?php echo $u->getFullname(); ?></span><br />
		email : <?php echo $u->getEmail(); ?> <br />
		here I am called : <span id='profileUsername'><?php echo $u->getUsername(); ?></span><br />
		Insti Roll : <?php echo $u->getRoll(); ?> (Helps us to give you better suggestions )<br />
	</div>
	
</div>



</div><!-- /container -->

<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src='js/ui.js' type='text/javascript' ></script>
</body>
</html>
