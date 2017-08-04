const isLocalhost = () => {
	var host = window.location.host;
	return host.startsWith("localhost") || host.startsWith("127.0.0.1")
}

const httpsizedLocation = (location) => {
    var url = 'https://' + location.hostname;
    if (location.port) {
    	url += ":" + location.port;
    }
    return url + location.pathname + location.hash;
}

const ensureHttps = () => {
	if (!isLocalhost() && window.location.protocol !== 'https:') {
	    window.location = httpsizedLocation(window.location);
	    return false;
	}
	return true;
}

export default ensureHttps;