/*	Codes to update the myVideos videos in the profile page
	No need to call functions in the html since it is called in the js script.
	Insert the script at the end of the page.
*/

function updatemyVideos() {
	$("#loading").show();
	$.getJSON( 'json/uservideouploads.json.php', function(myJsonObj) {
	
	var len = myJsonObj.length;

	var uploadVideo =  "<div class='storyBox' id='newVideo'><div class='imageBox'><img  src='pics/newvid.png'><div class='metaInfo'></div></div><div class='metaBox'><div class='metaUser'><img class='metaImage' src='pics/me.png'> <span class='metaName'>Jaseem Abid</span></div><div class='metaViews'></div></div></div>";

	$('div#newVideo div.metaInfo').hide();


	var groupBox1 = "<div class='groupBox'>" + uploadVideo ;
		for (i =0; i <3 ; i++){
			var myobj = myJsonObj[i];
			var storyBox = "<div class='storyBox'>" +
				"<a href='video.php?video=" + myobj.cid +"' >" +
				"<div class='imageBox'>" +
					"<img src='" + myobj.poster +"' class='thumbnail'/>" +
					"<div class='metaInfo'>" + myobj.title + "</div>" +
				"</div> </a>" +
				"<div class='metaBox'>" +
					"<div class='metaUser'>" +
						"<img src='" + myobj.userpic + "' class='metaImage' /> " +
						"<span class='metaName' >" + myobj.fullname +"</span>" +
					"</div>" +
					"<div class='metaViews'>" + myobj.viewcount + "</div>" +
				"</div>" +
			"</div>";
			groupBox1 = groupBox1 + storyBox;
		}
	groupBox1 = groupBox1 + "</div>";

	var groupBox2 = "<div class='groupBox Hidden'>";
		for (i =3; i < len ; i++){
			var myobj = myJsonObj[i];
			var storyBox = "<div class='storyBox'>" +
				"<a href='video.php?video=" + myobj.cid +"' >" +
				"<div class='imageBox'>" +
					"<img src='" + myobj.poster +"' class='thumbnail'/>" +
					"<div class='metaInfo'>" + myobj.title + "</div>" +
				"</div> </a>" +
				"<div class='metaBox'>" +
					"<div class='metaUser'>" +
						"<img src='" + myobj.userpic + "' class='metaImage' /> " +
						"<span class='metaName' >" + myobj.fullname +"</span>" +
					"</div>" +
					"<div class='metaViews'>" + myobj.viewcount + "</div>" +
				"</div>" +
			"</div>";
			groupBox2 = groupBox2 + storyBox;
		}
	groupBox1 = groupBox1 + "</div>";

	var myVideosDiv = "<div><span class=groupTitle>My videos</span>" + groupBox1 + "<span class='more'>Gimme more !!</span>" + groupBox2 + "</div><span class='less'>Hide all this !!</span>" ;

		$('div#container').append(myVideosDiv);
	}).complete(function(){
		$('img.metaImage').error(function(){
			$(this).attr('src','pics/default.png');
		});
		$('img.thumbnail').error(function(){
			$(this).attr('src','pics/error.png');
		});
		$('span.more').click(function(){
			$(this).hide();
			$(this).parent().find('.Hidden').slideDown('fast');
			$(this).parent().find('.less').fadeIn();
		});
		$('span.less').click(function(){
			$(this).parent().find('.Hidden').slideUp('fast');
			$(this).parent().find('.more').fadeIn();
			$(this).hide();
		});
	});
	$("#loading").fadeOut('slow');
}
