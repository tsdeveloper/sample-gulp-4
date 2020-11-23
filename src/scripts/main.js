'use strict'

var $ = require('jquery');

$(function () {
    //Toggle for width display
    var showWidth = 1;

    if (showWidth === 1) {
        $(document).ready(function () {
            $(window).resize(function () {
                var width = $(window).width();
                $('#output_width').html(`Windows Width ${width.toString()}`);

            })

        })
    }

})