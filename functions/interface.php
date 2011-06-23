<?php
/**
* Interface functions are the functions that send/recieve data from the user interface.
* All interface functions MUST be defined here.
* @author Vipin Nair <swvist@gmail.com>
* @author Jaseem Abid <jaseemabid@gmail.com>
* @copyright Copyright (c) 2011, Vipin Nair & Jaseem Abid
* @license http://www.gnu.org/licenses/gpl.html GNU General Public License 
* @package general
*/

/**
* Includes files to access content and users.
*/
include_once 'functions/class.video.php';
include_once 'functions/class.user.php';

/**
* Returns JSON string containing all video details.
* @param integer $cid Content ID of the video.
* @return string JSON String 
*/
function getVideoJson($cid)
{
	$v=new video($cid);
	$json=array(
			"cid"=>$v->getContentId(),
			"title"=>$v->getTitle(),
			"desc"=>$v->getDesc(),
			"tags"=>$v->getTags(),
			"timestamp"=>$v->getTimestamp(),
			"viewcount"=>$v->getViewCount(),
			"status"=>$v->getStatus(),
			"path"=>$v->getCompletePath(),
			"poster"=>$v->getPoster(),
			"uid"=>$v->getUserId(),
			"uname"=>user::getFullNameS($v->getUserId())
			);
	return json_encode($json);
}
?>
