/**
 * @author Stanislav Sysoev <@d4rkr00t>
 * @license MIT
 * @version 0.0.1
 *
 * @description
 * Event delegation library on plain JavaScript
 *
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Dega = factory();
    }
})(this, function() {
    var _instances = [];

    function _findElem(selector) {

    }

    var Dega = function(elem) {
        if (!(this instanceof Dega)) {
            for (var i = 0; i < _instances.length; i++) {
                if (_instances[i].elem === elem) {
                    return _instances[i];
                }
            }

            var dega = new Dega(elem);
            _instances.push(elem);
            return dega;
        }

        if (typeof elem === 'String') {
            elem = _findElem(elem);
        }

        this.elem = elem;
    };

    Dega.prototype.on = function(event, selector, callback, useCapture) {

    };

    Dega.prototype.off = function(event, selector, callback) {

    };

});
