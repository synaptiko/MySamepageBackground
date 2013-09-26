function onNavigate(details) {
	if (/^https:\/\/samepage.io\/.*$/.test(details.url)) {
		chrome.tabs.executeScript(details.tabId, { file: 'contentScript.js' });
	}
}
chrome.webNavigation.onDOMContentLoaded.addListener(onNavigate);

function onClickHandler(info, tab) {
	var image = new Image();
	var srcUrl = info.srcUrl;
	image.addEventListener('load', function() {
		var canvas = document.createElement('canvas');
		var context, dataUrl;

		canvas.width = image.width;
		canvas.height = image.height;
		context = canvas.getContext('2d');
		context.drawImage(image, 0, 0);
		dataUrl = canvas.toDataURL();

		chrome.storage.local.set({ image: dataUrl });
	});
	image.src = srcUrl;
};
chrome.contextMenus.onClicked.addListener(onClickHandler);
chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({
		id: 'samepageBackground',
		title: 'Background for Samepage',
		contexts: ['image']
	});
});
