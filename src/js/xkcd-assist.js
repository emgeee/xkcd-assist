/* global chrome,$ */
'use strict';

// Parse HTML to get the comid ID
function getComicId() {
  var middle = document.getElementById('middleContainer');

  var match = middle.innerHTML.match(/http:\/\/xkcd\.com\/(\d*)\//);
  return match[1];
}

// Save read/unread state of comic
function saveState(id, state) {
  var toStore = {};
  toStore[id] = state;

  chrome.storage.sync.set(toStore, function() {
    console.log('data saved');
  });
}

function init(id, status) {

  console.log(id);
  status = status[id];
  console.log(status);

  if(status === true) {
    console.log('you\'ve read this comic!');
  } else {
    console.log('you haven\'t read this comic!');
  }

  $('<input/>', {
      type: 'checkbox',
      id: 'saveState',
      checked: status
    })
    .on('click', function() {
      var state = this.checked;
      saveState(id, state);
    })
    .insertAfter($('#ctitle'));

}

var id = getComicId();
chrome.storage.sync.get(id, init.bind(null, id));


// chrome.storage.sync.clear();


