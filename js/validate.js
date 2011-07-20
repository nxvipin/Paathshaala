/*
	Functions to handle all join form manipulations
	The whole code wrapped in validate() function which is called when form.join is shown
*/

function validate() {

/* Reg expressions */
var email = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
var rollnum = /^[bmp]+[01]\d[01]\d{3}[a-z][a-z]/;

function val(element) { /* validates the form data, handles images etc */
	var input =	$(element);
	var data =	input.attr('value');
	var id =	input.attr('id');
	var joinMessage = $('div.joinMessage');
	var status = 0;
	if ( id === 'fname') { 
		if(data.length > 5) {
			status = 1;
			joinMessage.text('Okey ! Welcome ' + data)
		} else {
			joinMessage.text('Full name too short');
		}
	} //else if (id === 'uname' ) { /* Username handled differently outside this function */
		//	joinMessage.addClass('error').text('You shouldn\'t be seeing this :(');
	/*} */else if (id === 'email' ) {
			var res = email.test(data); // Validates email based on custom regex
			status = res === true ? 1 : 0; 
			if (status) {
				joinMessage.removeClass('error').text('Okey, we wont spam you :)');
			} else {
				joinMessage.addClass('error').text('Thats not a valid mail id :(');
			}
		} else if (id === 'roll' ) {
			var res = rollnum.test(data);
			status = res === true ? 1 : 0;
			if (status) {
				joinMessage.removeClass('error').text('Okey, seems like one :)');
			} else {
				joinMessage.addClass('error').text('Enter a valid NITC roll number ');
			}
		} else if (id === 'pass1' ) {
			status = 1; // sets status to 1 and revert to zero on any errors defined down with custom error message
			joinMessage.addClass('error').text('Enter a secure password');
			// Add more password restrictions here. Harder ones in the end. Use else if to traverse since 1 top error is enough to block it.
			if (data === $("form.join input#uname").attr('value') ) {
				var msg = "Password is same as your username";
				status = 0;
			} else if ( data.length < 6 ) {
				var msg = "Password too short";
				status = 0;
			}
			
			if (status) {
				joinMessage.removeClass('error').text('Secure password !');
			} else {
				joinMessage.text(msg);
			}
			
		} else if (id === 'pass2' ) {
			var pass1 = $("form.join input#pass1").attr('value');
			if (data === pass1 ) {
				status = 1;
				joinMessage.removeClass('error').text('Same password entered');
			} else {
				joinMessage.addClass('error').text('Enter the same password');
			}
		} else {
			joinMessage.addClass('error').text('Something went wrong !');
		}
		
		if(status === 1 ) {
			$(input).next('img').attr('src','pics/verified.png');
			joinMessage.removeClass('error');
		} else {
			$(input).next('img').attr('src','pics/cross.png');
			joinMessage.addClass('error');
		}
}

$("form.join input")
	.focus(function(){
		$(this).next('img').attr('src','pics/tinyload.gif')
		$(this).keyup(function(){
			var input = $(this);
			if (input.attr('id') !== 'uname' ) {
				val(input);
			} else {
				$("span.check").fadeIn()
			}
		});
	})
	.focusout(function(){
			var input = $(this);
			if (input.attr('id') !== 'uname' ) {
				val(input);
			} else {
				$("span.check").fadeIn()
			}
	});

$("span.check").click(function(){
	var input =	$("form.join input#uname")
	var data =	input.attr('value');
		$.getJSON( 'checkuser.php?var=' + data  , function(myObj) {
			joinMessage.addClass('error');
			status = myObj.s; /* variable scope error, cant take this value out */
			if (status === 1) {
				$(input).next('img').attr('src','pics/verified.png');
				joinMessage.removeClass('error').text('Username is available');
				$("span.check").fadeOut()
			} else {
				joinMessage.text('Username is not available');
			}
		});
});

} // End of validate()

