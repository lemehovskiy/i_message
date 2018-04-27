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

            self.master_tl = new TimelineMax();

            self.is_input_wide = false;

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

                self.master_tl.add(self.send_message(1)).add(self.receive_message(), "+=0").addCallback(function () {
                    console.log('asdf');
                }).add(self.send_message(), 6).add(self.receive_message(), 9).add(self.receive_message(), 12).add(self.send_message(), 15).add(self.send_message(), 18);
            }
        }, {
            key: 'update_timescale',
            value: function update_timescale(timescale) {

                var self = this;

                self.master_tl.timeScale(timescale);
            }
        }, {
            key: 'send_message',
            value: function send_message() {

                var self = this;

                var messageBodyStr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
                var speed = 30;
                var character = "|";

                var $outgoing_message_spacer = $("<div class='outgoing-message-spacer'></div>");

                var main_tl = new TimelineMax();

                main_tl.add(function () {

                    self.$input.text('');
                    self.$btn_send.addClass('active');
                    self.$input.addClass('active');
                    $('.i-message-list').append($outgoing_message_spacer);
                });

                main_tl.to('.input-i-message', messageBodyStr.length / speed, {
                    text: messageBodyStr,
                    ease: Linear.easeNone,

                    onUpdate: function onUpdate() {

                        if (this.target[0].textContent.length > 15 && !self.is_input_wide) {
                            TweenLite.to(self.$input_wrap, 0.5, { width: '80%' });
                            self.switch_extra_buttons();
                        }

                        TweenLite.to($outgoing_message_spacer, .4, { height: self.$input.outerHeight() });

                        this.target[0].textContent += character;
                    }
                });

                main_tl.add(function () {
                    self.set_placeholder();
                });
                main_tl.add(function () {
                    self.send_animation($outgoing_message_spacer, messageBodyStr);
                });

                return main_tl;
            }
        }, {
            key: 'receive_message',
            value: function receive_message() {
                var self = this;

                var message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

                var speed = 30;

                var main_tl = new TimelineMax();

                var $incoming_message_spacer = $("<div class='incoming-message-spacer'></div>");

                var $incoming_message = $("<div class='incoming-message'>" + message + "</div>");

                $('.i-message-list').append($incoming_message_spacer);
                $incoming_message_spacer.append($incoming_message);

                main_tl.add(function () {
                    $('.i-message-list').append($incoming_message_spacer);
                    $incoming_message_spacer.append($incoming_message);
                });

                main_tl.to($incoming_message_spacer, 0.5, { height: $incoming_message.outerHeight() });

                main_tl.to($incoming_message, 0.5, { opacity: 1 }, '-=0.2');

                return main_tl;
            }
        }, {
            key: 'send_animation',
            value: function send_animation($outgoing_message_spacer, messageBodyStr) {

                var self = this;

                var send_animation_tl = new TimelineMax();

                var input_offset = self.$input.offset();

                var $outgoing_message = $("<div class='outgoing-message'>" + messageBodyStr + "</div>");
                $outgoing_message_spacer.append($outgoing_message);

                var $status_wrap = $("<div class='status-wrap'>Delivered</div>");
                $outgoing_message_spacer.append($status_wrap);

                var message_offset = $outgoing_message.offset();

                send_animation_tl.to(self.$input_wrap, 0.4, { height: 'auto', width: '64%' });
                send_animation_tl.from($outgoing_message, 0.4, {
                    x: input_offset.left - message_offset.left,
                    y: input_offset.top - message_offset.top,
                    scale: 0.7,
                    opacity: 0
                }, '-=0.4');

                send_animation_tl.add(function () {
                    self.switch_extra_buttons_reverse();
                });

                send_animation_tl.set($outgoing_message_spacer, { height: 'auto' });

                send_animation_tl.to($status_wrap, 0.3, { height: 14 });
                send_animation_tl.to($status_wrap, 0.4, { opacity: 1 }, '-=0.1');

                var $old_status_messages = $('.outgoing-message-spacer:not(:last) .status-wrap');

                send_animation_tl.to($old_status_messages, 0.4, { opacity: 0 }, '-=0.3');
                send_animation_tl.to($old_status_messages, 0.3, { height: 0 }, '-=0.1');

                return send_animation_tl;
            }
        }, {
            key: 'switch_extra_buttons_reverse',
            value: function switch_extra_buttons_reverse() {

                var self = this;

                var extra_btn_tl = new TimelineMax();

                self.is_input_wide = false;

                extra_btn_tl.to('.extra-button:nth-child(3)', 0.3, { x: 0, opacity: 0 });
                extra_btn_tl.to('.extra-button:nth-child(2)', 0.3, { x: 0, opacity: 1 }, '-=0.2');
                extra_btn_tl.to('.extra-button:nth-child(1)', 0.3, { x: 0, opacity: 1 }, '-=0.2');

                return extra_btn_tl;
            }
        }, {
            key: 'switch_extra_buttons',
            value: function switch_extra_buttons() {

                var self = this;

                self.is_input_wide = true;

                var extra_btn_tl = new TimelineMax();

                extra_btn_tl.to('.extra-button:nth-child(1)', 0.3, { x: -10, opacity: 0 });
                extra_btn_tl.to('.extra-button:nth-child(2)', 0.3, { x: -10, opacity: 0 }, '-=0.2');
                extra_btn_tl.to('.extra-button:nth-child(3)', 0.3, { x: -43, opacity: 1 }, '-=0.2');

                return extra_btn_tl;
            }
        }, {
            key: 'set_placeholder',
            value: function set_placeholder() {
                var self = this;

                self.$input.text('iMessage');

                self.$input.removeClass('active');

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