/*
 * mQuery 0.1.0
 * Copyright 2012 Stephen Murphy
 */
(function() {
    var mQuery = function(query, features) {
        return new mQuery.Class(query, features);
    };

    mQuery.Class = function(query, features) {
        this._match = null;
        this._media = this._query(query, features);
    };

    mQuery.Class.prototype = {
        query: function(query, features) {
            this._media += ',' + this._query(query, features);
            return this;
        },

        media: function() {
            return this._media;
        },

        match: function(callback) {
            this._match = matchMedia(this._media);
            
            if (typeof callback === 'function') {
                this._match.addListener(callback);
            }

            // this._match.removeListener(callback)

            if (this._match.media === "invalid") {
                console.error('Invalid media query:' + this._media);
                return null;
            }

            return this._match.matches;
        },

        _query: function(query, features) {
            if (!query) {
                return '';
            }

            if (typeof query === 'object') {
                return this._features(query);
            }

            var string = '';

            if (typeof query === 'string') {
                string += query;
            }

            if (typeof features === 'object') {
                string += ' and ' +  this._features(features);
            }

            return string;
        },

        _features: function(features) {
            var ret = [];

            for (var feature in features) {
                if (features.hasOwnProperty(feature)) {
                    ret.push(this._feature(feature, features[feature]));
                }
            }

            return ret.join(' and ');
        },

        _feature: function(feature, value) {
            feature = this._uncamel(feature);

            if (typeof value === 'function') {
                value = value(feature);
            }

            if (value === 0) {
                return '(' + feature + ':0)';
            }

            return '(' + feature + (value ? ':' + value : '') + ')';
        },

        _uncamel: function(string) {
            return string.replace(/[A-Z]/g, this._uncamelSub);
        },

        _uncamelSub: function(letter) {
            return '-' + letter.toLowerCase();
        }
    };

    window.mQuery = mQuery;
})();