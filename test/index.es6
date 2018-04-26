require("./sass/style.scss");

require("jquery");

import {TweenMax} from "gsap";

import TextPlugin from "gsap/TextPlugin";

require('../build/i_message.js');


$(document).ready(function () {

    $('.i-message-demo').iMessage();


    $('.i-message-demo').iMessage('play');


    $('.i-message-demo').iMessage('update_timescale', 10);




    // $('.btn-send-outgoing-message').on('click', function(){
    //     $('.i-message-demo').iMessage('send_outgoing_message');
    // })
});