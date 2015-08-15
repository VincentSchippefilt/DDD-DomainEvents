var exceptionCatchAll;
(function (exceptionCatchAll) {
    /**
     * OnWindowError Class
     */
    var Constant = (function () {
        function Constant() {
        }
        Constant.knownMessage = {
            "cannot read property 'router' of undefined": 'required class is returning undefined object can\'t create route'
        };
        Constant.colors = {
            'bold': [1, 22],
            'italic': [3, 23],
            'underline': [4, 24],
            'inverse': [7, 27],
            'white': [37, 39],
            'grey': [90, 39],
            'black': [30, 39],
            'blue': [34, 39],
            'cyan': [36, 39],
            'green': [32, 39],
            'magenta': [35, 39],
            'red': [31, 39],
            'yellow': [33, 39]
        };
        // Don't use 'blue' not visible on cmd.exe
        Constant.styles = {
            'special': 'cyan',
            'number': 'yellow',
            'boolean': 'yellow',
            'undefined': 'grey',
            'null': 'bold',
            'string': 'green',
            'date': 'magenta',
            // "name": intentionally not styling
            'regexp': 'red'
        };
        Constant.FIREFOX_SAFARI_STACK_REGEXP = /\S+\:\d+/;
        Constant.CHROME_IE_STACK_REGEXP = /\s+at /;
        return Constant;
    })();
    exceptionCatchAll.Constant = Constant;
})(exceptionCatchAll || (exceptionCatchAll = {}));
