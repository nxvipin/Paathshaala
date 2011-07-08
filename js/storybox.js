/*	Codes to update the 3 storyBox layouts in the intro page with ajax.
	Call functions in the html after load.
*/


function updateFeatured() {
	$("#loading").show();
	$.getJSON( 'json/featured.json.php', function(myJsonObj) {
	var featuredDiv = "<span class=groupTitle>Featured</span>" +
						"<div class='groupBox'>";
		for (i in myJsonObj){
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
			featuredDiv = featuredDiv + storyBox;
		}
		featuredDiv = featuredDiv + "</div>";
		$('div#container').append(featuredDiv);
	}).complete(function(){
		$('img.metaImage').each(function(){
			$(this).error(function(){
				$(this).attr('src','pics/default.png');
			});
		});
	});
	$("#loading").fadeOut('slow');
	};

function updatePopular() {
	$("#loading").show();
	$.getJSON( 'json/popular.json.php', function(myJsonObj) {

	var groupBox1 = "<div class='groupBox'>";
		for (i =0; i <4 ; i++){
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

	var groupBox2 = "<div class='groupBox' id='popularHidden'>";
		for (i =4; i <8 ; i++){
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

	var popularDiv = "<span class=groupTitle>Popular</span>" + groupBox1 + "<span class='more' id='popularMore' onclick='showPopular()'>Gimme more !!</span>" + groupBox2 + "<span class='less' id=popularLess onclick='hidePopular()'>Hide all this !!</span>" ;

		$('div#container').append(popularDiv);
	}).complete(function(){
		$('img.metaImage').each(function(){
			$(this).error(function(){
				$(this).attr('src','pics/default.png');
			});
		});
	});
	$("#loading").fadeOut('slow');
}

function updateTopRated() {
	$("#loading").show();
	$.getJSON( 'json/toprated.json.php', function(myJsonObj) {
	var featuredDiv = "<span class=groupTitle>Top Rated</span>" +
						"<div class='groupBox'>";
		for (i in myJsonObj){
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
			featuredDiv = featuredDiv + storyBox;
		}
		featuredDiv = featuredDiv + "</div>";
		$('div#container').append(featuredDiv);
	}).complete(function(){
		$('img.metaImage').each(function(){
			$(this).error(function(){
				$(this).attr('src','pics/default.png');
			});
		});
	});
	$("#loading").fadeOut('slow');
}
