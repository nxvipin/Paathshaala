/*
	Core file to generate all ui elements dynamically.
	Template files and all parse functions stay in this file.
	Templates parsed in to content using the supplant property defined in ECMAScript5
	Eg : video = templates.video.supplant(myObj);
*/

var templates = {

	video : "<span class='videoTitle'>{title}</span><br/><span class='videoUser'> Video by : {uname} </span><!-- Begin VideoJS --><div class='video-js-box'><video cid={cid} poster='{poster}' class='video-js' controls preload height=325 width=550><source src='{path}' type='video/ogg; codecs=\"theora, vorbis\"' /></video></div><!-- End VideoJS --><!-- video bar --><div class='videoBar'><img src='pics/vidbar/watch.png' class='VideoBarButton' /><span class='videoBarElement' id='playCount'>Views:{viewcount}</span><span id='likes' defStatus='{likestatus}' >{likestatus}</span><img src='pics/vidbar/download.png' title='Download' class='VideoBarButton' style='float:right;' id='downloadButton' /></div><!-- /video bar --><img src='pics/vidbar/tag.png' title='tags' style='margin-left:6px;'/><ul class='tags'>{tagString}</ul>{series}<div class='VideoDesc'>{desc}</div>",

	box : "<div class='storyBox'><a href=\"video.php?video={cid}\"><div class='imageBox'><img src={poster} class='thumbnail'/><div class='metaInfo'>{title}</div></div> </a><div class='metaBox'><div class='metaUser'><img src='{userpic}' class='metaImage' /> <span class='metaName' >{fullname}</span></div><div class='metaViews'>{viewcount}</div></div></div>",

	series : "<div class='series'><img src='pics/series.png'/><span>This video #{order} of <a href=\"search.php?sid={sid}\"><span id='sName'>{sname}</span></a> </span></div>",

	searchVid : "<div class='relatedVideo'><a href='video.php?video={cid}' title='{title}' ><div class='relatedVideoImage' > <img src={poster} class='fitin' /></div><div class='relatedVideoContent'> <span class='sideTitle'>{title}</span></a><br />By, <span class='sideUploader'>{fullname}</span>" +"<time class='timeago' datetime={timestamp}></time><br/>Watched {viewcount} times</div></div>",

	likes : {
		def : "<span id='likesDefault'><span id='likeButton' data='1' title='like this'><img src='pics/vidbar/plus.png' class='VideoBarButton' /><span>like this</span></span><span id='dislikeButton' data='-1' title='dislike this'><img src='pics/vidbar/minus.png' class='VideoBarButton'/>dislike this.<span></span>",
		liked : "<span id='likesLiked'><span id='likeButton' data='1' title='You like this' style='opacity:0.5'><img src='pics/vidbar/plus.png'	class='VideoBarButton' /><span>You like this</span></span><span id='dislikeButton' data='-1' title='dislike this'><img src='pics/vidbar/minus.png'	class='VideoBarButton' />dislike this.</span></span>",
		disliked : "<span id='likesDisliked'><span id='likeButton' data='1' title='like this'><img src='pics/vidbar/plus.png'	class='VideoBarButton' /><span>like this</span></span><span id='dislikeButton' data='-1' title='You dislike this' style='opacity:0.5'><img src='pics/vidbar/minus.png' class='VideoBarButton'/>You dislike this.</span></span>",
		error : "<span id='likesDisliked' style='margin:0px 5px;'>Something went wrong.</span>",
		loggedOut : "<span id='likesDisliked' style='margin:0px 5px;'>Login to like content</span>"
	}
};


function updateStoryBox(type) {
	/*
		type : Featured/ TopRated / Popular...
		All box layout updatedwith same code.
		New ui needed for upload video trigger
	*/
	var makeBox = function (myobj) {
					if( myobj.fullname.length > 18 ) {
						myobj.fullname = myobj.fullname.slice(0 ,15 );
						myobj.fullname = myobj.fullname + '...';
					}
					var box = templates.box.supplant(myobj);
					return box;
				},
		link, title, 
		more = "<span class='more'>Gimme more !!</span>",
		less = "<span class='less'>Hide all this !!</span></div>";

	switch (type) {
		case 'Featured' :
			link = 'json/featured.json.php';
			title = "<span class=groupTitle>Featured</span>" ;
			break;
		case 'TopRated' :
			link = 'json/toprated.json.php';
			title =  "<span class=groupTitle>Top Rated</span>";
			break;
		case 'Popular':
			link = 'json/popular.json.php';
			title = "<span class=groupTitle>Popular</span>";
			break;
		case 'Liked':
			link = 'json/uservideolikes.json.php';
			title = "<span class=groupTitle>Liked videos</span>";
			break;
		case 'Disliked':
			link = 'json/uservideodislikes.json.php';
			title = "<span class=groupTitle>Disliked videos</span>";
			break;
		case 'Uploads':
			link = 'json/uservideouploads.json.php';
			title = "<span class=groupTitle>My videos</span>";
			break;
		default:
			// "Something went wrong";
			break;
		}

	$.getJSON( link , function(myJsonObj) {
		var i, storyBox, myobj,
			groupBox  = "<div class='groupBox'>",
			groupBox1 = "<div class='groupBox'>",
			groupBox2 = "<div class='groupBox Hidden'>";
		if (myJsonObj.length === 4 ) {
			groupBox = "<div class='groupBox'>";
			for (i =0; i <4 ; i +=1){
				myobj = myJsonObj[i];
				storyBox = makeBox(myobj);
				groupBox = groupBox + storyBox;
			}
			groupBox = groupBox + "</div>";
			$('div#container').append(title + groupBox);
		} else { /* All multi boxes handled in same way if more than 4 */
			for (i =0; i <4 ; i +=1){
				myobj = myJsonObj[i];
				storyBox = makeBox(myobj);
				groupBox1 = groupBox1 + storyBox;
			}
			groupBox1 = groupBox1 + "</div>";
				for (i =4; i < myJsonObj.length ; i +=1){
					myobj = myJsonObj[i];
					storyBox = makeBox(myobj);
					groupBox2 = groupBox2 + storyBox;
				}
			groupBox2 = groupBox2 + "</div>";
			$('div#container').append("<div>" + title + groupBox1 + more + groupBox2 + less + "</div>");
		}
	}).complete(function(){
		$('img.metaImage').error(function(){
			$(this).attr('src','pics/default.png');
		});
		$('img.thumbnail').error(function(){
			$(this).attr('src','pics/error.png');
		});
		$('span.more').click(function(){
			$(this).hide();
			$(this).parent().find('.Hidden').slideDown('fast');
			$(this).parent().find('.less').fadeIn();
		});
		$('span.less').click(function(){
			$(this).parent().find('.Hidden').slideUp('fast');
			$(this).parent().find('.more').fadeIn();
			$(this).hide();
		});
	});
}

/*
	@params:	cid:contentid of the video to be played
*/

function getVideoHtml(cid) {

	var updateLikeBox = function(st) {
		var videoId = $('video').attr('cid'), likeBox = $('span#likes');
		switch (st) {
			 case '1':
				likeBox.html(templates.likes.liked);
				break;
			 case '-1':
				likeBox.html(templates.likes.disliked);
				break;
			 case '2':
				likeBox.html(templates.likes.loggedOut);
				break;
			 case '0':
				likeBox.html(templates.likes.def);
				break;
			 default:
				likeBox.html(templates.likes.error);
				break;
		}
		$('span#likeButton').click(function() {
			var status = $(this).parent().attr("id"),
				value = $(this).attr("data");
			if (status !== 'likesLiked' ) {
				$.post("response/savelikes.php", { cid: videoId, value: value } );
				updateLikeBox('1');
			}
		});
		$('span#dislikeButton').click(function() {
			var status = $(this).parent().attr("id"),
				value = $(this).attr("data");
			if (status !== 'likesDisliked' ) {
				$.post("response/savelikes.php", { cid: videoId, value: value } );
				updateLikeBox('-1');
			}
		});
	}, link, videoBox = $('div.videodiv'), tags;

	if (cid === undefined ) { // Contribute page stuff
		cid = 'newvideo'; // Thanks to loose type casting.
		link = 'json/getnewvideo.json.php';
	} else {
		link = 'json/video.json.php?video=' + cid;
	}

	$.getJSON( link, function(myobj) {
		myobj.tagString ="";
		var i = 0, video;
		if ( cid === 'newvideo' ) {
			myobj.tags = ['Enter new tags for the video'];
		}
		if (myobj.path) {
			tags = myobj.tags;
			for( i =0; i< tags.length; i+=1 ) {
				if (tags[i]) {
					myobj.tagString = myobj.tagString + "<li><a href='search.php?tag=" + tags[i]+ "'>" + tags[i] + "</a></li>";
				}
			}
			validateJoin();
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
			$('img#downloadButton.VideoBarButton').click(function(){
				alert('Please right click on the video and save the video while being played');
			});
		} else {
				$('div.videoBar').html("<div style='text-align:center;'>Thanks for adding a new video to paathshaala</div>"); // Remove download button
				$('span.videoTitle').html("Enter a new title for your video");
				$('div.VideoDesc').html("Description please :)")
				validateVideo();
		}
	});
}
