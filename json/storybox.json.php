<?php
	/**
	* Returns a combined storybox JSON
	*/
	
	include_once '../functions/class.content.php';
	include_once '../functions/class.video.php';
	include_once '../functions/class.user.php';
	include_once '../functions/interface.php';
	
	if(!isset($_GET['fcount']))
		$_GET['fcount']=4;
	if(!isset($_GET['tcount']))
		$_GET['tcount']=4;
	if(!isset($_GET['pcount']))
		$_GET['pcount']=8;
	
	echo getCombinedStoryBoxJson($_GET['fcount'], $_GET['tcount'], $_GET['pcount']);
	
?>
