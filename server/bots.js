Fiber = Npm.require('fibers');
BotRegistry = {};

var TelegramBot = require('node-telegram-bot-api');

registerBotsCollection = function(collection){
    collection.find().observe({
        added: added,
        changed: changed,
        removed: removed
    });
}

function added(bot){
    var telegramBot = new TelegramBot(bot.token, {polling: true});
    var collections = {};
    bot.collections.forEach(function(collection) {
        var collectionName = bot._id + "_" + collection;
        collections[collection] = new Mongo.Collection(collectionName);
    });
    new Function('bot', 'collections', bot.code)(telegramBot, collections);
}

function changed(bot){
    console.log("changed");
    console.log(bot);
}

function removed(bot){
    console.log("removed");
    console.log(bot);
}
