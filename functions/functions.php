<?php
/**
* General functions used in the code are defined here.
* @author Vipin Nair <swvist@gmail.com>
* @author Jaseem Abid <jaseemabid@gmail.com>
* @copyright Copyright (c) 2011, Vipin Nair & Jaseem Abid
* @license http://www.gnu.org/licenses/gpl.html GNU General Public License 
* @package general
*/

include 'settings.php';

/**
* Function to connect to the database. Creates a persistent connection.
* @return resource Database connection resource.
*/
function dbconnect()
{
	global $host,$dbname,$user,$password,$port;
	$dbconn = pg_pconnect("host=$host port=$port dbname=$dbname user=$user password=$password");
	return $dbconn;
}

/**
* Function to query database.
* @param string $sql A sql query. Any variable in sql statement MUST be escaped.
* @return result_resource Result resource.
*/
function dbquery($sql)
{
	dbconnect();
	return pg_query($sql);
}

/**
* This function take a postgres result resource as an input and converts it to 
* an array.
* @param resource Result resource from a PSQL database
* @return array resource is converted into array and returned.
*/
function resource2array($res)
{
	$arr=array();
	while($row=pg_fetch_row($res))
		$arr=array_merge($arr,$row);
	return $arr;
}
/**
* Return the Server IP when Server ID is passed as an argument.
* @param string Server ID of the server (SP for Southpark Server)
* @return string Server Path
*/
function getServer($sid)
{
	if($sid=="SP")
		return "http://192.168.5.27";
}

?>
