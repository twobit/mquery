/*
 * mQuery 0.1.0
 *
 * Copyright 2012 Stephen Murphy
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * References:
 * http://www.w3.org/TR/css3-mediaqueries/
 * https://developer.mozilla.org/En/CSS/Media_queries
 *
 * media_query_list: <media_query> [, <media_query> ]*
 * media_query: [[only | not]? <media_type> [ and <expression> ]*]
 *   | <expression> [ and <expression> ]*
 * expression: ( <media_feature> [: <value>]? )
 * media_type: all | aural | braille | handheld | print |
 *   projection | screen | tty | tv | embossed
 * media_feature: width | min-width | max-width
 *   | height | min-height | max-height
 *   | device-width | min-device-width | max-device-width
 *   | device-height | min-device-height | max-device-height
 *   | aspect-ratio | min-aspect-ratio | max-aspect-ratio
 *   | device-aspect-ratio | min-device-aspect-ratio | max-device-aspect-ratio
 *   | color | min-color | max-color
 *   | color-index | min-color-index | max-color-index
 *   | monochrome | min-monochrome | max-monochrome
 *   | resolution | min-resolution | max-resolution
 *   | scan | grid
 */
(function() {
    var mQuery = function(query, features) {
        return new mQuery.Class(query, features);
    };

    mQuery.Class = function(query, features) {
        this._media = '';
        this._match = null;

        if (!query) {
            return;
        }

        if (typeof query === 'string') {
            this._media += query;
        }
        else if (typeof query === 'object') {
            this._media += this._features(query);
            return;
        }

        if (typeof features === 'object') {
            this._media += ' and ' +  this._features(features);
        }
    };

    mQuery.Class.prototype = {
        media: function() {
            return this._media;
        },

        match: function(callback) {
            this._match = matchMedia(this._media);
            
            if (typeof callback === 'function') {
                this._match.addListener(callback);
            }

            console.log(this);

            return true;
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