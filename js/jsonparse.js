/*
	Codes to update the 3 storyBox layouts in the intro page with ajax.
	Call functions in the html after load.
	handling the hide/show more/less stuff here with jquery.
*/

function makeBox (myobj) {
	if( myobj.fullname.length > 18 ) {
		myobj.fullname = myobj.fullname.slice(0 ,15 );
		myobj.fullname = myobj.fullname + '...';
	}
	var box = templates.box.supplant(myobj);
	return box;
}

function updateStoryBox(type) {

/*
	type : Featured / TopRated / Popular
*/

	var link , title;
	var more = "<span class='more'>Gimme more !!</span>";
	var less = "<span class='less'>Hide all this !!</span></div>";

	if(type === 'Featured' ) {
		link = 'json/featured.json.php';
		title = "<span class=groupTitle>Featured</span>" ;
	} else if (type === 'TopRated') {
		link = 'json/toprated.json.php';
		title =  "<span class=groupTitle>Top Rated</span>";
	} else if (type === 'Popular') {
		link = 'json/popular.json.php';
		title = "<span class=groupTitle>Popular</span>";
	} else if (type === 'Liked') {
		link = 'json/uservideolikes.json.php';
		title = "<span class=groupTitle>Liked videos</span>";
	} else if (type === 'Disliked') {
		link = 'json/uservideodislikes.json.php';
		title = "<span class=groupTitle>Disliked videos</span>";
	}

	$.getJSON( link , function(myJsonObj) {
		var count = myJsonObj.length;
		if (count === 4 ) {
			var groupBox = "<div class='groupBox'>";
			for (var i =0; i <4 ; i++){
				var myobj = myJsonObj[i];
				var storyBox = makeBox(myobj)
				groupBox = groupBox + storyBox;
			}
			groupBox = groupBox + "</div>";
			res = title + groupBox;
			$('div#container').append(res);
		} else { /* All multi boxes handled in same way if more than 4 */
			var groupBox1 = "<div class='groupBox'>";
				for (var i =0; i <4 ; i++){
					var myobj = myJsonObj[i];
					var storyBox = makeBox(myobj)
					groupBox1 = groupBox1 + storyBox;
				}
			groupBox1 = groupBox1 + "</div>";

			var groupBox2 = "<div class='groupBox Hidden'>";
				for (i =4; i < count ; i++){
					var myobj = myJsonObj[i];
					var storyBox = makeBox(myobj)
					groupBox2 = groupBox2 + storyBox;
				}
			groupBox2 = groupBox2 + "</div>";

			var res = "<div>" + title + groupBox1 + more + groupBox2 + less + "</div>" ;
			$('div#container').append(res);
		}
	}).complete(function(){
	$('img.metaImage').each(function(){
		$(this).error(function(){
			$(this).attr('src','pics/default.png');
		});
	});
	$('img.thumbnail').each(function(){
		$(this).error(function(){/*
	Codes to update the myVideos videos in the profile page
*/

function updatemyVideos() {
	$("#loading").show();
	$.getJSON( 'json/uservideouploads.json.php', function(myJsonObj) {

	var len = myJsonObj.length;

	var uploadVideo = '';
	//var uploadVideo =  "<div class='storyBox' id='newVideo'><div class='imageBox'><img  src='pics/newvid.png'><div class='metaInfo'></div></div><div class='metaBox'><div class='metaUser'><img class='metaImage' src='pics/me.png'> <span class='metaName'>Jaseem Abid</span></div><div class='metaViews'></div></div></div>";

	$('div#newVideo div.metaInfo').hide();

	var groupBox1 = "<div class='groupBox'>" + uploadVideo ;
		for (i =0; i <4 ; i++){
			var myobj = myJsonObj[i];
			var storyBox = templates.box.supplant(myobj);
			groupBox1 = groupBox1 + storyBox;
		}
	groupBox1 = groupBox1 + "</div>";

	var groupBox2 = "<div class='groupBox Hidden'>";
		for (i =4; i < len ; i++){
			var myobj = myJsonObj[i];
			var storyBox = templates.box.supplant(myobj);
			groupBox2 = groupBox2 + storyBox;
		}
	groupBox1 = groupBox1 + "</div>";

	var myVideosDiv = "<div><span class=groupTitle>My videos</span>" + groupBox1 + "<span class='more'>Gimme more !!</span>" + groupBox2 + "</div><span class='less'>Hide all this !!</span>" ;

		$('div#container').append(myVideosDiv);
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
	$("#loading").fadeOut('slow');
}

			$(this).attr('src','pics/error.png');
		});
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
	});	}); /* Ajax call ends */
}

/* Video parsing functions */

/*
	Handles the like and dislike content in the video page
*/

function updateLikeBox(st) {

	var videoId = $('video').attr('cid'), likeBox = $('span#likes'), msg = {
		def : "<span id='likesDefault'><span id='likeButton' data='1' title='like this'><img src='pics/vidbar/plus.png' class='VideoBarButton' /><span>like this</span></span><span id='dislikeButton' data='-1' title='dislike this'><img src='pics/vidbar/minus.png' class='VideoBarButton'/>dislike this.<span></span>",
		liked : "<span id='likesLiked'><span id='likeButton' data='1' title='You like this' style='opacity:0.5'><img src='pics/vidbar/plus.png'	class='VideoBarButton' /><span>You like this</span></span><span id='dislikeButton' data='-1' title='dislike this'><img src='pics/vidbar/minus.png'	class='VideoBarButton' />dislike this.</span></span>",
		disliked : "<span id='likesDisliked'><span id='likeButton' data='1' title='like this'><img src='pics/vidbar/plus.png'	class='VideoBarButton' /><span>like this</span></span><span id='dislikeButton' data='-1' title='You dislike this' style='opacity:0.5'><img src='pics/vidbar/minus.png' class='VideoBarButton'/>You dislike this.</span></span>",
		error : "<span id='likesDisliked' style='margin:0px 5px;'>Something went wrong.</span>",
		loggedOut : "<span id='likesDisliked' style='margin:0px 5px;'>Login to like content</span>"
	};

switch (st) {
	 case '1':
		likeBox.html(msg.liked);
		break;
	 case '-1':
		likeBox.html(msg.disliked);
		break;
	 case '2':
		likeBox.html(msg.loggedOut);
		break;
	 case '0':
		likeBox.html(msg.def);
		break;
	 default:
		likeBox.html(msg.error);
		break;
}

$('span#likeButton').click(function() {
	var status = $(this).parent().attr("id");
	var value = $(this).attr("data");
	if (status !== 'likesLiked' ) {
		$.post("response/savelikes.php", { cid: videoId, value: value } );
		updateLikeBox('1');
	}
});

$('span#dislikeButton').click(function() {
	var status = $(this).parent().attr("id");
	var value = $(this).attr("data");
		if (status !== 'likesDisliked' ) {
			$.post("response/savelikes.php", { cid: videoId, value: value } );
			updateLikeBox('-1');
		}
	});
}


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
		if (myobj.path) {
			tags = myobj.tags;
			for( i in tags ) {
				if (tags[i] !== '') {
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
		} else {
				$('div.videoBar').html("<div style='text-align:center;'>Thanks for adding a new video to paathshaala</div>"); // Remove download button
				$('span.videoTitle').html("Enter a new title for your video");
				$('div.VideoDesc').html("Description please :)")
				validateVideo();
		}
	});
}

/*
	Codes to update the myVideos videos in the profile page
*/

function updatemyVideos() {
	$("#loading").show();
	$.getJSON( 'json/uservideouploads.json.php', function(myJsonObj) {

	var len = myJsonObj.length;

	var uploadVideo = '';
	//var uploadVideo =  "<div class='storyBox' id='newVideo'><div class='imageBox'><img  src='pics/newvid.png'><div class='metaInfo'></div></div><div class='metaBox'><div class='metaUser'><img class='metaImage' src='pics/me.png'> <span class='metaName'>Jaseem Abid</span></div><div class='metaViews'></div></div></div>";

	$('div#newVideo div.metaInfo').hide();

	var groupBox1 = "<div class='groupBox'>" + uploadVideo ;
		for (i =0; i <4 ; i++){
			var myobj = myJsonObj[i];
			var storyBox = templates.box.supplant(myobj);
			groupBox1 = groupBox1 + storyBox;
		}
	groupBox1 = groupBox1 + "</div>";

	var groupBox2 = "<div class='groupBox Hidden'>";
		for (i =4; i < len ; i++){
			var myobj = myJsonObj[i];
			var storyBox = templates.box.supplant(myobj);
			groupBox2 = groupBox2 + storyBox;
		}
	groupBox1 = groupBox1 + "</div>";

	var myVideosDiv = "<div><span class=groupTitle>My videos</span>" + groupBox1 + "<span class='more'>Gimme more !!</span>" + groupBox2 + "</div><span class='less'>Hide all this !!</span>" ;

		$('div#container').append(myVideosDiv);
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
	$("#loading").fadeOut('slow');
}

