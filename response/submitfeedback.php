<?php
	/**
	* Submits user feedback to the database.
	*/
	session_start();
	include_once '../functions/class.activity.php';
	$uid=0;
	if(isset($_POST['type']) && isset($_POST['desc'])){
		if(isset($_SESSION['uid'])){
			$uid=$_SESSION['uid'];
		}
		$res=activity::feedback($_SERVER['REMOTE_ADDR'],$uid,$_POST['type'],$_POST['desc']);
		if($res){
			echo "Thanks for the feedback.";
		}
	}
	

?>
