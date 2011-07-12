<?php
	/**
	* Logs out a user and redirects him to root.
	*/
	include_once '../functions/class.activity.php';
	activity::logout();
	header("Location: /");

?>
