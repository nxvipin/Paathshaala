<!DOCTYPE HTML>
<html>
<head>
<title>Paathshaala Profile</title>

<?php

	include 'source.php';
	echo $header;
?>
<link rel='stylesheet' href='css/profile.css'>
<link rel='stylesheet' href='css/storybox.css'>


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
		<img src='pics/me.png' style='width: 100%;' />
		<span id='picUname'> Jaseem Abid </span>
	</div>
	
	<div id='profileInfo'>
		I am : <span id=''>Jaseem Abid </span><br />
		here I am called : <span id='profileUsername'>jaseemabid</span><br />
		Insti Roll : b090264cs (Helps us to give you better suggestions )<br />
		One word to describe me : JavaScript Ninja <br />
	</div>
	
</div>



</div><!-- /container -->

<?php echo $bottomBar; ?>
<div id="bottombar"></div>
<script src='js/ui.js' type='text/javascript' ></script>
<script src='js/likedVideos.js' type='text/javascript' ></script>

</body>
</html>
