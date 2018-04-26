require("./sass/style.scss");

require("jquery");

import {TweenMax} from "gsap";

import TextPlugin from "gsap/TextPlugin";

require('../build/i_message.js');


$(document).ready(function () {

    $('.i-message-demo').iMessage();



    $('.play-btn').on('click', function(){
        $('.i-message-demo').iMessage('play');

        $(this).fadeOut();
    })

    $('.timescale-btn').on('click', function(){
        $('.i-message-demo').iMessage('update_timescale', 10);
    })
    
});