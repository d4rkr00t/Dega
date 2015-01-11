/**
 * @author Stanislav Sysoev <@d4rkr00t>
 * @license MIT
 * @version 0.0.1
 *
 * @description
 * Event delegation library on plain JavaScript
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

    function _matchElem(el, selector) {
        if (selector.match(/^\./)) {
            return el.classList && el.classList.contains(selector.replace(/^\./, ''));
        } else if (selector.match(/^#/)) {
            return el.id === selector.replace(/^#/, '');
        } else {
            return el.tagName === selector.toUpperCase();
        }
    }

    function _findEventListener(eventListeners, type, selector, callback, useCapture) {
        for (var i = 0; i < eventListeners.length; i++) {
            if (eventListeners[i].original === callback &&
                eventListeners[i].useCapture === useCapture &&
                eventListeners[i].type === type &&
                eventListeners[i].selector === selector) {
                return eventListeners[i];
            }
        }

        return false;
    }

    function _generateUseCapture(type, useCapture) {
        return type === 'blur' || type === 'focus' || useCapture;
    }

    function _generateEventListener(type, selector, callback, useCapture) {
        return {
            type: type,
            selector: selector,
            useCapture: _generateUseCapture(type, useCapture),

            original: callback,
            generated: function(e) {
                var el = e.target;

                while (el) {
                    if (_matchElem(el, selector)) {
                        callback.call(el, e);
                        break;
                    } else {
                        el = el.parentNode;
                    }
                }
            }
        };
    }

    var Dega = function(elem) {
        if (!(this instanceof Dega)) {
            for (var i = 0; i < _instances.length; i++) {
                if (_instances[i].elem === elem) {
                    return _instances[i];
                }
            }

            var dega = new Dega(elem);
            _instances.push(dega);
            return dega;
        }

        if (typeof elem === 'String') {
            elem = document.querySelector(elem);
        }

        this.elem = elem;
        this._eventListeners = [];
    };

    Dega.prototype.on = function(type, selector, callback, useCapture) {
        var eventListener = _generateEventListener(type, selector, callback, useCapture);

        this._eventListeners.push(eventListener);
        this.elem.addEventListener(type, eventListener.generated, eventListener.useCapture);

        return this;
    };

    Dega.prototype.off = function(type, selector, callback, useCapture) {
        useCapture = _generateUseCapture(type, useCapture);

        var eventListener = _findEventListener(this._eventListeners, type, selector, callback, useCapture);

        if (eventListener) {
            this.elem.removeEventListener(type, eventListener.generated, eventListener.useCapture);
        }

        return this;
    };

    return Dega;
});
