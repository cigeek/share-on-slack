(function() {
  'use strict';
  var createPost, msg;

  msg = document.getElementById('msg');

  createPost = function(formData) {
    var req;
    req = new XMLHttpRequest();
    req.addEventListener('readystatechange', function() {
      var data, permalink;
      if (req.status === 200) {
        data = JSON.parse(req.responseText);
        if (data.ok) {
          msg.textContent = 'Successfully created. Now opening the page...';
          permalink = data.file.permalink;
          return chrome.tabs.create({
            url: permalink
          }, function() {
            return msg.textContent = 'Just publish to share!';
          });
        } else {
          return msg.textContent = 'Error: ' + data.error;
        }
      } else {
        return msg.textContent = 'Unexpected error!';
      }
    });
    req.open('POST', 'https://slack.com/api/files.upload', false);
    return req.send(formData);
  };

  chrome.tabs.getSelected(null, function(tab) {
    var formData;
    formData = new FormData();
    formData.append('token', localStorage.getItem('token'));
    formData.append('filetype', 'post');
    formData.append('filename', 'link');
    formData.append('title', tab.title);
    return chrome.tabs.executeScript(null, {
      file: 'scripts/description.js'
    }, function(res) {
      var content;
      content = '[' + tab.url + '](' + tab.url + ')\n';
      if (res[0] != null) {
        content += res[0];
      }
      formData.append('content', content);
      return createPost(formData);
    });
  });

}).call(this);
