var activePage = 0;

/*
	@params:	q : query
				tag : tag search
				p : page number. This is internal now, not handles via get variables. Can provide a UI later if needed
*/

function update(q,tag,p) {

	var myobj, link, video, searchDiv = $('#findStuff');

	if ( q === '') { /* Disables empty queries */
		$('#findStuff').append("<span style='margin:25px auto'>Enter your keyword to search. You cant run blank queries </span>");
		$('div#next').remove();
		$('div#ShowNext').remove();
		return;
	}
	if (tag === undefined ) { /* tag dont exist */
		link = 'json/search.json.php?q=' + q + '&p=' + p;
	} else { /* tag exist */
		link = 'json/tagsearch.json.php?tag=' + tag + '&p=' + p;
	}
	$("#loading").show();
	$.getJSON( link, function(myJsonObj) {
		if (myJsonObj == '' ) { /* Nothing returned from query => last page */
			$('#findStuff').append("<span style='margin:25px auto'>Sorry no results found. Try for something like <a style='color:#1F456B' href='search.php?tag=physics'>physics</a>, <a style='color:#1F456B' href='search.php?tag=computer'>computers</a> or <a style='color:#1F456B' href='search.php?tag=ted'>ted</a>.</span>");
			$('div#next').remove();
			$('div#ShowNext').remove();
		}
		for (i in myJsonObj){
			myobj = myJsonObj[i]; /* loops through all objects in the passed array */
			//Watched = "<span class='watched'>Watched <span class='sideViews'>"+ myobj.viewcount +"</span>  times.</span><br/>";
			//Response = "<span class='response' cid='" + myobj.cid + "'>Is this what you where looking for ? <span class='sideYesNo' id='searchYes' > Yes </span> <span class='sideYesNo' id='searchNo'> No </span></span>";
			video = templates.searchVid.supplant(myobj);
			searchDiv.append(video);
		}
	}).complete(function(){
		$("span#searchYes").click(function() {
			ContId = $(this).parent().attr('cid');
			$(this).parent().html('Thanks for the feedback').delay(1000).fadeOut(1000);
			var q = getUrlVars()['q'];/* tag exist */
			$.post("response/relatedFeed.php", { 'q':q , cId:ContId,response:'yes'});
		});
		$("span#searchNo").click(function() {
			ContId = $(this).parent().attr('cid');
			$(this).parent().html('Thanks for the feedback').parent().parent().parent().fadeOut("slow");
			var q = getUrlVars()['q'];
			$.post("response/relatedFeed.php", { 'q':q , cId:ContId,response:'no'});
		});
		$("time.timeago").timeago();
	});
	$("#loading").fadeOut('slow');
}

$('#next').mouseenter( function() {
	var q = getUrlVars()['q'];
	var tag = getUrlVars()['tag'];
	update( q , tag ,++activePage);
});

