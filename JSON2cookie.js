// Tweaked (for JSON2) version of Stoyan's JSON cookie model [1] for 
// user preferences storage
// Annotated where hacked.
//
// Set a global prefs object to load and save JSON-formatted cookies
// Requires JSON2 - native in most browsers: use Doug Crockford's [2]
// json2.js polyfill.
//
// [1] http://www.phpied.com/json-javascript-cookies/
// [2] https://github.com/douglascrockford/JSON-js
prefs = {
	data: {},
	// Name your functions - priceless for stack tracing
	load: function getCookie() {
		// cookieArray was 'the_cookie'
		var cookieArray = document.cookie.split(';');
		if (cookieArray[0]){
			// JSON2 syntax
			this.data = JSON.parse(
				unescape(
					// Used to call first item, but we actually want the last.
					cookieArray[cookieArray.length-1]
				)
			);
		}
		return this.data;
	},

	save: function setCookie(expires, path) {
		var d = expires || new Date(2030, 02, 02);
		var p = path || '/';
		document.cookie = 
			// JSON2 syntax
			escape(JSON.stringify(this.data))
			+ ';path=' + p
			+ ';expires=' + d.toUTCString();
	}
};