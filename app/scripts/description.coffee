'use strict';

getContentByMetaTagNames = (tagNames) ->
  nodes = document.getElementsByTagName('meta')

  for i in [0...nodes.length]
    if nodes[i].name in tagNames || nodes[i].getAttribute('property') in tagNames
      return nodes[i].content

  return null

tagNames = ['description', 'twitter:descript', 'og:description']
return getContentByMetaTagNames(tagNames)
