define([
    'jquery',
    'backbone',
    'transit', 
    'handlebars',
    'bootstrap',
    '/static/js/UserGeoLocation.js',
    '/static/js/ContactListView.js',
    '/static/libs/jquery.cookie.js',
    '/static/js/templates/tzone.js',
    '/static/js/GoogleMapHandler.js'
], function($, Backbone, transit, handlebars, bootstrap, UserGeoLocation,
            TZContactListView, cookie, templates, GoogleMapHandler){
    "use strict";

    var AppPageView = Backbone.View.extend({
        tagname: 'div',
        events: {
            
        },
        initialize: function(){
            this.gmap = new GoogleMapHandler();
            this.gmap.onClick(this, this.mapClicked);
            this.contacts = new TZContactListView({
                "container" : "#friendlist",
                "gmap" : this.gmap
            });
        },
        createContactsList: function(){
            this.contacts = new TZContactListView({
                "container": "#friendlist",
                "gmap": this.gmap
            });
        },
        mapClicked: function(loc){
            $('#userAddModal').modal();     
            $('#userAddModal').on('shown', function () {
                console.log("show");
                $('#userAddModal .new-users-name').focus();
            });
            this.currentContactLoc = loc;
            var that = this;
            var saveAndValidate = function(){
                // TODO validate this, make this modal a view
                var userName = $('#userAddModal .new-users-name').val();
                console.log(userName, $.trim(userName));
                if($.trim(userName) === ""){
                    $('#userAddModal .alert').show();
                } else {
                    $('#userAddModal .new-users-name').val("");
                    $('#userAddModal .alert').hide();
                    $('#userAddModal').modal("hide");
                    that.userNameSaved(that.currentContactLoc, userName);      
                }
            };
            $('#userAddModal .new-users-name').on('keyup', function(e){
                if(e.which === 13){
                    saveAndValidate();
                }
            });
            $('#userAddModal').on('click', '.save-name', function(){
                saveAndValidate();
            });
        },
        userNameSaved: function(loc, name){
            this.trigger("user-added");
            this.contacts.addItem(loc.latLng, name);
        }
    });
    return AppPageView;
});




