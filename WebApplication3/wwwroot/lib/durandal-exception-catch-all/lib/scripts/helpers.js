var exceptionCatchAll;
(function (exceptionCatchAll) {
    /**
     * Agent Helpers
     */
    function getUserInfo() {
        return {
            platform: navigator.platform,
            browserData: navigator.userAgent,
            browserName: navigator.appCodeName,
        };
    }
    exceptionCatchAll.getUserInfo = getUserInfo;
    function notifyMe(name, message, data, icon) {
        if (exceptionCatchAll.property.stopDesktopNotication) {
            return;
        }
        exceptionCatchAll.notifyWindowDesktop({
            title: 'An ' + name + ' has occurred',
            icon: icon,
            body: message,
            onClick: function () {
                if (typeof (data) === 'function') {
                    data(name, message, data, icon);
                }
                else if (typeof (data) === 'object') {
                    console.info(JSON.stringify(data, null, '\t'));
                }
            }
        });
    }
    exceptionCatchAll.notifyMe = notifyMe;
    /**
     * Document Helpers
     */
    function getDocumentInfo() {
        var documentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var documentHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return {
            domain: document.domain,
            viewport: documentWidth + ' x ' + documentHeight,
            documentUrl: document.URL,
            currentUrl: document.location.href,
            cookie: document.cookie,
        };
    }
    exceptionCatchAll.getDocumentInfo = getDocumentInfo;
    function replaceWindowObject(fnName) {
        var originalFn = window[fnName];
        window[fnName] = function replaceWindowObject$$Callback() {
            // Make a copy of the arguments
            var args = Array.prototype.slice.call(arguments);
            if (typeof (args) === 'function') {
            }
            originalFn.apply(this, args);
        };
    }
    exceptionCatchAll.replaceWindowObject = replaceWindowObject;
    function _has(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }
    exceptionCatchAll._has = _has;
    function escapeRegExp(text) {
        return text.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, '\\$&');
    }
    exceptionCatchAll.escapeRegExp = escapeRegExp;
    function escapeCodeAsRegExpForMatchingInsideHTML(body) {
        return escapeRegExp(body).replace('<', '(?:<|&lt;)').replace('>', '(?:>|&gt;)').replace('&', '(?:&|&amp;)').replace('"', '(?:"|&quot;)').replace(/\s+/g, '\\s+');
    }
    exceptionCatchAll.escapeCodeAsRegExpForMatchingInsideHTML = escapeCodeAsRegExpForMatchingInsideHTML;
    function escapeHtml(html) {
        return String(html).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    exceptionCatchAll.escapeHtml = escapeHtml;
    function objectToString(o) {
        return Object.prototype.toString.call(o);
    }
    exceptionCatchAll.objectToString = objectToString;
    function stylizeWithColor(str, styleType) {
        var style = exceptionCatchAll.Constant.styles[styleType];
        if (style) {
            return '\033[' + exceptionCatchAll.Constant.colors[style][0] + 'm' + str + '\033[' + exceptionCatchAll.Constant.colors[style][1] + 'm';
        }
        else {
            return str;
        }
    }
    /**
     * Helpers
     */
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }
    exceptionCatchAll.isArray = isArray;
    ;
    /**
     * Make the bytes human readable if needed.
     *
     * @param {Number} b Bytes
     * @returns {String|Number}
     * @api private
     */
    function bytes(b) {
        var tb = ((1 << 30) * 1024), gb = 1 << 30, mb = 1 << 20, kb = 1 << 10, abs = Math.abs(b);
        if (abs >= tb)
            return (Math.round(b / tb * 100) / 100) + 'tb';
        if (abs >= gb)
            return (Math.round(b / gb * 100) / 100) + 'gb';
        if (abs >= mb)
            return (Math.round(b / mb * 100) / 100) + 'mb';
        if (abs >= kb)
            return (Math.round(b / kb * 100) / 100) + 'kb';
        return b + 'b';
    }
    function isExcludedFile(filename) {
        //return filename.match(value) ? true : false;
    }
    function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    }
    ;
    function isSameDomain(url) {
        return url.indexOf(location.hostname) !== -1;
    }
    function extend(origin, add) {
        // Don't do anything if add isn't an object
        if (!add)
            return origin;
        var keys = Object.keys(add);
        var i = keys.length;
        while (i--) {
            origin[keys[i]] = add[keys[i]];
        }
        return origin;
    }
    ;
})(exceptionCatchAll || (exceptionCatchAll = {}));
