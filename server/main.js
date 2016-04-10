import { Meteor } from "meteor/meteor";

Meteor.publish("myCollection", function () {
    return myCollection.find({}, { sort: { dateAdded: -1 }, limit: 3 });
});

Meteor.methods({
    "addToMyCollection": function(val) {
        myCollection.insert({
            name: val,
            dateAdded: new Date()
        });
    }
});
