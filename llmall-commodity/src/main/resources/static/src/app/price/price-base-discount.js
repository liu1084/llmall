(function ($) {
    var BaseDiscount = function () {
        this.baseUrl = '';
    };

    BaseDiscount.prototype = {
        init: function () {
            this.getBaseUrl();
            this.load();
            this.bind();
        },
        getBaseUrl: function () {
            this.baseUrl = $('#baseURL').text();
        },
        bind: function () {
            var _this = this;
            //全选按钮
            $(document).on('click', 'input.select-all', function () {
                _this.selectAllBasicPrices();
                $('.delete-selected').prop("disabled", false);
            });

            //反选
            $(document).on('click', 'input.select-reverse', function () {
                _this.selectReverseBasicPrices();
            });

            $(document).on('change', '.base-discount-select', function () {
                if ($('input.base-discount-select:checked').length > 0){
                    $('.delete-selected').prop("disabled", false);
                }else{
                    $('.delete-selected').prop("disabled", true);
                }
            });

            //新增基础折扣率
            $(document).on('click', '.new-base-discount', function () {
                _this.createOrUpdate();
            });

            //保存
            $(document).on('click', '.save-base-discount', function () {
                var businessType = $('select.business-type').val();
                var discount = $('#discount').val() ? $('#discount').val() : 0;
                var baseDiscount = {
                    businessType: businessType,
                    discount: discount
                };

                if (_this.validDiscount(baseDiscount)){
                    var id = $(this).data('id');
                    if (id){
                        baseDiscount.id = id;
                        _this.updateBaseDiscountById(baseDiscount);
                        return false;
                    }

                    _this.saveBaseDiscount(baseDiscount)
                }
            });

            //修改基础折扣率
            $(document).on('click', '.base-discount-update', function () {
                var id = $(this).data('update-id');
                if (id) {
                    _this.getBaseDiscountById(id);
                }
            });

            //删除一条或者多条基础折扣率记录
            $(document).on('click', '.delete-selected', function () {
                var selectedBasePrices = $('input.base-discount-select:checked');
                if (selectedBasePrices.length > 0){
                    var url = _this.baseUrl + '/price/deleteBaseDiscount';
                    var selected = [];
                    $.each(selectedBasePrices, function (index, ele) {
                        if ($(ele).prop('checked') === true){
                            selected.push($(ele).val());
                        }
                    });
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: JSON.stringify(selected),
                        contentType: 'application/json',
                        dataType: 'JSON',
                        success: function (data) {
                            _this.showAlert("删除基础折扣率成功，共删除" + data + "记录.");
                            $.each(selectedBasePrices, function (index, ele) {
                                $(ele).parents('tr.price.base-discount').hide();
                            });
                            _this.load();
                        },
                        error: function (err) {
                            _this.showAlert(err.responseText);
                        }
                    });
                }
            });
        },
        selectAllBasicPrices: function () {
            var all = $('input.base-discount-select');
            $.each(all, function (index, ele) {
                $(ele).prop('checked', true);
            });
        },

        selectReverseBasicPrices: function () {
            var all = $('input.base-discount-select');
            $.each(all, function (index, ele) {
                if ($(ele).is(':checked')){
                    $(ele).prop('checked', false);
                }else{
                    $(ele).prop('checked', true);
                }
            });

            if ($('input.base-discount-select:checked').length > 0){
                $('.delete-selected').prop("disabled", false);
            }else{
                $('.delete-selected').prop("disabled", true);
            }
        },
        saveBaseDiscount: function (data) {
            var _this = this;
            var url = _this.baseUrl + '/price/saveBaseDiscount';
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    if (data === 1) {
                        $('#base-discount-new').modal('hide');
                        _this.showAlert("基础折扣率增加成功");
                        _this.load();
                        return false;
                    }

                    _this.showAlert("基础折扣率增加失败");
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        getBaseDiscountById: function (id) {
            var _this = this;
            var url = _this.baseUrl + '/price/getBaseDiscountById/' + id;
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    var params = {
                        selectedBusinessType: data.businessType,
                        data: data
                    };
                    _this.createOrUpdate(id, params);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        updateBaseDiscountById: function (data) {
            var _this = this;
            var url = _this.baseUrl + '/price/updateBaseDiscountById';
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    if (data === 1) {
                        $('#base-discount-new').modal('hide');
                        _this.showAlert("基础折扣率更新成功");
                        _this.load();
                        return false;
                    }

                    _this.showAlert("基础折扣率更新失败");
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        validDiscount: function (discount) {
            //TODO!!
            return true;
        },
        createOrUpdate: function (id, params) {
            var _this = this;
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/base-discount-new.hbs"];
            var target = $('.dialog');
            var data = params ? params.data : {};
            var cb = function () {
                $('#base-discount-new').modal('show');
                var saveOrUpdateButton = $('.save-base-discount');
                saveOrUpdateButton.data('id', '');
                if (id) {//修改
                    saveOrUpdateButton.data('id', id);
                    saveOrUpdateButton.text('修改');
                    $('#myModalLabel').text('修改基础折扣率');
                    var selectedBillType = params.selectedBusinessType;
                    _this.getBusinessTypes(selectedBillType);

                } else {//新建
                    $('#myModalLabel').text('新增基础折扣率');
                    _this.getBusinessTypes();
                }
            };

            handlebarsRender.render(hbs, data, target, cb);
        },
        getBusinessTypes: function (selectedBusinessType) {
            var _this = this;
            var url = _this.baseUrl + '/price/getBusinessTypes';
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    var handlebarsRender = new HandlebarsRender();
                    var hbs = templates["src/templates/business-type.hbs"];
                    var target = $('.business-type-select');
                    var cb = function () {

                    };
                    var params = {
                        businessTypes: data,
                        selectedBusinessType: selectedBusinessType
                    };
                    handlebarsRender.render(hbs, params, target, cb);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        showAlert: function (message) {
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/alert.hbs"];
            var target = $('.alert-tip');
            handlebarsRender.render(hbs, message, target);
            $(target).show();
            setTimeout(function () {
                $(target).hide();
            }, 3000)
        },
        load: function () {
            var _this = this;
            var url = _this.baseUrl + '/price/getAllBaseDiscount';
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    data = _this.fixNumberPrecision(data);
                    //存储加载好的数据
                    $('.base-discount-table').data('baseDiscount', data);
                    _this.loadBaseDiscount(data);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        fixNumberPrecision: function (data, precision) {
            if (!precision) {
                precision = 4;
            }
            $.each(data, function (i, n) {
                n.discount = parseFloat(n.discount).toFixed(precision);
            });
            return data;
        },
        loadBaseDiscount: function (data) {
            var _this = this;
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/table-base-discount.hbs"];
            var target = $('table.base-discount-table > tbody');
            var cb = function () {

            };
            handlebarsRender.render(hbs, data, target, cb);
        }
    };
    window.Handlebars.registerHelper('selected', function (option, value) {
        if (option === value) {
            return ' selected';
        } else {
            return ''
        }
    });
    var baseDiscount = new BaseDiscount();
    baseDiscount.init();
})(jQuery);