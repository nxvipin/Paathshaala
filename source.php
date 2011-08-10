<?php
	session_start();
$header="
	<meta charset='UTF-8' />
	<link rel='stylesheet' href='css/structure.css'/>
	<link rel='stylesheet' href='css/popup.css'/>
	<link rel='stylesheet' href='css/storybox.css'/>
	<script src='js/jquery-1.6.1.min.js' type='text/javascript'></script>
	<script src='js/jquery.timeago.js' type='text/javascript'></script>
	<script src='js/jquery.jkey.js' type='text/javascript' ></script>
	<script src='js/functions.js' type='text/javascript' ></script>
	<script src='js/validate.js' type='text/javascript' ></script>
	<script src='js/templates.js' type='text/javascript'></script>
	<script src='js/jsonparse.js' type='text/javascript'></script>";

	if(!isset($_SESSION['uid'])){
$topNotLoggedIn = "<div id='top'>
	<a href='index.php' id='logo' title='Paathshaala'> <h1></h1> </a>
	<ul class='topbarLeft'>
		<li>
			<form action='search.php' method='get' >
				<input type='search' name='tag' placeholder='Search' class='searchBox' required />
				 <button type='submit' class='searchButton'>
					<img src='pics/search.png' alt=''/>
				</button>
			</form>
		</li>
	</ul>

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
		<img src='pics/user.png'> <input required type='text' id='fname' name='fname' placeholder='Full Name' /> <img src=''><br />
		<img src='pics/users.png'> <input required type='text' id='username' name='uname' placeholder='Username' /> <img src=''> <br />
		<img src='pics/mail.png'> <input required type='email' id='email' name='email' placeholder='Email'/> <img src=''><br />
		<img src='pics/roll.png'> <input required type='text' id='roll' name='roll' placeholder='Roll Number' /> <img src=''> <br />
		<img src='pics/key.png'> <input required type='password' id='pass1' name='pass1' placeholder='Password' /> <img src=''> <br />
		<img src='pics/key.png'> <input required type='password' id='pass2' name='pass2' placeholder='Password again'/> <img src=''> <br />
		<button id='joinButton' type='button'>Join</button>
</form>
</div> <!-- /top -->";
	}
	else{

$topNotLoggedIn = "<div id='top'>
<a href='' id='logo' title='Paathshaala'> <h1></h1> </a>
<ul class='topbarLeft'>
<li>
<form action='search.php' method='get'>
<input type='search' name='tag' placeholder='Search' class='searchBox'/>
<button type='submit' class='searchButton'>
<img src='pics/search.png' alt=''/>
</button>
</form>
</li>
</ul>

<div class='loggedUser'>
<img src='".$_SESSION['userpic']."' class='loggedImage'/>
<span class='loggedName' >".$_SESSION['fullname']."</span>
<img src='pics/down.png' id='logChangeButton' style='position:relative; top:-9px; height:10px;'>
</div>
<div class='dashBoard' style='display:none'>
<a href='profile.php'><img src='pics/home.png'> Dashboard </a><br />
<a href='faq.php'><img src='pics/settings.png'> Help </a><br />
<a href='response/logout.php'><img src='pics/tick.png'> Sign off </a><br />
</div>
</div> <!-- /top -->";
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
</div> <!-- /bottom -->";
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

$feedback = "<img src='pics/feedback.png' alt='feedback button' title='feedback button' class='feedbackDock' />
<div id='feedback'></div>";

?>

