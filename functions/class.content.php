<?php
/**
* Content class is the base class of various specific content classes (eg: video)
* All functions that deal with abstract content are packaged in this class. Any function handling abstract content MUST be packaged here. 
* Specific content must be packaged in its own class.
* @author Vipin Nair <swvist@gmail.com>
* @author Jaseem Abid <jaseemabid@gmail.com>
* @copyright Copyright (c) 2011, Vipin Nair & Jaseem Abid
* @license http://www.gnu.org/licenses/gpl.html GNU General Public License 
* @package content
*/

/**
* Includes files for database connectivity.
*/

include 'functions.php';

/**
* Content class. Defined as abstract and is a reference implementation for specific content classes.
* @package content
*/
abstract class content
{
	
	protected $cid,$title,$desc,$timestamp,$uid,$status,$views,$seriesid,$order;
	
	public function _construct($cid)
	{
		$this->cid=$cid;
	}
	public function getContentId()
	{
		return $this->cid;
	}
	public function getTitle()
	{
		return $this->title;
	}
	public function getDesc()
	{
		return $this->desc;
	}
	public function getTimestamp()
	{
		return $this->timestamp;
	}
	public function getStatus()
	{
		return $this->status;
	}
	public function getViewCount()
	{
		return $this->views;
	}
	public function getUserId()
	{
		return $this->uid;
	}
	public function getSeries()
	{
		return $this->seriesid;
	}
	public function getOrder()
	{
		return $this->order;
	}
	/**
	* Returns the content tags as an array. Tag name is pulled from tag ID internally.
	* A separate method MUST be defined if tag name is to be generated from tag id,
	* alter the below code accordingly to incorporate the new method.
	* @return array Returns array of tags for given content.
	*/
	public function getTags($cid)
	{
		$sql="(Select tg_name from tags where tg_id in (Select ct_tagid from content_tags where ct_contentid='".$cid."'))"; 
		return resource2array(dbquery($sql));
	}
	
	/**
	* Accepts a CSV string of tags for a content and adds it to tha database.
	* TODO: Optimize the function to execute one SQL query.
	* @param string $tags CSV tags for a content.
	*/
	public function addTags($tags)
	{
		$tagarray = csv2array(pg_escape_string($tags));
		for($i=0;$i<count($tagarray);$i++)
		{
			$sql= "Insert into content_tags(ct_contentid, ct_tagid) values('".$this->cid."','".createTag($tagarray[$i])."')";
			dbquery($sql);
		}
	}
	
	/**
	* Increases the view count number whenever the video is loaded.
	*/
	public function addViewCount()
	{
		$sql="update content set cn_views=cn_views+1 where cn_id='".$this->cid."'";
		dbquery($sql);
	}
	
	/**
	* If the content is part of a series, it  returns the Series ID, otherwise null.
	* Data is fetched form the database.
	*/
	public function fetchSeries()
	{
		$sql="Select cs_order, cs_seriesid from content_series where cs_contentid='".$this->cid."'";
		$series=pg_fetch_assoc(dbquery($sql));
		$this->seriesid=$series['cs_seriesid'];
		$this->order=$series['cs_order'];
	}
	
	/**
	* Returns all the Content ID's in the series to whcih the current content belongs.
	* @return array Array of all Content ID's which belong to the series of current content.
	*/
	public function getCompleteSeries()
	{
		$sql="Select cs_contentid from content_series where cs_seriesid='".$this->seriesid."'";
		return resource2array(dbquery($sql));
	}
	
}

?>
