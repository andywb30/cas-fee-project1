/**
 * Created by andy on 12.06.17.
 */

"use strict";

let noteStorage = (function () {
    let notes = [];


    class Note {
        constructor(title, description, importance, finishby) {
            // create new id
            this.id = getNotesLength();
            this.title = title;
            this.description = description;
        /*    this.descriptionBr = '"' + description.replace("\n", '"\n<br>\n"') + '"';
          */  this.importance = importance;
            this.finishby = finishby;
            this.finished = false;
            this.createdAt = moment().fromNow();

        }
    }

    function getNotesLength(){
        notes = storageReadNotes();
        return notes.length;
    }

    function getNotes() {
        notes = storageReadNotes();

        let sortBy = storageReadConfigSort();
        if (sortBy === null){
            sortBy = 1;
            sortBySave(sortBy);

        }
        let filter = storageReadConfigFilter();


        let compareFunc = null;
        let doSort = true;
        console.log(sortBy, filter);

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
                return notes.filter((x) => x.finished === true);
            }else {
                return notes.sort(compareFunc).filter((x) => x.finished === true);
            }

        }
        if (doSort) {
            return notes.sort(compareFunc);
        }
        return notes;
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
        notes = storageReadNotes();
        notes.push(note);
        // TODO adjust saveNotes that it takes notes as parameter
        storageSaveNotes();
        return notes;
    }
    function updateNoteFinished(id,finished){
        let note = getNoteById(id);
        note.finished = finished;
        storageSaveNotes();
    }
    function updateNote(id,title,description,importance,finishby,finished){
        let note = getNoteById(id);
        note.title = title;
        note.description = description;
      /*  note.descriptionBr = '"' + description.replace("\n", '"\n<br>\n"') + '"'; */
        note.importance = importance;
        note.finishby = finishby;
        note.finished = finished;
        storageSaveNotes();
    }
    function getNoteById(id){
        // first read from storage
        notes = storageReadNotes();
        // x is a note-element of notes[]. the compare functionclosure (arrow funct) will be called for each element until compare returns true)
        return notes.find( x =>  x.id === parseInt(id) );

    }


    function storageReadNotes() {
        const noteStorage = JSON.parse(localStorage.getItem("notes"));
        if (noteStorage !== null) {
            return noteStorage;
        }
        return [];

    }

    function storageSaveNotes() {
        localStorage.setItem("notes",JSON.stringify(notes));
    }

    function sortBySave(sortId) {

        // some type check
        if (sortId !== null ) {
            storageSaveConfigSort(sortId);
        }
    }
    function filterSave(filter){
        // some type check
        if (filter !== null && typeof(filter)=== 'boolean') {
            storageSaveConfigFilter(filter);
        }
    }
    function styleSave(style){
        storageSaveConfigStyle(style);
    }
    function styleRead(){
        return storageReadConfigStyle();
    }

    function storageReadConfigSort(){
        return JSON.parse(localStorage.getItem("configSort"));
    }
    function storageSaveConfigSort(sortId){
        localStorage.setItem("configSort",sortId);
    }
    function storageReadConfigFilter(){
        const configStorage = JSON.parse(localStorage.getItem("configFilter"));
        return configStorage || false;
    }
    function storageSaveConfigFilter(filter){
        localStorage.setItem("configFilter",filter);
    }
    function storageReadConfigStyle(){
        let configStyle = localStorage.getItem("configStyle");
        if ( configStyle === "undefined"){
            return 0;
        }
        const configStorage = JSON.parse(configStyle);
        return configStorage || 0;
    }
    function storageSaveConfigStyle(style){
        localStorage.setItem("configStyle",style);
    }

    // revealing public functions
    return {

        getNotes : getNotes,
        addNote : addNote,
        getNoteById : getNoteById,
        updateNote : updateNote,
        updateNoteFinished : updateNoteFinished,
        updateSortBy : sortBySave,
        updateFilter : filterSave,
        configStyleSave : styleSave,
        configStyleRead : styleRead

    }
// ()); causes to execute the object immediately
}());