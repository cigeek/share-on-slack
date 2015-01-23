'use strict';

restoreData = ->
  document.getElementById('token').value = localStorage.getItem('token')

saveData = ->
  localStorage.setItem('token', document.getElementById('token').value)

init = ->
  restoreData()
  document.getElementById('save').addEventListener('click', saveData);

init()