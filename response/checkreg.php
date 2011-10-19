<?php
	/**
	* Check if Username OR Email already exists and returns the status as JSON.
	* Called via AJAX during new user registration process.
	*/
	
	include_once '../functions/class.user.php';
	$status=array();
	if(isset($_GET['username'])){
		$status['status']=user::checkUsernameExists($_GET['username']);
		echo json_encode($status);
	}
	else if(isset($_GET['email'])){
		$status['status']=user::checkEmailExists($_GET['email']);
		echo json_encode($status);
	}
	else if(isset($_GET['roll'])){
		$status['status']=user::checkRollExists($_GET['roll']);
		echo json_encode($status);
	}

?>
