define([
    'jquery',
    'backbone',
    'underscore',
    '/static/js/Contact.js',
    '/static/js/ContactView.js',
    '/static/js/ContactList.js',
    '/static/js/ContactTimeView.js'
], function($, Backbone, _, TZContact, TZContactView, TZContactList, TZContactTimeView){
    "use strict";

    var TZContactListView = Backbone.View.extend({
        tagName: "div",
        id: "contactview",
        events: {
        },
        initialize: function(){
            console.log("building contact list view");

            $(this.options.container).append(this.el);
            this.$el.append("<ul class='list-container unstyled'></ul>");
            this.gmap = this.options.gmap;
            _.bindAll(this, "render", "addItem", "loadDone");
            this.collection = new TZContactList();
            window.c = this.collection;
            this.collection.bind('load-done', this.loadDone);
            this.collection.on("in-calendar", this.addToCalendar, this);
            var that = this;
            (function(){
                console.log("test");
                that.tickInterval = window.setInterval(function(){
                    that.trigger("tick");
                },1000);
            })();
        },
        loadDone: function(){
            _.each(this.collection.models, function(i){
                // TODO models with no location
                this.addModelView(i);
            }, this);
            this.render();
            this.trigger("load-render-completed");
        },
        render: function(){
            _.each(this.collection.models, function(i){
                i.trigger("dom-insert");
            }, this);
            return this;
        },
        /*
          reverseit: function(e){
          this.collection.models.reverse();
          this.collection.trigger("dom-remove");
          _.each(this.collection.models, function(i){
          i.trigger("dom-insert");
          }, this);
          
          },

        */
        addToCalendar: function(model, modelview){
            // console.log("in calendar", model.toJSON(), modelview);
            var listView = new TZContactTimeView({
                container: $("#times-wrapper"),
                contactView: modelview,
                model: model,
                listview: this
            }).render();
        },
        addModelView: function(i){
            // console.log("adding model", i.get('timezoneid'));
            if(i.get('timezoneid') === undefined){
                i.fetchTimeZone();
            }
            new TZContactView(
                {model:i,
                 listview: this,
                 container: this.$el.find("ul")
                }).render();

        },
        addItem: function(loc, contactName,  isUser){
            var userCount = this.collection.filter(function(contact){
                return contact.get("isUser");
            });
            
            if(userCount.length > 0 && isUser === true){
                // TODO: offer to update location
                console.log("found location alredy for the user" , isUser);
                return;
            }
            console.log("about to create");
            var i = new TZContact();
            console.log("adding to collection");
            this.collection.add(i);
            console.log("obj created");
            i.set({
                "contactName":  contactName  || "new contact",
                "isUser":    isUser    || false,
                "lat":       loc.lat(),
                "lng":       loc.lng()
            });
            console.log("nc" , i.toJSON());
            this.addModelView(i);
            this.render();
            return this; // Allow Chaining  TODO: should this return the model 
        }
    });

    return TZContactListView;

});