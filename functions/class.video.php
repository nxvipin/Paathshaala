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
	
	public function _construct($cid)
	{
		$this->cid=$cid;
		
	}
	public function getDetails()
	{
		$sql="Select cn_title from content_video where cn_id='2'";
		$res=dbquery($sql);
		$vid=pg_fetch_assoc($res);
		$this->title=$vid['cn_title'];
	}
	
}

?>
