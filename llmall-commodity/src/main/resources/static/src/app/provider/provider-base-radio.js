(function ($) {
    var ProviderBaseRadio = function () {
        this.baseUrl = '';
    };

    ProviderBaseRadio.prototype = {
        init: function () {
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
                _this.selectAllProviderBaseRadio();
                $('.delete-selected').prop("disabled", false);
            });

            //反选
            $(document).on('click', 'input.select-reverse', function () {
                _this.selectReverseProviderBaseRadio();
            });

            //搜索 -- 光标移出搜索框
            $(document).on('focusout keyup', 'input.provider-base-radio-search', function () {
                var keywords = $(this).val();
                _this.filterProviderBaseRadio(keywords);
            });

            //
            $(document).on('change', 'input.provider-radio-select', function () {
                if ($('input.provider-radio-select:checked').length > 0) {
                    $('.delete-selected').prop("disabled", false);
                } else {
                    $('.delete-selected').prop("disabled", true);
                }
            });

            //新增代理商基础抽成比例
            $(document).on('click', '.new-provider-base-radio', function () {
                _this.createOrUpdate();
            });

            //保存代理商基础抽成比例
            $(document).on('click', '.save-provider-base-radio', function () {
                var providerCode = $('#provider-code').val();
                var providerName = $('#provider-name').val();
                var radio = $('#radio').val() ? $('#radio').val() : 0;

                var providerBaseRadio = {
                    providerCode: providerCode,
                    providerName: providerName,
                    radio: radio
                };

                if (_this.validDiscount(providerBaseRadio)) {
                    var id = $(this).data('id');
                    if (id) {
                        providerBaseRadio.id = id;
                        _this.updateProviderBaseRadioById(providerBaseRadio);
                        return false;
                    }

                    //检查代理商编码是否存在，如果存在不容许继续添加
                    _this.checkProviderExisted(providerBaseRadio);
                }
            });

            //修改代理商抽成比例
            $(document).on('click', '.provider-radio-update', function () {
                var id = $(this).data('update-id');
                if (id) {
                    _this.getProviderBaseRadioById(id);
                }
            });

            //删除一条或者多条代理商抽成比例记录
            $(document).on('click', '.delete-selected', function () {
                var selectedProviderBaseRadios = $('input.provider-radio-select:checked');
                if (selectedProviderBaseRadios.length > 0) {
                    var url = _this.baseUrl + '/provider/deletePriceProviderRadios';
                    var selected = [];
                    $.each(selectedProviderBaseRadios, function (index, ele) {
                        if ($(ele).prop('checked') === true) {
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
                            _this.showAlert("删除代理商抽成比例成功，共删除" + data + "记录.");
                            $.each(selectedProviderBaseRadios, function (index, ele) {
                                $(ele).parents('tr.provider.provider-radio').hide();
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
        filterProviderBaseRadio: function (keywords) {
            var _this = this;
            var currentRadios = $('.provider-base-radio-table').data('providerBaseRadio');
            if (keywords) {
                if (currentRadios && currentRadios.length > 0) {
                    var filterRadios = $.grep(currentRadios, function (n, i) {
                        var pattern = new RegExp(keywords, 'gi');
                        return (n.providerCode === keywords
                            || n.providerName === keywords
                            || pattern.test(n.providerCode)
                            || pattern.test(n.providerName)
                        );
                    });
                    _this.loadProviderBaseRadio(filterRadios);
                }
            } else {
                _this.loadProviderBaseRadio(currentRadios);
            }
        },
        selectAllProviderBaseRadio: function () {
            var all = $('input.provider-radio-select');
            $.each(all, function (index, ele) {
                $(ele).prop('checked', true);
            });
        },
        selectReverseProviderBaseRadio: function () {
            var all = $('input.provider-radio-select');
            $.each(all, function (index, ele) {
                if ($(ele).is(':checked')) {
                    $(ele).prop('checked', false);
                } else {
                    $(ele).prop('checked', true);
                }
            });

            if ($('input.provider-radio-select:checked').length > 0) {
                $('.delete-selected').prop("disabled", false);
            } else {
                $('.delete-selected').prop("disabled", true);
            }
        },
        checkProviderExisted: function (providerBaseRadio) {
            var _this = this;
            var providerCode = providerBaseRadio.providerCode;
            var url = _this.baseUrl + '/provider/checkProviderExisted/' + providerCode;
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    if (data > 0){
                        _this.showAlert("代理商编码已经存在，无法继续添加");
                        return false;
                    }
                    _this.saveProviderBaseRadio(providerBaseRadio);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        saveProviderBaseRadio: function (data) {
            var _this = this;

            var url = _this.baseUrl + '/provider/saveProviderBaseRadio';
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    if (data === 1) {
                        $('#provider-base-radio-new').modal('hide');
                        _this.showAlert("代理商抽成比例增加成功");
                        _this.load();
                        return false;
                    }

                    _this.showAlert("代理商抽成比例增加失败");
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });

        },
        getProviderBaseRadioById: function (id) {
            var _this = this;
            var url = _this.baseUrl + '/provider/getProviderBaseRadioById/' + id;
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    var params = {
                        data: data
                    };
                    _this.createOrUpdate(id, params);
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        updateProviderBaseRadioById: function (data) {
            var _this = this;
            var url = _this.baseUrl + '/provider/updateProviderBaseRadioById';
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    if (data === 1) {
                        $('#provider-base-radio-new').modal('hide');
                        _this.showAlert("代理商抽成比例更新成功");
                        _this.load();
                        return false;
                    }

                    _this.showAlert("代理商抽成比例更新失败");
                },
                error: function (err) {
                    _this.showAlert(err.responseText);
                }
            });
        },
        validDiscount: function (providerBaseRadio) {
            var _this = this;
            var radioRegExp = new RegExp('^(\\d+\\.\\d{0,4}|1)$');
            var providerCodeRegExp = new RegExp('[0-9a-z_]+', 'i');
            var providerNameRegExp = new RegExp('[0-9a-z_|\\u4e00-\\u9fa5]+', 'i');
            var radio = providerBaseRadio.radio;
            var providerCode = providerBaseRadio.providerCode;
            var providerName = providerBaseRadio.providerName;

            if (!radio || isNaN(radio) || ! providerCode || !providerName){
                _this.showAlert("radio只能输入0～1的数值，代理商编码只能输入0-9或者英文字母，代理商名称只能是0-9或者英文字母或者中文字符");
                return false;
            }
            if (!radioRegExp.test(radio) || radio <= 0 || radio > 1) {
                _this.showAlert("代理商抽成比例不正确");
                return false;
            }
            if (!providerCodeRegExp.test(providerCode)){
                _this.showAlert("代理商编码只能是0-9或者英文字母");
                return false;
            }

            if (!providerNameRegExp.test(providerName)){
                _this.showAlert("代理商名称只能是0-9或者英文字母或者中文字符");
                return false;
            }
            return true;
        },
        createOrUpdate: function (id, params) {
            var _this = this;
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/provider-base-radio-new.hbs"];
            var target = $('.dialog');
            var data = params ? params.data : {};
            var cb = function () {
                $('#provider-base-radio-new').modal('show');
                var saveOrUpdateButton = $('.save-provider-base-radio');
                saveOrUpdateButton.data('id', '');
                if (id) {//修改
                    //disabled
                    $('#provider-code').prop('disabled', true);
                    $('#provider-name').prop('disabled', true);
                    saveOrUpdateButton.data('id', id);
                    saveOrUpdateButton.text('修改');
                    $('#myModalLabel').text('修改代理商抽成比例');
                } else {//新建
                    $('#myModalLabel').text('新增代理商抽成比例');
                }
            };

            handlebarsRender.render(hbs, data, target, cb);
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
            var url = _this.baseUrl + '/provider/getAllProviderBaseRadios';
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                success: function (data) {
                    data = _this.fixNumberPrecision(data);
                    //存储加载好的数据
                    $('.provider-base-radio-table').data('providerBaseRadio', data);
                    _this.loadProviderBaseRadio(data);
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
                n.radio = parseFloat(n.radio).toFixed(precision);
            });
            return data;
        },
        loadProviderBaseRadio: function (data) {
            var _this = this;
            var handlebarsRender = new HandlebarsRender();
            var hbs = templates["src/templates/table-provider-base-radio.hbs"];
            var target = $('table.provider-base-radio-table > tbody');
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
    var providerBaseRadio = new ProviderBaseRadio();
    providerBaseRadio.init();
})(jQuery);