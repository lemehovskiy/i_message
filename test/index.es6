require("./sass/style.scss");

require("jquery");

import {TweenMax} from "gsap";

import TextPlugin from "gsap/TextPlugin";

require('../build/i_message.js');


$(document).ready(function () {

    $('.i-message-demo').iMessage();

    $('.i-message-demo').iMessage('play_dialog', [
        {
            type: 'receive',
            text: "Test receive 1",
        },
        {
            type: 'send',
            text: "Test send 1",
            delay: '+=1'
        },
        {
            type: 'receive',
            text: "Test receive 2",
            delay: '+=2'
        },
        {
            type: 'send',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            delay: '+=1'
        },
    ]);




    $('.play-btn').on('click', function(){
        $('.i-message-demo').iMessage('play');
        $(this).fadeOut();
    })

    $('.timescale-btn').on('click', function(){
        $('.i-message-demo').iMessage('update_timescale', 10);
    })
    
});