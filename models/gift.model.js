const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Gift = new Schema({
    gift_description: {
        type: String
    },
    gift_for: {
        type: String
    },

    gift_priority: {
        type: String
    },

    gift_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Gift', Gift);