define([
    'jquery',
    'backbone',
    'transit', 
    'handlebars',
    '/static/js/UserGeoLocation.js',
    '/static/js/ContactList.js',
    '/static/libs/jquery.cookie.js',
    '/static/js/templates/tzone.js',
    'bootstrap'
], function($, Backbone, transit, handlebars, UserGeoLocation, TZContactList, cookie, templates, bootstrap){
    "use strict";
    var IndexPageView = Backbone.View.extend({
        tagname: 'div',
        events: {

        },
        initialize: function(){ 
           this.user = undefined;
            if(window.username !== undefined){
                $.cookie("hasloggedin", "true", {path: '/'});
            }
            if($.cookie("hasloggedin")){
                if(window.username !== undefined){
                    // loged in user
                    this.$el.append("<p>Loading your details</p>");
                    this.createContactList();
                } else {
                    // has logged in before 
                    this.$el.append(templates["user.welcome"]({name:""}));
                }                
            } else {
                // brand new user
                this.$el.append("<p>Looking for your location</p>");
                this.getUserLocation();
            }
            $(this.options.container).append(this.el);
        },
        createContactList: function(){
            console.log("creating contact list");
            this.contactList = new TZContactList();
            this.listenTo(this.contactList, 'load-done', this.contactsLoaded);            
        },
        contactsLoaded: function(){
            console.log("contacts loaded");
            this.user = this.contactList.getUser();
            console.log(this.user);
            this.userTimezoneFound();
        },
        userTimezoneFound: function(){
            var that = this;
            console.log("hiding");

            this.$el.find("p").transition({
                opacity: '0',
                'delay': '500' 
            }, function(){
                this.remove();
                console.log(templates);

                that.$el.html(templates["user.intro"]({
                    tzone: that.user.get("timezoneid").replace("_"," ")
                }));    
                that.$el.find("p").transition({
                    "opacity": '1'
                }, function(){
                    console.log("done");
                });
            });
        },
        getUserLocation: function(){
            var that = this;
            // Get the users locations
            var u = new UserGeoLocation({
                success: function(pos){
                    that.userLocationSuccess(pos);
                },
                fail: function(msg){
                    that.userLocationFail(msg);
                }
            });
        },
        userLocationSuccess: function(pos){
            console.log("found");

            //this.user.setPosition(pos.coords.latitude,pos.coords.longitude);
            //this.user.fetchTimeZone();
            this.trigger("user-location-found");
        },
        userLocationFail: function(msg){
            
        }
    });

    return IndexPageView;
});