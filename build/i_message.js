/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/i_message
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    var IMessage = function () {
        function IMessage(element, options) {
            _classCallCheck(this, IMessage);

            var self = this;

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

        _createClass(IMessage, [{
            key: 'init',
            value: function init() {

                var self = this;
            }
        }, {
            key: 'play',
            value: function play() {
                var self = this;

                var master_tl = new TimelineMax();

                master_tl.add(self.send_outgoing_message()).add(self.send_outgoing_message());
            }
        }, {
            key: 'sample_func',
            value: function sample_func() {
                var self = this;

                var test_tl = new TimelineMax();

                return test_tl;
            }
        }, {
            key: 'send_outgoing_message',
            value: function send_outgoing_message() {

                var self = this;

                var messageBodyStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
                var speed = 30;
                var character = "|";

                console.log('asd');

                self.$input.text('');

                self.$btn_send.addClass('active');

                var $outgoing_message_spacer = $("<div class='outgoing-message-spacer'></div>");

                $('.i-message-list').append($outgoing_message_spacer);

                var extra_btn_tl = new TimelineMax();
                extra_btn_tl.to('.extra-button:nth-child(1)', 0.3, { x: -20, opacity: 0 });
                extra_btn_tl.to('.extra-button:nth-child(2)', 0.3, { x: -20, opacity: 0 }, '-=0.2');
                extra_btn_tl.to('.extra-button:nth-child(3)', 0.3, { x: -40, opacity: 1 }, '-=0.2');

                extra_btn_tl.pause();

                var typingTl = new TimelineMax();

                var send_animation_tl = new TimelineMax();

                typingTl.to('.input-i-message', messageBodyStr.length / speed, {
                    text: messageBodyStr,
                    ease: Linear.easeNone,

                    onUpdate: function onUpdate() {

                        if (this.target[0].textContent.length > 15) {
                            TweenLite.to(self.$input_wrap, 0.5, { width: '80%' });

                            extra_btn_tl.play();
                        }

                        TweenLite.to($outgoing_message_spacer, .4, { height: self.$input.outerHeight() });

                        this.target[0].textContent += character;
                    },
                    onComplete: function onComplete() {

                        var input_offset = self.$input.offset();

                        var $outgoing_message = $("<div class='outgoing-message'>" + messageBodyStr + "</div>");
                        $outgoing_message_spacer.append($outgoing_message);

                        var $status_wrap = $("<div class='status-wrap'>Delivered</div>");
                        $outgoing_message_spacer.append($status_wrap);

                        var message_offset = $outgoing_message.offset();

                        self.set_placeholder();

                        TweenLite.to(self.$input_wrap, 0.4, { height: 'auto', width: '60%' });
                        TweenLite.from($outgoing_message, 0.4, {
                            x: input_offset.left - message_offset.left,
                            y: input_offset.top - message_offset.top,
                            backgroundColor: "transparent",
                            onComplete: function onComplete() {

                                extra_btn_tl.reverse();

                                TweenLite.set($outgoing_message_spacer, { height: 'auto' });

                                var status_tl = new TimelineLite();
                                status_tl.to($status_wrap, 0.3, { height: 14 });
                                status_tl.to($status_wrap, 0.4, { opacity: 1 });

                                var $old_status_messages = $('.outgoing-message-spacer:not(:last) .status-wrap');
                                var old_status_messages_tl = new TimelineMax();

                                old_status_messages_tl.to($old_status_messages, 0.4, { opacity: 0 });
                                old_status_messages_tl.to($old_status_messages, 0.3, { height: 0 });
                            }
                        });
                    }
                });
            }
        }, {
            key: 'set_placeholder',
            value: function set_placeholder() {
                var self = this;

                self.$input.text('Message');

                self.$btn_send.removeClass('active');
            }
        }]);

        return IMessage;
    }();

    $.fn.iMessage = function () {
        var $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i = void 0,
            ret = void 0;
        for (i = 0; i < length; i++) {
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') $this[i].i_message = new IMessage($this[i], opt);else ret = $this[i].i_message[opt].apply($this[i].i_message, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };
})(jQuery);

/***/ })
/******/ ]);