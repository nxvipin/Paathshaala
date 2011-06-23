$(".searchBox").
	focus(function () {
		$(this).animate({width: '380px'} , 250 , '' , function () {}) 
	}).
	focusout(function () {
		$(this).animate({width: '270px'} , 150 , '' , function () {});
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



