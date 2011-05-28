<?php
/**
* 
* Content class.
* @author Greg Beaver <cellog@php.net>
* @version 1.0
* @package content
*/

include 'dbconnect.php'
class content
{
	private $cid;
	function _construct()
	{
		
	}
	function _construct($cid)
	{
		
	}
	/**
	*/
	function ifexists($cid)
	{
		$cid=pg_escape_string($cid);
		$sql="Select cn_id from content where cn_id=$cid";
		return pg_num_rows(dbquery($sql));
	}
		
}
?>
