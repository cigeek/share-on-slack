'use strict';

msg = document.getElementById('msg')

createPost = (formData) ->
  req = new XMLHttpRequest()

  req.addEventListener 'readystatechange', ->
    if req.status == 200
      data = JSON.parse(req.responseText)

      if data['ok']
        msg.textContent = 'Successfully created. Now opening the page...'

        permalink = data['file']['permalink']
        chrome.tabs.create({
          url: permalink
        }, () ->
          msg.textContent = 'Just publish to share!'
        )
      else
        msg.textContent = 'Error: ' + data['error']
    else
      msg.textContent = 'Unexpected error!'

  req.open 'POST', 'https://slack.com/api/files.upload', false
  req.send(formData)

chrome.tabs.getSelected(null, (tab) ->
  formData = new FormData()

  formData.append('token', localStorage.getItem('token'))
  formData.append('filetype', 'post')
  formData.append('filename', 'link')
  formData.append('title', tab.title)

  chrome.tabs.executeScript(null, {
      file: 'scripts/description.js'
    }, (res) ->
      content = "> [" + tab.url + "](" + tab.url + ")\n"
      content += res[0] if res[0]?

      formData.append('content', content)

      createPost(formData)
  )
)
