(function() {
  'use strict';
  var $, fetchChannelList, findChannelId, init, loadOptions, saveOptions, updateMessage;

  $ = function(id) {
    return document.getElementById(id);
  };

  init = function() {
    loadOptions();
    return $('save').addEventListener('click', function() {
      return fetchChannelList(saveOptions);
    });
  };

  loadOptions = function() {
    $('token').value = localStorage.getItem('token');
    return $('channel').value = localStorage.getItem('channel');
  };

  saveOptions = function() {
    localStorage.setItem('token', $('token').value);
    localStorage.setItem('channel', $('channel').value);
    return updateMessage('Saved!');
  };

  fetchChannelList = function(callback) {
    var req;
    updateMessage('Fetching channel list...');
    req = new XMLHttpRequest();
    req.callback = callback;
    req.onload = findChannelId;
    req.onerror = function() {
      return updateMessage('Error! ' + this.statusText);
    };
    req.open('POST', 'https://slack.com/api/channels.list', true);
    return req.send(new FormData($('option-form')));
  };

  findChannelId = function() {
    var channel, i, res, _i, _ref;
    res = JSON.parse(this.responseText);
    channel = $('channel').value;
    if (res.ok) {
      for (i = _i = 0, _ref = res.channels.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (res.channels[i].name === channel) {
          localStorage.setItem('channelId', res.channels[i].id);
          this.callback.apply();
          return;
        }
      }
      return updateMessage('Channel not found.');
    } else {
      return updateMessage('Error! ' + res.error);
    }
  };

  updateMessage = function(msg) {
    return $('msg').textContent = msg;
  };

  init();

}).call(this);
