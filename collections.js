TelegramApps = new Meteor.Collection('telegramApps');
TelegramBots = new Meteor.Collection('telegramBots');
Stats = new Meteor.Collection('stats');

if(Meteor.isServer){
    registerBotsCollection(TelegramBots);
}

TelegramApps.attachSchema(new SimpleSchema({
    api_id: {
        type: String,
        label: 'API ID'
    },
    api_hash: {
        type: String,
        label: 'API Hash'
    },
    title: {
        type: String
    },
    name: {
        type: String
    },
    test_configuration: {
        type: String,
        label: 'Test Configuration'
    },
    production_configuration: {
        type: String,
        label: 'Production Configuration'
    },
    public_key: {
        type: String,
        label: 'Public Key',
        autoform: {
            type: String,
            rows: 8
        }
    }
}));
var defaultCode = '' +
    'bot.onText(/\\/start/, function(msg){\n'+
    '    bot.sendMessage(msg.from.id, \n' +
    '        "This bot is still under development using https://github.com/hcvst/where-bots-live"\n' +
    '    );\n' +
    '});\n\n'+
    'bot.onText(/\\/hello/, function(msg){\n' +
    '    bot.sendMessage(msg.from.id, "Hello World");\n' +
    '});\n\n' +
    'bot.onText(/\\/count/, function(msg){\n' +
    '    // also see http://docs.meteor.com/api/collections.html#Mongo-Collection\n' +
    '    // Access to collections must happen from within a Fiber\n' +
    '    Fiber(function(){\n' +
    '        collections.state.insert({from: msg.from.id});\n' +
    '        count = collections.state.find({from: msg.from.id}).count();\n' +
    '        bot.sendMessage(msg.from.id, "Called " + count + " times.");\n' +
    '    }).run();\n' +
    '})\n\n';

TelegramBots.attachSchema(new SimpleSchema({
    name: {
        type: String
    },
    token: {
        type: String
    },
    collections: {
        type: [String],
        autoform: {
            type: 'tags',
            defaultValue: ['state']
        }
    },
    code: {
        type: String,
        autoform: {
            type: 'ace',
            defaultValue: defaultCode
        }
    },
    is_active: {
        type: Boolean
    }
}));

AdminConfig = {
    //logoutRedirect: 'login',
    skin: 'black-light',
    collections: {
        TelegramApps: {
            label: 'Telegram Apps',
            icon: 'plug',
            //omitFields: ['createdAt', 'url', 'owner'],
            tableColumns: [
                {label: 'Title', name: 'title'}
            ],
            showEditColumn: true, // Set to false to hide the edit button. True by default.
            showDelColumn: true, // Set to false to hide the edit button. True by default.
            showWidget: true,
            color: 'blue'
        },
        TelegramBots: {
            label: 'Telegram Bots',
            icon: 'at',
            //omitFields: ['createdAt', 'url', 'owner'],
            tableColumns: [
                {label: 'Name', name: 'name'},
                {label: 'Activated', name: 'is_active'}
            ],
            showEditColumn: true, // Set to false to hide the edit button. True by default.
            showDelColumn: true, // Set to false to hide the edit button. True by default.
            showWidget: true,
            color: 'red',
            templates: {
                new: {
                    name: 'newBot'
                },
                //edit: {
                //    name: 'updateBot',
                //}
            }
        }
    }
};
