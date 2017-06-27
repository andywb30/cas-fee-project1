/**
 * Created by awedag on 24.06.17.
 */


'use strict';


let storage = (function () {


    function storageRead(item) {

        return JSON.parse(localStorage.getItem(item));

    }


    function storageSave(item,content) {

        localStorage.setItem(item,JSON.stringify(content));

        //return ajaxUtil.ajax("POST","/notes",JSON.stringify(content));

    }


    return {
        readItem:storageRead,
        saveItem:storageSave
    }
}());