var colorInput = document.getElementById("color");
var urlInput = document.getElementById("url");

colorInput.addEventListener('keypress', enterHandler);
urlInput.addEventListener('keypress', enterHandler);

function enterHandler(event) {
  if (event.keyCode === 13) {
    saveOptions();
  }
}

function saveOptions() {
  var color = colorInput.value;
  var url = urlInput.value;
  var status = document.getElementById("status");

  chrome.storage.sync.set({
    color: color,
    url: url
  }, function() {
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
      status.innerHTML = "";
    }, 1000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get(['color', 'url'], function(storage) {
    var color = storage.color;
    var url = storage.url;

    if (!color && !url) {
      return;
    }

    colorInput.value = color || '';
    urlInput.value = url || '';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);
