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
    BotRegistry[bot._id] = eval(bot.code);
    console.log("Added: " + bot);
}

function changed(bot){
    BotRegistry[bot._id] = eval(bot.code);
    console.log("Changed: " + bot);
}

function removed(bot){
    delete BotRegistry[bot._id];
    console.log("Removed: " + bot);
}

// move this to telegram.js