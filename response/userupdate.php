<?php
	/**
	* User info update.
	*/
	include_once '../functions/functions.php';
	include_once '../class.user.php';
	if(checkSession()){
		if(isset($_POST['oldPassword']) && isset($_POST['newPassword'])){
			return user::updatePass($_SESSION['uid'],$_POST['oldPassword'],$_POST['newPassword']);
		}
		if(isset($_POST['fname']) && isset($_POST['email']) && isset($_POST['roll'])){
			return user::updateInfo($_SESSION['uid'], $_POST['fname'], $_POST['roll'], $_POST['email']);
		}
	}
	else{
		redirect();
	}
?>
