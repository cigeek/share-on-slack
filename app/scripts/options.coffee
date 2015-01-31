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
  req.onload = findChannelId
  req.onerror = () ->
    updateMessage('Error! ' + this.statusText)

  req.open 'POST', 'https://slack.com/api/channels.list', true
  req.send(new FormData($('option-form')))

findChannelId = ->
  res = JSON.parse(this.responseText)
  channel = $('channel').value

  if res.ok
    for i in [0...res.channels.length]
      if res.channels[i].name == channel
        localStorage.setItem('channelId', res.channels[i].id)
        this.callback.apply()
        return
    updateMessage('Channel not found.')
  else
    updateMessage('Error! ' + res.error)

updateMessage = (msg) ->
  $('msg').textContent = msg

init()
