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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(1);

/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/i_message
 */

'use strict';

(function ($) {
    var IMessage = function () {
        function IMessage(element, options) {
            _classCallCheck(this, IMessage);

            var self = this;

            //extend by function call
            self.settings = $.extend(true, {}, options);

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

        _createClass(IMessage, [{
            key: 'init',
            value: function init() {
                var self = this;

                self.resize();

                $(window).on('resize', function () {
                    self.resize();
                });
            }
        }, {
            key: 'clear',
            value: function clear() {
                var self = this;

                self.master_tl.clear();

                self.messages.forEach(function (message) {
                    message.$spacer.remove();
                });

                self.messages = [];
            }
        }, {
            key: 'resize',
            value: function resize() {
                var self = this;

                var container_width = self.$container.innerWidth();
                var element_width = self.$element.outerWidth();

                var scale_coef = container_width / element_width;

                self.$element.css({
                    '-webkit-transform': 'scale(' + scale_coef + ') translate(-50%, -50%)',
                    '-moz-transform': 'scale(' + scale_coef + ') translate(-50%, -50%)',
                    '-ms-transform': 'scale(' + scale_coef + ') translate(-50%, -50%)',
                    '-o-transform': 'scale(' + scale_coef + ') translate(-50%, -50%)',
                    'transform': 'scale(' + scale_coef + ') translate(-50%, -50%)'
                });
            }
        }, {
            key: 'set_dialog',
            value: function set_dialog(messages) {
                var self = this;

                messages.forEach(function (message) {

                    if (message.type == 'receive') {
                        var $incoming_message_spacer = $("<div class='incoming-message-spacer' style='height: auto;'></div>");

                        var $incoming_message = $("<div class='incoming-message' style='opacity: 1'>" + message.text + "</div>");

                        self.messages.push({
                            type: 'receive',
                            $spacer: $incoming_message_spacer
                        });

                        self.$message_list.append($incoming_message_spacer);
                        $incoming_message_spacer.append($incoming_message);
                    } else if (message.type == 'send') {
                        var $outgoing_message_spacer = $("<div class='outgoing-message-spacer'></div>");

                        self.$message_list.append($outgoing_message_spacer);

                        self.messages.push({
                            type: 'receive',
                            $spacer: $outgoing_message_spacer
                        });

                        var $outgoing_message = $("<div class='outgoing-message' style='position: relative;'>" + message.text + "</div>");
                        $outgoing_message_spacer.append($outgoing_message);

                        var $status_wrap = $("<div class='status-wrap' style='height: auto; opacity: 1'>Delivered</div>");
                        $outgoing_message_spacer.append($status_wrap);

                        var $old_status_messages = $('.outgoing-message-spacer:not(:last) .status-wrap');

                        $old_status_messages.css({
                            'display': 'none'
                        });
                    }
                });
            }
        }, {
            key: 'play_dialog',
            value: function play_dialog(messages) {
                var self = this;

                messages.forEach(function (message) {

                    var delay = '+=0';

                    if (message.delay) delay = message.delay;

                    if (message.type == 'receive') {
                        self.master_tl.add(self.receive_message(message), delay);
                    } else if (message.type == 'send') {
                        self.master_tl.add(self.send_message(message), delay);
                    }
                });
            }
        }, {
            key: 'update_timescale',
            value: function update_timescale(timescale) {

                var self = this;

                self.master_tl.timeScale(timescale);
            }
        }, {
            key: 'receive_message',
            value: function receive_message(message) {
                var self = this;

                var main_tl = new TimelineMax({
                    onComplete: function onComplete() {
                        if (message.after_play) message.after_play();
                    }

                });

                var $incoming_message_spacer = $("<div class='incoming-message-spacer'></div>");

                var $incoming_message = $("<div class='incoming-message'>" + message.text + "</div>");

                self.messages.push({
                    type: 'receive',
                    $spacer: $incoming_message_spacer
                });

                self.$message_list.append($incoming_message_spacer);
                $incoming_message_spacer.append($incoming_message);

                main_tl.add(function () {
                    self.$message_list.append($incoming_message_spacer);
                    $incoming_message_spacer.append($incoming_message);
                });

                main_tl.to($incoming_message_spacer, 0.5, { height: $incoming_message.outerHeight() });

                main_tl.to($incoming_message, 0.5, { opacity: 1 }, '-=0.2');

                return main_tl;
            }
        }, {
            key: 'send_message',
            value: function send_message(message) {

                var self = this;

                var speed = 30;

                var $outgoing_message_spacer = $("<div class='outgoing-message-spacer'></div>");

                self.messages.push({
                    type: 'receive',
                    $spacer: $outgoing_message_spacer
                });

                var main_tl = new TimelineMax();

                main_tl.add(function () {

                    self.$input.text('');
                    self.$btn_send.addClass('active');
                    self.$input.addClass('active');
                    self.$message_list.append($outgoing_message_spacer);
                });

                main_tl.to(self.$input, message.text.length / speed, {
                    text: message.text,
                    ease: Linear.easeNone,

                    onUpdate: function onUpdate() {

                        if (this.target[0].textContent.length > 15 && !self.is_input_wide) {
                            TweenLite.to(self.$input_wrap, 0.5, { width: '80%' });
                            self.switch_extra_buttons();
                        }

                        TweenLite.to($outgoing_message_spacer, .4, { height: self.$input.outerHeight() });

                        this.target[0].textContent += "|";
                    }
                });

                main_tl.add(function () {
                    self.set_placeholder();
                });
                main_tl.add(function () {
                    self.send_animation($outgoing_message_spacer, message);
                });

                return main_tl;
            }
        }, {
            key: 'send_animation',
            value: function send_animation($outgoing_message_spacer, message) {

                var self = this;

                var send_animation_tl = new TimelineMax({
                    onComplete: function onComplete() {
                        if (message.after_play) message.after_play();
                    }
                });

                var input_offset = self.$input.offset();

                var $outgoing_message = $("<div class='outgoing-message'>" + message.text + "</div>");
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

                extra_btn_tl.to(self.$extra_btn_3, 0.3, { x: 0, opacity: 0 });
                extra_btn_tl.to(self.$extra_btn_2, 0.3, { x: 0, opacity: 1 }, '-=0.2');
                extra_btn_tl.to(self.$extra_btn_1, 0.3, { x: 0, opacity: 1 }, '-=0.2');

                return extra_btn_tl;
            }
        }, {
            key: 'switch_extra_buttons',
            value: function switch_extra_buttons() {

                var self = this;

                self.is_input_wide = true;

                var extra_btn_tl = new TimelineMax();

                extra_btn_tl.to(self.$extra_btn_1, 0.3, { x: -10, opacity: 0 });
                extra_btn_tl.to(self.$extra_btn_2, 0.3, { x: -10, opacity: 0 }, '-=0.2');
                extra_btn_tl.to(self.$extra_btn_3, 0.3, { x: -43, opacity: 1 }, '-=0.2');

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);