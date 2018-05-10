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

/**
 * Created by jim.liu on 2016-07-11.
 */
(function ($, Handlebars){
    'use strict';
    var Toast = function(){};
    var options = {
        type: 'toast-info',
        logo: 'icon-nextui-error-outline',
        message: 'no message yet!',
        seconds: 2000,
        autoHidden: true
    };
    Toast.prototype.options = function(params){
        options = $.extend(true, options, params);
    };
    Toast.prototype.init = function(params){
        this.options(params);
        var hbs = templates["src/templates/toast.hbs"];
        var body = $('body');
        body.find('.toast-template').remove();
        body.append(hbs);
    };
    Toast.prototype.render = function(){
        var toast = $('.toast');
        toast.remove();
        var source = $('.toast-template').html();
        var template = Handlebars.compile(source);
        var context = {type: options.type, logo: options.logo, message: options.message};
        var html = template(context);
        $('body').append(html);
        toast.show();
        if (options.autoHidden === true){
            setTimeout(function () {
                toast.hide();
            }, options.seconds);
        }
    };

    $.fn.extend({
        toastSuccess: function (message, seconds) {
            var params = {};
            params.type = 'toast-success';
            params.logo = 'icon-nextui-check-circle';
            params.message = message;
            params.seconds = seconds ? Number(seconds) : options.seconds;
            var t = new Toast();
            t.init(params);
            t.render();
        },
        toastWarning: function(message, seconds){
            var params = {};
            params.type = 'toast-warning';
            params.logo = 'icon-nextui-report-problem';
            params.message = message;
            params.seconds = seconds ? Number(seconds) : options.seconds;
            var t = new Toast();
            t.init(params);
            t.render();
        },
        toastInfo: function(message, seconds){
            var params = {};
            params.type = 'toast-info';
            params.logo = 'icon-nextui-error-outline';
            params.message = message;
            params.seconds = seconds ? Number(seconds) : options.seconds;
            var t = new Toast();
            t.init(params);
            t.render();
        }
    });
})(jQuery, Handlebars);