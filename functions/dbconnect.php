<?php
/**
* Database Connection Functions.
* Any function required to connect to the database should connect to through these functions ONLY.
* @package database
*/

$host='localhost';
$port='5432';
$dbname='southpark';
$user='serveruser';
$password='DBPa$$word';

/**
* Function to connect to the database. Creates a persistent connection.
* @return resource Database connection resource.
*/
function dbconnect()
{
	$dbconn = pg_pconnect('host=localhost port=5432 dbname=southpark user=serveruser password=DBPa$$word');
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
