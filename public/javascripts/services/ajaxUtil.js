/**
 * Created by wildi on 14.06.17.
 */

"use strict";


;(function($) {

    function ajax(metod, url, data, headers) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            headers: headers,
            method: metod,
            url: url,
            data: JSON.stringify(data)
        });
    }
    window.ajax = { ajax : ajax };

}(jQuery));