function grayOut(vis, options) {
	var options = options || {}; 
	var zindex = options.zindex || 50;
	var opacity = options.opacity || 50;
	var opaque = (opacity / 70);
	var bgcolor = options.bgcolor || '#030303';
	var dark=document.getElementById('darkenScreenObject');
	if (!dark) {
		// The dark layer doesn't exist, it's never been created.	So we'll
		// create it here and apply some basic styles.
		var tbody = document.getElementsByTagName("body")[0];
		var tnode = document.createElement('div');					// Create the layer.
				tnode.style.position='fixed';						// Position absolutely
				tnode.style.top='0px';								// In the top
				tnode.style.left='0px';								// Left corner of the page
				tnode.style.overflow='hidden';						// Try to avoid making scroll bars
				tnode.style.display='none';							// Start out Hidden
				tnode.id='darkenScreenObject';						// Name it so we can find it later
		tbody.appendChild(tnode);									// Add it to the web page
		dark=document.getElementById('darkenScreenObject');			// Get the object.
	}
	if (vis) {
		// Calculate the page width and height 
		if( document.body && ( document.body.scrollWidth || document.body.scrollHeight ) ) {
				var pageWidth = '100%';
				var pageHeight = '2000px'; //guess :P
		}
		//set the shader to cover the entire page and make it visible.
		dark.style.opacity=opaque;
		dark.style.MozOpacity=opaque;
		dark.style.filter='alpha(opacity='+opacity+')'; 
		dark.style.zIndex=zindex;
		dark.style.backgroundColor=bgcolor;
		dark.style.width= pageWidth;
		dark.style.height= pageHeight;
		dark.style.display='block';
	} else {
		 dark.style.display='none';
	}
}
