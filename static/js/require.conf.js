require.config({
    shim: {
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"      
        },
        bootstrap:{
            deps: ["jquery"],
            exports: 'bootstrap'
        },
        underscore: {
            exports: "_"
        },
        jquery: {
            exports: "$"
        },
        handlebars: {
            exports: "Handlebars"
        },
        transit: {
            deps: ["jquery"],
            exports: "transit"
        } 
    },
    paths: {
        handlebars: "/static/libs/handlebars.runtime",
        jquery: "/static/libs/jquery.min",
        transit: "/static/libs/jquery.transit.min",
        underscore: "/static/libs/underscore-min",
        backbone: "/static/libs/backbone-min",
        bootstrap: "/static/libs/bootstrap"
    }    
});

