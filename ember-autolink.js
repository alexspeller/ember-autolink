// Generated by CoffeeScript 1.4.0
(function() {

  Ember.Autolink = Em.Object.extend().reopenClass({
    regex: /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/,
    globalRegex: /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/g,
    extract: function(text) {
      var match;
      match = this.match(text);
      if (match == null) {
        return;
      }
      return match[0];
    },
    debracket: function(url) {
      if (url.charAt(0) === '(' && url.charAt(url[0].length - 1) === ')') {
        return url.slice(1, -1);
      } else {
        return url;
      }
    },
    match: function(text) {
      var match;
      match = text.match(this.regex);
      if (match == null) {
        return;
      }
      match[0] = this.debracket(match[0]);
      return match;
    },
    autolink: function(text) {
      var escaped,
        _this = this;
      escaped = Handlebars.Utils.escapeExpression(text);
      return new Handlebars.SafeString(escaped.replace(this.globalRegex, function(url) {
        url = _this.debracket(url);
        return "<a href='" + url + "'>" + url + "</a>";
      }));
    }
  });

}).call(this);
