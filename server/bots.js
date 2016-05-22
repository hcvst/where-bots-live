Fiber = Npm.require('fibers');

BotRegistry = {};

var TelegramBot = require('node-telegram-bot-api');

registerBotsCollection = function (collection) {
    collection.find().observe({
        added: create,
        changed: update,
        removed: remove
    });
}

function create(bot) {
    console.log("Create bot: " + bot.name);
    initRegistry(bot);
    addCollections(bot);
    addTelegramBot(bot);
}

function update(bot) {
    console.log("Update bot: " + bot.name);
    suspendBot(bot);
    addCollections(bot);
    dropUnusedCollections(bot);
    addTelegramBot(bot);
}

function remove(bot) {
    console.log("Remove bot: " + bot.name);
    suspendBot(bot);
    dropAllCollections(bot);
    removeFromRegistry(bot);
}



function initRegistry(bot) {
    BotRegistry[bot._id] = {bot: null, collections: {}};
}

function removeFromRegistry(bot) {
    delete BotRegistry[bot._id];
}


function addCollections(bot) {
    var registeredCollections = BotRegistry[bot._id].collections;
    bot.collections.forEach(function (collectionName) {
        if (!registeredCollections[collectionName]) {
            var prefixedCollectionName = bot._id + "_" + collectionName;
            registeredCollections[collectionName] = new Mongo.Collection(prefixedCollectionName);
        }
    });
}

function dropUnusedCollections(bot) {
    var registeredCollections = BotRegistry[bot._id].collections;
    for(registeredCollectionName in registeredCollections){
        if(bot.collections.indexOf(registeredCollectionName) == -1){
            dropCollection(registeredCollections[registeredCollectionName]);
        }
    }
}


function addTelegramBot(bot) {
    if(bot.is_active){
        BotRegistry[bot._id].bot = new TelegramBot(bot.token, {polling: true});

        try {
            new Function('bot', 'collections', 'Npm', bot.code)(
                BotRegistry[bot._id].bot,
                BotRegistry[bot._id].collections,
                Npm);
        } catch (e) {
            console.log("Failed to create Telegram bot: " + e);
        }
    }
}

function suspendBot(bot) {
    if(BotRegistry[bot._id].bot){
        BotRegistry[bot._id].bot._polling.abort = true;
    }
}

function dropAllCollections(bot) {
    var registeredCollections = BotRegistry[bot._id].collections;
    for (registeredCollectionName in registeredCollections) {
        dropCollection(registeredCollections[registeredCollectionName]);
    }
}

function dropCollection(collection) {
    console.log("Dropping collection " + collection._name);
    collection.rawCollection().drop(function (err) {
        if (err) {
            console.log("Could not drop collection: " + err);
        }
    });
}
