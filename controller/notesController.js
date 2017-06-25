/**
 * Created by awedag on 22.06.17.
 */

const store = require("../shared/notesStore.js");


module.exports.notesGet = function(req, res)
{
    store.all( function (err, notes) {
        res.json(notes || {});
    })
};

module.exports.noteCreate = function(req, res)
{
    let note = store.add(req.body.title, req.body.description, req.body.importance,req.body.finishby,  function(err, note) {
        res.json(note);
    });
};


module.exports.noteUpdate = function(req, res)
{
    if (req.body.finished !== undefined){
        let note = store.updateFinished(req.params.id,req.body.finished , function(err, note) {
            res.json(note);
        });
    }
    else{

      let note = store.update(req.params.id,req.body.title, req.body.description, req.body.importance,req.body.finishby,  function(err, note) {
         res.json(note);
     });
    }
};

module.exports.noteShow = function(req, res){
    store.get(req.params.id,  function(err, note) {
        res.json(note);
    });
};

module.exports.noteDelete =  function (req, res)
{
    store.delete(  req.params.id,  function(err, note) {
        res.json(note);
    });
};
