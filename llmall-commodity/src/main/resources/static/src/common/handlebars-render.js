(function ($, Handlebars) {
    HandlebarsRender = function(){
    };
    HandlebarsRender.prototype = {
        render: function(hbs, json, target, callback) {
            var body = $('body');
            body.find('.handlebars').remove(); // remove old handlebars template
            body.append(hbs);

            var source = $('.handlebars').html();
            var template = Handlebars.compile(source);

            var html = template(json);
            $(target).html(html);

            if (callback && $.isFunction(callback)){
                callback();
            }
        }
    };
})(jQuery, Handlebars);
