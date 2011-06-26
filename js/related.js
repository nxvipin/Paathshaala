/*	Codes to update the 3 relatedBox layouts in the intro page with ajax.
	No need to call functions in the html since it is called in the js script.
	Insert the script at the end of the page.
*/

function updateRelated() {
	$("#loading").show();
	$.getJSON( 'json/related.json', function(myJsonObj) {
	var relatedDiv = "<span class='sideMainTitle'>Related Videos</span><div class='relatedVideoWrap'>";

	console.log("length :" + myJsonObj.length);
		for (i in myJsonObj){
			var myobj = myJsonObj[i];
			if( myobj.title.length > 55 ) {
				var trim = myobj.title.slice(0 ,52 );
				trim = trim + '...';
			} else {
				var trim = myobj.title; }


			var relatedBox = "<div class='relatedVideo'>" +
	"<a href='video.php?video="+ myobj.cid +"' title='" + myobj.title + "' ><div class='relatedVideoImage' > <img src='"+ myobj.poster +"' class='fitin' /></div>" +
		"<div class='relatedVideoContent'> " +
				"<span class='sideTitle'>" + trim + "</span></a><br />" +
				"By, <span class='sideUploader'>" + myobj.uname + "</span><br />" +
				"Watched <span class='sideViews'>"+ myobj.viewcount +"</span>  times.<br/>" +
				"<span class='response'>Is this related ? <span class='sideYesNo' id='relYes' > Yes </span> <span class='sideYesNo' id='relNo'> No </span></span>" +
		"</div></div>";
			relatedDiv = relatedDiv + relatedBox;
		}
		relatedDiv = relatedDiv + "</div>";
		$('div.mainRight').prepend(relatedDiv);
	}).complete(function() {

	$("span#relYes").click(function() {
		$(this).parent().html('Thanks for the feedback').delay(800).fadeOut("slow");
		//	$.post("delC.php", { comId: commentId } );
	});

	$("span#relNo").click(function() {
		$(this).parent().html('Thanks for the feedback').parent().parent().fadeOut("slow");
		//	$.post("delC.php", { comId: commentId } );
	});
	
	});
	$("#loading").fadeOut('slow');

}


/* Function calls to update the dom, no need to call in the page.*/

updateRelated();


