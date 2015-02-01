'use strict';

$ = (id) ->
  document.getElementById(id)

init = ->
  loadOptions()
  $('save').addEventListener 'click', () ->
    fetchChannelList(saveOptions)

loadOptions = ->
  $('token').value = localStorage.getItem('token')
  $('channel').value = localStorage.getItem('channel')

saveOptions = ->
  localStorage.setItem('token', $('token').value)
  localStorage.setItem('channel', $('channel').value)
  updateMessage('Saved!')

fetchChannelList = (callback) ->
  updateMessage('Fetching channel list...')

  req = new XMLHttpRequest()
  req.callback = callback
  req.onload = fetchSuccess
  req.onerror = () ->
    updateMessage('Error! ' + this.statusText)

  req.open 'POST', 'https://slack.com/api/channels.list', true
  req.send(new FormData($('option-form')))

fetchSuccess = ->
  res = JSON.parse(this.responseText)
  channel = $('channel').value

  if res.ok
    channelInfo = extractChannelInfo(res.channels, channel)
    localStorage.setItem('channelId', channelInfo.id)
    this.callback.apply()
  else
    updateMessage('Error! ' + res.error)

extractChannelInfo = (channels, channel) ->
  for i in [0...channels.length]
    if channels[i].name == channel
      return channels[i]
  updateMessage('Channel not found.')
  return nil

updateMessage = (msg) ->
  $('msg').textContent = msg

init()
