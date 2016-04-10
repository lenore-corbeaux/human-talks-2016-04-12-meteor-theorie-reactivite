import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import "./main.html";

Meteor.startup(function() {
    Reveal.initialize({
        history: true,
        controls: false
    });
});

var example1 = new ReactiveVar("Pas encore initialisée");

Template.example1.helpers({
    reactiveData: function() {
        return example1.get();
    }
});

Template.example1.events({
    "click button": function() {
        example1.set(Math.random());
    }
});

Meteor.subscribe("myCollection");

Template.example2.helpers({
   reactiveCollection: function() {
       return myCollection.find();
   }
});

Template.example2.events({
    "submit form": function(event, template) {
        event.preventDefault();
        var el = template.$("#example-2-name");
        var val = el.val();
        Meteor.call("addToMyCollection", val);
        el.val("");
    }
});

var lastAdded = new ReactiveVar(false);

Template.example3.helpers({
    reactiveCollection: function() {
        var elements = myCollection.find();
        lastAdded.set(moment().format("HH:mm:ss"));

        return elements;
    },
    lastAdded: function() {
        return lastAdded.get();
    }
});

Template.example3.events({
    "submit form": function(event, template) {
        event.preventDefault();
        var el = template.$("#example-3-name");
        var val = el.val();
        Meteor.call("addToMyCollection", val);
        el.val("");
    }
});

var lastAdded2 = new ReactiveVar(false);
var count = new ReactiveVar(0);

Template.example4.helpers({
    reactiveCollection: function() {
        var elements = myCollection.find();
        count.set(elements.count());
        lastAdded2.set(moment().format("HH:mm:ss"));

        return elements;
    },
    lastAdded: function() {
        return lastAdded2.get();
    },
    count: function() {
        return count.get();
    }
});

Template.example4.events({
    "submit form": function(event, template) {
        event.preventDefault();
        var el = template.$("#example-4-name");
        var val = el.val();
        Meteor.call("addToMyCollection", val);
        el.val("");
    }
});