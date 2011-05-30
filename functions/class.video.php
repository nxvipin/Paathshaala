<?php
/**
* Video content class. Functions/Methods dealing with video MUST be packaged here.
* Specific content must be packaged in its own class. Video class is directly inherited from content class.
* @author Vipin Nair <swvist@gmail.com>
* @author Jaseem Abid <jaseemabid@gmail.com>
* @copyright Copyright (c) 2011, Vipin Nair & Jaseem Abid
* @license http://www.gnu.org/licenses/gpl.html GNU General Public License 
* @package content
*/

/**
* Includes Base class content
*/
include 'class.content.php';
/**
*  
*/
class video extends content
{
	protected $serverid, $path, $file;
	
	public function __construct($cid)
	{
		$this->cid=$cid;
		$this->getDetails();
	}
	protected function getDetails()
	{
		$sql="Select * from content_video where cn_id='".$this->cid."'";
		$res=dbquery($sql);
		$vid=pg_fetch_assoc($res);
		$this->title=$vid['cn_title'];
		$this->desc=$vid['cn_desc'];
		$this->timestamp=$vid['cn_timestamp'];
		$this->status=$vid['cn_status'];
		$this->views=$vid['cn_views'];
		$this->uid=$vid['cn_uid'];
		$this->serverid=$vid['cf_serverid'];
		$this->path=$vid['cf_path'];
		$this->file=$vid['cv_file'];
	}
	protected function getServer()
	{
		if($this->serverid=="SP")
			return "http://192.168.5.27";
	}
	public function getCompletePath()
	{
		return $this->getServer()."/".$this->path."/".$this->cid.$this->file.".ogv";
	}
}

?>
