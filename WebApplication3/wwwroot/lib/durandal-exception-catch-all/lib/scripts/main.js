///<reference path="onWindowException.ts" />
///<reference path="onJQueryAjaxException.ts" />
///<reference path="errorReporter.ts" />
var exceptionCatchAll;
(function (exceptionCatchAll) {
    var property = (function () {
        function property() {
        }
        property.stopDesktopNotication = true;
        property.stopPropagateError = false;
        property.isProductionEnv = false;
        property.isLabEnv = false;
        property.icon = 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png';
        return property;
    })();
    exceptionCatchAll.property = property;
})(exceptionCatchAll || (exceptionCatchAll = {}));
