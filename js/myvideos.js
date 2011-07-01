/*	Codes to update the myVideos videos in the profile page
	No need to call functions in the html since it is called in the js script.
	Insert the script at the end of the page.
*/


function updatemyVideos() {
	$("#loading").show();
	$.getJSON( 'json/myVideos.json', function(myJsonObj) {
	
	var len = myJsonObj.length;

	var uploadVideo =  "<div class='storyBox' id='newVideo'><div class='imageBox'><img  src='content/cross.png'><div class='metaInfo'>Upload a new video</div></div><div class='metaBox'><div class='metaUser'><img class='metaImage' src='pics/me.png'> <span class='metaName'>Jaseem Abid</span></div><div class='metaViews'></div></div></div>";



	var groupBox1 = "<div class='groupBox'>" + uploadVideo ;
		for (i =0; i <3 ; i++){
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
						"<span class='metaName' >" + myobj.uname +"</span>" +
					"</div>" +
					"<div class='metaViews'>" + myobj.viewcount + "</div>" +
				"</div>" +
			"</div>";
			groupBox1 = groupBox1 + storyBox;
		}
	groupBox1 = groupBox1 + "</div>";

	var groupBox2 = "<div class='groupBox' id='myVideosHidden'>";
		for (i =3; i < len ; i++){
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
						"<span class='metaName' >" + myobj.uname +"</span>" +
					"</div>" +
					"<div class='metaViews'>" + myobj.viewcount + "</div>" +
				"</div>" +
			"</div>";
			groupBox2 = groupBox2 + storyBox;
		}
	groupBox1 = groupBox1 + "</div>";

	var myVideosDiv = "<span class=groupTitle>My videos</span>" + groupBox1 + "<span class='more' id='myVideosMore' onclick='showMyVideos()'>Gimme more !!</span>" + groupBox2 + "<span class='less' id=myVideosLess onclick='hideMyVideos()'>Hide all this !!</span>" ;

		$('div#container').append(myVideosDiv);
	});
	$("#loading").fadeOut('slow');
}



updatemyVideos();
