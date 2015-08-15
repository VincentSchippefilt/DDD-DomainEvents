///<reference path="computeStackTraceFromStackProp.ts" />
///<reference path="notify.ts" />
var exceptionCatchAll;
(function (exceptionCatchAll) {
    var defineStatusTextNamespace = 'statustext$$';
    var defineStatusNamespace = 'status$$';
    var defineStateNamespace = 'state$$';
    var defineTypeNamespace = 'type$$';
    function getDefineStatus(name) {
        return onJQueryAjaxError.errorTypeCallback[defineStatusNamespace + name];
    }
    function getDefineStatusText(name) {
        return onJQueryAjaxError.errorTypeCallback[defineStatusTextNamespace + name];
    }
    function getDefineState(name, callback) {
        return onJQueryAjaxError.errorTypeCallback[defineStateNamespace + name];
    }
    function getDefineType(name, callback) {
        return onJQueryAjaxError.errorTypeCallback[defineTypeNamespace + name];
    }
    /**
     * On jQuery Ajax Error Class
     */
    var onJQueryAjaxError = (function () {
        function onJQueryAjaxError() {
        }
        onJQueryAjaxError.checkContentType = function (xhr) {
            return xhr.getRepsonseHeader('Content-Type');
        };
        onJQueryAjaxError.getResponse = function (xhr) {
        };
        onJQueryAjaxError.parseResponse = function (callback) {
            if (typeof (callback) === 'function') {
                exceptionCatchAll.ComputeJQueryAjaxStackProp.parseResponse = callback;
            }
        };
        onJQueryAjaxError.isDefaultContextType = function (xhr) {
            onJQueryAjaxError.checkContentType(xhr) === onJQueryAjaxError.defaultContextType;
        };
        onJQueryAjaxError.elseCatchAll = function (error, xhr, settings, errorType) {
            console.debug('===>', error, xhr, settings, errorType);
        };
        onJQueryAjaxError.notify = function () {
            if (exceptionCatchAll.property.isProductionEnv) {
                return null;
            }
            var documentInfo = exceptionCatchAll.getDocumentInfo();
            var userInfo = exceptionCatchAll.getUserInfo();
            var timestamp = (new Date()).toString();
            var args = Array.prototype.slice.call(arguments);
            var error;
            var xhr;
            var settings;
            var errorType;
            if (args.length === 4) {
                error = args[0];
                xhr = args[1];
                settings = args[2];
                errorType = args[3];
            }
            else {
                console.error('unhandled error exception');
                return false;
            }
            exceptionCatchAll.errorReporter.count += 1;
            var trace = new exceptionCatchAll.ComputeJQueryAjaxStackProp(error, xhr, settings, errorType).getResults();
            trace.document = documentInfo;
            trace.user = userInfo;
            trace.timestamp = timestamp;
            exceptionCatchAll.setLastException(trace);
            var handlerKeys = Object.keys(onJQueryAjaxError.errorTypeCallback);
            var callErrorLog = function (type, handler) {
                if (handlerKeys.indexOf(type)) {
                    var callback = handler(type);
                    if (callback && typeof (callback) === 'function') {
                        callback.apply(callback, args);
                    }
                }
            };
            callErrorLog(trace.errorStatusCallback, getDefineStatus);
            callErrorLog(trace.errorStateCallback, getDefineState);
            callErrorLog(trace.errorTypeCallback, getDefineType);
            callErrorLog(trace.errorStatusTextCallback, getDefineStatusText);
            exceptionCatchAll.notifyMe(trace.name, trace.message, trace, exceptionCatchAll.property.icon);
            if (console && console.debug) {
                console.debug(trace);
            }
        };
        onJQueryAjaxError.subscribe = function () {
            jQuery(document).ajaxError(onJQueryAjaxError.notify);
        };
        onJQueryAjaxError.unsubscribe = function () {
        };
        onJQueryAjaxError.defineStatus = function (name, callback) {
            if (!name || typeof (callback) !== 'function') {
                throw new Error('missing params');
                return;
            }
            onJQueryAjaxError.errorTypeCallback[defineStatusNamespace + name] = callback;
        };
        onJQueryAjaxError.defineStatusText = function (name, callback) {
            if (!name || typeof (callback) !== 'function') {
                throw new Error('missing params');
                return;
            }
            onJQueryAjaxError.errorTypeCallback[defineStatusTextNamespace + name] = callback;
        };
        onJQueryAjaxError.defineState = function (name, callback) {
            if (!name || typeof (callback) !== 'function') {
                throw new Error('missing params');
                return;
            }
            onJQueryAjaxError.errorTypeCallback[defineStateNamespace + name] = callback;
        };
        onJQueryAjaxError.defineType = function (name, callback) {
            if (!name || typeof (callback) !== 'function') {
                throw new Error('missing params');
                return;
            }
            onJQueryAjaxError.errorTypeCallback[defineTypeNamespace + name] = callback;
        };
        onJQueryAjaxError.errorTypeCallback = {};
        onJQueryAjaxError.defaultContextType = 'application/json';
        return onJQueryAjaxError;
    })();
    exceptionCatchAll.onJQueryAjaxError = onJQueryAjaxError;
})(exceptionCatchAll || (exceptionCatchAll = {}));
