
/*
 *
 *  * The MIT License
 *  *
 *  * Copyright (c) 2004 - 2016 by Jim Liu
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

/**
 * Created by jim.liu on 2016-07-11.
 */
(function ($) {
    var Validation = function () {
    };
    var options = {
        message: '',
        rules: {
            //key is id
            'projectMoney': [
                {required: false, prompt: 'can not be blank'},
                {number: true, prompt: 'must be a number'}
            ]
        }
    };
    Validation.prototype.options = function (params) {
        options = $.extend(true, options, params);
    };
    Validation.prototype.init = function (params) {
        this.options(params);
    };
    Validation.prototype.required = function (value) {
        var result = false;
        result = !(!value || value == " " || value == "null");
        return result;
    };

    Validation.prototype.number = function (value) {
        var result = false;
        if ($.isNumeric(value)) {
            result = true;
        }
        return result;
    };

    Validation.prototype.doValid = function (value, rules) {
        var _this = this;
        var errors = [];
        $.each(rules, function (i, rule) {
            for (r in rule) {
                switch (r) {
                    case 'required':
                        if (!_this.required(value)){
                            errors.push();
                        }
                        break;

                    case 'numberic':
                        break;
                }
            }
        });
    };

    $.fn.extend({
        valid: function () {
            var selector = $(this).selector;
            var errors = [];
            var rules = options.rules;
            for (var rule in rules) {
                var element = $('#' + rule);
                var value = element.val();
                var myRules = options.rules[rule];

                if (element.length === 1) {

                }
            }


            $.each(rules, function (i, r) {
                switch (r.type) {
                    case 'required':
                        break;
                    case 'number':
                        break;
                }
                if (!r.test(value)) {
                    $().toastWarning(options.message);
                }
            });
        }
    });
})(jQuery);