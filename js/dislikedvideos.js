/*
	Codes to update the disliked videos in the profile page
*/

function updateDisliked() {
	$("#loading").show();
	$.getJSON( 'json/uservideodislikes.json.php', function(myJsonObj) {
	var len = myJsonObj.length;
	var groupBox1 = "<div class='groupBox'>";
		for (i =0; i <4 ; i++){
			var myobj = myJsonObj[i];
			var storyBox = "<div class='storyBox'>" +
				"<a href='video.php?video=" + myobj.cid +"' >" +
				"<div class='imageBox'>" +
					"<img src='" + "http://localhost/paathshaala/content/thumb.jpg" +"' class='thumbnail'/>" + /* myobj.poster */
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

	var groupBox2 = "<div class='groupBox' id='DisLikedHidden'>";
		for (i =4; i < len ; i++){
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

	var disLikedDiv = "<span class=groupTitle>Disliked videos</span>" + groupBox1 + "<span class='more' id='disLikedMore' onclick='showDisliked()'>Gimme more !!</span>" + groupBox2 + "<span class='less' id=DisLikedLess onclick='hideDisliked()'>Hide all this !!</span>" ;

		$('div#container').append(disLikedDiv);
	}).complete(function(){
		$('img.metaImage').each(function(){
			$(this).error(function(){
				$(this).attr('src','pics/default.png');
			});
		});
		$('img.thumbnail').each(function(){
			$(this).error(function(){
				$(this).attr('src','pics/error.png');
			});
		});
	});
	$("#loading").fadeOut('slow');
}
