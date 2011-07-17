/*
	Handles the like and dislike content in the video page
*/

var defStatus = $('span#likes').attr('defStatus');
var videoId = $('video').attr('cid');
var likeBox = $('span#likes');

var likesDefault = "<span id='likesDefault'><span id='likeButton' data='1' title='like this'><img src='pics/vidbar/plus.png' class='VideoBarButton' /><span>like this</span></span><span id='dislikeButton' data='-1' title='dislike this'><img src='pics/vidbar/minus.png' class='VideoBarButton'/>dislike this.<span></span>";

var likesLiked = "<span id='likesLiked'><span id='likeButton' data='1' title='You like this' style='opacity:0.5'><img src='pics/vidbar/plus.png'  class='VideoBarButton' /><span>You like this</span></span><span id='dislikeButton' data='-1' title='dislike this'><img src='pics/vidbar/minus.png'  class='VideoBarButton' />dislike this.</span></span>";

var likesDisliked = "<span id='likesDisliked'><span id='likeButton' data='1' title='like this'><img src='pics/vidbar/plus.png'  class='VideoBarButton' /><span>like this</span></span><span id='dislikeButton' data='-1' title='You dislike this' style='opacity:0.5'><img src='pics/vidbar/minus.png' class='VideoBarButton'/>You dislike this.</span></span>";

function updateLikeBox(st) {
	if(st === '1' ) {
		likeBox.html(likesLiked );
	} else if (st === '-1') {
		likeBox.html(likesDisliked );
	} else if (st === '2' ) {
		likeBox.html('');
	} else {
		likeBox.html(likesDefault );
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

updateLikeBox(defStatus); /* Update to def status */
