var exceptionCatchAll;
(function (exceptionCatchAll) {
    /**
     * Document Helpers
     */
    var lastException = ko.observable();
    var subscriptions = [];
    function getLastException(options) {
        return lastException();
    }
    exceptionCatchAll.getLastException = getLastException;
    function setLastException(value) {
        lastException(value);
    }
    exceptionCatchAll.setLastException = setLastException;
    function onExceptionType(eventType, callback, scope) {
        scope = scope || this;
        subscriptions.push(lastException.subscribe(callback, scope, eventType));
    }
    exceptionCatchAll.onExceptionType = onExceptionType;
    function onException(callback) {
        subscriptions.push(lastException.subscribe(callback));
    }
    exceptionCatchAll.onException = onException;
    function disposeSubscriptions() {
        var index, subscribe, _disposeOf, _i, _len;
        _disposeOf = subscriptions.filter(function (subscribe) {
            return subscribe;
        });
        for (index = _i = 0, _len = _disposeOf.length; _i < _len; index = ++_i) {
            subscribe = _disposeOf[index];
            subscribe.dispose();
            subscriptions[index] = null;
        }
        _disposeOf = null;
    }
    ;
    function dispose() {
        disposeSubscriptions();
    }
    exceptionCatchAll.dispose = dispose;
    ;
    function notifyWindowDesktop(options) {
        var title = options.title;
        var icon = options.icon;
        var body = options.body;
        var onClick = options.onClick;
        if (!Notification) {
            alert('Please use a modern version of Chrome, Firefox, Opera or Firefox.');
            return;
        }
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        var notification = new Notification(title, {
            icon: icon,
            body: body,
        });
        notification.onclick = function () {
            var args = Array.prototype.slice.call(arguments);
            if (typeof (onClick) === 'function') {
                onClick.apply(onClick, args);
            }
        };
    }
    exceptionCatchAll.notifyWindowDesktop = notifyWindowDesktop;
})(exceptionCatchAll || (exceptionCatchAll = {}));
