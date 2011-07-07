<?php
	/**
	* The user ID is retrieved from a GET variable uid. Once sessions are implemented,
	* User ID should be retrieved from session of current user. 
	*/
	include_once '../functions/class.content.php';
	include_once '../functions/class.video.php';
	include_once '../functions/class.user.php';
	include_once '../functions/interface.php';
	$uid=$_GET['uid'];
	echo getUserVideoLikesJson($uid,1);
	
?>
