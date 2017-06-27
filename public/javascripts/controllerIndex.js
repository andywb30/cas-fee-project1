/**
 * Created by wildi on 14.06.17.
 */

"use strict";


const indexController = function(pnoteHandler){

    const noteHandler = pnoteHandler;
    // initialization
    let template = null;

    init();
    function init(){
        console.log("loading indexonctoller");
         template = document.getElementById("noteListTemplate").innerText;

        shared.styleSelect();
        shared.sortSet();
        shared.filterSet();
        loadData();

    }
    function loadData() {
        noteHandler.getNotes();
    }

    // Event listener Register
    const SortSet  = document.getElementById("control-bar");
    SortSet.addEventListener("click",sortSetEventListener);

    const finished  = document.getElementById("list-notes");
    finished.addEventListener("click",finishByEventListener);

    const styleSelect  = document.getElementById("style-select");
    styleSelect.addEventListener("click",shared.styleSelectEventListener);

    // chrome: need change too to get selected, as "click" is fired before selected
    styleSelect.addEventListener("change",shared.styleSelectEventListener);


    // Listeners
    function sortSetEventListener(control){

        let controlID = control.target.getAttribute("for");
        if (controlID !== null) {
            if ( controlID.substr(0,1) === "i" ){
                let sortBy = controlID.substr(1);
                configStorage.updateSort(sortBy);
                document.getElementById(controlID).checked = true;
            }
            if ( controlID.substr(0,1) === "c" ){
                // dont switch checked to opposite as the browser doesit anyway->prevent do it here again
             /*   document.getElementById(controlID).checked =  !document.getElementById(controlID).checked;
               */
                configStorage.updateFilter(!document.getElementById(controlID).checked);
                console.log("SortSetEventListener" +   document.getElementById(controlID).checked);
            }
        }
        loadData();
    }

    function finishByEventListener(control) {

        let controlID = control.target.getAttribute("for");
        if (controlID !== null) {
            if (controlID.substr(0, 1) === "f") {
                let item = controlID.substr(1);

                console.log("finished status now:"+document.getElementById(controlID).checked);
                noteHandler.updateNoteFinished(item, !document.getElementById(controlID).checked);
                loadData();

            }
        }
    }

};

window.onload = indexController(noteHandler);

