/*
	General JS functions for Paathshaala
*/

/* Read a page's GET URL variables and return them as an associative array. */
/* Example implementation : var cid = getUrlVars()['id']; */

function getUrlVars() {
	var i =0, vars = [], hash, hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

/* Supplant */
if(typeof String.prototype.supplant !== 'function') {
	String.prototype.supplant = function(o) {
		return this.replace(/{([^{}]*)}/g,
			function (a,b) {
				var r = o[b];
				return typeof r === 'string' ?
					r : a;
			});
	};
}
/*
Object.prototype.allTrue = function() {
	var i = 0;
	for (i in this) {
		if(this.hasOwnProperty(i)) {
			if(!this[i]) return false;
		}
	}
	return true;
}*/

var Paathshaala = {
	hashTag : function(elem) {
			var data = $(elem).html(),
				reg = /#(\w{1,})/g,
				res = data.match(reg),
				len = res.length;
			for( var i =0; i < len ; i = i+1) {
				data = data.replace( res[i],'<a href=search.php?tag=' + res[i] + '>' + res[i] + '</a>' );
			}
			$(elem).html(data);
		},
	showFeedback : function() {
			grayOut(true);
			$('div#feedback').show()
			$('div#feedback').load('feedback.html');
		},
	hideFeedback : function () {
			grayOut(false);
			$('div#feedback').hide();
		},
	showEditProfile: function () {
			grayOut(true);
			$('div#editProfile').load('editprofile.html').fadeIn("slow");
		},
	hideEditProfile : function() {
			$('#editProfile').fadeOut("fast");
			grayOut(false);
		},
	searchBox : function() {
			$(".searchBox").
				focus(function () {
					$(this).animate({width: '380px'} , 250 , '' , function () {})
				}).
				focusout(function () {
					$(this).animate({width: '270px'} , 150 , '' , function () {});
				});
		},
	dashBoard : function() {
			var dashShown = 0,loginShown = 0,joinShown = 0;
			$("div.loggedUser").
				click(function(){
					if (! dashShown) {
						$('.dashBoard').slideToggle('fast');
						dashShown = 1;
						$("#logChangeButton").attr('src', 'pics/up.png');
					} else {
						$('.dashBoard').slideToggle('fast');
						dashShown = 0;
						$("#logChangeButton").attr('src', 'pics/down.png');
					}
				});
		$("li#showlogin").
			click(function(){
				if (loginShown === 0 ) {
					$('form.login').slideToggle('fast');
					$('form.join').slideUp('fast');
					loginShown = 1;
					joinShown = 0;
					$("#logChangeButton").attr('src', 'pics/up.png');
				} else {
					$('.login').slideToggle('fast');
					loginShown = 0;
					$("#logChangeButton").attr('src', 'pics/down.png');
				}
			});
		$("li#showJoin").
			click(function() {
				if (! joinShown) {
					$('.join').slideToggle('fast');
					$('.login').slideUp('fast');
					joinShown = 1;
					loginShown = 0;
					$("#logChangeButton").attr('src', 'pics/up.png');
					validateJoin(); // Calls the join form validate and submit functions from js/validate.js
				} else {
					$('.join').slideToggle('fast');
					joinShown = 0;
					$("#logChangeButton").attr('src', 'pics/down.png');
				}
			});
		},
	imageError : function() {
			/* Buggy. not working in profile page and top logged image */
			$('img').error(function(){
				$(this).attr('src','pics/default.png');
			});
		},
	comments : function() {
			/* Submit comment using an enter key press */
			$('#comment').keypress(function(event) {
				if (event.which == '13') {
					event.preventDefault();
					subComment();
				}
			});
			/*	Need the jkey plugin
				New line in comment using a down key press */
			$('#comment').jkey('down',function(){
				var comBox =$('#comment');
				data = comBox.attr('value') + '\n';
				comBox.attr('value' , data);
			});
			/* Handle height of comment box */
			var commbox = $('textarea#comment').parent().parent().parent(), ht = commbox.height();
			$('textarea#comment').keyup( function() {
				var len = $('#comment').attr('value').length;
				var lineno = Math.floor( Number(len) / 40 );
				$(this).attr('rows' , lineno + 2)
				commbox.height(ht + (14 * lineno) );
			});
		},
	quirks : function(){ /* Stuff which i cant put anywhere else. Cant pollute the global object, hence this is here */
			$('img#bugButton.VideoBarButton, img.feedbackDock').click(function(){
				Paathshaala.showFeedback();
			});
			$('span.news').click(function(){
				$('div#indexMesssage').fadeOut("fast");
			});
		}
};

Paathshaala.templates = {
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
}



/*	Generic actions 
	Looks like modules. Need to learn more about this
	At one point i may be able to call only whats needed and improve page performance.
	Eg: call Paathshaala.comments(); only in the video page after DOM load
*/ 

$(document).ready(function(){
	Paathshaala.searchBox();
	Paathshaala.dashBoard();
	Paathshaala.imageError();
	Paathshaala.comments();
	Paathshaala.quirks();
});





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
					var box = Paathshaala.templates.box.supplant(myobj);
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
			groupBox2 = "<div class='groupBox Hidden'>";
		if (myJsonObj.length === 4 ) {
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
				groupBox = groupBox + storyBox;
			}
			groupBox = groupBox + "</div>";
				for (i =4; i < myJsonObj.length ; i +=1){
					myobj = myJsonObj[i];
					storyBox = makeBox(myobj);
					groupBox2 = groupBox2 + storyBox;
				}
			groupBox2 = groupBox2 + "</div>";
			$('div#container').append("<div>" + title + groupBox + more + groupBox2 + less + "</div>");
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
				likeBox.html(Paathshaala.templates.likes.liked);
				break;
			 case '-1':
				likeBox.html(Paathshaala.templates.likes.disliked);
				break;
			 case '2':
				likeBox.html(Paathshaala.templates.likes.loggedOut);
				break;
			 case '0':
				likeBox.html(Paathshaala.templates.likes.def);
				break;
			 default:
				likeBox.html(Paathshaala.templates.likes.error);
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
				myobj.series = Paathshaala.templates.series.supplant(myobj);
			} else {
				myobj.series = '';
			}
			myobj.likestatus = String(myobj.likestatus);
			video = Paathshaala.templates.video.supplant(myobj);
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


function validateJoin() {
	"use strict";
	var verified = {}, msg = {}, entries = {}, regEx = {}, input, data, id, res, i, ajax, joinMessage = $('div.joinMessage'), submit= true ;

	verified = {
		fname : false,
		username: false,
		email : false,
		roll : false ,
		pass1 : false,
		pass2 : false
	}

	msg = {
		fname : { 'valid' : 'Hello' /*{full name} */ ,
		'invalid': 'Enter a valid full name' } ,

		username : { 'valid' : 'Username available' ,
		'invalid': 'This username is not available' } ,

		email : { 'valid' : 'Thanks, we wont spam you !' ,
		'invalid': 'Enter a valid email' } ,

		roll : { 'valid' : 'Seems like a valid NITC roll' ,
		'invalid': 'Enter a valid NITC roll num' } ,

		pass1 : { 'valid' : 'Secure password' ,
		'invalid': 'Enter a secure password' } ,

		pass2 : { 'valid' : 'Password verified' ,
		'invalid': 'Enter the same password as above' }
	};

	regEx = {
		fname : /[\w\s]{5,}/ ,
		username : /.{3,}/ ,
		email : /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/ ,
		roll : /^[bmpBMP]+[01]\d[01]\d{3}[a-zA-Z][a-zA-z]/ ,
		pass1 : /.{6}/
	};

	function getRegEx(Obj,id) {
		return Obj[id];
	}

	function val(element) { /* validates the form data */
		input = $(element);
		data = input.attr('value');
		id = input.attr('id');

		switch (id) {
			case 'fname' :
			case 'pass1' :
				verified[id] = getRegEx(regEx, id).test(data);
				entries[id] = data;
				break;
			case 'pass2' :
				verified[id] = (data === entries['pass1']);
				entries[id] = data;
				break;
			case 'username' :
				verified[id] = getRegEx(regEx, id).test(data);
				if ( verified[id] ) {
					$.ajax({
						url: 'response/checkreg.php?username=' + data ,
						async: false,
						dataType: 'json',
						success: function (myObj) {
						ajax = !(!!myObj.status);
						}
					});
				}
				verified[id] = verified[id] && ajax;
				entries[id] = data;
				break;
			case 'email' :
				verified[id] = getRegEx(regEx, id).test(data);
				if ( verified[id] ) {
					$.ajax({
						url: 'response/checkreg.php?email=' + data ,
						async: false,
						dataType: 'json',
						success: function (myObj) {
							ajax = !(!!myObj.status);
						}
					});
				}
				verified[id] = verified[id] && ajax;
				entries[id] = data;
				break;
			case 'roll' :
				verified[id] = getRegEx(regEx, id).test(data);
				if ( verified[id] ) {
					$.ajax({
						url: 'response/checkreg.php?roll=' + data ,
						async: false,
						dataType: 'json',
						success: function (myObj) {
							ajax = !(!!myObj.status);
						}
					});
				}
				verified[id] = verified[id] && ajax;
				entries[id] = data;
				break;
		}

	// Messages and icon change

	for ( i in verified ) {
		if (verified[i] === true ) {
			joinMessage.text(msg[i].valid);
			var input = 'input#' + i;
			$(input).next('img').attr('src','pics/verified.png');
		} else { 
			joinMessage.text(msg[i].invalid);
			break;
			var input = 'input#' + i;
			$(input).next('img').attr('src','pics/cross.png');
		}
	}

} // End of val()

	$("form.join input")
		.keyup(function(){
			var input = this;
			$(input).next('img').attr('src','pics/tinyload.gif');
			val(input);
		})
		.focusout(function(){
			var input = this;
			$(input).next('img').attr('src','pics/tinyload.gif');
			val(input);
		});


	$('#joinButton').click(function(){
		for (i in verified ) {
			if (! verified[i]) { 
				joinMessage.text(msg[i].invalid);
			}
			submit = submit && verified[i];
		}
		if (submit) {
			$.getJSON( 'response/join.php' , entries , function(myObj) {
				if(myObj.status) {
					$('form.join').html("Join Succsessful :)<br/>Now please login with the new username and password").height(70);
					setTimeout(function(){
						$('li#showlogin').trigger('click');
					},1000);
				} else {
					$('form.join').html("Somewhere something went wrong");
				}
			});
		}
	});
} // End of validateJoin()

function validateVideo() {

// Data elements 
var dataTitle ='', dataTags='', dataDesc='' ;;
var status= [0,0,0];

var helpMessage	= $("div#helpLog");
var videoTitle	= $("span.videoTitle");
var videoDesc	= $("div.VideoDesc");
var videoTags	= $("ul.tags");


function val(element) { /* validates the form data, handles images etc */
	var input = $(element);
	var data = input.attr('value');
	var id = input.attr('id');

	if ( id === 'title') {
		videoTitle.text(data);
		dataTitle = data;
		if(data.length > 10 ) {
			status[0]=1;
			helpMessage.text('Okey ! title updated ')
		} else {
			helpMessage.text('Title is too short');
			status[0]=0;
		}
	} else if (id === 'tags' ) {
			helpMessage.text('Enter comma seperated tags');
			var tagList = data.split(',');
			var tagString = "";
			dataTags = data;
			if ( tagList.length < 4) {
					helpMessage.text("Minimum 4 tags please");
					status[1] = 0;
			} else {
				status[1] = 1;
			}
			for ( i in tagList ) {
				tagList[i] = jQuery.trim( tagList[i] );
				if ( tagList[i].length > 2 ) {
					tagString = tagString + "<li><a href='search.php?tag=" + tagList[i] + "'>" + tagList[i] + "</a><li>"
				} else {
					helpMessage.text("Minimum 3 charactres long");
				}
			}
			videoTags.html(tagString);
	} else if (id === 'desc' ) {
		dataDesc = data;
		videoDesc.html(data);
		status[2] =1;
	}
}

$("form.newVideoSubmit input,textarea#desc")
	.focus(function(){
		$(this).keyup(function(){
			var input = $(this);
			val(input);
		});
	})
	.focusout(function(){
			var input = $(this);
			val(input);
	});

$("div.newVideoSubmitButton").click(function(){
	var sum = 0 ;
	console.log(status);
	for (i in status) {
		if (status[i] === 1) { // Error in input feild
			sum = sum + status[i];
		}
	}
	if( sum === 3) {
		dataSeries = $("span#sName").text();
		dataDesc = $("textarea#desc").attr('value');
		$.post("response/submitvideo.php", { title: dataTitle, tags: dataTags, desc:dataDesc } );
		$(this).hide();
		$('div.mainRight').html("Video submitted successfully.<br/>Now you may enjoy it here :)");
	} else {
		helpMessage.text("Error in submitting form, Validate input");
	}
});

} // End of validateVideo()


