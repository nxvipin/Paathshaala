/*
	Codes to update the 3 storyBox layouts in the intro page with ajax.
	Call functions in the html after load.
	handling the hide/show more/less stuff here with jquery.
*/

function makeBox (myobj) {
	if( myobj.fullname.length > 16 ) {
		var trim = myobj.fullname.slice(0 ,13 );
			trim = trim + '...';
	} else {
		var trim = myobj.fullname; }

return box = "<div class='storyBox'>" +
	"<a href='video.php?video=" + myobj.cid +"' >" +
		"<div class='imageBox'>" +
		"<img src='" + myobj.poster +"' class='thumbnail'/>" +
		"<div class='metaInfo'>" + myobj.title + "</div>" +
		"</div> </a>" +
	"<div class='metaBox'>" +
		"<div class='metaUser'>" +
			"<img src='" + myobj.userpic + "' class='metaImage' /> " +
			"<span class='metaName' >" + trim +"</span>" +
		"</div>" +
		"<div class='metaViews'>" + myobj.viewcount + "</div>" +
	"</div>" +
"</div>";
}

function updateStoryBox(type) {

/*
	type : Featured / TopRated / Popular
*/

	var link , title;
	var more = "<span class='more'>Gimme more !!</span>";
	var less = "<span class='less'>Hide all this !!</span></div>";

	if(type === 'Featured' ) {
		link = 'json/featured.json.php';
		title = "<span class=groupTitle>Featured</span>" ;
	} else if (type === 'TopRated') {
		link = 'json/toprated.json.php';
		title =  "<span class=groupTitle>Top Rated</span>";
	} else if (type === 'Popular') {
		link = 'json/popular.json.php';
		title = "<span class=groupTitle>Popular</span>";
	} else if (type === 'Liked') {
		link = 'json/uservideolikes.json.php';
		title = "<span class=groupTitle>Liked videos</span>";
	} else if (type === 'Disliked') {
		link = 'json/uservideodislikes.json.php';
		title = "<span class=groupTitle>Disliked videos</span>";
	}

	$.getJSON( link , function(myJsonObj) {
		var count = myJsonObj.length;
		if (count === 4 ) {
			var groupBox = "<div class='groupBox'>";
			for (var i =0; i <4 ; i++){
				var myobj = myJsonObj[i];
				var storyBox = makeBox(myobj)
				groupBox = groupBox + storyBox;
			}
			groupBox = groupBox + "</div>";
			res = title + groupBox;
			$('div#container').append(res);
		} else { /* All multi boxes handled in same way if more than 4 */
			var groupBox1 = "<div class='groupBox'>";
				for (var i =0; i <4 ; i++){
					var myobj = myJsonObj[i];
					var storyBox = makeBox(myobj)
					groupBox1 = groupBox1 + storyBox;
				}
			groupBox1 = groupBox1 + "</div>";

			var groupBox2 = "<div class='groupBox Hidden'>";
				for (i =4; i < count ; i++){
					var myobj = myJsonObj[i];
					var storyBox = makeBox(myobj)
					groupBox2 = groupBox2 + storyBox;
				}
			groupBox2 = groupBox2 + "</div>";
		
			var res = "<div>" + title + groupBox1 + more + groupBox2 + less + "</div>" ;
			$('div#container').append(res);
		}
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
	});	}); /* Ajax call ends */
}
