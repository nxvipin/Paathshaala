<?php
/**
* User class for handling user related functions.
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
* Class user for managing users.
* @package user
*/
class user
{
	private $uid, $uname, $ufullname, $uroll, $uemail;
	
	/**
	* The constructor selects the appropriate function based on the number of
	* arguments and calls the appropriate protected function.
	*/
	public function __construct()
	{
		$a = func_get_args();
		$i = func_num_args(); 
		if($i==1)
			call_user_func_array(array($this,'view'),$a);
		if($i==6)
			call_user_func_array(array($this,'create'),$a);
	}
	
	public function __destruct() { }
	
	/**
	* Initializes the class properties for a given user id.
	* @param integer $uid User ID of a user
	*/
	protected function view($uid)
	{
		$sql="Select us_name, us_fullname, us_rollno, us_email from users where us_id = '$uid'";
		$user=pg_fetch_assoc(dbquery($sql));
		$this->uname=$user['us_name'];
		$this->ufullname=$user['us_fullname'];
		$this->uroll=$user['us_rollno'];
		$this->uemail=$user['us_email'];
	}
	
	public function getUsername()
	{
		return $this->uname;
	}
	
	public function getFullname()
	{
		return $this->ufullname;
	}
	
	public function getRoll()
	{
		return $this->uroll;
	}
	
	public function getEmail()
	{
		return $this->uemail;
	}
}
