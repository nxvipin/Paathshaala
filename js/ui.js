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


