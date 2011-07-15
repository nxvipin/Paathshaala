<?php
	/**
	* Processes user login and redirects back to page.
	*/
	
	include_once '../functions/class.user.php';
	include_once '../functions/class.activity.php';
	
	$u = new user($_POST['uname'],$_POST['upass'],$_POST['ufullname'],$_POST['uroll'],$_POST['uemail']);
	activity::login($_POST['uname'],$_POST['upass']);
	header("Location: profile.php");

?>
