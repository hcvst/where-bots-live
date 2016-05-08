TelegramApps = new Meteor.Collection('telegramApps');
TelegramBots = new Meteor.Collection('telegramBots');

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

TelegramBots.attachSchema(new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        autoform: {
            type: String,
            rows: 40
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
            color: 'red'
        }
    }
};
