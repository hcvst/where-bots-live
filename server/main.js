import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
    if (!Meteor.users.findOne()) {
        Accounts.createUser({
            username: "admin",
            email: "admin@localhost",
            password: "admin",
            profile: {}
        });
    }
});
