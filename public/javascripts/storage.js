/**
 * Created by awedag on 24.06.17.
 */


'use strict';


let storage = (function () {

    const ajaxUtil = window.ajax;

    function storageRead(item) {

        return JSON.parse(localStorage.getItem(item));

    }

    function storageGet(id) {

        return ajaxUtil.ajax("GET",`/notes/${id}`,undefined);

    }


    function storageGetAll(){
        return ajaxUtil.ajax("GET","/notes/",undefined);

    }
    function storageSave(item,content) {

        localStorage.setItem(item,JSON.stringify(content));

        //return ajaxUtil.ajax("POST","/notes",JSON.stringify(content));

    }

    function storageCreateOneItem(item,content) {

       // localStorage.setItem(item,JSON.stringify(content));
        let gcontent = JSON.stringify(content).replace(/\"/g, "");
        return ajaxUtil.ajax("POST","/notes/",{title:content.title,description:content.description,importance:content.importance,finishby:content.finishby},{});

            /*{"title":"ljk","description":"lökj","importance":2,"finishby":null,"finishbyNice":null,"finished":false,"createdAt":"2017-06-25T09:58:39.628Z"},{});
*/
    }
    function storageSaveFinished(id,finished) {

        // localStorage.setItem(item,JSON.stringify(content));

        return ajaxUtil.ajax("PUT",`/notes/${id}`,{finished:finished});

    }


    function storageSaveOneItem(item,id,content) {

        // localStorage.setItem(item,JSON.stringify(content));

        return ajaxUtil.ajax("PUT",`/notes/${id}`,{title:content.title,description:content.description,importance:content.importance,finishby:content.finishby});

    }


    return {
        readItem:storageRead,
        getItem:storageGet,
        saveItem:storageSave,
        createItem:storageCreateOneItem,
        setFinished:storageSaveFinished,
        updateItem:storageSaveOneItem,
        updateFinished:storageSaveFinished,
        getAll:storageGetAll

    }
}());