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

    const detailCancel = document.getElementById("detailCancel");
    detailCancel.addEventListener("click",buttonCancelListener);

    const importantPic = document.getElementById("importance-pic");
    // event bubbler
    importantPic.addEventListener("click",flashShowHideListener);

    const dateStuff = document.getElementById("finishby");
    dateStuff.addEventListener("click",datePickerListener);
    dateStuff.addEventListener("change",datePickerListener);

    // Listeners
    function buttonSubmitListener() {

        console.log("buttonSubmitListener inside");

        const title = document.getElementById("title").value;
        const desc = document.getElementById("description").value;
        const finishby = document.getElementById("finishby").value;
        const importance = getImportanceRate();
        let alerts = "";
        if (!shared.dateValid(finishby)){
            alerts = "Bitte gültiges Datum eingeben\n";
        }
        if (title === "") {
            alerts += "Bitte Titel eingeben\n";
        }
        if ( alerts.length > 0 ){
            alert(alerts);
            return;
        }
        // continue
        if (editMode && title !== "") {
            noteHandler.updateNote(notesId, title, desc, importance, finishby);
        }
        else if (title !== "") {
            noteHandler.addNote(title, desc, importance, finishby);
        }
        goBackToIndex();


    }

    function buttonCancelListener(){
        goBackToIndex();
    }

    function flashShowHideListener(event)
    {
        const i = event.target.getAttribute("data-flash-id");
        setImportanceRating(i);
    }

    function datePickerListener(event){
        console.log(document.getElementById("finishby").value);
        // formatting specially for firefox isnt nice
          if(!checkDateInput()) {
              if (shared.dateNice(document.getElementById("finishby").value) !== null) {
                  document.getElementById("finishby").value = shared.dateNice(document.getElementById("finishby").value);
              }
          }
        console.log(event);

    }
    // helperfunctions for controller
    function loadNoteToView() {
        if (notesId !== undefined) {
            noteHandler.getNoteById(renderDetail,notesId);
        }
    }

    function renderDetail(note){
        if (note !== undefined) {

            document.getElementById("title").value = note.title;
            document.getElementById("description").value = note.description;

            console.log(navigator.appCodeName+" :_: "+navigator.appName+" :_: "+navigator.appVersion +" :_");
            console.log("datefucntion: "+checkDateInput());
            // check if DateInput works in browser
            if(!checkDateInput()){
                // browser doesnt support dateinput
                document.getElementById("finishby").value = note.finishbyNice;
            }
            else
            {
                document.getElementById("finishby").value = note.finishby;
            }
            setImportanceRating(note.importance);

        }
    }

    function goBackToIndex(){
        window.location.href = "index.html";

    }

    // importance show flash black or grey (=inactive)
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

    // nice little hack to find out if the browser is able to handle input type=date
    // true = browser can dateInput
    function checkDateInput() {
        let input = document.createElement('input');
        input.setAttribute('type','date');

        let notADateValue = 'not-a-date';
        input.setAttribute('value', notADateValue);

        return (input.value !== notADateValue);
    }


};