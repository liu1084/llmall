/*
 *
 *  * The MIT License
 *  *
 *  * Copyright (c) 2015-2016 by Jim Liu
 *  *
 *  * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  * of this software and associated documentation files (the "Software"), to deal
 *  * in the Software without restriction, including without limitation the rights
 *  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  * copies of the Software, and to permit persons to whom the Software is
 *  * furnished to do so, subject to the following conditions:
 *  *
 *  * The above copyright notice and this permission notice shall be included in
 *  * all copies or substantial portions of the Software.
 *  *
 *  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  * THE SOFTWARE.
 *
 */

/*
How to use
// Initialize plugin with default options.
 $('#element').demoplugin();

 // Initialize plugin with user defined options.
 $('#element').demoplugin({
  option1: 2000,
  option2: 'value',
  callback1: function () { ... }
});

 // Call a public method, no arguments.
 $('#element').demoplugin('publicFunctionName');

 // Call a public method with arguments.
 $('#element').demoplugin('publicFunctionName', 'arg1', 'arg2');

 // Get a plugin option.
 $('#element').demoplugin('option', 'key');

 // Set a plugin option after plugin initialization.
 $('#element').demoplugin('option', 'key', value);

 // Destroy plugin.
 $('#element').demoplugin('destroy');
*/

;(function ($, document, window, undefined) {
    var pluginName = 'THE-PLUGIN-NAME';

    function Plugin(element, options) {
        var el = element;
        var $el = $(element);

        options = $.extend({}, $.fn[pluginName].defaults, options);

        function init() {
            // Add any initialization logic here...
            hook('onInit');
        }

        function render() {
            // Code goes here...
            hook('onRender');
        }

        function option(key, val) {
            if (val) {
                options[key] = val;
            } else {
                return options[key];
            }
        }

        function destroy() {
            $el.each(function () {
                var el = this;
                var $el = $(this);

                // Add code to restore the element to its original state...
                hook('onDestroy');
                $el.removeData('plugin_' + pluginName);
            });
        }

        function hook(hookName) {
            if (options[hookName] !== undefined) {
                options[hookName].call(el);
            }
        }

        init();

        return {
            option: option,
            destroy: destroy,
            render: render
        };
    }

    $.fn[pluginName] = function (params) {
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function () {
                if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof params === "object" || !params) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, params));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        onInit: function () {},
        onDestroy: function () {},
        onRender: function(){}
    };
})(jQuery, document, window);