(function ($) {
    var Report = function () {
        this.baseUrl = '';
    };
    Report.prototype = {
        init: function () {
            this.getBaseURL();
            this.showDatePicker();
            this.bind();
            this.daily();
        },
        getBaseURL: function () {
            this.baseUrl = $('#baseURL').text();
        },
        showDatePicker: function () {
            var options = {
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            };
            $('#start-datetime').datepicker(options).datepicker('update', new Date());
            $('#end-datetime').datepicker(options).datepicker('update', new Date());
        },
        loading: function () {
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/loading.hbs"];
            var target = $('table.daily-report-table > tbody');
            handlebarsRender.render(hbs, {}, target);
        },
        bind: function () {
            var _this = this;
            $(document).off('click', '#query-daily-report')
                .on('click', '#query-daily-report', function () {
                    _this.daily();
                });
        },
        showAlert: function (message) {
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/alert.hbs"];
            var target = $('.alert-tip');
            handlebarsRender.render(hbs, message, target);
            $(target).show();
        },
        daily: function () {
            var _this = this;
            var isDisplayChildrenOwners = $('#is-include-associate-owner').val();
            var startDatetime = $('#start-datetime').val();
            var endDatetime = $('#end-datetime').val();
            var billType = $('#bill-type').val();
            var message = '', errors = [];

            if (startDatetime > endDatetime){
                message = '开始时间不能大约结束时间';
                errors.push(message);
            }
            if (!startDatetime){
                message = '请选择开始时间';
                errors.push(message);
            }

            if (!endDatetime){
                message = '请选择结束时间';
                errors.push(message);
            }

            if (errors.length > 0){
                _this.showAlert(errors[0]);
                return false;
            }else{
                var data  ={
                    isDisplayChildrenOwners: isDisplayChildrenOwners,
                    startDate: startDatetime,
                    endDate: endDatetime,
                    billType: billType
                };

                $.ajaxSetup({
                    beforeSend: function () {
                        _this.loading();
                    }
                });
                $.ajax({
                    url: _this.baseUrl + '/report/daily',
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    dataType: 'JSON',
                    success: function (data) {
                        data = _this.parseData(data);
                        var handlebarsRender = new HandlebarsRender();
                        var hbs = templates["src/templates/daily-report.hbs"];
                        var target = $('table.daily-report-table > tbody');
                        var cb = function () {
                            $('.daily-report-table').DataTable();
                        };
                        handlebarsRender.render(hbs, data, target, cb);
                    },
                    error: function (err) {
                        _this.showAlert(err.responseText);
                    }
                });
            }
        },
        parseData: function (data) {
            var padZero = function (num) {
                return num <= 9 ? '0' + num : num;
            };
            var timeConvert = function (unixTimestamp) {
                var a = new Date(unixTimestamp);
                var year = a.getFullYear();
                var month = a.getMonth();
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = year + '-' + padZero(month) + '-' + padZero(date) + ' ' + padZero(hour) + ':' + padZero(min) + ':' + padZero(sec) ;
                return time;
            };

            var billTypeConvert = function (type) {
                var result = '';
                switch (type){
                    case "1000":
                       result = '入库';
                       break;
                    case "2000":
                        result = '出库';
                        break;
                    case "3000":
                        result = '库内';
                        break;
                    case "4000":
                        result = '增值';
                        break;
                    case 5000:
                        result = '未知';
                        break;
                }
                return result;
            };

            var billItemConvert = function (type) {
                var result = '';
                switch (type){
                    case 1001:
                        result = '收货';
                        break;
                    case 1002:
                        result = '码托';
                        break;
                    case 1003:
                        result = '单据接收与处理';
                        break;
                    case 2001:
                        result = '出库';
                        break;
                    case 2002:
                        result = '拣选';
                        break;
                    case 2003:
                        result = '单据接收与处理';
                        break;
                    case 3001:
                        result = '存储';
                        break;
                    case 4001:
                        result = '运输包装';
                        break;
                }
                return result;
            };

            for (var i = 0; i < data.length; i++){
                data[i].billTime = timeConvert(data[i].billTime);
                data[i].billType = billTypeConvert(data[i].billType);
                data[i].billItem = billItemConvert(data[i].billItem);
            }
            return data;
        }
    };
    var report = new Report();
    report.init();
    
})(jQuery);