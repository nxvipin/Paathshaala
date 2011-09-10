 /*
	Functions to handle all join form manipulations
	The whole code wrapped in validate() function which is called when form.join is shown
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

/*
	Functions to handle all join form manipulations
	The whole code wrapped in validate() function which is called when form.join is shown
	This code needs lot of clean up, ugly implementation to validate input feilds, move all to reg ex and improve the status method.
*/

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

