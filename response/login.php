<?php
	/**
	* Processes user login and redirects back to page.
	*/
	
	include_once '../functions/class.activity.php';
	activity::login($_POST['uname'],$_POST['pass']);
	header("Location: ".$_POST['page']."");

?>
