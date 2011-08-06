<?php
	/**
	* Submits user feedback to the database.
	*/
	session_start();
	include_once '../functions/class.activity.php';
	$uid=NULL;
	if(isset($_POST['type']) && isset($_POST['desc'])){
		if(isset($_SESSION['uid'])){
			$uid=$_SESSION['uid'];
		}
		else{
			$uid=0;
		}
		activity::feedback($_SERVER['REMOTE_ADDR'],$uid,$_POST['type'],$_POST['desc']);
	}
	
	

?>
