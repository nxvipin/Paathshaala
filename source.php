<?php

$header="
	<meta charset='UTF-8' />
	<link rel='stylesheet' href='css/structure.css'/>
	<link rel='stylesheet' href='css/feedback.css'/>
	<script src='js/jquery-1.6.1.min.js' type='text/javascript'></script>
	<script src='js/jquery.timeago.js' type='text/javascript'></script>
	<script src='js/grayout.js' type='text/javascript' ></script>
	<script src='js/jquery.jkey.js' type='text/javascript' ></script>
	<script src='js/functions.js' type='text/javascript' ></script>";

$topNotLoggedIn = "<div id='top'>
	<a href='/newPaathshaalaUI/' id='logo' title='Paathshaala'> <h1></h1> </a>
	<ul class='topbarLeft'>
		<li> 
			<form action='search.php' method='get'>
				<input type='search' name='q' placeholder='Search' class='searchBox'/>
				 <button type='submit' class='searchButton'>
					<img src='pics/search.png' alt=''/>
				</button>
			</form>
		</li>
	</ul>
	
	<ul class='userBar'>
		<li><a href=''>Join</a></li>
		<li>|</li>
		<li onclick='showlogin()'><a>Login</a>&nbsp;&nbsp;<img src='pics/down.png' id='logChangeButton'/></li>
	</ul>

<form class='login' action='process.php' method='post' style='display:none;'>
		<img src='pics/user.png'> <input type='text' name='uname' placeholder='Username' style='margin-bottom:2px' /> <br />
		<img src='pics/key.png'> <input type='password' name='pass' placeholder='Password' style='margin-bottom:-4px' /> <br />
	<button type='submit' class='tickButton'><img src='pics/tick.png'></button>
</form>

</div> <!-- /top -->";


$topLoggedIn = "<div id='top'>
	<a href='' id='logo' title='Paathshaala'> <h1></h1> </a>
	<ul class='topbarLeft'>
		<li> 
			<form action='search.php' method='get'>
				<input type='search' name='q' placeholder='Search' class='searchBox'/>
				 <button type='submit' class='searchButton'>
					<img src='pics/search.png' alt=''/>
				</button>
			</form>
		</li>
	</ul>

	<div class='loggedUser' onclick='showDash()'>
		<img src='pics/me.png' class='loggedImage' onerror='this.src='pics/me.png2'' /> <!-- onerror tag is important  -->
		<span class='loggedName' > Jaseem Abid is a kick ass guy</span>
		<img src='pics/down.png' id='logChangeButton' style='position:relative; top:-9px; height:10px;'>
	</div>
	<div class='dropDown' style='display:none'>
		<img src='pics/home.png'> Dashboard <br />
		<img src='pics/settings.png'> Help <br />
		<img src='pics/tick.png'> Sign off <br />
	</div>
</div> <!-- /top -->";

$bottomBar = "<div id='bottom'>
	<a href='http://www.teamunwired.com/' id='logo' title='teamunwired'> <h1></h1> </a>
	<ul class='bottomLinks'>
		<li><a href=''>Credits</a></li>
		<li>|</li>
		<li><a href=''>Faq</a></li>
		<li>|</li>
		<li><a href=''>Contribute</a></li>
		<li>|</li>
		<li><a href=''>Feedback</a></li>
		<li>|</li>
		<li><a href=''>Teamunwired</a> &nbsp;&nbsp;<img src='pics/web.png'>&nbsp;&nbsp;<img src='pics/facebook.png'>&nbsp;&nbsp;<img src='pics/twitter.png'></li>
		<li>|</li>
		<li><a href=''>Paathshaala &nbsp;</a>&nbsp;<img src='pics/facebook.png'>&nbsp;&nbsp;<img src='pics/twitter.png'> </li>
		</ul>
</div> <!-- /bottom -->";

$commentSubmit = "<div class='commentBox'>
	<div class='commentBoxImage'> <img src='pics/me.png' class='fitin' /> </div>
	<div class='commentBoxText'>
			
			<span class='commentTitle' style='margin-left:5px;'>Jaseem Abid</span>
			<div class='data'>
				<textarea id='comment' rows='2' cols='57' placeholder='Comment here. Enter for submit and down key for new line.'></textarea>
			</div>
	</div>
</div>";

?>
