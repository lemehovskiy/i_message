require("./i_message.scss");

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

            }, options);

            self.$element = $(element);

            //extend by data options
            self.data_options = self.$element.data('i-message');
            self.settings = $.extend(true, self.settings, self.data_options);

            self.$container = self.$element.parent();

            self.$input_wrap = self.$element.find('.input-wrap');
            self.$input = self.$element.find('.input-i-message');
            self.$message_list = self.$element.find('.i-message-list');

            self.$btn_send = self.$element.find('.btn-send');

            self.$extra_btn_1 = self.$element.find('.extra-button:nth-child(1)');
            self.$extra_btn_2 = self.$element.find('.extra-button:nth-child(2)');
            self.$extra_btn_3 = self.$element.find('.extra-button:nth-child(3)');

            self.master_tl = new TimelineMax();

            self.is_input_wide = false;

            self.messages = [];

            self.init();
        }

        init() {
            let self = this;

            self.resize();

            $(window).on('resize', function(){
                self.resize();
            })

        }

        clear(){
            let self = this;

            self.master_tl.clear();

            self.messages.forEach(function(message){
                message.$spacer.remove();
            })

            self.messages = [];
        }

        resize(){
            let self = this;

            let container_width = self.$container.innerWidth();
            let element_width = self.$element.outerWidth();

            let scale_coef = container_width / element_width;

            self.$element.css({
                '-webkit-transform' : 'scale(' + scale_coef + ') translate(-50%, -50%)',
                '-moz-transform'    : 'scale(' + scale_coef + ') translate(-50%, -50%)',
                '-ms-transform'     : 'scale(' + scale_coef + ') translate(-50%, -50%)',
                '-o-transform'      : 'scale(' + scale_coef + ') translate(-50%, -50%)',
                'transform'         : 'scale(' + scale_coef + ') translate(-50%, -50%)'
            });
        }

        set_dialog(messages) {
            let self = this;

            messages.forEach(function (message) {

                if (message.type == 'receive') {
                    let $incoming_message_spacer = $("<div class='incoming-message-spacer' style='height: auto;'></div>");

                    let $incoming_message = $("<div class='incoming-message' style='opacity: 1'>" + message.text + "</div>");

                    self.messages.push({
                        type: 'receive',
                        $spacer: $incoming_message_spacer
                    })

                    self.$message_list.append($incoming_message_spacer);
                    $incoming_message_spacer.append($incoming_message);
                }
                else if (message.type == 'send') {
                    let $outgoing_message_spacer = $("<div class='outgoing-message-spacer'></div>");

                    self.$message_list.append($outgoing_message_spacer)

                    self.messages.push({
                        type: 'receive',
                        $spacer: $outgoing_message_spacer
                    })

                    let $outgoing_message = $("<div class='outgoing-message' style='position: relative;'>" + message.text + "</div>");
                    $outgoing_message_spacer.append($outgoing_message);

                    let $status_wrap = $("<div class='status-wrap' style='height: auto; opacity: 1'>Delivered</div>");
                    $outgoing_message_spacer.append($status_wrap);


                    let $old_status_messages = $('.outgoing-message-spacer:not(:last) .status-wrap');

                    $old_status_messages.css({
                        'display': 'none'
                    })
                }

            })
        }

        play_dialog(messages) {
            let self = this;

            messages.forEach(function (message) {

                let delay = '+=0';

                if (message.delay) delay = message.delay;

                if (message.type == 'receive') {
                    self.master_tl.add(self.receive_message(message), delay)
                }
                else if (message.type == 'send') {
                    self.master_tl.add(self.send_message(message), delay)
                }

            })
        }

        update_timescale(timescale) {

            let self = this;

            self.master_tl.timeScale(timescale);
        }

        receive_message(message) {
            let self = this;

            let main_tl = new TimelineMax({
                onComplete: function(){
                    if (message.after_play) message.after_play();
                }

            });

            let $incoming_message_spacer = $("<div class='incoming-message-spacer'></div>");

            let $incoming_message = $("<div class='incoming-message'>" + message.text + "</div>");

            self.messages.push({
                type: 'receive',
                $spacer: $incoming_message_spacer
            })

            self.$message_list.append($incoming_message_spacer);
            $incoming_message_spacer.append($incoming_message);

            main_tl.add(function () {
                self.$message_list.append($incoming_message_spacer);
                $incoming_message_spacer.append($incoming_message);
            })


            main_tl.to($incoming_message_spacer, 0.5, {height: $incoming_message.outerHeight()})

            main_tl.to($incoming_message, 0.5, {opacity: 1}, '-=0.2')


            return main_tl;
        }

        send_message(message) {

            let self = this;

            const speed = 30;

            let $outgoing_message_spacer = $("<div class='outgoing-message-spacer'></div>");

            self.messages.push({
                type: 'receive',
                $spacer: $outgoing_message_spacer
            })

            let main_tl = new TimelineMax();


            main_tl.add(function () {

                self.$input.text('');
                self.$btn_send.addClass('active');
                self.$input.addClass('active');
                self.$message_list.append($outgoing_message_spacer)
            })

            main_tl.to(self.$input, message.text.length / speed, {
                text: message.text,
                ease: Linear.easeNone,

                onUpdate: function () {

                    if (this.target[0].textContent.length > 15 && !(self.is_input_wide)) {
                        TweenLite.to(self.$input_wrap, 0.5, {width: '80%'});
                        self.switch_extra_buttons();
                    }

                    TweenLite.to($outgoing_message_spacer, .4, {height: self.$input.outerHeight()})

                    this.target[0].textContent += "|"

                }
            })

            main_tl.add(function () {
                self.set_placeholder()
            })
            main_tl.add(function () {
                self.send_animation($outgoing_message_spacer, message)
            })

            return main_tl;

        }

        send_animation($outgoing_message_spacer, message) {

            let self = this;

            let send_animation_tl = new TimelineMax({
                onComplete: function(){
                    if (message.after_play) message.after_play();
                }
            });

            let input_offset = self.$input.offset();

            let $outgoing_message = $("<div class='outgoing-message'>" + message.text + "</div>");
            $outgoing_message_spacer.append($outgoing_message);


            let $status_wrap = $("<div class='status-wrap'>Delivered</div>");
            $outgoing_message_spacer.append($status_wrap);


            let message_offset = $outgoing_message.offset();

            send_animation_tl.to(self.$input_wrap, 0.4, {height: 'auto', width: '64%'})
            send_animation_tl.from($outgoing_message, 0.4, {
                x: input_offset.left - message_offset.left,
                y: input_offset.top - message_offset.top,
                scale: 0.7,
                opacity: 0
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

            extra_btn_tl.to(self.$extra_btn_3, 0.3, {x: 0, opacity: 0})
            extra_btn_tl.to(self.$extra_btn_2, 0.3, {x: 0, opacity: 1}, '-=0.2')
            extra_btn_tl.to(self.$extra_btn_1, 0.3, {x: 0, opacity: 1}, '-=0.2')

            return extra_btn_tl;
        }

        switch_extra_buttons() {

            let self = this;

            self.is_input_wide = true;

            let extra_btn_tl = new TimelineMax();

            extra_btn_tl.to(self.$extra_btn_1, 0.3, {x: -10, opacity: 0})
            extra_btn_tl.to(self.$extra_btn_2, 0.3, {x: -10, opacity: 0}, '-=0.2')
            extra_btn_tl.to(self.$extra_btn_3, 0.3, {x: -43, opacity: 1}, '-=0.2')

            return extra_btn_tl;
        }

        set_placeholder() {
            let self = this;

            self.$input.text('iMessage');

            self.$input.removeClass('active');

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