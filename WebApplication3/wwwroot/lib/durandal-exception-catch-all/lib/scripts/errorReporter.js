var exceptionCatchAll;
(function (exceptionCatchAll) {
    /**
     * OnWindowError Class
     */
    var errorReporter = (function () {
        function errorReporter() {
        }
        errorReporter.silence = function () {
            window.onerror = function () {
                return true;
            };
        };
        errorReporter.count = 0;
        return errorReporter;
    })();
    exceptionCatchAll.errorReporter = errorReporter;
})(exceptionCatchAll || (exceptionCatchAll = {}));
