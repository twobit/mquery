(function(window) {
/*
 * mQuery 0.1.0
 * Copyright 2012 Stephen Murphy
 */
var mQuery = function(query, features) {
        return new mQuery.Class(query, features);
    },
    isWebKit = function() {
        if (isWebKit.memo) {
            return isWebKit.memo;
        }

        isWebKit.memo = mQuery({WebkitMinDevicePixelRatio: 0}).matches();

        return isWebKit.memo;
    };

mQuery.Class = function(query, features) {
    this._match = null;
    this._callback = null;
    this._media = mQuery.Lib.query(query, features);
};

mQuery.Class.prototype = {
    query: function(query, features) {
        if (this._match) {  // Match has already occurred
            return this;
        }
        this._media += ', ' + mQuery.Lib.query(query, features);
        return this;
    },

    bind: function(callback) {
        this.get();

        // Fix open WebKit bug where callbacks aren't fired
        // https://bugs.webkit.org/show_bug.cgi?id=75903
        if (isWebKit()) {
            this._fixWebkitCallback(this.media());
        }

        this._callback = mQuery.Lib.bind(this, callback);
        this._match.addListener(this._callback);
        return this;
    },

    unbind: function() {
        this.get();
        this._match.removeListener(this._callback);
        return this;
    },

    matches: function() {
        this.get();
        return this._match.matches;
    },

    // Evaluate using get()?
    media: function() {
        return this._media;
    },

    error: function() {
        this.get();

        // Invalid queries should be "not all" according to spec. WebKit returns "invalid"
        return (this._match.media === 'not all' || this._match.media === 'invalid');
    },

    get: function() {
        if (this._match) {
            return this._match;
        }

        this._match = window.matchMedia(this.media());

        return this._match;
    },

    _fixWebkitCallback: function(selector) {
        var style = window.document.createElement('style');
        window.document.getElementsByTagName('head')[0].appendChild(style);
        if (!window.createPopup) { /* For Safari */
           style.appendChild(window.document.createTextNode(''));
        }
        var s = window.document.styleSheets[document.styleSheets.length - 1];
        s.insertRule('@media ' + selector + '{body{}}', s.cssRules.length);
    }
};

mQuery.Lib = {
    bind: function(scope, fn) {
        var args = Array.prototype.slice.call(arguments, 2);
        return function () {
            return fn.apply(scope, args.concat(Array.prototype.slice.call(arguments)));
        };
    },

    query: function(query, features) {
        if (!query) {
            return '';
        }

        if (typeof query === 'object') {
            return mQuery.Lib.features(query);
        }

        var string = '';

        if (typeof query === 'string') {
            string += query;
        }

        if (typeof features === 'object') {
            string += ' and ' +  mQuery.Lib.features(features);
        }

        return string;
    },

    features: function(features) {
        var ret = [];

        for (var feature in features) {
            if (features.hasOwnProperty(feature)) {
                ret.push(mQuery.Lib.feature(feature, features[feature]));
            }
        }

        return ret.join(' and ');
    },

    feature: function(feature, value) {
        feature = mQuery.Lib.uncamel(feature);

        if (typeof value === 'function') {
            value = value(feature);
        }

        if (value === 0) {
            return '(' + feature + ': 0)';
        }

        return '(' + feature + (value ? ': ' + value : '') + ')';
    },

    uncamel: function(string) {
        return string.replace(/[A-Z]/g, mQuery.Lib.uncamelSub);
    },

    uncamelSub: function(letter) {
        return '-' + letter.toLowerCase();
    }
};/* Modified to check for msMatchMedia.*/

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */

window.matchMedia = window.matchMedia || window.msMatchMedia || (function(doc, undefined){
  
  var bool,
      docElem  = doc.documentElement,
      refNode  = docElem.firstElementChild || docElem.firstChild,
      // fakeBody required for <FF4 when executed in <head>
      fakeBody = doc.createElement('body'),
      div      = doc.createElement('div');
  
  div.id = 'mq-test-1';
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.appendChild(div);
  
  return function(q){
    
    div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';
    
    docElem.insertBefore(fakeBody, refNode);
    bool = div.offsetWidth == 42;
    docElem.removeChild(fakeBody);
    
    return { matches: bool, media: q };
  };
  
})(document);

    window.mQuery = mQuery;
})(this);
