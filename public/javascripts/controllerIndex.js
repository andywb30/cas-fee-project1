/**
 * Created by wildi on 14.06.17.
 */

"use strict";


const indexController = function(){


    // initialization
    let template = null;

    init();
    function init(){
        console.log("loading indexonctoller");

        shared.styleSelect();
        shared.sortSet();
        shared.filterSet();
        loadData();

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
            // bubbling for sort
            if ( controlID.substr(0,1) === "i" ){
                let sortBy = controlID.substr(1);
                configStorage.updateSort(sortBy);
                document.getElementById(controlID).checked = true;
            }
            // bubbling for filter
            if ( controlID.substr(0,1) === "c" ){
                configStorage.updateFilter(!document.getElementById(controlID).checked);
            }
        }
        loadData();
    }

    function finishByEventListener(control) {

        let controlID = control.target.getAttribute("for");
        if (controlID !== null) {
            if (controlID.substr(0, 1) === "f") {
                let item = controlID.substr(1);
                noteHandler.updateNoteFinished(item, !document.getElementById(controlID).checked);
                loadData();

            }
        }
    }
     // helper function
    function loadData() {
        noteHandler.getNotes();
    }

};

window.onload = indexController();

