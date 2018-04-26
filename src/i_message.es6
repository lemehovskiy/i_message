/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/i_message
 */

'use strict';

(function ($) {

    class IMessage {

        constructor(element, options) {

            let self = this;

            //extend by function call
            self.settings = $.extend(true, {

                test_property: false

            }, options);

            self.$element = $(element);

            //extend by data options
            self.data_options = self.$element.data('i-message');
            self.settings = $.extend(true, self.settings, self.data_options);


            self.$input_wrap = $('.input-wrap');
            self.$input = $('.input-i-message');

            self.$btn_send = $('.btn-send');

            self.init();
        }

        init() {

            let self = this;
        }

        send_outgoing_message(){

            let self = this;

            const messageBodyStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
            const speed = 30;
            const character = "|";


            self.$input.text('');


            self.$btn_send.addClass('active');


            let $outgoing_message_spacer = $("<div class='outgoing-message-spacer'></div>");

            $('.i-message-list').append($outgoing_message_spacer)


            let extra_btn_tl = new TimelineMax();
            extra_btn_tl.to('.extra-button:nth-child(1)', 0.3, {x: -40, opacity: 0})
            extra_btn_tl.to('.extra-button:nth-child(2)', 0.3, {x: -40, opacity: 0}, '-=0.2')
            extra_btn_tl.to('.extra-button:nth-child(3)', 0.3, {x: -40, opacity: 1}, '-=0.2')

            extra_btn_tl.pause();

            let typingTl = new TimelineMax();
            typingTl.to('.input-i-message', messageBodyStr.length / speed, {
                text: messageBodyStr,
                ease: Linear.easeNone,

                onUpdate: function () {

                    if (this.target[0].textContent.length > 15) {
                        TweenLite.to(self.$input_wrap, 0.5, {width: '80%'});

                        extra_btn_tl.play();
                    }

                    TweenLite.to($outgoing_message_spacer, .4, {height: self.$input.outerHeight()})

                    this.target[0].textContent += character

                },
                onComplete: function () {

                    let input_offset = self.$input.offset();

                    let $outgoing_message = $("<div class='outgoing-message'>" + messageBodyStr + "</div>");
                    $outgoing_message_spacer.append($outgoing_message);


                    let $status_wrap = $("<div class='status-wrap'>Delivered</div>");
                    $outgoing_message_spacer.append($status_wrap);


                    let message_offset = $outgoing_message.offset();

                    self.set_placeholder();

                    TweenLite.to(self.$input_wrap, 0.4, {height: 'auto', width: '60%'})
                    TweenLite.from($outgoing_message, 0.4, {
                        x: input_offset.left - message_offset.left,
                        y: input_offset.top - message_offset.top,
                        backgroundColor: "transparent",
                        onComplete: function(){
                            TweenLite.set($outgoing_message_spacer, {height: 'auto'})

                            let status_tl = new TimelineLite();
                            status_tl.to($status_wrap, 0.3, {height: 14})
                            status_tl.to($status_wrap, 0.4, {opacity: 1})

                            let $old_status_messages = $('.outgoing-message-spacer:not(:last) .status-wrap');
                            let old_status_messages_tl = new TimelineLite();

                            old_status_messages_tl.to($old_status_messages, 0.4, {opacity: 0})
                            old_status_messages_tl.to($old_status_messages, 0.3, {height: 0})

                            extra_btn_tl.reverse();

                        }
                    })
                }
            })
        }

        set_placeholder(){
            let self = this;

            self.$input.text('Message');

            self.$btn_send.removeClass('active');
        }
    }


    $.fn.iMessage = function () {
        let $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i,
            ret;
        for (i = 0; i < length; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                $this[i].i_message = new IMessage($this[i], opt);
            else
                ret = $this[i].i_message[opt].apply($this[i].i_message, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };

})(jQuery);