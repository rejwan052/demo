export default function isUrlExternal(url: string) {
	var host = window.location.hostname;

	var linkHost = function (url_: string) {
		if (/^https?:\/\//.test(url_)) { // Absolute URL.
			// The easy way to parse an URL, is to create <a> element.
			// @see: https://gist.github.com/jlong/2428561
			var parser = document.createElement('a');
			parser.href = url_;

			return parser.hostname;
		} else { // Relative URL.
			return window.location.hostname;
		}
	}(url);

	return host !== linkHost;
}
