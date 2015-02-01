(function() {
  'use strict';
  var $, extractChannelInfo, fetchChannelList, fetchSuccess, init, loadOptions, saveOptions, updateMessage;

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
    req.onload = fetchSuccess;
    req.onerror = function() {
      return updateMessage('Error! ' + this.statusText);
    };
    req.open('POST', 'https://slack.com/api/channels.list', true);
    return req.send(new FormData($('option-form')));
  };

  fetchSuccess = function() {
    var channel, channelInfo, res;
    res = JSON.parse(this.responseText);
    channel = $('channel').value;
    if (res.ok) {
      channelInfo = extractChannelInfo(res.channels, channel);
      localStorage.setItem('channelId', channelInfo.id);
      return this.callback.apply();
    } else {
      return updateMessage('Error! ' + res.error);
    }
  };

  extractChannelInfo = function(channels, channel) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = channels.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (channels[i].name === channel) {
        return channels[i];
      }
    }
    updateMessage('Channel not found.');
    return nil;
  };

  updateMessage = function(msg) {
    return $('msg').textContent = msg;
  };

  init();

}).call(this);
