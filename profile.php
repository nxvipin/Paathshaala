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
	} else {
		$u = new user ($_SESSION['uid']);
	}
	echo $header;
?>
<link rel='stylesheet' href='css/profile.css'>
</head>
<body>
<div id='topbar'></div>
<img src="pics/load.gif" id='loading' style='display:none;'>
<div id='container'>
<?php	echo $topBar;
		echo $feedback; 
?>
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
		Insti Roll : <?php echo $u->getRoll(); ?> (Helps us to give you better suggestions)<br />
	</div>
</div>

</div><!-- /container -->
<?php
	echo $bottomBar;
	echo $scripts;
	echo $piwik; 
?>
<script type="text/javascript">
$(document).ready(function() {
	updateStoryBox('Uploads');
	updateStoryBox('Liked');
	updateStoryBox('Disliked');
});
</script>
</body>
</html>
