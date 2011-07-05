<?php
	include_once '../functions/class.content.php';
	include_once '../functions/class.video.php';
	include_once '../functions/class.user.php';
	include_once '../functions/interface.php';
	echo getTagSearchJson($_GET['tag'],$_GET['p']);
	
?>
