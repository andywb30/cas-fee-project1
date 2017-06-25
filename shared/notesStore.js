/**
 * Created by awedag on 22.06.17.
 */

const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

/*
function Order(pizzaName, orderedBy)
{
    this.orderedBy = orderedBy;
    this.pizzaName = pizzaName;
    this.orderDate = new Date();
    this.state = "OK";
}
*/


class Note {
    constructor(title, description, importance, finishby) {
        // create new id
        this.id = 43;
        this.title = title;
        this.description = description;
        /*    this.descriptionBr = '"' + description.replace("\n", '"\n<br>\n"') + '"';
         */  this.importance = importance;
        this.finishby = finishby;
        this.finished = false;
        this.createdAt = new Date();
    }
}

function publicNoteAdd(title, desc, importance, finishby, callback)
{

    let note = new Note(title,desc,importance,finishby);

    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicNoteRemove(id,  callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, count) {
        publicNoteGet( callback);
    });
}

function publicNoteUpdate(id, title, desc, importance, finishby,  callback) {
    let note = new Note(title,desc,importance,finishby);

    db.update({_id: id},note, {}, function (err, doc) {
        // publicNoteGet( callback);
        if (callback) {
            callback(err, doc);
        }
    });
}


function publicNoteUpdateFinished(id, finished) {

    db.update({_id: id}, { $set: { finished: finished } }, {}, function (err, doc) {
        // publicNoteGet( callback);

    });
}

function publicNoteGet(id, callback)
{
    db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicNoteAll( callback)
{
    db.find({}, function (err, notes) {
        callback( err, notes);
    });
}

module.exports = {add : publicNoteAdd, delete : publicNoteRemove, update : publicNoteUpdate,updateFinished : publicNoteUpdateFinished, get : publicNoteGet, all : publicNoteAll};