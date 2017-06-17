/**
 * Created by wildi on 14.06.17.
 */


"use strict";


window.onload = function() {

    // initialization

    let notesId = window.location.hash;

    let editMode = false;

    init();
    function init(){

        shared.styleSelect();
        if (notesId !== "") {
            editMode = true;
            notesId = notesId.substr(1);
            loadNoteToView();
            console.log("Loading" + notesId);

        }
        console.log("Loading" );
    }


    // Event Listener
    // register event handler on event "click""
    const detailSubmit = document.getElementById("detailSubmit");
    detailSubmit.addEventListener("click",buttonSubmitListener);

    const importantPic = document.getElementById("importance-pic");
    // event bubbler
    importantPic.addEventListener("click",flashShowHideListener);

    function loadNoteToView() {
        if (notesId !== undefined) {

            let note = noteStorage.getNoteById(notesId);
            if (note !== undefined) {

                document.getElementById("title").value = note.title;
                document.getElementById("description").value = note.description;
                document.getElementById("finishby").value = note.finishby;
                setImportanceRating(note.importance);

            }

        }
    }

    // Listeners
    function buttonSubmitListener() {

        console.log("buttonSubmitListener inside");

        const title = document.getElementById("title").value;
        const desc = document.getElementById("description").value;
        const finishby = document.getElementById("finishby").value;
        const importance = getImportanceRate();

        if (editMode && title !== "") {
            noteStorage.updateNote(notesId,title,desc,importance,finishby);
        }
        else if (title !== "") {
            noteStorage.addNote(title, desc, importance, finishby);
        }
        goBackToIndex();
    }

    function flashShowHideListener(event)
    {
        const i = event.target.getAttribute("data-flash-id");
        setImportanceRating(i);
    }


    // helperfunctions
    // importance show flash black or grey (=inactive)

    function goBackToIndex(){
        window.location.href = 'index.html';
        window.history.back();

    }
    function getImportanceRate() {

        let newid = "";
        let rateCount = 0;
        let y = 0;
        for (; y < 5; y++) {
            newid = "pic" + (y + 1);
            let flashElement = document.getElementById(newid);

            if (!flashElement.classList.contains("importance-pic-inactive")) {
                rateCount++;
            }
        }
        console.log("getImporatanceRate: "+rateCount);
        return rateCount;
    }

    function setImportanceRating(rate)
    {
        console.log("setImportanceRating: "+rate);

        let i = rate;
        let newid = "";
        let y = 0;
        for( ; y<5;y++)
        {
            newid = "pic"+(y+1);
            let flashElement = document.getElementById(newid);

            if (flashElement.classList.contains("importance-pic-inactive" )  ) {
                if ( y <= (i -1)) {
                    document.getElementById(newid).classList.remove('importance-pic-inactive');
                    // $("#" + this.newid).remove('importance-pic-inactive');
                }
            }
            else {
                if ( y > (i -1) ) {
                    document.getElementById(newid).classList.add('importance-pic-inactive');
                    // $("#" + this.newid).add('importance-pic-inactive');
                }
            }
        }
    }

};