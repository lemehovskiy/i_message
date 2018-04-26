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

            self.init();
        }

        init() {

            const messageBodyStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
            const speed = 30;
            const endFlashSpeed = 0.3;
            const character = "|";

            const $input = $('.input-i-message');


            $('.send').on('click', function () {

                $('.input-i-message').text('');

                let $outgoing_message_spacer = $("<div class='outgoing-message-spacer'></div>");

                $('.i-message-list').append($outgoing_message_spacer)

                let typingTl = new TimelineMax();
                typingTl.to('.input-i-message', messageBodyStr.length / speed, {
                    text: messageBodyStr,
                    ease: Linear.easeNone,
                    onUpdate: function () {

                        if (this.target[0].textContent.length > 15) {
                            TweenLite.to('.input-i-message', 0.5, {width: '90%'});
                        }

                        TweenLite.to($outgoing_message_spacer, .4, {height: $input.outerHeight()})

                        this.target[0].textContent += character

                    },
                    onComplete: function () {

                        let input_offset = $input.offset();

                        let $outgoing_message = $("<div class='outgoing-message'>" + messageBodyStr + "</div>");
                        $outgoing_message_spacer.append($outgoing_message);


                        let $status_wrap = $("<div class='status-wrap'>Delivered</div>");
                        $outgoing_message_spacer.append($status_wrap);


                        let message_offset = $outgoing_message.offset();

                        $input.text('Message');

                        TweenLite.to($input, 0.4, {height: 'auto', width: '77%'})
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

                            }
                        })
                    }
                })
            })
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