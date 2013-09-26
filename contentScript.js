var body = document.body;
var image = undefined;

injectScriptInPage("document.body.setAttribute('data-dock-enabled', kerio.lib.Settings.isFeatureFlag('dockEnabled'))");
if (document.body.dataset.dockEnabled === 'true') { // data attribute supports only string values
	chrome.storage.local.get(['image'], setBackground);
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		if (namespace === 'local') {
			setBackground({
				image: (changes.image ? changes.image.newValue : image)
			});
		}
	});
}

function setBackground(storage) {
	var style = [];

	if (storage.hasOwnProperty('image') && storage.image && storage.image.length > 0) {
		style.push('background: white url(' + storage.image + ') center center no-repeat');
		style.push('background-size: cover');

		body.setAttribute('style', style.join(';'));
	}
}

function injectScriptInPage(code) {
	var script = document.createElement('script');
	script.textContent = code;
	(document.head || document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}
