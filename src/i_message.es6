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

            self.master_tl = new TimelineMax();

            self.is_input_wide = false;

            self.init();
        }

        init() {

            let self = this;
        }

        play() {
            let self = this;

            self.master_tl
                .add(self.send_outgoing_message())

                .add(self.receive_message(), 3)

                .add(self.send_outgoing_message(), 6)

                .add(self.receive_message(), 9)

                .add(self.receive_message(), 12)

                .add(self.send_outgoing_message(), 15)

                .add(self.send_outgoing_message(), 18)
        }

        update_timescale(timescale) {

            let self = this;

            self.master_tl.timeScale(timescale);
        }
        send_outgoing_message() {

            let self = this;

            const messageBodyStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
            const speed = 30;
            const character = "|";

            let $outgoing_message_spacer = $("<div class='outgoing-message-spacer'></div>");

            let main_tl = new TimelineMax();


            main_tl.add(function () {
                self.$btn_send.addClass('active');
                $('.i-message-list').append($outgoing_message_spacer)

                main_tl.to('.input-i-message', messageBodyStr.length / speed, {
                    text: messageBodyStr,
                    ease: Linear.easeNone,

                    onUpdate: function () {

                        if (this.target[0].textContent.length > 15 && !(self.is_input_wide)) {
                            TweenLite.to(self.$input_wrap, 0.5, {width: '80%'});
                            self.switch_extra_buttons();
                        }

                        TweenLite.to($outgoing_message_spacer, .4, {height: self.$input.outerHeight()})

                        this.target[0].textContent += character

                    }
                })

                main_tl.add(function () {
                    self.set_placeholder()
                })
                main_tl.add(function () {
                    self.send_animation($outgoing_message_spacer, messageBodyStr)
                })
            })

            return main_tl;

        }

        receive_message(){
            let self = this;

            const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

            const speed = 30;

            let main_tl = new TimelineMax();

            let $incoming_message_spacer = $("<div class='incoming-message-spacer'></div>");

            let $incoming_message = $("<div class='incoming-message'>"+ message +"</div>");

            $('.i-message-list').append($incoming_message_spacer);
            $incoming_message_spacer.append($incoming_message);

            main_tl.add(function() {
                $('.i-message-list').append($incoming_message_spacer);
                $incoming_message_spacer.append($incoming_message);
            })

            main_tl.to($incoming_message_spacer, 0.5, {height: $incoming_message.outerHeight()})

            main_tl.to($incoming_message, 0.5, {opacity: 1}, '-=0.2')


            return main_tl;
        }


        send_animation($outgoing_message_spacer, messageBodyStr) {

            let self = this;

            let send_animation_tl = new TimelineMax();

            let input_offset = self.$input.offset();

            let $outgoing_message = $("<div class='outgoing-message'>" + messageBodyStr + "</div>");
            $outgoing_message_spacer.append($outgoing_message);


            let $status_wrap = $("<div class='status-wrap'>Delivered</div>");
            $outgoing_message_spacer.append($status_wrap);


            let message_offset = $outgoing_message.offset();

            send_animation_tl.to(self.$input_wrap, 0.4, {height: 'auto', width: '60%'})
            send_animation_tl.from($outgoing_message, 0.4, {
                x: input_offset.left - message_offset.left,
                y: input_offset.top - message_offset.top,
                backgroundColor: "transparent"
            }, '-=0.4')

            send_animation_tl.add(function () {
                self.switch_extra_buttons_reverse();
            })


            send_animation_tl.set($outgoing_message_spacer, {height: 'auto'})

            send_animation_tl.to($status_wrap, 0.3, {height: 14})
            send_animation_tl.to($status_wrap, 0.4, {opacity: 1}, '-=0.1')

            let $old_status_messages = $('.outgoing-message-spacer:not(:last) .status-wrap');

            send_animation_tl.to($old_status_messages, 0.4, {opacity: 0}, '-=0.3')
            send_animation_tl.to($old_status_messages, 0.3, {height: 0}, '-=0.1')


            return send_animation_tl;
        }

        switch_extra_buttons_reverse() {

            let self = this;

            let extra_btn_tl = new TimelineMax();

            self.is_input_wide = false;

            extra_btn_tl.to('.extra-button:nth-child(3)', 0.3, {x: 0, opacity: 0})
            extra_btn_tl.to('.extra-button:nth-child(2)', 0.3, {x: 0, opacity: 1}, '-=0.2')
            extra_btn_tl.to('.extra-button:nth-child(1)', 0.3, {x: 0, opacity: 1}, '-=0.2')

            return extra_btn_tl;
        }

        switch_extra_buttons() {

            let self = this;

            self.is_input_wide = true;

            let extra_btn_tl = new TimelineMax();

            extra_btn_tl.to('.extra-button:nth-child(1)', 0.3, {x: -10, opacity: 0})
            extra_btn_tl.to('.extra-button:nth-child(2)', 0.3, {x: -10, opacity: 0}, '-=0.2')
            extra_btn_tl.to('.extra-button:nth-child(3)', 0.3, {x: -40, opacity: 1}, '-=0.2')

            return extra_btn_tl;
        }

        set_placeholder() {
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