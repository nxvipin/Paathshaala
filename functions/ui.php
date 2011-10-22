<?php
/**
* Temporary UI functions that return HTML code are defined here. These functions
* will be removed soon. Corresponding getJson method should be called instead and 
* the JSON must parsed at the front end.
* All function the return HTML code MUST be defined here.
* @author Vipin Nair <swvist@gmail.com>
* @author Jaseem Abid <jaseemabid@gmail.com>
* @copyright Copyright (c) 2011, Vipin Nair & Jaseem Abid
* @license http://www.gnu.org/licenses/gpl.html GNU General Public License 
* @package general
*/

/**
* Includes files to access content and users.
*/

include_once  'class.video.php';
include_once 'class.user.php';

/**
* Returns HTML containing all video details.
* @param integer $cid Content ID of the video.
* @return string JSON String 
*/

function getVideoHtml($cid)
{
	$v=new video($cid);
	$tagarray=$v->getTags();
	$c=count($tagarray);
	$tags="";
	for($i=0;$i<$c;$i++)
		$tags.="<li><a href='search.php?tag=".$tagarray[$i]."'>".$tagarray[$i]."</a></li>";
	
	$video= "<span class='videoTitle'>".$v->getTitle()."</span>
	
	<!-- Begin VideoJS -->
		<div class='video-js-box'>
			<video cid='".$v->getContentId()."' poster='".$v->getPoster()."' class='video-js' controls preload height=325 width=550>
			<source src='".$v->getCompletePath()."' type='video/ogg; codecs=\"theora, vorbis\"' />
			</video>
		</div>
	<!-- End VideoJS -->
	
	<!-- video bar -->
	
	<div class='videoBar'>
		<img src='pics/vidbar/watch.png' class='VideoBarButton' /><span class='videoBarElement' id='playCount'>Views:".$v->getViewCount()."</span>
		<span id='likes' defStatus='1' ></span>
		<img src='pics/vidbar/download.png' title='Download' class='VideoBarButton' style='float:right;' id='downloadButton' />
	</div>

	<!-- /video bar -->
	
	<img src='pics/vidbar/tag.png' title='tags' style='margin-left:6px;'/>
	<ul class='tags'>".$tags."</ul>
	<div class='VideoDesc'>".$v->getDesc()."</div>";
	$v->addViewCount();
	return $video;
}



?>
