/*
	General JS functions required in all pages will be written in this page.
	Individual page specific codes will be split into smaller files.
*/

/* Function to manipulate $_GET[] variables with JS */

/* Read a page's GET URL variables and return them as an associative array. */
/* Example implementation : var cid = getUrlVars()['id']; */

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

/* Comments */

/* Comment submit function */
/* Change attributes and file to submit the comment */ 

function subComment() {

	var comm = $("#comment").attr('value');
	if(comm !== '') {
		$('#loading').fadeIn('fast');
		$.post("commR.php", { comment: comm },
			function(data) {
				$('#commentInfo').html(data); /* displaying the returned comment, remove in production code */
		});
	}
	$("#comment").attr('value' , ''); /* Clear comment feild */
	$('#loading').fadeOut('fast');
}

/* Need grayout.js */
/* feedback stuff */

function hideFeedback() {
	$('#feedback').fadeOut("fast");
	grayOut(false);
}

function showFeedback() {
	var loadingBar = $("#loading");
	loadingBar.show();
	grayOut(true);
	$('#feedback').load('feedback.html' , function() { loadingBar.fadeOut('slow'); }).fadeIn("slow");
}





