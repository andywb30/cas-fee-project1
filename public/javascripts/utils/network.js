/**
 * Created by wildi on 27.06.17.
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

        return ajaxUtil.ajax("POST","/notes/",{title:content.title,description:content.description,importance:content.importance,finishby:content.finishby},{});

    }
    function noteUpdateFinished(id,finished) {

        return ajaxUtil.ajax("PUT",`/notes/${id}`,{finished:finished});
    }


    function noteUpdate(id,content) {

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