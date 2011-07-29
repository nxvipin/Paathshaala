/*
	Functions to handle all join form manipulations
	The whole code wrapped in validate() function which is called when form.join is shown
*/

function validate() {
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
		fname : /\w{5,}/ ,
		username : /.{3,}/ ,
		email : /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/ ,
		roll : /^[bmp]+[01]\d[01]\d{3}[a-z][a-z]/ ,
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
					$('form.join').html("Join Succsessful, Now please login with the new username and password");
				} else {
					$('form.join').html("Somewhere something went wrong");
				}
			});
		}
	});
} // End of validate()
