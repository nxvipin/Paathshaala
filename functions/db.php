<?php
/**
* Database Connection Functions.
* Any function required to connect to the database should connect to through these functions ONLY.
* @package database
*/

$host=''; 		// <Database Host>
$port=''; 		// <Database Port>
$dbname=''; 	// <Database Name>
$user=''; 		// <Database User>
$password=''; 	// <Database Password>

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
?>
