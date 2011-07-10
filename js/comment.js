/*
	Codes to update the comments in the video page.
	No need to call functions in the html since it is called in the js script.
	Insert the script at the end of the page.
*/

function updateComment() {
	$("#loading").show();
	$.getJSON( 'json/comments.json.php', function(jsonObj) {
		var commentDiv = '';
		var comments = jsonObj.rows;
		var activeUser = getActiveUser();
		function compare(a,b) {
			if(a === b )
				return "<span class='CommentCrossDelete'>X</span>";
			else
				return "<span class='CommentCrossReport'>X</span>";
		}
		for (i in comments){
			var comment = comments[i].value;
			var userId = comment[0];
			var commentBox = 
			"<div class='commentBox' cId='" + comments[i]["id"] +"' >" +
				"<div class='commentBoxImage'> <img src='" + comment[3] + "' class='fitin' /> </div>" +
				"<div class='commentBoxText'>" +
					compare(activeUser, userId ) +
					"<span class='commentTitle'>"+ comment[1] +"</span>" +
					"<time class='timeago' datetime='" + comment[4] + "'></time>" +
					"<div class='data'>" + comment[2] + "</div>" +
				"</div>" +
			"</div>";
			commentDiv = commentDiv + commentBox;
		}
		$('div.commentWarp').html(commentDiv);
	}).complete(function() {

/* Handler for the 'X' on the comment box */

		$("span.CommentCrossDelete").click(function() {
			var cross = $(this);
			var click = cross.parent().parent(); // Click is the whole comm div
			var commentId = click.attr('cId');
			var temp = cross.parent().children(".data"); // <div class='data'>
			var origContent = temp.html();
			temp.html("<div id='delConfirmRespText'>You really want to delete this comment ? <br/> <span class='delYesNo' id='delYes'> Yes </span> <span class='delYesNo' id='delNo'> No </span></div>");
			cross.css({'color':'#f9f9f9' , 'cursor':'url(pics/arrow.png), auto' });
			$('span#delYes').click(function() {
				click.fadeOut("slow");
				$.post("response/deletecomment.response.php", { comId: commentId } );
			});
			$('span#delNo').click(function() {
				temp.html(origContent);
				cross.css({'color':'#555555' , 'cursor':'url(pics/pointer.png), auto' });
			});
		});

		$("span.CommentCrossReport").click(function() {
			var cross = $(this);
			var click = cross.parent().parent(); // Click is the whole comm div
			var commentId = click.attr('cId');
			var temp = cross.parent().children(".data"); // <div class='data'>
			var origContent = temp.html();
			temp.html("<div id='delConfirmRespText'>You really want to report this comment ? <br/> <span class='delYesNo' id='delYes'> Yes </span> <span class='delYesNo' id='delNo'> No </span></div>");
			cross.css({'color':'#f9f9f9' , 'cursor':'url(pics/arrow.png), auto' });
			$('span#delYes').click(function() {
				click.fadeOut("slow");
				$.post("response/reportcomment.response.php", { comId: commentId } );
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

	$('div.commentBoxImage img').error(function() {
		$(this).attr('src','pics/default.png');
	});
	
	$("time.timeago").timeago();
	
	});
	$("#loading").fadeOut('slow');
}

/* Function calls to update the dom, no need to call in the page.*/
updateComment();
