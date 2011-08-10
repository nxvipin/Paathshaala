/*
	@params:	cid:contentid of the video to be played
*/

function getVideoHtml(cid) {

	var link, videoBox = $('div.videodiv'), tags ;
	if (cid === undefined ) { // Contribute page stuff
		cid = 'newvideo'; // Thanks to loose type casting.
		link = 'json/getnewvideo.json.php';
	} else {
		link = 'json/video.json.php?video=' + cid;
	}
	$.getJSON( link, function(myobj) {
		myobj.tagString ="";
		if ( cid === 'newvideo' ) {
			myobj.tags = ['Enter new tags for the video'];
		}
		if (myobj.path && myobj.title) {
			tags = myobj.tags;
			for( i in tags ) {
				if (tags[i] !== '') {
					myobj.tagString = myobj.tagString + "<li><a href='search.php?tag=" + tags[i]+ "'>" + tags[i] + "</a></li>";
				}
			}
			validate();
			if ( myobj.sid) {
				myobj.series = templates.series.supplant(myobj);
			} else {
				myobj.series = '';
			}
			myobj.likestatus = String(myobj.likestatus);
			video = templates.video.supplant(myobj);
		} else {
			video = "Sorry, video not found :(";
			$('div.commentBox , span.smallSubtitle , div.commentWarp').hide();
		}
		videoBox.html(video);
	}).complete(function(){
		VideoJS.setupAllWhenReady();
		if ( cid !== 'newvideo' ) {
			var defStatus = $('span#likes').attr('defStatus');
			updateLikeBox(defStatus); /* Update to def status */
		} else {
				$('div.videoBar').html("<div style='text-align:center;'>Thanks for adding a new video to paathshaala</div>"); // Remove download button
				$('span.videoTitle').html("Enter a new title for your video");
				$('div.VideoDesc').html("Description please :)")
				validateVideo();
		}
	});
}

