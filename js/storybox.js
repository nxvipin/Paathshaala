/*
	Codes to update the 3 storyBox layouts in the intro page with ajax.
	Call functions in the html after load.
	handling the hide/show more/less stuff here with jquery.
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
		$('img.thumbnail').each(function(){
			$(this).error(function(){
				$(this).attr('src','pics/error.png');
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

	var groupBox2 = "<div class='groupBox Hidden'>";
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
	groupBox2 = groupBox2 + "</div>";

	var popularDiv = "<div><span class=groupTitle>Popular</span>" + groupBox1 + "<span class='more'>Gimme more !!</span>" + groupBox2 + "<span class='less' onclick='hideMore()'>Hide all this !!</span></div>" ;

		$('div#container').append(popularDiv);
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
		$('img.thumbnail').each(function(){
			$(this).error(function(){
				$(this).attr('src','pics/error.png');
			});
		});
	});
	$("#loading").fadeOut('slow');
}
