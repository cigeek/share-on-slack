(function() {
  'use strict';
  var init, restoreData, saveData;

  restoreData = function() {
    return document.getElementById('token').value = localStorage.getItem('token');
  };

  saveData = function() {
    return localStorage.setItem('token', document.getElementById('token').value);
  };

  init = function() {
    restoreData();
    return document.getElementById('save').addEventListener('click', saveData);
  };

  init();

}).call(this);
