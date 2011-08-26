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
	
	public function updateUser($fname,$roll,$email){
		$sql="update users set us_fname = '$fname', us_rollno = '$roll', us_email = '$email' where us_id = '$this->uid'";
		if(dbquery($sql)){
			return 1;
		}
		return 0;
	}
	
	public function updatePass($oldpass,$newpass){
		global $global_salt;
		$sql="Select us_id from users where us_pass = '".sha1($oldpass.$global_salt)."' and us_id = '".$this->uid."'";
		$row=resource2array(dbquery($sql));
		if($row[0]){
			$newpass=pg_escape_string($newpass);
			$sql="update users set us_pass = '".sha1($newpass.$global_salt)."' where us_id = '$this->uid' returning us_id";
			$row=resource2array(dbquery($sql));
			if($row[0]){
				return 1;
			}
		}
		return 0;
	}
	
	/**
	* Static function to return the PATH of the user pic URL when user id is known.
	* @param integer $uid User ID
	* @return string relative PATH of the user DP.
	*/
	public static function getUserPictureS($uid)
	{
		global $global_user_folder, $global_salt;
		return $global_user_folder."/".sha1($uid.$global_salt).".png";
	}
	
	/**
	* Static function to check if a username already exists.
	* @param string $uname Given Username
	* @return integer returns (exists:1 | does not exist:0)
	*/
	public static function checkUsernameExists($uname)
	{
		$sql="Select us_id from users where us_name='$uname'";
		$row=pg_fetch_row(dbquery($sql));
		if($row)
			return 1;
		else
			return 0;
	}
	
	/**
	* Static function check if an email already exists. 
	* @param string $email Given Email ID
	* @return integer (1: exists | 0: does not exists)
	*/
	public static function checkEmailExists($email)
	{
		$sql="Select us_id from users where us_email='$email'";
		$row=pg_fetch_row(dbquery($sql));
		if($row)
			return 1;
		else
			return 0;
	}
	
	/**
	* Checks if a user liked/dislike a content.
	* @param integer $uid User ID of the logged in user.
	* @param integer $cid Content ID to be checked.
	* @return integer (1: Like, -1: dislike, 0: default, 2: user not logged in)
	*/
	public static function checkLike($uid,$cid)
	{
		if(!$uid)
			return 2;
		else{	
			$sql="Select cl_value from content_like where cl_uid='$uid' and cl_cid='$cid'";
			$row=pg_fetch_array(dbquery($sql));
			if($row)
				return $row[0];
			else
				return 0;
		}
	}
	
	/**
	* Checks if a roll no already exists in the database.
	* @param string $roll Register number of the user.
	* @return integer (1:exists | 0:does not exist)
	*/
	public static function checkRollExists($roll)
	{
		$roll=strtolower($roll);
		$sql="Select us_id from users where us_rollno='$roll'";
		$row=pg_fetch_row(dbquery($sql));
		if($row)
			return 1;
		else
			return 0;
	}
	
	
	
}

?>
