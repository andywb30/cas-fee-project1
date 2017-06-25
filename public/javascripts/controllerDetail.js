/**
 * Created by wildi on 14.06.17.
 */


"use strict";


window.onload = function() {

    // initialization

    let notesId = window.location.hash;

    let editMode = false;

    // TODO: only submit if title is set.
    // TODO: date verification in case no date entered - or rubbish
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

    function loadNoteToView() {
        if (notesId !== undefined) {

           noteStorage.getNoteById(renderDetail,notesId);
           /* if (note !== undefined) {

                document.getElementById("title").value = note.title;
                document.getElementById("description").value = note.description;

                console.log(navigator.appCodeName+" :_: "+navigator.appName+" :_: "+navigator.appVersion +" :_");
                console.log("datefucntion: "+checkDateInput());
                // check if DateInput works in browser
                if(!checkDateInput()){
                    document.getElementById("finishby").value = note.finishbyNice;
                }
                else
                {
                    document.getElementById("finishby").value = note.finishby;
                }
                setImportanceRating(note.importance);

            }*/

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
                document.getElementById("finishby").value = note.finishbyNice;
            }
            else
            {
                document.getElementById("finishby").value = note.finishby;
            }
            setImportanceRating(note.importance);

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
    // helperfunctions
    // importance show flash black or grey (=inactive)

    function goBackToIndex(){
        window.location.href = "index.html";

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

    // nice little hack to find out if the browser is able to handle input type=date
    function checkDateInput() {
        let input = document.createElement('input');
        input.setAttribute('type','date');

        let notADateValue = 'not-a-date';
        input.setAttribute('value', notADateValue);

        return (input.value !== notADateValue);
    }


};