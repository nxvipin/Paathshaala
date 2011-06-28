/*
	Codes to update the commentBox layout in the video page.
	No need to call functions in the html since it is called in the js script.
	Insert the script at the end of the page.
*/

function updateComment() {
	$("#loading").show();
	$.getJSON( 'json/comment.json', function(myJsonObj) {
		var commentDiv = '';
		for (i in myJsonObj){
			var myobj = myJsonObj[i];

			var commentBox = 
			"<div class='commentBox' cId='" + myobj.commentid +"' >" +
				"<div class='commentBoxImage'> <img src='" + myobj.authorpic + "' class='fitin' /> </div>" +
				"<div class='commentBoxText'>" +
					"<span class='delComCross'>X</span>" +
					"<span class='commentTitle'>"+ myobj.author +"</span>" +
					"<time class='timeago' datetime='" + myobj.timestamp + "'></time>" +
					"<div class='data'>" + myobj.data + "</div>" +
				"</div>" +
			"</div>";
			commentDiv = commentDiv + commentBox;
		}

		$('div.commentWarp').html(commentDiv);
	}).complete(function() {

/* Handler for the 'X' on the comment box */

		$("span.delComCross").click(function() {
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
	
	$('.commentBoxText').each(function() { /* Expand parent wrt to child */
		var ht = $(this).height();
		$(this).parent().height(ht);
	});

	$('img').error(function() {
		$(this).attr('src','pics/default.png');
	});

	});
	$("#loading").fadeOut('slow');
}

/* Function calls to update the dom, no need to call in the page.*/
updateComment();
