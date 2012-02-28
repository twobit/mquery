/*
 * mQuery 0.1.0
 * Copyright 2012 Stephen Murphy
 */
(function() {
    var mQuery = function(query, features) {
            return new mQuery.Class(query, features);
        },
        NOT_SUPPORTED = 1,
        INVALID_QUERY = 2;

    mQuery.Class = function(query, features) {
        this._error = 0;
        this._match = null;
        this._callback = null;
        this._media = mQuery.Lib.query(query, features);
        this._window = window;
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

        _initMatch: function() {
            if (this._match) {
                return this._match;
            }
            else if (this._error) {
                return null;
            }

            var match = mQuery.Lib.match(this._media, this._window);

            if (!match) {
                this._error = NOT_SUPPORTED;
                return null;
            }
            
            if (match.media === 'invalid') {    // WebKit error
                this._error = INVALID_QUERY;
                return null;
            }
            else if (match.media === 'not all' &&
                        match.media != this._media && !match.matches) {   // FireFox error
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

        match: function(media, window) {
            var match = null;

            if (window.matchMedia) {
                match = window.matchMedia(media);
            }
            else if (window.msMatchMedia) {
                match = window.msMatchMedia(media);
            }

            return match;
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

    window.mQuery = mQuery;
})();