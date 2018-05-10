(function ($) {
    var BasePrice = function () {
        this.baseUrl = '';
    };

    BasePrice.prototype = {
        init: function () {
            this.getBaseUrl();
            this.load();
            this.bind();
        },
        getBaseUrl: function () {
            this.baseUrl = $('#baseURL').text();
        },
        load: function () {
            var _this = this;
            var url = _this.baseUrl + '/price/getAllBasePrices';
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    data = _this.fixNumberPrecision(data);
                    //存储加载好的数据
                    $('.basic-price-table').data('basicPrices', data);
                    _this.loadPrices(data);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        loadPrices: function (data) {
            var _this = this;
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/table-basic-price.hbs"];
            var target = $('table.basic-price-table > tbody');
            var cb = function () {

            };
            handlebarsRender.render(hbs, data, target, cb);
        },
        fixNumberPrecision: function (data, precision) {
            if (!precision) {
                precision = 2;
            }
            $.each(data, function (i, n) {
                n.price = parseFloat(n.price).toFixed(precision);
                n.minPrice = parseFloat(n.minPrice).toFixed(precision);
                n.subPrice = parseFloat(n.subPrice).toFixed(precision);
                n.subMinPrice = parseFloat(n.subMinPrice).toFixed(precision);
            });
            return data;
        },
        bind: function () {
            var _this = this;
            //新建基础价格记录
            $(document).on('click', '.new-basic-price', function () {
                _this.createOrUpdate();
            });

            //改变计费类别，计费项联动
            $(document).on('change', '.bill-type', function () {
                var type = $(this).val();
                _this.getBillItemByType(type);
            });

            $(document).on('change', '.basic-price-select', function () {
                if ($('input.basic-price-select:checked').length > 0){
                    $('.delete-selected').prop("disabled", false);
                }else{
                    $('.delete-selected').prop("disabled", true);
                }
            });

            //删除一条或者多条基础价格
            $(document).on('click', '.delete-selected', function () {
                var selectedBasicPrices = $('input.basic-price-select:checked');
                if (selectedBasicPrices.length > 0){
                    var url = _this.baseUrl + '/price/deleteBasicPrices';
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
                            _this.showAlert("删除基础价格成功，共删除" + data + "记录.");
                            $.each(selectedBasicPrices, function (index, ele) {
                                $(ele).parents('tr.price.basic').hide();
                            });
                            _this.load();
                        },
                        error: function (err) {
                            _this.showAlert(err.responseText);
                        }
                    });
                }
            });

            //保存基础价格记录
            $(document).on('click', '.save-base-price', function () {
                var warehouseCode = $('#warehouseCode').val();
                var warehouseName = $('#warehouseName').val();
                var billType = $('select.bill-type').val();
                var billItem = $('select.bill-item').val();
                var unit = $('select.bill-unit').val();
                var price = $('#price').val() ? $('#price').val() : 0;
                var minPrice = $('#minPrice').val() ? $('#minPrice').val() : 0;
                var subPrice = $('#subPrice').val() ? $('#subPrice').val() : 0;
                var subMinPrice = $('#subMinPrice').val() ? $('#subMinPrice').val(): 0;
                var period = $('select.bill-period-select').val();
                var lat = $('select.bill-lat-select').val();

                var basicPrice = {
                    warehouseCode: warehouseCode,
                    warehouseName: warehouseName,
                    billType: billType,
                    billItem: billItem,
                    unit: unit,
                    price: price,
                    minPrice: minPrice,
                    subPrice: subPrice,
                    subMinPrice: subMinPrice,
                    period: period,
                    lat: lat
                };
                if (_this.validBasicPrice(basicPrice)) {
                    var id = $(this).data('id');
                    if (id) {
                        basicPrice.id = id;
                        _this.updateBasePriceById(basicPrice);
                        return false;
                    }
                    _this.saveBasePrice(basicPrice);
                }
            });

            //修改基础价格记录
            $(document).on('click', '.price-basic-update', function () {
                var id = $(this).data('update-id');
                if (id) {
                    _this.getBasePriceById(id);
                }
            });

            //搜索 -- 光标移出搜索框
            $(document).on('focusout keyup', 'input.price-basic-search', function () {
                var keywords = $(this).val();
                _this.filterBasicPrice(keywords);
            });

            //全选按钮
            $(document).on('click', 'input.select-all', function () {
                _this.selectAllBasicPrices();
                $('.delete-selected').prop("disabled", false);
            });

            //反选
            $(document).on('click', 'input.select-reverse', function () {
                _this.selectReverseBasicPrices();
            });
        },
        filterBasicPrice: function (keywords) {
            var _this = this;
            var currentPrices = $('.basic-price-table').data('basicPrices');
            if (keywords) {

                if (currentPrices && currentPrices.length > 0) {
                    var filterPrices = $.grep(currentPrices, function (n, i) {
                        var pattern = new RegExp(keywords, 'gi');
                        return (n.warehouseCode === keywords
                            || n.warehouseName === keywords
                            || pattern.test(n.warehouseCode)
                            || pattern.test(n.warehouseName)
                        );
                    });
                    _this.loadPrices(filterPrices);
                }
            }else{
                _this.loadPrices(currentPrices);
            }
        },
        validBasicPrice: function () {
            //TODO!!
            return true;
        },
        selectAllBasicPrices: function () {
            var all = $('input.basic-price-select');
            $.each(all, function (index, ele) {
                $(ele).prop('checked', true);
            });
        },

        selectReverseBasicPrices: function () {
            var all = $('input.basic-price-select');
            $.each(all, function (index, ele) {
                if ($(ele).is(':checked')){
                    $(ele).prop('checked', false);
                }else{
                    $(ele).prop('checked', true);
                }
            });

            if ($('input.basic-price-select:checked').length > 0){
                $('.delete-selected').prop("disabled", false);
            }else{
                $('.delete-selected').prop("disabled", true);
            }
        },
        createOrUpdate: function (id, params) {
            var _this = this;
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/basic-price-new.hbs"];
            var target = $('.dialog');
            var data = params ? params.data : {};
            var cb = function () {
                $('#basic-price-new').modal('show');
                var saveOrUpdateButton = $('.save-base-price');
                saveOrUpdateButton.data('id', '');
                if (id) {//修改
                    saveOrUpdateButton.data('id', id);
                    saveOrUpdateButton.text('修改');
                    $('#myModalLabel').text('修改基础价格');
                    var selectedBillType = params.selectedBillType;
                    var selectedBillUnit = params.selectedBillUnit;
                    var selectedBillPeriod = params.selectedBillPeriod;
                    var selectedBillLat = params.selectedBillLat;
                    _this.getBillType(selectedBillType);
                    _this.getBillItemByType(selectedBillType, params.selectedBillItem);
                    _this.getBillUnit(selectedBillUnit);
                    _this.getBillPeriods(selectedBillPeriod);
                    _this.getBillLats(selectedBillLat);

                } else {//新建
                    $('#myModalLabel').text('新增基础价格');
                    _this.getBillType();
                    _this.getBillItemByType(1000, 1001);
                    _this.getBillUnit();
                    _this.getBillPeriods();
                    _this.getBillLats();
                }
            };

            handlebarsRender.render(hbs, data, target, cb);
        },
        getBillType: function (selectedBillType) {
            var _this = this;
            var url = _this.baseUrl + '/rule/getBillTypes';
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    var handlebarsRender = new HandlebarsRender();
                    var hbs = templates["src/templates/bill-type.hbs"];
                    var target = $('.bill-type-select');
                    var cb = function () {

                    };
                    var params = {
                        billTypes: data,
                        selectedBillType: selectedBillType
                    };
                    handlebarsRender.render(hbs, params, target, cb);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        getBillItemByType: function (type, selectedBillItem) {
            var _this = this;
            if (type) {
                var url = _this.baseUrl + '/rule/getBillItemsByType/' + type;
                $.ajax({
                    url: url,
                    type: 'GET',
                    contentType: 'application/json',
                    dataType: 'JSON',
                    success: function (data) {
                        var handlebarsRender = new HandlebarsRender();
                        var hbs = templates["src/templates/bill-item.hbs"];
                        var target = $('.bill-item-select');
                        var cb = function () {

                        };
                        var params = {
                            selectedBillItem: selectedBillItem,
                            billItems: data
                        };
                        handlebarsRender.render(hbs, params, target, cb);
                    },
                    error: function (err) {
                        _this.showAlert(err.responseText);
                    }
                });
            }
        },
        getBillUnit: function (selectedBillUnit) {
            var _this = this;
            var url = _this.baseUrl + '/rule/getBillUnits';
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    var handlebarsRender = new HandlebarsRender();
                    var hbs = templates["src/templates/bill-unit.hbs"];
                    var target = $('.bill-unit-select');
                    var cb = function () {

                    };
                    var params = {
                        billUnits: data,
                        selectedBillUnit: selectedBillUnit
                    };
                    handlebarsRender.render(hbs, params, target, cb);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        getBillPeriods: function (selectedBillPeriod) {
            var _this = this;
            var url = _this.baseUrl + '/rule/getBillPeriods';
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    var handlebarsRender = new HandlebarsRender();
                    var hbs = templates["src/templates/bill-period.hbs"];
                    var target = $('.bill-period-select');
                    var cb = function () {

                    };
                    var params = {
                        billPeriods: data,
                        selectedBillPeriod: selectedBillPeriod
                    };
                    handlebarsRender.render(hbs, params, target, cb);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        getBillLats: function (selectedBillLat) {
            var _this = this;
            var url = _this.baseUrl + '/rule/getBillLats';
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    var handlebarsRender = new HandlebarsRender();
                    var hbs = templates["src/templates/bill-lat.hbs"];
                    var target = $('.bill-lat-select');
                    var cb = function () {

                    };
                    var params = {
                        selectedBillLat: selectedBillLat,
                        billLats: data
                    };
                    handlebarsRender.render(hbs, params, target, cb);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        saveBasePrice: function (data) {
            var _this = this;
            var url = _this.baseUrl + '/price/savePriceBase';
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    if (data === 1) {
                        $('#basic-price-new').modal('hide');
                        _this.showAlert("基础价格增加成功");
                        _this.load();
                        return false;
                    }

                    _this.showAlert("基础价格增加失败");
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
        getBasePriceById: function (id) {
            var _this = this;
            var url = _this.baseUrl + '/price/getBasePriceById/' + id;
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    var params = {
                        selectedBillType: data.billType,
                        selectedBillItem: data.billItem,
                        selectedBillUnit: data.unit,
                        selectedBillPeriod: data.period,
                        selectedBillLat: data.lat,
                        data: data
                    };
                    _this.createOrUpdate(id, params);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        updateBasePriceById: function (data) {
            var _this = this;
            var url = _this.baseUrl + '/price/updateBasePriceById';
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    if (data === 1) {
                        $('#basic-price-new').modal('hide');
                        _this.showAlert("基础价格更新成功");
                        _this.load();
                        return false;
                    }

                    _this.showAlert("基础价格更新失败");
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        showDatePicker: function () {
            var options = {
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            };
            $('#start-datetime').datepicker(options).datepicker('update', new Date());
            $('#end-datetime').datepicker(options).datepicker('update', new Date());
        }
    };

    window.Handlebars.registerHelper('selected', function (option, value) {
        if (option === value) {
            return ' selected';
        } else {
            return ''
        }
    });

    var basicPrice = new BasePrice();
    basicPrice.init();
})(jQuery);