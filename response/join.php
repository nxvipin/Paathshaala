<?php
	/**
	* Processes user login and returns status.
	*/
	
	include_once '../functions/class.user.php';
	include_once '../functions/class.activity.php';
	$status=array();
	$u = new user($_GET['username'],$_GET['pass2'],$_GET['fname'],$_GET['roll'],$_GET['email']);
	if(!$u){
		$status['status']=0;
		echo json_encode($status);
		exit;
	}
	else{
		$status['status']=1;
		echo json_encode($status);
	}

?>
