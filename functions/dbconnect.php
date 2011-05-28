<?php
	function dbconnect()
	{
		$dbconn = pg_pconnect('host=localhost port=5432 dbname=southpark user=serveruser password=DBPa$$word');
		return $dbconn;
	}
	function dbquery($sql)
	{
		dbconnect();
		return pg_query($sql);
	}
	function dbclose($dbconn)
	{
		pg_close($dbconn);
	}
?>
