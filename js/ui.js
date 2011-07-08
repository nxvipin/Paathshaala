$(".searchBox").
	focus(function () {
		$(this).animate({width: '380px'} , 250 , '' , function () {}) 
	}).
	focusout(function () {
		$(this).animate({width: '270px'} , 150 , '' , function () {});
});

$(".delComCross").click(function() {
	var cross = $(this);
	var click = cross.parent().parent(); // Click is the whole comm div
	var commentId = click.attr('cId');
	var temp = cross.parent().children(".data"); // <div class='data'>
	var origContent = temp.html();
	temp.html("<div id='delConfirmRespText'>You really wanna delete the coment ? <br/> <span class='delYesNo' id='delYes'> Yes </span> <span class='delYesNo' id='delNo'> No </span></div>");
	cross.css({'color':'#f9f9f9' , 'cursor':'url(pics/arrow.png), auto' });
	$('span#delYes').click(function() {
		click.fadeOut("slow");
		$.post("delC.php", { comId: commentId } );
	});
	$('span#delNo').click(function() {
		temp.html(origContent);
		cross.css({'color':'#555555' , 'cursor':'url(pics/pointer.png), auto' });
	});
});

function showPopular() {
	$('#popularMore').hide();
	$('#popularHidden').slideDown('fast');
	$('#popularLess').fadeIn();
}

function hidePopular() {
	$('#popularMore').fadeIn();
	$('#popularHidden').slideUp('fast');
	$('#popularLess').hide();
}

function showLiked() {
	$('#likedMore').hide();
	$('#likedHidden').slideDown('fast');
	$('#likedLess').fadeIn();
}

function hideLiked() {
	$('#likedMore').fadeIn();
	$('#likedHidden').slideUp('fast');
	$('#likedLess').hide();
}

function showMyVideos() {
	$('#myVideosMore').hide();
	$('#myVideosHidden').slideDown('fast');
	$('#myVideosLess').fadeIn();
}

function hideMyVideos() {
	$('#myVideosMore').fadeIn();
	$('#myVideosHidden').slideUp('fast');
	$('#myVideosLess').hide();
}

var dashShown = 0;
var loginShown = 0;

function showDash() {

	if (dashShown === 0) {
		$('.dropDown').slideToggle('fast');
		dashShown = 1;
		$("#logChangeButton").attr('src', 'pics/up.png');
	} else {
		$('.dropDown').slideToggle('fast');
		dashShown = 0;
		$("#logChangeButton").attr('src', 'pics/down.png');
	}
}

function showlogin() {
	if (loginShown === 0 ) {
		$('.login').slideToggle('fast');
		loginShown = 1;
		$("#logChangeButton").attr('src', 'pics/up.png');
	} else {
		$('.login').slideToggle('fast');
		loginShown = 0;
		$("#logChangeButton").attr('src', 'pics/down.png');
	}
}

$(document).ready(function(){
	$('img.metaImage').error().attr('src','pics/default.png');
});

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
	commbox.height(ht + (22 * lineno) );
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
