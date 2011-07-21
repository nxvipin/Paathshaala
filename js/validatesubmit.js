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

} // End of validate()

