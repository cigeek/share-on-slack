(function() {
  'use strict';
  var getContentByMetaTagNames, tagNames,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  getContentByMetaTagNames = function(tagNames) {
    var i, nodes, _i, _ref, _ref1, _ref2;
    nodes = document.getElementsByTagName('meta');
    for (i = _i = 0, _ref = nodes.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if ((_ref1 = nodes[i].name, __indexOf.call(tagNames, _ref1) >= 0) || (_ref2 = nodes[i].getAttribute('property'), __indexOf.call(tagNames, _ref2) >= 0)) {
        return nodes[i].content;
      }
    }
    return null;
  };

  tagNames = ['description', 'twitter:descript', 'og:description'];

  return getContentByMetaTagNames(tagNames);

}).call(this);
