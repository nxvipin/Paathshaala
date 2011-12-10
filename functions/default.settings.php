<?php
/**
* Default settings of the application are set here. Set the variables with appropriate
* values accordingly and RENAME the file from default.settings.php to settings.php
* @package settings
*/

//Main Database(postgreSQL) settings
$global_host				=	'';		// <Database Host>
$global_port				=	'';		// <Database Port>
$global_dbname				=	''; 	// <Database Name>
$global_user				=	'';		// <Database User>
$global_password			=	''; 	// <Database Password>

//Application Settings
$global_salt				=	'';		// <SALT added to any string before encryption>
$global_thumbs_folder		=	'';		// <Thumbs folder where thumbnails will be stored>
$global_user_folder			=	'';		// <User folder where user data will be stored>
$global_user_default_pic	=	'';		// <Default pic for registered users>
$global_raw_videos_folder	=	'';		// <Folder where non indexed, non series videos are stored>
$global_raw_series_folder	=	'';		// <Folder where non indexed, series videos are stored>
$global_servers["SERVER_ID"]=	'';		// <SERVER ID, SERVER IP>

//CouchDB Settings
$global_couch_host			=	'';		// <CouchDB Host>
$global_couch_port			=	'';		// <CouchDB Port>
$global_couch_dbname		=	'';		// <CouchDB Database Name>
$global_couch_user			=	'';		// <CouchDB Username>
$global_couch_password		=	'';		// <CouchDB Password>

?>
