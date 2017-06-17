/**
 * Created by Andy on 14.06.17.
 */

"use strict";

let handleBarRender = (function () {

    function renderNotes(template, notes){

        const templateCompiled = Handlebars.compile(template);
        Handlebars.registerHelper('ifCond', function(v1, v2,options){
            if (v1.importance === v2) {
                return options.fn(this);
            }
            else {
                return options.inverse(this);
            }
        });
        /*
        notes.forEach(note => {
            content.push(template)
            }
        )*/

        return  templateCompiled(notes);

    }

    // revealing
    return {
        renderNotes: renderNotes

    }

}());