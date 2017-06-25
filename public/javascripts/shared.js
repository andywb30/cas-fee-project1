/**
 * Created by wildi on 14.06.17.
 */


"use strict";

let shared = (function () {


    function styleSelectEventListener() {

        let x = document.getElementById("style-select");
        let i = x.selectedIndex;
        console.log("selectedIx:" + i);
        configStorage.updateStyle(i);
        styleSelect();
    }

    function  styleSelect(){
        let i = configStorage.readStyle();
        console.log("styleSelect:"+i);
        switch (i) {
            case 0:
                document.getElementById("styleskin").setAttribute("href", "../stylesheets/skinblue.css");
                if (document.getElementById("style-select")!== null) {
                    document.getElementById("style-select").selectedIndex = i;
                }
                break;
            case 1:
                document.getElementById("styleskin").setAttribute("href", "../stylesheets/skinyellow.css");
                if (document.getElementById("style-select")!== null) {
                    document.getElementById("style-select").selectedIndex = i;
                } break;
            default:
                break;
        }
    }

    function sortSet() {
        let i = configStorage.readSort();
        console.log("sort:" + i);
        if(i >0) {
            document.getElementById('i' + i).checked = true;
        }
    }

    function filterSet(){
        let i = configStorage.readFilter();
        console.log("filter:" + i);
        if (i) {
            document.getElementById("c1").checked = true;
        }
    }

    function styleSet(){


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
        sortSet : sortSet,
        filterSet : filterSet,
        dateSort : dateSort,
        dateNice : dateNice
    }


}());