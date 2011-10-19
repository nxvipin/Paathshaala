<?php
	/**
	* Accepts Content likes from front end and stores in database.
	*/
	session_start();
	include '../functions/class.activity.php';
	$cid=$_POST['cid'];
	$value=$_POST['value'];
	$uid=$_SESSION['uid'];
	if($uid && $value && $cid){
		activity::like($cid,$uid,$value);
	}
?>
