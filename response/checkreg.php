<?php
	/**
	* Check if Username OR Email already exists and returns the status as JSON.
	* Called via AJAX during new user registration process.
	*/
	
	include_once '../functions/class.user.php';
	$status=array();
	if(isset($_POST['username'])){
		$status['status']=user::checkUsernameExists($_POST['username']);
		echo json_encode($status);
	}
	else if(isset($_POST['email'])){
		$status['status']=user::checkEmailExists($_POST['email']);
		echo json_encode($status);
	}	
	

?>
