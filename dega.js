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

    /**
     * Check if elem matches to selector
     * @private
     * @param {Object} el
     * @param {String} selector — .class | #id | div
     * @return {Boolean|Undefined}
     */
    function _matchElem(el, selector) {
        if (selector.match(/^\./)) {
            return el.classList && el.classList.contains(selector.replace(/^\./, ''));
        } else if (selector.match(/^#/)) {
            return el.id === selector.replace(/^#/, '');
        } else {
            return el.tagName === selector.toUpperCase();
        }
    }

    /**
     * Search for generated event listener by original
     * @private
     * @param {Array} eventListeners — list of event listeners
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {String} selector — .class | #id | div
     * @param {Function} callback — user passed callback
     * @param {Boolean} useCapture
     * @return {Object|Boolean}
     */
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

    /**
     * Generates useCapture for event listeners, if blur or focus we should always use useCapture
     * @private
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {Boolean} useCapture — user defined useCapture
     * @return {Boolean}
     */
    function _generateUseCapture(type, useCapture) {
        return type === 'blur' || type === 'focus' || useCapture;
    }

    /**
     * Generates eventListener item for Dega._eventListeners list
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {String} selector — .class | #id | div
     * @param {Function} callback — user passed callback
     * @param {Boolean} useCapture
     */
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
    /**
     * Creates a new Dega Instance
     * @class
     * @param {DomElem|String} elem — dom elem or selector for document.querySelector
     */
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

        if (typeof elem === 'string') {
            elem = document.querySelector(elem);
        }

        this.elem = elem;
        this._eventListeners = [];
    };

    /**
     * Subscribe on event
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {String} selector — .class | #id | div
     * @param {Function} callback — user passed callback
     * @param {Boolean} [useCapture]
     * @return {Dega} this
     */
    Dega.prototype.on = function(type, selector, callback, useCapture) {
        var eventListener = _generateEventListener(type, selector, callback, useCapture);

        this._eventListeners.push(eventListener);
        this.elem.addEventListener(type, eventListener.generated, eventListener.useCapture);

        return this;
    };

    /**
     * Unsubscribe from event
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {String} selector — .class | #id | div
     * @param {Function} callback — user passed callback
     * @param  {Boolean} [useCapture]
     * @return {Dega} this
     */
    Dega.prototype.off = function(type, selector, callback, useCapture) {
        useCapture = _generateUseCapture(type, useCapture);

        var eventListener = _findEventListener(this._eventListeners, type, selector, callback, useCapture);

        if (eventListener) {
            this.elem.removeEventListener(type, eventListener.generated, eventListener.useCapture);

            this._eventListeners.splice(this._eventListeners.indexOf(eventListener), 1);
        }

        return this;
    };

    return Dega;
});
