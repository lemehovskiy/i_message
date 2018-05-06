require("./sass/style.scss");

require("jquery");

import {TweenMax} from "gsap";

import TextPlugin from "gsap/TextPlugin";

require('../build/i_message.js');


$(document).ready(function () {

    $('.i-message-demo').iMessage();

    // $('.i-message-demo').iMessage('play_dialog', [
    //     {
    //         type: 'receive',
    //         text: "Test receive 1",
    //         after_play: function (){
    //             console.log('received');
    //         }
    //     },
    //     {
    //         type: 'send',
    //         text: "Test send 1",
    //         delay: "+=1",
    //         after_play: function (){
    //             console.log('send');
    //             $('.i-message-demo').iMessage('clear');
    //
    //             $('.i-message-demo').iMessage('play_dialog', [
    //                 {
    //                     type: 'receive',
    //                     text: "New Test receive 1",
    //                     after_play: function (){
    //                         console.log('received');
    //                     }
    //                 },
    //                 {
    //                     type: 'send',
    //                     text: "New Test send 1",
    //                     delay: "+=1",
    //                     after_play: function (){
    //                         console.log('send');
    //                     }
    //                 }
    //             ]);
    //         }
    //     }
    // ]);


    $('.i-message-demo').iMessage('play_dialog', [
        {
            type: 'receive',
            text: "Test receive 1 asdf asdfasdfasdf"
        },
        {
            type: 'send',
            text: "Test receive 1 asdf asdfasdfasdf"
        },
        {
            type: 'receive',
            text: "Test receive 1 asdf asdfasdfasdf"
        },
        {
            type: 'send',
            text: "Test receive 1 asdf asdfasdfasdf"
        },
        {
            type: 'receive',
            text: "Test receive 1 asdf asdfasdfasdf"
        },
        {
            type: 'send',
            text: "Test receive 1 asdf asdfasdfasdf"
        },
        {
            type: 'receive',
            text: "Test receive 1 asdf asdfasdfasdf"
        },
        {
            type: 'send',
            text: "Test receive 1 asdf asdfasdfasdf"
        }
    ]);

    setTimeout(function(){
        $('.i-message-demo').iMessage('clear');

        $('.i-message-demo').iMessage('set_dialog', [
            {
                type: 'receive',
                text: "Test receive 1"
            },
            {
                type: 'send',
                text: "Test send 1"
            },
            {
                type: 'receive',
                text: "Test receive 2"
            },
            {
                type: 'send',
                text: "Test send 2"
            }
        ]);
    }, 2000)



    $('.play-btn').on('click', function(){
        $('.i-message-demo').iMessage('play');
        $(this).fadeOut();
    })

    $('.timescale-btn').on('click', function(){
        $('.i-message-demo').iMessage('update_timescale', 10);
    })
    
});