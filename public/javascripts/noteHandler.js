/**
 * Created by andy on 12.06.17.
 */

"use strict";

let noteHandler = (function (shared,storage,pnetwork) {
    let notesInternal = [];

    const network = pnetwork;

    class Note {
        constructor(title, description, importance, finishby) {
            this._id = 0;
            this.title = title;
            this.description = description;
        /*    this.descriptionBr = '"' + description.replace("\n", '"\n<br>\n"') + '"';
          */  this.importance = importance;
            this.finishby = shared.dateSort(finishby);
            this.finishbyNice = shared.dateNice(this.finishby);
            this.finished = false;
            this.createdAt = moment();

        }
    }

    function getNotes() {
        network.noteGetAll().done(function(notes) {
            RenderNotes(notes);
        });
    }

    function RenderNotes(notes){

        notes.forEach( function(note){
           note.finishbyNice = shared.dateNice(note.finishby);
        });

        let sortBy = configStorage.readSort();
        let filter = configStorage.readFilter();

        let compareFunc = null;
        let doSort = true;
        console.log("getnotes:",sortBy, filter);

        switch (sortBy) {
            case 1:
                compareFunc = compareFinishby;
                break;
            case 2:
                compareFunc = compareCreatedAt;
                break;
            case 3:
                compareFunc = compareImportance;
                break;
            default:
                doSort = false;
        }

        if (filter  ){
            notes =  notes.filter((x) => x.finished === true);
        }
        if (doSort){
           notes =  notes.sort(compareFunc);
        }
        notesInternal = notes;
        let notesRendered = handleBarRender.renderNotes(document.getElementById("noteListTemplate").innerText,notes);
        if (notesRendered !== null) {
            document.getElementById("list-notes").innerHTML = notesRendered;
        }
    }

    function compareFinishby(a,b){
        // show older finishby first
        return a.finishby > b.finishby;
    }

    function compareCreatedAt(a,b){
        return a.createdAt < b.createdAt;
    }

    function compareImportance(a,b){
        return a.importance < b.importance;
    }

    function addNote(title,description,importance,finishby){
        let note = new Note(title,description,importance,finishby);

        network.noteCreate(note).done(function(x){console.log(x);});

    }
    function updateNoteFinished(id,finished){
        network.noteUpdateFinished(id,finished);
    }
    function updateNote(id,title,description,importance,finishby){

        let note = new Note(title,description,importance,finishby);

        network.noteUpdate(id,note);
    }
    function getNoteById(callback,id){

        network.noteGet(id).done(function(note){
            if (callback){
                console.log("getNotebyId:"+id);
                note.finishbyNice = shared.dateNice(note.finishby);
                callback(note);
            }

        });

    }

    return {
        getNotes: getNotes,
        updateNoteFinished : updateNoteFinished,
        updateNote : updateNote,
        getNoteById : getNoteById,
        addNote : addNote

    }


// ()); causes to execute the object immediately
})(shared,storage,network);