(function() {
  'use strict';
  var $, createPost, createSuccess, updateMessage;

  $ = function(id) {
    return document.getElementById(id);
  };

  createPost = function(callback) {
    var req;
    updateMessage('Creating a new post...');
    req = new XMLHttpRequest();
    req.callback = callback;
    req.onload = createSuccess;
    req.onerror = function() {
      return updateMessage('Error! ' + this.statusText);
    };
    req.open('POST', 'https://slack.com/api/files.upload', true);
    return req.send(new FormData($('post-form')));
  };

  createSuccess = function() {
    var res;
    res = JSON.parse(this.responseText);
    if (res.ok) {
      updateMessage('Successfully created!');
      return this.callback.apply();
    } else {
      return updateMessage('Error! ' + res.error);
    }
  };

  chrome.tabs.getSelected(null, function(tab) {
    $('title').value = tab.title;
    $('token').value = localStorage.getItem('token');
    $('channels').value = localStorage.getItem('channelId');
    chrome.tabs.executeScript(null, {
      file: 'scripts/description.js'
    }, function(descriptions) {
      var content, prefix;
      prefix = '[' + tab.url + '](' + tab.url + ')\n';
      if (descriptions[0] != null) {
        content = descriptions[0].slice(0, 140) + '...';
      } else {
        content = "No summary.";
      }
      $('desc').textContent = content.replace(/[\n\r]/g, " ");
      $('content').value = prefix + content;
      return $('comment').focus();
    });
    $('post').addEventListener('click', function() {
      return createPost(window.close);
    });
    return $('cancel').addEventListener('click', function() {
      return window.close();
    });
  });

  updateMessage = function(msg) {
    return $('msg').textContent = msg;
  };

}).call(this);
