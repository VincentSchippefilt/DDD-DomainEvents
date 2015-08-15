///<reference path="computeStackTraceFromStackProp.ts" />
///<reference path="notify.ts" />
var exceptionCatchAll;
(function (exceptionCatchAll) {
    /**
     * OnWindowError Class
     */
    var onWindowError = (function () {
        function onWindowError() {
        }
        onWindowError.notifyHandlers = function () {
            if (exceptionCatchAll.property.isProductionEnv) {
                return null;
            }
            var documentInfo = exceptionCatchAll.getDocumentInfo();
            var userInfo = exceptionCatchAll.getUserInfo();
            var timestamp = (new Date()).toString();
            var args = Array.prototype.slice.call(arguments);
            var message;
            var fileUrl;
            var linenumber;
            var columnNumber;
            var error;
            var caller = arguments.callee;
            exceptionCatchAll.errorReporter.count += 1;
            if (args.length === 5) {
                message = args[0];
                fileUrl = args[1];
                linenumber = args[2];
                columnNumber = args[3];
                error = args[4];
            }
            else {
                console.error('unhandled error exception');
                return false;
            }
            var trace = new exceptionCatchAll.ComputeStackTraceFromStackProp(error).getResults();
            trace.document = documentInfo;
            trace.user = userInfo;
            trace.timestamp = timestamp;
            exceptionCatchAll.setLastException(trace);
            exceptionCatchAll.notifyMe(trace.name, trace.message, trace, exceptionCatchAll.property.icon);
            if (console && console.debug) {
                console.debug(trace);
            }
            return exceptionCatchAll.property.stopPropagateError;
        };
        onWindowError.subscribe = function () {
            window.onerror = onWindowError.notifyHandlers;
        };
        onWindowError.unsubscribe = function () {
            window.onerror = null;
        };
        return onWindowError;
    })();
    exceptionCatchAll.onWindowError = onWindowError;
})(exceptionCatchAll || (exceptionCatchAll = {}));
