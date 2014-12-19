
var	request = require('request');

// Customizable setup
var url = 'http://web.cs.ucdavis.edu/~olsson/academic/classes/ecs140a/2014.04/files/gradebooks/MostRecentByID',
	title = "ECS 140 Grade",
	message = "Prepare to see your final grade. You might want to grab a tissue.";

var	count = 0, 
	oldHTML;

// Make sure URL is present
if (url.length == 0) {
	console.log("Yo we need a url.");
	process.exit(1);
}
console.log("Retrieving initial url...");


setInterval(function() {

	// Retrieve html, compare to previously retrieved html
	request(url, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	  	if (count > 0) {
			if (html === oldHTML) {
		    	console.log("Same old, same old...");
		    } else {
		    	console.log("We got an update!!!");
		    	notify();
		    	process.exit(1);
		    }
		}
	    oldHTML = html;
	    count++;
	  } else {
	  	console.log("Error retrieving url");
	  	process.exit(1);
	  }
	});

}, 5000)	// 5 second interval

function notify() {
	// Send native notification
	var notifier = require('node-notifier');
	notifier.notify({
	  'title': title,
	  'message': message
	});
}



