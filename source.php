<?php
	session_start();

$header="
	<meta charset='UTF-8' />
	<link rel='shortcut icon' href='favicon.ico'>
	<link rel='stylesheet/less' type='text/css' href='css/structure.less'>
	<link rel='stylesheet/less' type='text/css' href='css/storybox.less'>
	<script src='js/less-1.1.3.min.js' type='text/javascript'></script>";

$scripts="
	<script src='js/jquery.js' type='text/javascript'></script>
	<script src='js/functions.js' type='text/javascript' ></script>";

$feedback = "<img src='pics/feedback.png' alt='feedback button' title='feedback button' class='feedbackDock' />
<div id='feedback'></div>";

$piwik = "<script type=\"text/javascript\">var pkBaseURL =\"http://192.168.5.27/piwik/\"; document.write(unescape(\"%3Cscript src=\'\" + pkBaseURL + \"piwik.js\' type=\'text/javascript\'%3E%3C/script%3E\"));</script><script type=\"text/javascript\">try {var piwikTracker = Piwik.getTracker(pkBaseURL + \"piwik.php\", 1);piwikTracker.trackPageView();piwikTracker.enableLinkTracking();} catch( err ) {} </script>";

$nullImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJCgcqHkarI5cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQ4y2P8//8/AyWAiYFCMGrAqAGjBgwWAwBjmgMd7D3zQQAAAABJRU5ErkJggg==";

	if(!isset($_SESSION['uid'])){
$topBar = "<div id='top'>
	<a href='index.php' id='logo' title='Paathshaala'> <h1></h1> </a>
<div class='topbarLeft'>
	<form action='search.php' method='get' >
	<img src='pics/search.png' class='searchButton' /> 
	<input type='search' name='tag' placeholder='Search' class='searchBox' required />
	</form>
</div>
	<ul class='userBar'>
		<li id=showJoin><a>Join</a></li>
		<li>|</li>
		<li id=showlogin><a>Login</a>&nbsp;&nbsp;<img src='pics/down.png' id='logChangeButton'/></li>
	</ul>

<form class='login' action='response/login.php' method='post'>
		<img src='pics/users.png'> <input required type='text' name='uname' placeholder='Username' /> <br />
		<img src='pics/key.png'> <input required type='password' name='pass' placeholder='Password' /> <br />
		<input type='hidden' name='page' value='".$_SERVER['PHP_SELF']."'>
		<input type='hidden' name='parameter' value='".http_build_query($_GET)."'>
		<button type='submit' id='loginButton' type='button'>login</button>
</form>

<form class='join' action='response/join.php' method='get'>
		<div class='joinMessage'>Enter your credentials</div>
		<img src='pics/user.png'> <input required type='text' id='fname' placeholder='Full Name' /> <img src='.$nullImage.'><br />
		<img src='pics/users.png'> <input required type='text' id='username' placeholder='Username' /> <img src='.$nullImage.'> <br />
		<img src='pics/mail.png'> <input required type='email' id='email' placeholder='Email'/> <img src='.$nullImage.'><br />
		<img src='pics/roll.png'> <input required type='text' id='roll' placeholder='Roll Number' /> <img src='.$nullImage.'> <br />
		<img src='pics/key.png'> <input required type='password' id='pass1' placeholder='Password' /> <img src='.$nullImage.'> <br />
		<img src='pics/key.png'> <input required type='password' id='pass2' placeholder='Password again'/> <img src='.$nullImage.'> <br />
		<button id='joinButton' type='button'>Join</button>
</form>
</div>
<img src='pics/load.gif' id='loading' style='display:none;'>";
	}
	else{

$topBar = "<div id='top'>
<a href='index.php' id='logo' title='Paathshaala'> <h1></h1> </a>
<div class='topbarLeft'>
	<form action='search.php' method='get' >
	<img src='pics/search.png' class='searchButton' /> 
	<input type='search' name='tag' placeholder='Search' class='searchBox' required />
	</form>
</div>
</ul>

<div class='loggedUser'>
<img src='".$_SESSION['userpic']."' class='loggedImage' id='loggedImage'/>
<span class='loggedName' >".$_SESSION['fullname']."</span>
<img src='pics/down.png' id='logChangeButton' style='position:relative; top:-9px; height:10px;'>
</div>
<div class='dashBoard' style='display:none'>
<a href='profile.php'><img src='pics/home.png'> Dashboard </a><br />
<a href='faq.php'><img src='pics/settings.png'> Help </a><br />
<a href='response/logout.php'><img src='pics/tick.png'> Sign off </a><br />
</div>
</div>
<img src='pics/load.gif' id='loading' style='display:none;'> ";
}

$bottomBar = "<div id='bottom'>
	<a href='http://www.teamunwired.org/' id='logo' title='teamunwired'> <h1></h1> </a>
	<ul class='bottomLinks'>
		<li><a href=''>Credits</a></li>
		<li>|</li>
		<li><a href='faq.php'>Faq</a></li>
		<li>|</li>
		<li><a href=''>Contribute</a></li>
		<li>|</li>
		<li>
			<a href='http://www.teamunwired.org/'>Teamunwired</a> &nbsp;&nbsp;
			<a href='http://www.teamunwired.org/'><img src='pics/web.png'></a>&nbsp;&nbsp;
			<a href='http://www.facebook.com/teamunwired'><img src='pics/facebook.png'></a>&nbsp;&nbsp;
			<a href='http://www.twitter.com/teamunwired'><img src='pics/twitter.png'></a>
		</li>
		<li>|</li>
		<li>
			<a href='https://github.com/nitcalicut/Paathshaala/'>Paathshaala &nbsp;</a>&nbsp;
			<a href='http://www.facebook.com/paathshaala.tuw'><img src='pics/facebook.png'> </a>&nbsp;&nbsp;
			<a href='http://twitter.com/jaseemabid/'><img src='pics/twitter.png'> </a></li>
		</ul>
	</div> <!-- /bottom -->
	<div id='bottombar'></div>";

if(isset($_SESSION['uid']))
{
$commentSubmit = "<div class='commentBox'style='height: 70px;'>
	<div class='commentBoxImage'> <img src='".$_SESSION['userpic']."' class='fitin' /> </div>
	<div class='commentBoxText'>

			<span class='commentTitle' style='margin-left:5px;'>".$_SESSION['fullname']."</span>
			<div class='data'>
				<textarea id='comment' rows='2' cols='57' placeholder='Comment here. Enter for submit and down key for new line.'></textarea>
			</div>
	</div>
</div>";
}
else
{
	$commentSubmit="Please log in to comment.";
}



?>

