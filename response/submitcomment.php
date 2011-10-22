<?php

	/**
	* Submits the comment to CouchDB.
	*/
	include_once '../functions/class.comment.php';
	session_start();
	if(isset($_SESSION['uid']) && isset($_POST['comment']) && isset($_POST['cid'])){
		$_POST['uid']=$_SESSION['uid'];
		$_POST['uname']=$_SESSION['username'];
		$_POST['timestamp']= date("Y-m-d H:i:s+0530");
		$c = new comment();
		echo $c->post($_POST);
	}

?>
