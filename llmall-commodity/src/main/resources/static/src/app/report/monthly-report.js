(function ($) {
    var Report = function () {
        this.baseUrl = '';
    };

    Report.prototype = {
        init: function () {
            this.getBaseURL();
            this.showDatePicker();
            this.bind();
            this.monthly();
        },
        getBaseURL: function () {
            this.baseUrl = $('#baseURL').text();
        },
        showDatePicker: function () {
            var options = {
                format: 'yyyy-mm',
                autoclose: true,
                language: 'zh-CN'
            };
            $('#month').datepicker(options).datepicker('update', new Date());
        },
        loading: function () {
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/loading.hbs"];
            var target = $('table.monthly-report-table > tbody');
            handlebarsRender.render(hbs, {}, target);
        },
        bind: function () {
            var _this = this;
            $(document).off('click', '#query-monthly-report')
                .on('click', '#query-monthly-report', function () {
                    _this.monthly();
                });
        },
        showAlert: function (message) {
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/alert.hbs"];
            var target = $('.alert-tip');
            handlebarsRender.render(hbs, message, target);
            $(target).show();
        },
        monthly: function () {
            var _this = this;
            var isDisplayChildrenOwners = $('#is-include-associate-owner').val();
            var month = $('#month').val();
            var message = '', errors = [];
            if (!month){
                message = '请选择开始时间';
                errors.push(message);
            }
            if (errors.length > 0){
                _this.showAlert(errors[0]);
                return false;
            }else{
                var data  ={
                    isDisplayChildrenOwners: isDisplayChildrenOwners,
                    month: month
                };

                $.ajaxSetup({
                    beforeSend: function () {
                        _this.loading();
                    }
                });
                $.ajax({
                    url: _this.baseUrl + '/report/monthly',
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    dataType: 'JSON',
                    success: function (data) {
                        console.log(data);
                        var handlebarsRender = new HandlebarsRender();
                        var hbs = templates["src/templates/monthly-report.hbs"];
                        var target = $('table.monthly-report-table > tbody');
                        var cb = function () {
                            $('.monthly-report-table').DataTable();
                        };
                        handlebarsRender.render(hbs, data, target, cb);
                    },
                    error: function (err) {
                        _this.showAlert(err.responseText);
                    }
                });
            }
        }
    };

    var report = new Report();
    report.init();
})(jQuery);