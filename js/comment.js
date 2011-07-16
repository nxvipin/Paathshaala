function updateComment(cid) {
	$("#loading").show();
	$.getJSON( "couch/comments/_design/comments/_view/commentbycid?key=" + cid + "\"", function(jsonObj) {
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
			"<div class='commentBox' cId='" + comments[i]["id"] +"' revId='" + comment[5] + "'>" +
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
			var revId = click.attr('revId');
			var temp = cross.parent().children(".data"); // <div class='data'>
			var origContent = temp.html();
			temp.html("<div id='delConfirmRespText'>You really want to delete this comment ? <br/> <span class='delYesNo' id='delYes'> Yes </span> <span class='delYesNo' id='delNo'> No </span></div>");
			cross.css({'color':'#f9f9f9' , 'cursor':'url(pics/arrow.png), auto' });
			$('span#delYes').click(function() {
				click.fadeOut("slow");
				$.post("response/deletecomment.php", { commentId: commentId, revId:revId } );
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
			var revId = click.attr('revId');
			var temp = cross.parent().children(".data"); // <div class='data'>
			var origContent = temp.html();
			temp.html("<div id='delConfirmRespText'>You really want to report this comment ? <br/> <span class='delYesNo' id='delYes'> Yes </span> <span class='delYesNo' id='delNo'> No </span></div>");
			cross.css({'color':'#f9f9f9' , 'cursor':'url(pics/arrow.png), auto' });
			$('span#delYes').click(function() {
				click.fadeOut("slow");
				$.post("response/reportcomment.php", { commentId: commentId, revId:revId } );
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

/* Comment submit function */
/* Change attributes and file to submit the comment */ 

function subComment() {
	var cid = $('video').attr('cid');
	var comm = $("#comment").attr('value');
	if(comm !== '') {
		$('#loading').fadeIn('fast');
		$.post("response/submitcomment.php", { comment: comm, cid:cid },
			function(data) {
				$('#commentInfo').html(data); /* displaying the returned comment, remove in production code */
		});
	}
	$("#comment").attr('value' , ''); /* Clear comment feild */
	$('#loading').fadeOut('fast');
}
