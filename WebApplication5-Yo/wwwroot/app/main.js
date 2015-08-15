requirejs.config({
    paths: {
        'text': '../lib/requirejs-text/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout.js/knockout.debug',
        'jquery': '../lib/jquery/dist/jquery',
        'bootstrap': '../lib/bootstrap/dist/js/bootstrap',
        'modernizr': '../lib/modernizr/modernizr',
    },
    shim: {
    bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
    modernizr: {
            exports: 'Modernizr'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = "ddd";

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });
});
