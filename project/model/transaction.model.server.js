var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var transactionModel = mongoose.model("TransactionModel", transactionSchema);
var songModel = require("./song.model.server");
var userModel = require("./user.model.server");
var db = require("./database");

transactionModel.createTransaction = createTransaction;
transactionModel.findTransactionById = findTransactionById;
transactionModel.findTransactionBySeller = findTransactionBySeller;
transactionModel.findTransactionByBuyer = findTransactionByBuyer;
transactionModel.updateTransaction = updateTransaction;
module.exports = transactionModel;

function createTransaction(buyerId, sellerId, songId, transaction) {
    transaction._buyer = buyerId;
    transaction._seller = sellerId;
    transaction._songId = songId;
    var transactionTemp = null;
    return transactionModel
        .create(transaction)
        .then(function (newtransaction) {
            transactionTemp = newtransaction;
            return userModel.addTransaction(buyerId, newtransaction._id);
        })
        .then(function (res) {
            return userModel.addTransaction(sellerId, transactionTemp._id);
        })
        .then(function (res) {
            return transactionTemp;
        })
}


function findTransactionById(transactionId) {
    return transactionModel.findOne({_id: transactionId});
}

function findTransactionBySeller(sellerId) {
    return transactionModel.find({_seller: sellerId});
}

function findTransactionByBuyer(buyerId) {
    return transactionModel.find({_buyer: buyerId});
}

function updateTransaction(transactionId, transaction){
    return transactionModel.updateOne({_id: transactionId},
        {$set: transaction});
}

