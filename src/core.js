/*
 * mQuery 0.1.0
 * Copyright 2012 Stephen Murphy
 */
var mQuery = function(query, features) {
        return new mQuery.Class(query, features);
    },
    is_webkit = null,
    INVALID_QUERY = 1;

mQuery.Class = function(query, features) {
    this._error = 0;
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
        if (!this._initMatch()) {
            return this;
        }

        // Fix open WebKit bug where callbacks aren't fired
        // https://bugs.webkit.org/show_bug.cgi?id=75903
        if (typeof is_webkit !== "boolean") {
            is_webkit = mQuery({WebkitMinDevicePixelRatio: 0}).matches();
        }
        if (is_webkit) {
            this._fixWebkitCallback(this.media());
        }

        this._callback = mQuery.Lib.bind(this, callback);
        this._match.addListener(this._callback);
        return this;
    },

    unbind: function() {
        if (!this._initMatch()) {
            return this;
        }
        this._match.removeListener(this._callback);
        return this;
    },

    matches: function() {
        if (!this._initMatch()) {
            return false;
        }
        return this._match.matches;
    },

    media: function() {
        return this._media;
    },

    get: function() {
        this._initMatch();
        return this._match;
    },

    error: function() {
        this._initMatch();
        return this._error;
    },

    _fixWebkitCallback: function(selector) {
        var style = window.document.createElement('style');
        window.document.getElementsByTagName('head')[0].appendChild(style);
        if (!window.createPopup) { /* For Safari */
           style.appendChild(window.document.createTextNode(''));
        }
        var s = window.document.styleSheets[document.styleSheets.length - 1];
        s.insertRule('@media ' + selector + '{body{}}', s.cssRules.length);
    },

    _initMatch: function() {
        if (this._match) {
            return this._match;
        }
        else if (this._error) {
            return null;
        }

        var match = window.matchMedia(this.media());
        
        // Invalid queries should be "not all" according to spec
        if (match.media === 'not all' &&
                    match.media != this._media && !match.matches) {
            this._error = INVALID_QUERY;
            return null;
        }
        else if (match.media === 'invalid') {    // WebKit does something different
            this._error = INVALID_QUERY;
            return null;
        }

        this._match = match;
        return this._match;
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
};