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

        init(){


            const messageBodyStr = 'This is a typewriter effect using GreenSock\'s TextPlugin and an onUpdate hack.';
            // const speed = 30;
            // const endFlashSpeed = 0.3;
            // const character = "|";
            //
            // let typingTl = new TimelineMax();
            // typingTl.to('.input-i-message', messageBodyStr.length/speed, {
            //         text:messageBodyStr,
            //         ease:Linear.easeNone,
            //         onUpdate:function(){
            //
            //             if (this.target[0].textContent.length > 15) {
            //                 TweenLite.to('.input-i-message', 1, {width: '90%'});
            //             }
            //
            //             this.target[0].textContent += character
            //
            //         },
            //         onComplete:function(){
            //
            //
            //             // this.target[0].textContent = messageBodyStr
            //         }
            //     },'+=0.5')
            //     //makes it flash at the end


            $('.send').on('click', function(){
                $('.i-message-list').append('<div class="i-message-list-item">'+ messageBodyStr +'</div>')
            })


            
            





        }
    }


    $.fn.iMessage = function() {
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