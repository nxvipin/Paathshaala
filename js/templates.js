/*
	Template files go here.
	Templates parsed in to content using the supplant property defined in ECMAScript5
	video = templates.video.supplant(myObj);
*/
var templates = {};
templates.video = "<span class='videoTitle'>{title}</span><br/><span class='videoUser'> Video by : {uname} </span><!-- Begin VideoJS --><div class='video-js-box'><video cid={cid} poster='{poster}' class='video-js' controls preload height=325 width=550><source src='{path}' type='video/ogg; codecs=\"theora, vorbis\"' /></video></div><!-- End VideoJS --><!-- video bar --><div class='videoBar'><img src='pics/vidbar/watch.png' class='VideoBarButton' /><span class='videoBarElement' id='playCount'>Views:{viewcount}</span><span id='likes' defStatus='{likestatus}' >{likestatus}</span><img src='pics/vidbar/download.png' title='Download' class='VideoBarButton' style='float:right;' id='downloadButton' /></div><!-- /video bar --><img src='pics/vidbar/tag.png' title='tags' style='margin-left:6px;'/><ul class='tags'>{tagString}</ul>{series}<div class='VideoDesc'>{desc}</div>";
templates.box = "<div class='storyBox'><a href=\"video.php?video={cid}\"><div class='imageBox'><img src={poster} class='thumbnail'/><div class='metaInfo'>{title}</div></div> </a><div class='metaBox'><div class='metaUser'><img src='{userpic}' class='metaImage' /> <span class='metaName' >{fullname}</span></div><div class='metaViews'>{viewcount}</div></div></div>";

templates.series = "<div class='series'><img src='pics/series.png'/><span>This video #{order} of <a href=\"search.php?sid={sid}\"><span id='sName'>{sname}</span></a> </span></div>"

templates.searchVid = "<div class='relatedVideo'><a href='video.php?video={cid}' title='{title}' ><div class='relatedVideoImage' > <img src={poster} class='fitin' /></div><div class='relatedVideoContent'> <span class='sideTitle'>{title}</span></a><br />By, <span class='sideUploader'>{fullname}</span>" +"<time class='timeago' datetime={timestamp}></time><br/>Watched {viewcount} times" +/* "<span class='contentChange'> " + Watched + Response + " </span>" + */"</div></div>";

