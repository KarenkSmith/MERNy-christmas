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
    },
    
    // user_id: 
    //     {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
});

module.exports = mongoose.model('Gift', Gift);