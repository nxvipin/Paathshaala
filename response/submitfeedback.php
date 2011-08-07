<?php
	/**
	* Submits user feedback to the database.
	*/
	session_start();
	include_once '../functions/class.activity.php';
	$uid=0;
	if($_SESSION['uid']){
		$uid=$_SESSION['uid'];
	}
	$res=activity::feedback($_SERVER['REMOTE_ADDR'],$uid,$_POST['type'],$_POST['desc']);
	if($res){
		$status=array();
		$status['status']="Thanks for the feedback.";
		echo json_encode($status);
	}

?>
