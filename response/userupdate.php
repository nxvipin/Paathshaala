<?php
	/**
	* User update Script
	*/
	include_once '../functions/functions.php';
	include_once '../class.user.php';
	if(checkSession()){
		if(isset($_POST['oldPassword']) && isset($_POST['newPassword'])){
			return user::updatePass($_SESSION['uid'],$_POST['oldPassword'],$_POST['newPassword']);
		}
	}
	else{
		redirect();
	}
?>
