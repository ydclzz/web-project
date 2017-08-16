var mongoose = require("mongoose");
var transactionSchema = mongoose.Schema({
    _buyer: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    _seller: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    _song: {type: mongoose.Schema.Types.ObjectId, ref: "SongModel"},
    price: Number,
    status: {type: String, enum: ['DONE', 'PENDING', 'CANCELED','EDITING']},
    dateCreated: {type: Date, default: Date.now}

}, {collection: "transactions"});
module.exports = transactionSchema;