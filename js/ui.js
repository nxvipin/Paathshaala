$(".searchBox").
	focus(function () {
		$(this).animate({width: '380px'} , 250 , '' , function () {}) 
	}).
	focusout(function () {
		$(this).animate({width: '270px'} , 150 , '' , function () {});
});

var dashShown = 0;
var loginShown = 0;
var joinShown = 0;

function showDash() {

	if (dashShown === 0) {
		$('.dashBoard').slideToggle('fast');
		dashShown = 1;
		$("#logChangeButton").attr('src', 'pics/up.png');
	} else {
		$('.dashBoard').slideToggle('fast');
		dashShown = 0;
		$("#logChangeButton").attr('src', 'pics/down.png');
	}
}

function showlogin() {
	if (loginShown === 0 ) {
		$('.login').slideToggle('fast');
		$('.join').slideUp('fast');
		loginShown = 1;
		joinShown = 0;
		$("#logChangeButton").attr('src', 'pics/up.png');
	} else {
		$('.login').slideToggle('fast');
		loginShown = 0;
		$("#logChangeButton").attr('src', 'pics/down.png');
	}
}

function showJoin() {
	if (joinShown === 0 ) {
		$('.join').slideToggle('fast');
		$('.login').slideUp('fast');
		joinShown = 1;
		loginShown = 0;
		$("#logChangeButton").attr('src', 'pics/up.png');
	} else {
		$('.join').slideToggle('fast');
		joinShown = 0;
		$("#logChangeButton").attr('src', 'pics/down.png');
	}
}

$('img.metaImage , img.loggedImage').error(function(){
	$(this).attr('src','pics/default.png');
})

$('div#snapShot img, div.commentBoxImage img').error(function(){
	$(this).attr('src','pics/profile.png');
})

/* Submit comment using an enter key press */

$('#comment').keypress(function(event) {
	if (event.which == '13') {
		event.preventDefault();
		subComment();
	}
});

/* Need the jkey plugin */
/* New line in comment using a down key press */

$('#comment').jkey('down',function(){
	var comBox =$('#comment');
	data = comBox.attr('value') + '\n';
	comBox.attr('value' , data);
});

/* Handle height of comment box */

var commbox = $('textarea#comment').parent().parent().parent();
var ht = commbox.height();
$('textarea#comment').keyup( function() {
	var len = $('#comment').attr('value').length;
	var lineno = Math.floor( Number(len) / 40 );
	$(this).attr('rows' , lineno + 2)
	commbox.height(ht + (21 * lineno) );
});

/* Need grayout.js */
/* popup stuff */

function hideFeedback() {
	$('#feedback').fadeOut("fast");
	grayOut(false);
}

function showFeedback() {
	grayOut(true);
	$('#feedback').load('feedback.html').fadeIn("slow");
}

function hideEditProfile() {
	$('#editProfile').fadeOut("fast");
	grayOut(false);
}

function showEditProfile() {
	grayOut(true);
	$('#editProfile').load('editprofile.html').fadeIn("slow");
}

$('img#bugButton.VideoBarButton').click(function(){
	showFeedback();
});

$('img#downloadButton.VideoBarButton').click(function(){
	alert('Please right click on the video and save the video while being played');
});

$('img#editProfileButton').click(function(){
	showEditProfile();
});

setTimeout(function(){
	$('#loading').fadeOut(1000);
}, 200);
