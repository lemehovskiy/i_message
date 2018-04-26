require("./sass/style.scss");

require("jquery");

import {TweenMax} from "gsap";

import TextPlugin from "gsap/TextPlugin";

require('../build/i_message.js');


$(document).ready(function () {

    $('.i-message-demo').iMessage();


    $('.btn-send-outgoing-message').on('click', function(){
        $('.i-message-demo').iMessage('send_outgoing_message');
    })
});