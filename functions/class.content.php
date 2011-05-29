<?php
/**
* Content class.
* All functions that deal with abstract content are packaged in this class. Any function handling abstarct content MUST be packaged here. 
* Specific content must be packaged in its own class.
* @package content
*/

include_once 'database.php';
class content
{
	protected $cid;
	
	/**
	* Constructor to initialize a content object.
	* @param integer $cid Content ID with which the object is initialized
	*/
	public function _construct($cid)
	{
		$this->cid=$cid;
	}
		
	/**
	* 
	* @param
	* @return
	*/
	
	protected function getdetails()
	
	
	/**
	* Check if a content exists for a given content id.
	* @param integer $cid Content ID
	* @return integer Returns 1 if exist and copies the content id into private variable $cid, 0 otherwise.
	*/
	public function ifexists($cid)
	{
		$this->cid=pg_escape_string($cid);
		$sql="Select cn_id from content where cn_id=$cid";
		if(pg_num_rows(dbquery($sql)))
			return 1;
		else
			return 0;			
	}	
}
?>
