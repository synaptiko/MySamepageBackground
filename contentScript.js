var body = document.body;
var style, color, url;

chrome.storage.sync.get(['color', 'url'], setBackground);
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync') {
  	setBackground({
  		color: (changes.color ? changes.color.newValue : color),
  		url: (changes.url ? changes.url.newValue : url)
  	});
  }
});

function setBackground(storage) {
	style = [];
	style.push('background: none');

	color = storage.color;
	style.push('background-color: ' + (color || '#fff'));

	url = storage.url || '';
	if (url !== '') {
		style.push('background-image: url(' + url + ')');
		style.push('background-repeat: no-repeat');
		style.push('background-size: cover');
	}

	body.setAttribute('style', style.join(';'));
}
