<?php

	include_once '../functions/interface.php';
	include_once '../functions/class.user.php';
	include_once '../functions/class.video.php';
	if(isset($_GET['sid'])){
		echo getRelatedSeriesJson($_GET['sid']);
	}
	

?>
