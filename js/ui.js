
	/* Grayout */

function grayOut(vis,options){var options=options||{},zindex=options.zindex||99,opacity=options.opacity||50,opaque=(opacity/70),bgcolor=options.bgcolor||'#030303',dark=document.getElementById('darkenScreenObject');if(!dark){var tbody=document.getElementsByTagName("body")[0],tnode=document.createElement('div');tnode.style.position='fixed';tnode.style.top='0px';tnode.style.left='0px';tnode.style.overflow='hidden';tnode.style.display='none';tnode.id='darkenScreenObject';tbody.appendChild(tnode);dark=document.getElementById('darkenScreenObject');}if(vis){if(document.body&&(document.body.scrollWidth||document.body.scrollHeight)){var pageWidth='100%';var pageHeight='2000px';}dark.style.opacity=opaque;dark.style.MozOpacity=opaque;dark.style.filter='alpha(opacity='+opacity+')';dark.style.zIndex=zindex;dark.style.backgroundColor=bgcolor;dark.style.width=pageWidth;dark.style.height=pageHeight;dark.style.display='block';}else{dark.style.display='none';}}

function hideFeedback() {
	$('div#feedback').fadeOut("fast");
	grayOut(false);
}

function showFeedback() {
	grayOut(true);
	$('div#feedback').load('feedback.html').fadeIn("slow");
}

function hideEditProfile() {
	$('#editProfile').fadeOut("fast");
	grayOut(false);
}

function showEditProfile() {
	grayOut(true);
	$('div#editProfile').load('editprofile.html').fadeIn("slow");
}

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

$("div.loggedUser").click(function(){
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

$("li#showlogin").click(function(){
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

$("li#showJoin").click(function() {
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

$('img#bugButton.VideoBarButton, img.feedbackDock').click(function(){
	showFeedback();
});

$('img.metaImage , img.loggedImage').error(function(){
	$(this).attr('src','pics/default.png');
});

$('div#snapShot img, div.commentBoxImage img').error(function(){
	$(this).attr('src','pics/profile.png');
});

$('span.news').click(function(){
	$('div#indexMesssage').fadeOut("fast");
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

var commbox = $('textarea#comment').parent().parent().parent(), ht = commbox.height();
$('textarea#comment').keyup( function() {
	var len = $('#comment').attr('value').length;
	var lineno = Math.floor( Number(len) / 40 );
	$(this).attr('rows' , lineno + 2)
	commbox.height(ht + (14 * lineno) );
});
