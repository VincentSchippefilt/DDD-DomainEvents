var exceptionCatchAll;
(function (exceptionCatchAll) {
    function isInnerError(error) {
        if (error && error.innerError) {
            return true;
        }
    }
    function isReferenceError(error) {
        if (!isInnerError(error) || !error.innerError.constructor) {
            return false;
        }
        if (error.innerError.constructor.name === 'ReferenceError') {
            return true;
        }
    }
    /**
     * Compute Stack Trace From Stack Properties
     */
    var ComputeStackTraceFromStackProp = (function () {
        function ComputeStackTraceFromStackProp(error) {
            this.results = {};
            if (!error.stack) {
                return null;
            }
            var chrome = /^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
            var lines = error.stack.split('\n');
            var stackParts = [];
            var parts;
            var element;
            var modaType = 'javascript-stack';
            for (var i = 0, j = lines.length; i < j; ++i) {
                var _ = '|';
                if ((parts = chrome.exec(lines[i]))) {
                    element = {
                        'url': parts[2],
                        'func': parts[1] || '?',
                        'line': +parts[3],
                        'column': parts[4] ? +parts[4] : null
                    };
                    element.log = element.url + _ + element.line + _ + element.func;
                }
                else {
                    continue;
                }
                stackParts.push(element);
            }
            if (stackParts.length) {
                error.message = error.message || '';
                this.results = {
                    mode: modaType,
                    name: error.name,
                    message: error.message,
                    stack: stackParts,
                };
                var messageKey = error.message.toLowerCase();
                if (exceptionCatchAll._has(exceptionCatchAll.Constant.knownMessage, messageKey)) {
                    this.results.possibleCause = exceptionCatchAll.Constant.knownMessage[messageKey];
                }
            }
            if (isReferenceError(error)) {
                this.results.reference = new ComputeStackTraceFromStackProp(error.innerError);
                this.results.requireMap = error.innerError.requireMap;
                this.results.requireType = error.innerError.requireType;
                this.results.requireModules = error.innerError.requireModules;
            }
            else if (isInnerError(error)) {
                this.results.reference = new ComputeStackTraceFromStackProp(error.innerError);
                this.results.requireMap = error.innerError.requireMap;
                this.results.requireType = error.innerError.requireType;
                this.results.requireModules = error.innerError.requireModules;
            }
            else if (error && error.stack) {
            }
            this.results.error = error;
            return this;
        }
        ComputeStackTraceFromStackProp.prototype.toJSON = function () {
            return this.getResults();
        };
        ComputeStackTraceFromStackProp.prototype.toString = function () {
            return JSON.stringify(this.getResults());
        };
        ComputeStackTraceFromStackProp.prototype.toFormattedString = function () {
            return JSON.stringify(this.getResults(), null, '\t');
        };
        ComputeStackTraceFromStackProp.prototype.getResults = function () {
            return this.results;
        };
        return ComputeStackTraceFromStackProp;
    })();
    exceptionCatchAll.ComputeStackTraceFromStackProp = ComputeStackTraceFromStackProp;
})(exceptionCatchAll || (exceptionCatchAll = {}));
