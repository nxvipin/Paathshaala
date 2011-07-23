<?php
	/**
	* Processes user login and redirects back to page.
	*/
	
	include_once '../functions/class.user.php';
	include_once '../functions/class.activity.php';
	$status=array();
	if(user::checkEmailExists($_POST['ufullname'])==1){
		$status['status']=2;
		return json_encode($status);
	}
	else{
		$u = new user($_POST['uname'],$_POST['upass'],$_POST['ufullname'],$_POST['uroll'],$_POST['uemail']);
		if(!$u){
			$status['status']=0;
			exit;
		}
		else{
			activity::login($_POST['uname'],$_POST['upass']);
			header("Location: ../profile.php");
		}
	}

?>
