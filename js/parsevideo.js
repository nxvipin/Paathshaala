/*
	@params:	cid:contentid of the video to be played
*/

function getVideoHtml(cid) { 
	var link = 'json/video.json.php?video=' + cid;
	var videoBox = $('div.videodiv');
	$.getJSON( link, function(myObj) {
		if (myObj.title ) {
		var tags = myObj.tags;
		var tagString ="" , series="" ;
		for( i in tags ) {
			if (tags[i] !== '') {
				tagString = tagString + "<li><a href='search.php?tag=" + tags[i]+ "'>" + tags[i] + "</a></li>";
			}
		}

		if ( myObj.sId) {
			series = "<div class='series'> <img src='pics/series.png' /> <span>This video #" + myObj.order + " of <a href='search.php?sid=" + myObj.sid +"'>" + myObj.sname + "</a> </span> </div>"
		} else {
			series = '';
		}

		video= "<span class='videoTitle'>" + myObj.title + "</span>" +
				"<!-- Begin VideoJS -->" +
				"<div class='video-js-box'>" +
					"<video cid='" + myObj.cid + "' poster='" + myObj.poster + "' class='video-js' controls preload height=325 width=550>" +
						"<source src='" + myObj.path + "' type='video/ogg; codecs=\"theora, vorbis\"' />" +
					"</video>" +
				"</div>" +
				"<!-- End VideoJS -->" +
				"<!-- video bar -->" +
				"<div class='videoBar'>" +
					"<img src='pics/vidbar/watch.png' class='VideoBarButton' /><span class='videoBarElement' id='playCount'>Views:" + myObj.viewcount + "</span>" +
					"<span id='likes' defStatus='" + myObj.likestatus + "' ></span>" +
					"<img src='pics/vidbar/download.png' title='Download' class='VideoBarButton' style='float:right;' id='downloadButton' />" +
				"</div>" +
				"<!-- /video bar -->" +
				"<img src='pics/vidbar/tag.png' title='tags' style='margin-left:6px;'/>" +
				"<ul class='tags'>" + tagString + "</ul>" + series +
				"<div class='VideoDesc'>" + myObj.desc + "</div>";
		} else {
			video = "Sorry, content not found :("
			$('div.commentBox , span.smallSubtitle , div.commentWarp').hide();
		}
		videoBox.html(video);
	}).complete(function(){
		VideoJS.setupAllWhenReady();
		var defStatus = $('span#likes').attr('defStatus');
		updateLikeBox(defStatus); /* Update to def status */
	});
}
