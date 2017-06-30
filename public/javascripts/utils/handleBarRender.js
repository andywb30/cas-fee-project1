/**
 * Created by Andy on 14.06.17.
 */

"use strict";

let handleBarRender = (function () {

    function renderNotes(template, notes){

        const templateCompiled = Handlebars.compile(template);

        // this helper allows handelbars to display the correct amount of flashes
        Handlebars.registerHelper('ifCond', function(v1, v2,options){
            if (v1.importance === v2) {
                return options.fn(this);
            }
            else {
                return options.inverse(this);
            }
        });

        return  templateCompiled(notes);

    }

    // revealing
    return {
        renderNotes: renderNotes

    }

}());