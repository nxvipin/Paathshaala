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
	
	public $cid,$title,$desc,$timestamp,$uid,$status,$views;
	
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
	public function getViews()
	{
		return $this->views;
	}
	public function getUserId()
	{
		return $this->uid;
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
	
	
	
	
}

?>
