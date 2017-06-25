/**
 * Created by andy on 12.06.17.
 */

"use strict";

let noteStorage = (function (shared,storage) {
    let notesInternal = [];


    class Note {
        constructor(title, description, importance, finishby) {
            // create new id
            this.id = getNotesLength();
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

    function getNotesLength(){
        notesInternal = storageReadNotes();
        return notesInternal.length;
    }

    function getNotes(htmlElement) {
        storageReadNotes(  RenderNotes);


    }

    function RenderNotes(notes){


        notes.forEach( function(note){

           note.finishbyNice = shared.dateNice(note.finishby);
           note.id = note._id;
        });

        let sortBy = configStorage.readSort();
        let filter = configStorage.readFilter();
        //storageReadConfigSort();
        /* if (sortBy === null){
         sortBy = 1;
         sortBySave(sortBy);

         }*/


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

// TODO: make following statements nicer
        if (filter !== false )
        {

            if (doSort){
                notes =  notes.filter((x) => x.finished === true);
            }else {
                notes =  notes.sort(compareFunc).filter((x) => x.finished === true);
            }

        }
        if (doSort) {
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
        // first read from storage
        //notes = storageReadNotes();
        //notes.push(note);
        // TODO adjust saveNotes that it takes notes as parameter
        //storageSaveNotes();
        storage.createItem("notes",note).done(function(x){console.log(x);});
        //return notes;
    }
    function updateNoteFinished(id,finished){
      //  let note = getNoteById(id);
      //  note.finished = finished;
        storage.setFinished(id,finished);
        //storageSaveNotes();
    }
    function updateNote(id,title,description,importance,finishby,finished){

        let note = new Note(title,description,importance,finishby);

     /*   let note = getNoteById(id);
        note.title = title;
        note.description = description;
      /*  note.descriptionBr = '"' + description.replace("\n", '"\n<br>\n"') + '"'; */
      /*  note.importance = importance;
        note.finishby = shared.dateSort(finishby);
        note.finished = finished;
        note.finishbyNice = shared.dateNice(note.finishby);*/
        storage.updateItem("notes",id,note);
       // storageSaveNotes();
    }
    function getNoteById(callback,id){
        // first read from storage
        //notes = storageReadNotes();

        storage.getItem(id).done(function(note){
            if (callback){
                console.log("getNotebyId:"+id);
                callback(note);
            }

        });
       // return notesInternal.find( x =>  x.id === id);
        // x is a note-element of notes[]. the compare functionclosure (arrow funct) will be called for each element until compare returns true)
        //return notes.find( x =>  x.id === parseInt(id) );

    }

    // storage functions
    function storageReadNotes(callback) {
       // const noteStorage = storage.readItem("notes");
        const noteStorage = storage.getAll("notes").done(function(orders){
            if (callback){
                console.log(orders)
                callback(orders);
            }


        });

        //JSON.parse(localStorage.getItem("notes"));

        if (noteStorage !== null) {
            return noteStorage;
        }
        return [];

    }

    function storageSaveNotes() {
        storage.saveItem("notes",notes);

      //  localStorage.setItem("notes",JSON.stringify(notes));
    }

    // revealing public functions
    return {

        getNotes : getNotes,
        addNote : addNote,
        getNoteById : getNoteById,
        updateNote : updateNote,
        updateNoteFinished : updateNoteFinished
        /*,
        updateSortBy : sortBySave,
        updateFilter : filterSave,
        configStyleSave : styleSave,
        configStyleRead : styleRead
*/
    }
// ()); causes to execute the object immediately
})(shared,storage);