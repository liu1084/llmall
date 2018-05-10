(function ($) {
    var BusinessDiscount = function () {
        this.baseUrl = '';
    };

    BusinessDiscount.prototype = {
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

            //搜索 -- 光标移出搜索框
            $(document).on('focusout keyup', 'input.business-discount-search', function () {
                var keywords = $(this).val();
                _this.filterBusinessDiscount(keywords);
            });

            $(document).on('change', '.business-discount-select', function () {
                if ($('input.business-discount-select:checked').length > 0){
                    $('.delete-selected').prop("disabled", false);
                }else{
                    $('.delete-selected').prop("disabled", true);
                }
            });

            //新增特殊折扣率
            $(document).on('click', '.new-business-discount', function () {
                _this.createOrUpdate();
            });

            //保存
            $(document).on('click', '.save-business-discount', function () {
                var businessType = $('select.business-type').val();
                var discount = $('#discount').val() ? $('#discount').val() : 0;
                var partnerCode = $('#partner-code').val();
                var partnerName = $('#partner-name').val();
                var businessDiscount = {
                    businessType: businessType,
                    discount: discount,
                    partnerCode: partnerCode,
                    partnerName: partnerName
                };

                if (_this.validBusinessDiscount(businessDiscount)){
                    var id = $(this).data('id');
                    if (id){
                        businessDiscount.id = id;
                        _this.updateBusinessDiscountById(businessDiscount);
                        return false;
                    }

                    _this.saveBusinessDiscount(businessDiscount)
                }
            });

            //修改特殊折扣率
            $(document).on('click', '.business-discount-update', function () {
                var id = $(this).data('update-id');
                if (id) {
                    _this.getBusinessDiscountById(id);
                }
            });

            //删除一条或者多条特殊折扣率记录
            $(document).on('click', '.delete-selected', function () {
                var selectedBasicPrices = $('input.business-discount-select:checked');
                if (selectedBasicPrices.length > 0){
                    var url = _this.baseUrl + '/price/deleteBusinessDiscount';
                    var selected = [];
                    $.each(selectedBasicPrices, function (index, ele) {
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
                            _this.showAlert("删除特殊折扣率成功，共删除" + data + "记录.");
                            $.each(selectedBasicPrices, function (index, ele) {
                                $(ele).parents('tr.price.business-discount').hide();
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
            var all = $('input.business-discount-select');
            $.each(all, function (index, ele) {
                $(ele).prop('checked', true);
            });
        },

        selectReverseBasicPrices: function () {
            var all = $('input.business-discount-select');
            $.each(all, function (index, ele) {
                if ($(ele).is(':checked')){
                    $(ele).prop('checked', false);
                }else{
                    $(ele).prop('checked', true);
                }
            });

            if ($('input.business-discount-select:checked').length > 0){
                $('.delete-selected').prop("disabled", false);
            }else{
                $('.delete-selected').prop("disabled", true);
            }
        },
        saveBusinessDiscount: function (data) {
            var _this = this;
            var url = _this.baseUrl + '/price/saveBusinessDiscount';
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    if (data === 1) {
                        $('#business-discount-new').modal('hide');
                        _this.showAlert("特殊折扣率增加成功");
                        _this.load();
                        return false;
                    }

                    _this.showAlert("特殊折扣率增加失败");
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        getBusinessDiscountById: function (id) {
            var _this = this;
            var url = _this.baseUrl + '/price/getBusinessDiscountById/' + id;
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
        updateBusinessDiscountById: function (data) {
            var _this = this;
            var url = _this.baseUrl + '/price/updateBusinessDiscountById';
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    if (data === 1) {
                        $('#business-discount-new').modal('hide');
                        _this.showAlert("特殊折扣率更新成功");
                        _this.load();
                        return false;
                    }

                    _this.showAlert("特殊折扣率更新失败");
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        validBusinessDiscount: function (discount) {
            //TODO!!
            return true;
        },
        createOrUpdate: function (id, params) {
            var _this = this;
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/business-discount-new.hbs"];
            var target = $('.dialog');
            var data = params ? params.data : {};
            var cb = function () {
                $('#business-discount-new').modal('show');
                var saveOrUpdateButton = $('.save-business-discount');
                saveOrUpdateButton.data('id', '');
                if (id) {//修改
                    saveOrUpdateButton.data('id', id);
                    saveOrUpdateButton.text('修改');
                    $('#myModalLabel').text('修改特殊折扣率');
                    var selectedBillType = params.selectedBusinessType;
                    _this.getBusinessTypes(selectedBillType);

                } else {//新建
                    $('#myModalLabel').text('新增特殊折扣率');
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
        filterBusinessDiscount: function (keywords) {
            var _this = this;
            var currentBusinessDiscounts = $('.business-discount-table').data('businessDiscount');
            if (keywords) {
                if (currentBusinessDiscounts && currentBusinessDiscounts.length > 0) {
                    var filterBusinessDiscounts = $.grep(currentBusinessDiscounts, function (n, i) {
                        var pattern = new RegExp(keywords, 'gi');
                        return (n.partnerCode === keywords
                            || n.partnerName === keywords
                            || pattern.test(n.partnerCode)
                            || pattern.test(n.partnerName)
                        );
                    });
                    _this.loadBusinessDiscount(filterBusinessDiscounts);
                }
            }else{
                _this.loadBusinessDiscount(currentBusinessDiscounts);
            }
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
            var url = _this.baseUrl + '/price/getAllBusinessDiscounts';
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    data = _this.fixNumberPrecision(data);
                    //存储加载好的数据
                    $('.business-discount-table').data('businessDiscount', data);
                    _this.loadBusinessDiscount(data);
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
        loadBusinessDiscount: function (data) {
            var _this = this;
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/table-business-discount.hbs"];
            var target = $('table.business-discount-table > tbody');
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
    var businessDiscount = new BusinessDiscount();
    businessDiscount.init();
})(jQuery);