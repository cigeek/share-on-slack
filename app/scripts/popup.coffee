'use strict';

$ = (id) ->
  document.getElementById(id)

createPost = (callback) ->
  updateMessage('Creating a new post...')

  req = new XMLHttpRequest()
  req.callback = callback
  req.onload = createSuccess
  req.onerror = () ->
    updateMessage('Error! ' + this.statusText)

  req.open 'POST', 'https://slack.com/api/files.upload', true
  req.send(new FormData($('post-form')))

createSuccess = ->
  res = JSON.parse(this.responseText)

  if res.ok
    updateMessage('Successfully created!')
    this.callback.apply()
  else
    updateMessage('Error! ' + res.error)

chrome.tabs.getSelected(null, (tab) ->
  $('title').value = tab.title
  $('token').value = localStorage.getItem('token')
  $('channels').value = localStorage.getItem('channelId')

  chrome.tabs.executeScript(null, {
    file: 'scripts/description.js'
  }, (descriptions) ->
    prefix = '[' + tab.url + '](' + tab.url + ')\n'

    if descriptions[0]?
      content = descriptions[0].slice(0, 140) + '...'
    else
      content = "No summary."

    $('desc').textContent = content.replace(/[\n\r]/g, " ")
    $('content').value = prefix + content
    $('comment').focus()
  )

  $('post').addEventListener 'click', () ->
    createPost(window.close)
  $('cancel').addEventListener 'click', () ->
    window.close()
)

updateMessage = (msg) ->
  $('msg').textContent = msg
