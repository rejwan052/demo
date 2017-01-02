/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	function main() {
	  var $window = $(window);
	  var $body = $(document.body);
	  var $sidebar = $('#sidebar');
	  $body.addClass('is-loading');
	  $body.scrollspy({ target: '#sidebar-nav' });

	  // inactive sections
	  $('.section').each(function (index, section) {
	    var $section = $(section);
	    $section.scrollex({
	      mode: 'middle',
	      top: '-10vh',
	      bottom: '-10vh',
	      initialize: function initialize() {
	        $section.addClass('inactive');
	      },
	      enter: function enter() {
	        $section.removeClass('inactive');
	      }
	    });
	  });

	  // inactive features
	  $('.feature').each(function (index, feature) {
	    var $feature = $(feature);
	    $feature.scrollex({
	      mode: 'middle',
	      top: '-25vh',
	      bottom: '-25vh',
	      initialize: function initialize() {
	        $feature.addClass('inactive');
	      },
	      enter: function enter() {
	        $feature.removeClass('inactive');
	      }
	    });
	  });

	  // smooth scroll
	  $sidebar.find('a').each(function (index, el) {
	    var $el = $(el);
	    $el.on('click', function (event) {
	      event.preventDefault();
	      var id = $el.attr('href');
	      $('html, body').animate({
	        scrollTop: $(id).offset().top
	      }, 750);
	    });
	  });

	  // body ready
	  $window.on('load', function () {
	    setTimeout(function () {
	      $body.removeClass('is-loading');
	    }, 500);
	  });
	}

	$(main);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/* jquery.scrollex v0.2.1 | (c) n33 | n33.co @n33co | MIT */

	(function ($) {

		var $window = $(window),
		    ids = 1,
		    queue = {};

		/**
	  * Resolves a top/bottom value, optionally relative to an element's height
	  * or the window height.
	  *
	  * @param {integer} x Value.
	  * @param {integer} eHeight Element height.
	  * @param {integer} vHeight Viewport (window) height.
	  * @return {integer} Resolved value.
	  */
		function resolve(x, eHeight, vHeight) {

			if (typeof x === 'string') {

				// Percentage? Relative to element height.
				if (x.slice(-1) == '%') x = parseInt(x.substring(0, x.length - 1)) / 100.00 * eHeight;

				// vh? Relative to viewport height.
				else if (x.slice(-2) == 'vh') x = parseInt(x.substring(0, x.length - 2)) / 100.00 * vHeight;

					// px? Redundant but okay!
					else if (x.slice(-2) == 'px') x = parseInt(x.substring(0, x.length - 2));
			}

			return x;
		};

		/**
	  * Window events.
	  */
		$window.on('scroll', function () {

			// Get vTop.
			var vTop = $window.scrollTop();

			// Step through handler queue.
			$.map(queue, function (o) {

				// Clear existing timeout.
				window.clearTimeout(o.timeoutId);

				// Call handler after timeout delay.
				o.timeoutId = window.setTimeout(function () {
					o.handler(vTop);
				}, o.options.delay);
			});
		}).on('load', function () {
			$window.trigger('scroll');
		});

		/**
	  * Activates scrollex on an element.
	  *
	  * @param {object} userOptions Options.
	  * @return {jQuery} jQuery object.
	  */
		jQuery.fn.scrollex = function (userOptions) {

			var $this = $(this);

			// No elements?
			if (this.length == 0) return $this;

			// Multiple elements?
			if (this.length > 1) {

				for (var i = 0; i < this.length; i++) {
					$(this[i]).scrollex(userOptions);
				}return $this;
			}

			// Already scrollexed?
			if ($this.data('_scrollexId')) return $this;

			// Vars.
			var id, options, test, handler, o;

			// Build object.

			// ID.
			id = ids++;

			// Options.
			options = jQuery.extend({

				// Top.
				top: 0,

				// Bottom.
				bottom: 0,

				// Delay.
				delay: 0,

				// Mode ('default', 'top', 'middle', 'bottom', 'top-only', 'bottom-only').
				mode: 'default',

				// Enter function.
				enter: null,

				// Leave function.
				leave: null,

				// Initialize function.
				initialize: null,

				// Terminate function.
				terminate: null,

				// Scroll function.
				scroll: null

			}, userOptions);

			// Test.
			switch (options.mode) {

				// top: Top viewport edge must fall within element's contact area.
				case 'top':

					test = function test(vTop, vMiddle, vBottom, eTop, eBottom) {
						return vTop >= eTop && vTop <= eBottom;
					};

					break;

				// bottom: Bottom viewport edge must fall within element's contact area.
				case 'bottom':

					test = function test(vTop, vMiddle, vBottom, eTop, eBottom) {
						return vBottom >= eTop && vBottom <= eBottom;
					};

					break;

				// middle: Midpoint between top/bottom viewport edges must fall within element's contact area.
				case 'middle':

					test = function test(vTop, vMiddle, vBottom, eTop, eBottom) {
						return vMiddle >= eTop && vMiddle <= eBottom;
					};

					break;

				// top-only: Top viewport edge must be visible
				case 'top-only':

					test = function test(vTop, vMiddle, vBottom, eTop, eBottom) {
						return vTop <= eTop && eTop <= vBottom;
					};

					break;

				// bottom-only: Bottom viewport edge must be visible
				case 'bottom-only':

					test = function test(vTop, vMiddle, vBottom, eTop, eBottom) {
						return vBottom >= eBottom && eBottom >= vTop;
					};

					break;

				// default: Element's contact area must fall within the viewport.
				default:
				case 'default':

					test = function test(vTop, vMiddle, vBottom, eTop, eBottom) {
						return vBottom >= eTop && vTop <= eBottom;
					};

					break;

			}

			// Handler.
			handler = function handler(vTop) {

				var currentState = this.state,
				    newState = false,
				    offset = this.$element.offset(),
				    vHeight,
				    vMiddle,
				    vBottom,
				    eHeight,
				    eTop,
				    eBottom;

				// Viewport values.
				vHeight = $window.height();
				vMiddle = vTop + vHeight / 2;
				vBottom = vTop + vHeight;

				// Element values.
				eHeight = this.$element.outerHeight();
				eTop = offset.top + resolve(this.options.top, eHeight, vHeight);
				eBottom = offset.top + eHeight - resolve(this.options.bottom, eHeight, vHeight);

				// Determine if there's been a state change.
				newState = this.test(vTop, vMiddle, vBottom, eTop, eBottom);

				if (newState != currentState) {

					// Update state.
					this.state = newState;

					// Call appropriate function.
					if (newState) {

						if (this.options.enter) this.options.enter.apply(this.element);
					} else {

						if (this.options.leave) this.options.leave.apply(this.element);
					}
				}

				// Call scroll function.
				if (this.options.scroll) this.options.scroll.apply(this.element, [(vMiddle - eTop) / (eBottom - eTop)]);
			};

			// Object.
			o = {
				id: id,
				options: options,
				test: test,
				handler: handler,
				state: null,
				element: this,
				$element: $this,
				timeoutId: null
			};

			// Add object to queue.
			queue[id] = o;

			// Add scrollex ID to element.
			$this.data('_scrollexId', o.id);

			// Call initialize.
			if (o.options.initialize) o.options.initialize.apply(this);

			return $this;
		};

		/**
	  * Deactivates scrollex on an element.
	  *
	  * @return {jQuery} jQuery object.
	  */
		jQuery.fn.unscrollex = function () {

			var $this = $(this);

			// No elements?
			if (this.length == 0) return $this;

			// Multiple elements?
			if (this.length > 1) {

				for (var i = 0; i < this.length; i++) {
					$(this[i]).unscrollex();
				}return $this;
			}

			// Vars.
			var id, o;

			// Not scrollexed?
			id = $this.data('_scrollexId');

			if (!id) return $this;

			// Get object from queue.
			o = queue[id];

			// Clear timeout.
			window.clearTimeout(o.timeoutId);

			// Remove object from queue.
			delete queue[id];

			// Remove scrollex ID from element.
			$this.removeData('_scrollexId');

			// Call terminate.
			if (o.options.terminate) o.options.terminate.apply(this);

			return $this;
		};
	})(jQuery);

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }
/******/ ]);