<?php
	
	include '../functions/class.video.php';
	global $global_user_folder;
	$v = new video($_POST['title'],$_POST['desc'],$_SESSION['uid'],"SP",$global_user_folder,$_POST['file']);
	$v->addTags($_POST['tags']);
	
?>
