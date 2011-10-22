/*
	General JS functions required in all pages will be written in this page.
	Individual page specific codes will be split into smaller files.
*/

/* Function to manipulate $_GET[] variables with JS */

/* Read a page's GET URL variables and return them as an associative array. */
/* Example implementation : var cid = getUrlVars()['id']; */

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

// Supplant 

if(typeof String.prototype.supplant !== 'function') {
	String.prototype.supplant = function(o) {
		return this.replace(/{([^{}]*)}/g,
			function (a,b) {
				var r = o[b];
				return typeof r === 'string' ?
					r : a;
			});
	};
}

function hashTag(elem) {
	var data = $(elem).html();
	var reg = /#(\w{1,})/g;
	var res = data.match(reg);
	var len = res.length;
	for( var i =0; i < len ; i = i+1) {
		data = data.replace( res[i],'<a href=search.php?tag=' + res[i] + '>' + res[i] + '</a>' );
	}
	$(elem).html(data);
}

