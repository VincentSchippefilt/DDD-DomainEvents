var exceptionCatchAll;
(function (exceptionCatchAll) {
    /**
     * Compute Stack Trace From Stack Properties
     */
    var ComputeJQueryAjaxStackProp = (function () {
        function ComputeJQueryAjaxStackProp(error, xhr, settings, errorType) {
            this.results = {};
            this.results.errorType = errorType.toLowerCase();
            this.results.accepts = settings.accepts;
            this.results.isAsync = settings.async;
            this.results.contentType = settings.contentType;
            this.results.dataTypes = settings.dataTypes;
            this.results.hasContent = settings.hasContent;
            this.results.isLocal = settings.isLocal;
            this.results.canProcessData = settings.processData;
            this.results.requestType = settings.type;
            this.results.url = settings.url;
            this.results.readyState = xhr.readyState;
            this.results.status = xhr.status;
            this.results.statusText = xhr.statusText;
            this.results.state = xhr.state();
            this.results.mode = 'ajax-stack';
            this.results.name = this.results.errorType;
            this.results.message = 'request (\'' + this.results.url + '\') return status code:' + this.results.status + ' with a state of ' + this.results.state;
            this.results.stack = [];
            if (this.results.errorType) {
                this.results.errorTypeCallback = this.results.errorType.toLowerCase();
            }
            if (this.results.status) {
                this.results.errorStatusCallback = this.results.status;
            }
            if (this.results.statusText) {
                this.results.errorStatusTextCallback = this.results.statusText.toLowerCase();
            }
            if (this.results.state) {
                this.results.errorStateCallback = this.results.state.toLowerCase();
            }
            this.results.response = ComputeJQueryAjaxStackProp.parseResponse(xhr.responseText, this.results, xhr);
        }
        ComputeJQueryAjaxStackProp.parseResponse = function (response, trace, xhr) {
            return response;
        };
        ComputeJQueryAjaxStackProp.prototype.toJSON = function () {
            return this.getResults();
        };
        ComputeJQueryAjaxStackProp.prototype.toString = function () {
            return JSON.stringify(this.getResults());
        };
        ComputeJQueryAjaxStackProp.prototype.toFormattedString = function () {
            return JSON.stringify(this.getResults(), null, '\t');
        };
        ComputeJQueryAjaxStackProp.prototype.getResults = function () {
            return this.results;
        };
        return ComputeJQueryAjaxStackProp;
    })();
    exceptionCatchAll.ComputeJQueryAjaxStackProp = ComputeJQueryAjaxStackProp;
})(exceptionCatchAll || (exceptionCatchAll = {}));
