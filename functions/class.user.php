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

include_once 'functions.php';

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
		if($i==5)
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
		$this->uid=$uid;
		$this->uname=$user['us_name'];
		$this->ufullname=$user['us_fullname'];
		$this->uroll=$user['us_rollno'];
		$this->uemail=$user['us_email'];
	}
	
	/**
	* Function to create a new user. The generated User ID is stored in the property uid.
	* @param string $uname Username of the username
	* @param string $upass Password of the user which is encrypted using sha1()
	* @param string $ufullname Full Name of the user.
	* @param string $uroll Register number of the user.
	* @param string $uemail Email ID of the user
	*/
	protected function create($uname, $upass, $ufullname, $uroll, $uemail)
	{
		global $global_salt;
		$this->uname=pg_escape_string($uname);
		$this->upass=sha1(pg_escape_string($upass).$global_salt);
		$this->ufullname=pg_escape_string($ufullname);
		$this->uroll=pg_escape_string($uroll);
		$this->uemail=pg_escape_string($uemail);
		$sql="Insert into users (us_name, us_pass, us_fullname, us_rollno, us_email) values ('".$this->uname."','".$this->upass."','".$this->ufullname."','".$this->uroll."','".$this->uemail."') returning us_id";
		$user=pg_fetch_assoc(dbquery($sql));
		$this->uid=$user['us_id'];
	}
	
	public function getUserId()
	{
		Return $this->uid;
	}
	
	public function getUsername()
	{
		return $this->uname;
	}
	
	public function getFullname()
	{
		return $this->ufullname;
	}
	
	/**
	* Static function to return full name of a user when User Id is passed.
	* @param integer $uid User ID whose full name is required.
	* @return string Full Name of the user with given User ID
	*/
	public static function getFullNameS($uid)
	{
		$sql="Select us_fullname from users where us_id = '$uid'";
		return pg_fetch_result(dbquery($sql),0,0);
	}
	
	public function getRoll()
	{
		return $this->uroll;
	}
	
	public function getEmail()
	{
		return $this->uemail;
	}
	
	public function getUserPicture()
	{
		global $global_user_folder, $global_salt;
		return $global_user_folder."/".sha1($this->uid.$global_salt).".png";
	}
	
	
}

?>
