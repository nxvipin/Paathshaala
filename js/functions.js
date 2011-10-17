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

Object.prototype.allTrue = function() {
	var i = 0;
	for (i in this) {
		if(this.hasOwnProperty(i)) {
			if(!this[i]) return false;
		}
	}
	return true;
}

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




 /*
	Functions to handle form manipulations
	Code wrapped in validateJoin() & validateVideo(), which is called in respective pages.
	validateJoin() called when form.join is shown
	validateVideo() called in contribute page after page load.
	This code needs lot of clean up, ugly implementation.
	TODO
		Move all validation to RegEx
		Need better status variables.
		Better error messages
		No message loop in the end needed.
		Standard way to print messages
		Get rid of loose variables and use objects
*/


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


