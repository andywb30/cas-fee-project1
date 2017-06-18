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

    // helper functions datemanagement
    function dateNice(fby){
        if( moment(fby).isValid())     {
            return moment(fby).format("DD.MM.YYYY");
        }
        return null;
    }
    function dateSort(fby){
        if (!moment(fby).isValid()) {
            if (moment(fby, "DD.MM.YYYY").isValid()) {
                return moment(fby, "DD.MM.YYYY").format("YYYY-MM-DD")
            }
            if (moment(fby, "YYYY-DD-MM").isValid()) {
                return moment(fby, "YYYY-DD-MM").format("YYYY-MM-DD")
            }
            return null;
        }

        return fby;

    }

    // revealing public functions
    return {
        styleSelectEventListener : styleSelectEventListener,
        styleSelect : styleSelect,
        dateSort : dateSort,
        dateNice : dateNice
    }


}());