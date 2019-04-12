const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const giftRoutes = express.Router();
const PORT = process.env.PORT || 4000;         


require('dotenv').config();
require('./config/database')


let Gift = require('./models/gift.model');

console.log('DB: ', process.env.DATABASE_URL)
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/gifts', giftRoutes);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const connection = mongoose.connection;

// connection.once('open', function () {
//     console.log('mongodb connection established');
// })

giftRoutes.route('/').get(function(req, res){
    Gift.find(function(err, gifts) {
        if (err) {
            console.log(err);
        } else {
            res.json(gifts);
        }
    });
});

giftRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Gift.findById(id, function(err, gift){
        res.json(gift);
    });
});

giftRoutes.route('/add').post(function(req, res){

    let gift = new Gift(req.body);
    console.log(gift);
    gift.save()
        .then(gift => {
            res.status(200).json({'gift': 'gift added!'});
        })
        .catch(err => {
            res.status(400).send('adding new gift failed');
        });
});

giftRoutes.route('/update/:id').post(function(req, res){
    Gift.findById(req.params.id, function(err, gift){
        if (!gift)
            res.status(404).send('data not found');
        else
            gift.gift_description = req.body.gift_description;
            gift.gift_for = req.body.gift_for;
            gift.gift_priority = req.body.gift_priority;
            gift.gift_completed = req.body.gift_completed;
            console.log(gift);
            gift.save().then(gift =>{
                res.json('gift updated');
            })
            .catch(err => {
                res.status(400).send('update not possible')
            });
    });
});


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function() {
    console.log("working on ", PORT)
})