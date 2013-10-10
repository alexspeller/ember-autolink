Ember.Autolink = Em.Object.extend().reopenClass
  regex: /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/
  globalRegex: /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/g
  extract: (text) ->
    match = @match text
    return unless match?
    match[0]

  debracket: (url) ->
    if url.charAt(0) is '(' and url.charAt(url[0].length-1) is ')'
      url.slice(1,-1)
    else
      url

  match: (text) ->
    match = text.match @regex
    return unless match?
    match[0] = @debracket match[0]
    match

  autolink: (text) ->
    escaped = Handlebars.Utils.escapeExpression text
    new Handlebars.SafeString escaped.replace @globalRegex, (url) =>
      url = @debracket url
      "<a href='#{url}'>#{url}</a>"

Ember.computed.autolink = (key) ->
  Ember.computed(->
    Ember.Autolink.autolink @get(key)
  ).property(key)
