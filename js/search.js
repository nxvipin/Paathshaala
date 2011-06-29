var activePage=0;

/*
	@params:	q:query
				p:page number. This is internal now, not handles via get variables. Can provide a UI later if needed.
*/

function update(q,p) { 

	if ( q === '') { /* Disables empty queries */
		$('#findStuff').append("<span style='margin:25px auto'>Enter your keyword to search. You cant run blank queries </span>");
		$('div#next').remove();
		$('div#ShowNext').remove();
		return;
	}

	var link = 'searchjson.php?q=' + q + '&p=' + p;
	$("#loading").show();
	var searchDiv = $('#findStuff');
	$.getJSON( link, function(myJsonObj) {

	if (myJsonObj == '' ) { /* Nothing returned from query => last page */
		$('div#next').remove();
		$('div#ShowNext').remove();
	}

	for (i in myJsonObj){
		var myobj = myJsonObj[i]; /* loops through all objects in the passed array */
		Watched = "<span class='watched'>Watched <span class='sideViews'>"+ myobj.viewcount +"</span>  times.</span><br/>";
		Response = "<span class='response' cid='" + myobj.cid + "'>Is this what you where looking for ? <span class='sideYesNo' id='searchYes' > Yes </span> <span class='sideYesNo' id='searchNo'> No </span></span>";

	var video = "<div class='relatedVideo'>" +
					"<a href='video.php?video="+ myobj.cid +"' title='" + myobj.title + "' >" + 
					"<div class='relatedVideoImage' > <img src='"+ myobj.poster +"' class='fitin' /></div>" +
					"<div class='relatedVideoContent'> " +
						"<span class='sideTitle'>" + myobj.title + "</span></a><br />" +
						"By, <span class='sideUploader'>" + myobj.uname + "</span>" +
						"<time class='timeago' datetime='" + myobj.timestamp + "'></time><br/>" +
						"<span class='contentChange'> " + Watched + Response + " </span>" +
				"</div></div>";
			searchDiv.append(video);
	}
	}).complete(function(){

	$("span#searchYes").click(function() {
		ContId = $(this).parent().attr('cid');
		$(this).parent().html('Thanks for the feedback').delay(1000).fadeOut(1000);
		var q = getUrlVars()['q'];
		$.post("response/relatedFeed.php", { 'q':q , cId:ContId,response:'yes'});
	});

	$("span#searchNo").click(function() {
		ContId = $(this).parent().attr('cid');
		$(this).parent().$('#findStuff').html('Thanks for the feedback').parent().parent().parent().fadeOut("slow");
		var q = getUrlVars()['q'];
		$.post("response/relatedFeed.php", { 'q':q , cId:ContId,response:'no'});
	});

	$("time.timeago").timeago();

	});

	$("#loading").fadeOut('slow');
}


$('#next').mouseenter( function() {
	var q = getUrlVars()['q'];
	update( q , ++activePage);
});
