/**
 * Created by wildi on 14.06.17.
 */

"use strict";



let configStorage = (function () {

    let config = null;

    class Config {
        constructor(sort, filter, style) {
            // create new id
            this.sort = sort;
            this.filter = filter;
            this.style = style;
        }
    }

    function saveSort(sort){
        checkAndRead();
        let inSort = sort;
        if (sort !== 'number'){
            inSort = parseInt(sort);
            if( isNaN(inSort)){
                inSort = 0;
            }
        }
        config.sort = inSort;
        storageSaveConfig();
    }
    function saveFilter(filter){
        checkAndRead();
        config.filter = filter;
        storageSaveConfig();
    }
    function saveStyle(style){
        checkAndRead();
        config.style = style;
        storageSaveConfig();
    }

    function getSort(){
        checkAndRead();
        return config.sort;

    }
    function getFilter(){
        checkAndRead();
        return config.filter;
    }
    function getStyle(){
        checkAndRead();
        return config.style;
    }

    function readConfig(){
        config = storageReadConfig();
        if (config === null || config === undefined){
            // init once
            config = new Config(0,false,0);
        }
    }

    // check if config is set if not initialize
    function checkAndRead(){
        console.log("checkandREead:"+config);
        if ( config === undefined || config === null){
            readConfig();
        }
    }

    function storageReadConfig(){

        return storage.readItem("config");
    }
    function storageSaveConfig(){
        storage.saveItem("config",config);
    }

    return {

        readSort : getSort,
        readFilter : getFilter,
        readStyle : getStyle,
        updateSort : saveSort,
        updateFilter : saveFilter,
        updateStyle : saveStyle

    }

}());