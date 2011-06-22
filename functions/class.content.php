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
	public function getTags()
	{
		$sql="(Select tg_name from tags where tg_id in (Select ct_tagid from content_tags where ct_contentid='".$this->cid."'))"; 
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
	
	/**
	* Searches for keywords in Title, Description and Tags of a content. 
	* TODO: Multiple keywords not supported yet and does not search in the Name and Description of Series if any.
	* TOMoDO: Improve search.
	* @param string $query Search keyword
	* @return array Array of all Content ID's with the keyword.
	*/
	public static function generalSearch($query, $offset, $limit)
	{
		$sql="select distinct cn_id from content where cn_title ilike '%$query%' OR cn_desc ilike '%$query%' UNION select distinct ct_contentid from content_tags where ct_tagid IN (select tg_id from tags where tg_name ilike '%$query%') order by cn_id Limit $limit Offset $offset";
		return resource2array(dbquery($sql));
	}
	
	/**
	* Searches for content with a given tag.
	* @param string $query Search Tag
	* @return array Array of all Content ID's with the tag.
	*/
	public static function tagSearch($query,$offset,$limit)
	{
		$sql="select distinct ct_contentid from content_tags where ct_tagid IN (select tg_id from tags where tg_name ilike '%$query%') order by ct_contentid Limit $limit Offset $offset";
		return resource2array(dbquery($sql));
	}
	
	/**
	* Searches for a keyword in the content description.
	* @param string $query Search Tag
	* @return array Array of all Content ID's with the tag.
	*/
	public static function descriptionSearch($query,$offset,$limit)
	{
		$sql="select distinct cn_id from content where cn_desc ilike '%$query%' order by cn_id Limit $limit Offset $offset";
		return resource2array(dbquery($sql));
	}
}

?>
