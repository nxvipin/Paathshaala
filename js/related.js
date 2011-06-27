/*
	Codes to update the relatedBox layout in the video page.
	No need to call functions in the html since it is called in the js script.
	Insert the script at the end of the page.
*/

function updateRelated() {
	$("#loading").show();
	$.getJSON( 'json/related.json', function(myJsonObj) {
	var relatedDiv = "<span class='sideMainTitle'>Related Videos</span><div class='relatedVideoWrap'>";

		for (i in myJsonObj){
			var myobj = myJsonObj[i];
			if( myobj.title.length > 55 ) {
				var trim = myobj.title.slice(0 ,52 );
				trim = trim + '...';
			} else {
				var trim = myobj.title; }

Watched = "<span class='watched'>Watched <span class='sideViews'>"+ myobj.viewcount +"</span>  times.</span><br/>";

Response = "<span class='response' cid='" + myobj.cid + "'>Is this related ? <span class='sideYesNo' id='relYes' > Yes </span> <span class='sideYesNo' id='relNo'> No </span></span>";


			var relatedBox = "<div class='relatedVideo'>" +
	"<a href='video.php?video="+ myobj.cid +"' title='" + myobj.title + "' ><div class='relatedVideoImage' > <img src='"+ myobj.poster +"' class='fitin' /></div>" +
		"<div class='relatedVideoContent'> " +
				"<span class='sideTitle'>" + trim + "</span></a><br />" +
				"By, <span class='sideUploader'>" + myobj.uname + "</span><br />" +
				"<span class='contentChange'> " + Watched + Response + " </span>" +
		"</div></div>";
			relatedDiv = relatedDiv + relatedBox;
		}
		relatedDiv = relatedDiv + "</div>";
		$('div.mainRight').prepend(relatedDiv);
	}).complete(function() {

		/*This block of code exist because of ugly DOM api. Moves the side element up the ht of video title to get a horizontally matched layout */
		var titleHt = $(".video_title").height(); 
		$("span.sideMainTitle").css({"top" :-titleHt - 30});
		$("div.relatedVideoWrap").css({"top" :-titleHt - 30 });

		$("span#relYes").click(function() {

				ContId = $(this).parent().attr('cid');
				$(this).parent().html('Thanks for the feedback').delay(1000).fadeOut(1000);
				var playingId = $('video').attr('cid');
				$.post("response/relatedFeed.php", { playingId : playingId,relatedId:ContId,response:'yes'});
			});

		$("span#relNo").click(function() {
				ContId = $(this).parent().attr('cid');
				$(this).parent().html('Thanks for the feedback').parent().parent().parent().fadeOut("slow");
				var playingId = $('video').attr('cid');
				$.post("response/relatedFeed.php", { playingId : playingId,relatedId:ContId,response:'no'});
		});


	});
	$("#loading").fadeOut(1000);
}

/* Function calls to update the dom, no need to call in the page.*/
updateRelated();
