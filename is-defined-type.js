/**
 * @copyright 2017 basbase
 * @author basbase
 * @licence MIT
 */
;(function () {
    "use strict";

    var root               = this;
    var prev_isDefinedType = root.isDefinedType;

    /**
     * Check if a variable in a nested object is defined and optionally also check its type.
     *
     * @param {Object} input - Object to look in
     * @param {(string|string[])} [path] - Path to key in input to check: 'res.user.name' or: ['res','user','name']
     * @param {string|string[]} [type] - If path is defined also match this/these type(s)
     * @returns {boolean}
     */
    var isDefinedType = function (input, path, type) {

        var nodes = [];

        if (path) {

            if (typeof path === 'string') {

                nodes = path.split('.');

            } else if (isArray(path)) {

                nodes = path;

            }

        }

        var current = input;

        if (typeof current === 'undefined') {

            return false;

        }

        /**
         * Check each node in the provided path for undefined
         */
        for (var i = 0; i < nodes.length; i++) {

            var node = nodes[i];

            if (typeof current[node] === 'undefined') {

                return false;

            } else if (i < nodes.length - 1 && (current[node] === null)) {
            // } else if (i < nodes.length - 1 && (typeof current[node] !== 'object' || current[node] === null)) {

                return false;

            } else {

                current = current[node];

            }

        }

        var types = [];

        if (isArray(type)) {

            types = type;

        } else if (typeof type === 'string') {

            types = [type];

        }

        if (types.length) {

            var typeResult = false;

            for (var j = 0; j < types.length && !typeResult; j++) {

                var lowerCaseType = types[j].toLowerCase();

                switch (lowerCaseType) {
                    case 'array':
                        typeResult = isArray(current);
                        break;
                    case 'object':
                        typeResult = typeof current === 'object' && current !== null && !isArray(current);
                        break;
                    case 'string':
                        typeResult = typeof current === 'string';
                        break;
                    case 'number':
                        typeResult = typeof current === 'number';
                        break;
                    case 'boolean':
                        typeResult = typeof current === 'boolean';
                        break;
                    case 'null':
                        typeResult = current === null;
                        break;
                }

            }

            return typeResult;

        } else {

            return true;

        }

    };

    /**
     * Check if provided variable is an array.
     *
     * @param a
     * @returns {boolean}
     */
    function isArray(a) {
        return (
            Array.isArray
                ? Array.isArray(a)
                : a && a.toString() === '[object Array]'
        )
    }

    /**
     * Provide a way to play nicely with others in the global scope: will revert window.isDefinedType back to the state
     * it was in before this scripts was included.
     * @returns {isDefinedType}
     */
    isDefinedType.noConflict = function () {
        root.isDefinedType = prev_isDefinedType;
        return isDefinedType;
    };

    /**
     * Allow usage by both browsers and node
     */
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = isDefinedType;
        }
        exports.isDefinedType = isDefinedType;
    }
    else {
        root.isDefinedType = isDefinedType;
    }

}).call(this);