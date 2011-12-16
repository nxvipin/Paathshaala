<?php
/**
* Interface functions are the functions that send/recieve data from the user interface.
* All interface function and their helper functions MUST be defined here.
* @author Vipin Nair <swvist@gmail.com>
* @author Jaseem Abid <jaseemabid@gmail.com>
* @copyright Copyright (c) 2011, Vipin Nair & Jaseem Abid
* @license http://www.gnu.org/licenses/gpl.html GNU General Public License 
* @package general
*/

/**
* Includes files to access content and users.
*/
include_once 'class.video.php';
include_once 'class.user.php';
include_once 'functions.php';

/**
* Returns JSON string containing all video details.
* @param integer $cid Content ID of the video.
* @param integer $uid User ID of the user who requests the video.
* @return string JSON String 
*/
function getVideoJson($cid,$uid)
{
	$v=new video($cid);
	$v->fetchSeries();
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
			"likestatus"=>($v->getContentId())?user::checkLike($uid,$cid):NULL,
			"sid"=>$v->getSeriesId(),
			"sname"=>$v->getSeriesName(),
			"order"=>$v->getOrder(),
			"uid"=>$v->getUserId(),
			"uname"=>user::getFullNameS($v->getUserId())
			);
	$v->addViewCount();
	return json_encode($json);
}

/**
* Returns search results of $tag keyword as a JSON string.
* @param string $tag Searches the Database for content with the given tag.
* @param integer $page The Page number for search results.
* @return string JSON String containing search results.
*/
function getTagSearchJson($tag,$page)
{
	$contentarray=content::tagSearch($tag,($page*10)-10,10);
	$json=array();
	for($i=0;$i<count($contentarray);$i++)
	{
		$obj = new video($contentarray[$i]);
		array_push($json,array( 'cid'=>$obj->getContentId(),
							'title'=>$obj->getTitle(),
							'viewcount'=>$obj->getViewCount(),
							'poster'=>$obj->getPoster(),
							'timestamp'=>$obj->getTimestamp(),
							'uid'=>$obj->getUserId(),
							'fullname'=>user::getFullNameS($obj->getUserId()),
							'userpic'=>user::getUserPictureS($obj->getUserId())));
	}
	return json_encode($json);
}

/**
* Helper Function. Returs an array(size $count) of the CID's of featured videos 
* @param integer $count The number of videos that should be returned.
* @return array Array of Featured Videos CID's.
*/
function getFeaturedVideoArray($count)
{
	$sql="Select ft_cid from featured limit $count";
	return resource2array(dbquery($sql));
}

/**
* Helper Function. Returs an array(size $count) of the CID's of top rated videos 
* @param integer $count The number of videos that should be returned.
* @return array Array of top rated Videos CID's.
*/
function getTopRatedVideoArray($count)
{
	$sql="Select cn_id from content_video order by cn_likes desc limit $count";
	return resource2array(dbquery($sql));
}

/**
* Helper Function. Returs an array(size $count) of the CID's of most popular videos 
* @param integer $count The number of videos that should be returned.
* @return array Array of Popular Videos CID's.
*/
function getPopularVideoArray($count){
	$sql="Select cn_id from content_video order by cn_views desc limit $count";
	return resource2array(dbquery($sql));
}

/**
* Helper Function. Returns data for each CID in input array as an array
* @param array $contentarray An array of content ID's
* @return array Data for all CID's in input as an array
*/
function getStoryBoxDataArray($contentarray){
	$vcount=count($contentarray);
	$data = array();
	for($i=0;$i<$vcount;$i++)
	{
		$obj=new video($contentarray[$i]);
		array_push($data,array( 'cid'=>$obj->getContentId(),
							'title'=>$obj->getTitle(),
							'viewcount'=>$obj->getViewCount(),
							'poster'=>$obj->getPoster(),
							'timestamp'=>$obj->getTimestamp(),
							'uid'=>$obj->getUserId(),
							'fullname'=>user::getFullNameS($obj->getUserId()),
							'userpic'=>user::getUserPictureS($obj->getUserId())));
	}
	return $data;
}

/**
* Returs a combined JSON for all the story box sections
* Utilizes various helper functions
* @param integer $fcount The number of videos in featured section
* @param integer $tcount The number of videos in toprated section
* @param integer $pcount The number of videos in popular section
* @return string JSON string containing all Storybox data
*/
function getCombinedStoryBoxJson($fcount, $tcount, $pcount){
	$featuredarray	= getFeaturedVideoArray($fcount);
	
	//Remove any featured array content from toprated
	$topratedarray	= getTopRatedVideoArray($tcount+$fcount);
	$topratedarray	= array_values(array_diff($topratedarray, $featuredarray));
	array_splice($topratedarray,$tcount);
	
	//Remove both of the above from popular
	$populararray	= getPopularVideoArray($pcount+$tcount+$fcount);
	$populararray	= array_values(array_diff($populararray,array_merge($featuredarray, $topratedarray)));
	array_splice($populararray,$pcount);
	
	$json = array(	"featured"	=>	getStoryBoxDataArray($featuredarray),
					"toprated"	=>	getStoryBoxDataArray($topratedarray),
					"popular"	=>	getStoryBoxDataArray($populararray));
	return json_encode($json);
}

/**
* Returns liked/disliked videos of a user.
* @param integer $uid User ID
* @param integer $like preference(like:1 , dislike: -1)
* @return string json string with user liked/disliked videos.
*/
function getUserVideoLikesJson($uid,$like)
{
	$sql="Select cl_cid from content_like where cl_uid=$uid and cl_value=$like";
	$contentarray=resource2array(dbquery($sql));
	$json=array();
	$vcount=count($contentarray);
	for($i=0;$i<$vcount;$i++)
	{
		$obj=new video($contentarray[$i]);
		array_push($json,array( 'cid'=>$obj->getContentId(),
							'title'=>$obj->getTitle(),
							'viewcount'=>$obj->getViewCount(),
							'poster'=>$obj->getPoster(),
							'timestamp'=>$obj->getTimestamp(),
							'uid'=>$obj->getUserId(),
							'fullname'=>user::getFullNameS($obj->getUserId()),
							'userpic'=>user::getUserPictureS($obj->getUserId())));
	}
	return json_encode($json);
}

/**
* Returns all videos uplaoded by a user.
* @param integer $uid User ID to get uplaoded videos.
* @return string JSON containing all uploaded video details.
*/
function getUserUploadedVideosJson($uid)
{
	$sql="Select cn_id from content_video where cn_userid=$uid";
	$contentarray=resource2array(dbquery($sql));
	$json=array();
	$vcount=count($contentarray);
	for($i=0;$i<$vcount;$i++)
	{
		$obj=new video($contentarray[$i]);
		array_push($json,array( 'cid'=>$obj->getContentId(),
							'title'=>$obj->getTitle(),
							'viewcount'=>$obj->getViewCount(),
							'poster'=>$obj->getPoster(),
							'timestamp'=>$obj->getTimestamp(),
							'uid'=>$obj->getUserId(),
							'fullname'=>user::getFullNameS($obj->getUserId()),
							'userpic'=>user::getUserPictureS($obj->getUserId())));
	}
	return json_encode($json);
}

/**
* 
* @param
* @return
*/
function getRelatedSeriesJson($sid)
{
	$seriesvideos=content::getCompleteSeries($sid);
	$count=count($seriesvideos);
	$json=array();
	for($i=0;$i<$count;$i++){
		$obj = new video($seriesvideos[$i]);
		array_push($json,array( 'cid'=>$obj->getContentId(),
							'title'=>$obj->getTitle(),
							'viewcount'=>$obj->getViewCount(),
							'poster'=>$obj->getPoster(),
							'timestamp'=>$obj->getTimestamp(),
							'uid'=>$obj->getUserId(),
							'uname'=>user::getFullNameS($obj->getUserId())));
	}
	return json_encode($json);
}

function getNewVideoJson($uname){
	global $global_raw_videos_folder, $global_servers, $global_thumbs_folder;
	$newvid = array(
				"path"	=>	$global_servers["SP"]."/".$global_raw_videos_folder."/".
							getRandomVideo($_SERVER["DOCUMENT_ROOT"]."/".$global_raw_videos_folder),
				"poster"=>	NULL,
				"series"=>	NULL,
				"uname"	=> $uname);
	return json_encode($newvid);
}
?>
