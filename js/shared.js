/**
 * Created by wildi on 14.06.17.
 */


"use strict";

let shared = (function () {


    function styleSelectEventListener() {

        let x = document.getElementById("style-select");
        let i = x.selectedIndex;
        console.log("selectedIx:" + i);
        noteStorage.configStyleSave(i);
        styleSelect();
    }

    function  styleSelect(){
        let i = noteStorage.configStyleRead();
        switch (i) {
            case 0:
                document.getElementById("styleskin").setAttribute("href", "style/skinblue.css");
                break;
            case 1:
                document.getElementById("styleskin").setAttribute("href", "style/skinyellow.css");
                break;
            default:
                break;
        }
    }

    // revealing public functions
    return {
        styleSelectEventListener : styleSelectEventListener,
        styleSelect : styleSelect
    }


}());