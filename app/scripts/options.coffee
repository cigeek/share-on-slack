'use strict';

restoreData = () ->
  document.getElementById('token').value = localStorage.getItem('token')
  document.getElementById('channel').value = localStorage.getItem('channel')

saveData = () ->
  localStorage.setItem('token', document.getElementById('token').value)
  localStorage.setItem('channel', document.getElementById('channel').value)

init = () ->
  restoreData()
  document.getElementById('save').addEventListener('click', saveData);

init()