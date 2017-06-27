/**
 * Created by awedag on 27.06.17.
 */


'use strict';


let network = (function () {

    const ajaxUtil = window.ajax;
    function noteGet(id) {

        return ajaxUtil.ajax("GET",`/notes/${id}`,undefined);

    }


    function noteGetAll(){
        return ajaxUtil.ajax("GET","/notes/",undefined);

    }


    function noteCreate(content) {

        // localStorage.setItem(item,JSON.stringify(content));
        let gcontent = JSON.stringify(content).replace(/\"/g, "");
        return ajaxUtil.ajax("POST","/notes/",{title:content.title,description:content.description,importance:content.importance,finishby:content.finishby},{});

        /*{"title":"ljk","description":"lökj","importance":2,"finishby":null,"finishbyNice":null,"finished":false,"createdAt":"2017-06-25T09:58:39.628Z"},{});
         */
    }
    function noteUpdateFinished(id,finished) {

        // localStorage.setItem(item,JSON.stringify(content));

        return ajaxUtil.ajax("PUT",`/notes/${id}`,{finished:finished});
    }


    function noteUpdate(id,content) {

        // localStorage.setItem(item,JSON.stringify(content));

        return ajaxUtil.ajax("PUT",`/notes/${id}`,{title:content.title,description:content.description,importance:content.importance,finishby:content.finishby});

    }
    
    return  {
        noteGet : noteGet,
        noteGetAll : noteGetAll,
        noteCreate : noteCreate,
        noteUpdate: noteUpdate,
        noteUpdateFinished : noteUpdateFinished

    }

}());