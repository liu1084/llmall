;(function (templates, undefined) {
  templates["src/templates/alert.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "	<div class=\"alert alert-warning alert-dismissible\" role=\"alert\">\n" +
    "		<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "		<div class=\"alert-message\">{{this}}</div>\n" +
    "	</div>\n" +
    "</script>\n" +
    "";
  templates["src/templates/base-discount-new.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <!-- Modal -->\n" +
    "    <div class=\"modal fade\" id=\"base-discount-new\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n" +
    "        <div class=\"modal-dialog\" role=\"document\">\n" +
    "            <div class=\"modal-content\">\n" +
    "                <div class=\"modal-header\">\n" +
    "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "                    <h4 class=\"modal-title\" id=\"myModalLabel\">新增折扣</h4>\n" +
    "                </div>\n" +
    "                <div class=\"modal-body\">\n" +
    "                    <form class=\"form-horizontal\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"business-type\" class=\"col-sm-4 control-label\">业务来源</label>\n" +
    "                            <div class=\"col-sm-7 business-type-select\">\n" +
    "                                <select class=\"form-control business-type\" id=\"business-type\">\n" +
    "                                    <option>请选择业务来源...</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"discount\" class=\"col-sm-4 control-label\">折扣率</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"discount\" placeholder=\"0.00\" value=\"{{#if discount}}{{discount}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                </div>\n" +
    "                <div class=\"modal-footer\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary save-base-discount\">增加</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>";
  templates["src/templates/basic-price-new.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <!-- Modal -->\n" +
    "    <div class=\"modal fade\" id=\"basic-price-new\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n" +
    "        <div class=\"modal-dialog\" role=\"document\">\n" +
    "            <div class=\"modal-content\">\n" +
    "                <div class=\"modal-header\">\n" +
    "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "                    <h4 class=\"modal-title\" id=\"myModalLabel\">新增基础价格</h4>\n" +
    "                </div>\n" +
    "                <div class=\"modal-body\">\n" +
    "                    <form class=\"form-horizontal\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"warehouseCode\" class=\"col-sm-4 control-label\">仓库编码</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"warehouseCode\" placeholder=\"仓库编码\" value=\"{{#if warehouseCode}}{{warehouseCode}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"warehouseName\" class=\"col-sm-4 control-label\">仓库名称</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"warehouseName\" placeholder=\"仓库名称\" value=\"{{#if warehouseName}}{{warehouseName}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"billType\" class=\"col-sm-4 control-label\">收费类别</label>\n" +
    "                            <div class=\"col-sm-7 bill-type bill-type-select\">\n" +
    "                                <select class=\"form-control bill-type\">\n" +
    "                                    <option></option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"billItem\" class=\"col-sm-4 control-label\">收费项目</label>\n" +
    "                            <div class=\"col-sm-7 bill-item-select\">\n" +
    "                                <select class=\"form-control bill-item\">\n" +
    "                                    <option>请选择收费项目...</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"billUnit\" class=\"col-sm-4 control-label\">计费单位</label>\n" +
    "                            <div class=\"col-sm-7 bill-unit bill-unit-select\">\n" +
    "                                <select class=\"form-control bill-unit\">\n" +
    "                                    <option>请选择计费单位...</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"price\" class=\"col-sm-4 control-label\">单价（元）</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"price\" placeholder=\"0.00\" value=\"{{#if price}}{{price}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"minPrice\" class=\"col-sm-4 control-label\">保底价（元）</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"minPrice\" placeholder=\"0.00\" value=\"{{#if minPrice}}{{minPrice}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"subPrice\" class=\"col-sm-4 control-label\">分包商单价（元）</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"subPrice\" placeholder=\"0.00\" value=\"{{#if subPrice}}{{subPrice}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"subMinPrice\" class=\"col-sm-4 control-label\">分包商保底价（元）</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"subMinPrice\" placeholder=\"0.00\" value=\"{{#if subMinPrice}}{{subMinPrice}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"bill-period\" class=\"col-sm-4 control-label\">合并周期</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <select class=\"form-control bill-period-select\">\n" +
    "                                    <option>请选择合并周期...</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"end-datetime\" class=\"col-sm-4 control-label\">合并纬度</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <select class=\"form-control bill-lat-select\">\n" +
    "                                    <option>请选择合并纬度...</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                </div>\n" +
    "                <div class=\"modal-footer\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary save-base-price\">增加</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>";
  templates["src/templates/bill-item.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <select class=\"form-control bill-item\">\n" +
    "        {{#each billItems}}\n" +
    "            <option value=\"{{code}}\" {{selected this.code ../selectedBillItem}}>{{message}}</option>\n" +
    "        {{/each}}\n" +
    "    </select>\n" +
    "</script>";
  templates["src/templates/bill-lat.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <select class=\"form-control bill-lat\">\n" +
    "        {{#each billLats}}\n" +
    "            <option value=\"{{code}}\" {{selected this.code ../selectedBillLat}}>{{message}}</option>\n" +
    "        {{/each}}\n" +
    "    </select>\n" +
    "</script>";
  templates["src/templates/bill-period.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <select class=\"form-control bill-period\">\n" +
    "        {{#each billPeriods}}\n" +
    "            <option value=\"{{code}}\" {{selected this.code ../selectedBillPeriod}}>{{message}}</option>\n" +
    "        {{/each}}\n" +
    "    </select>\n" +
    "</script>";
  templates["src/templates/bill-source.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <select class=\"form-control bill-source\">\n" +
    "        {{#each this}}\n" +
    "            <option value=\"{{code}}\">{{message}}</option>\n" +
    "        {{/each}}\n" +
    "    </select>\n" +
    "</script>";
  templates["src/templates/bill-type.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <select class=\"form-control bill-type\">\n" +
    "        {{#each billTypes}}\n" +
    "            <option value=\"{{code}}\" {{selected this.code ../selectedBillType}}>{{message}}</option>\n" +
    "        {{/each}}\n" +
    "    </select>\n" +
    "</script>";
  templates["src/templates/bill-unit.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <select class=\"form-control bill-unit\">\n" +
    "        {{#each billUnits}}\n" +
    "            <option value=\"{{code}}\" {{selected this.code ../selectedBillUnit}}>{{message}}</option>\n" +
    "        {{/each}}\n" +
    "    </select>\n" +
    "</script>";
  templates["src/templates/business-discount-new.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <!-- Modal -->\n" +
    "    <div class=\"modal fade\" id=\"business-discount-new\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n" +
    "        <div class=\"modal-dialog\" role=\"document\">\n" +
    "            <div class=\"modal-content\">\n" +
    "                <div class=\"modal-header\">\n" +
    "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "                    <h4 class=\"modal-title\" id=\"myModalLabel\">新增特殊折扣</h4>\n" +
    "                </div>\n" +
    "                <div class=\"modal-body\">\n" +
    "                    <form class=\"form-horizontal\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"business-type\" class=\"col-sm-4 control-label\">业务来源</label>\n" +
    "                            <div class=\"col-sm-7 business-type-select\">\n" +
    "                                <select class=\"form-control business-type\" id=\"business-type\">\n" +
    "                                    <option>请选择业务来源...</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"discount\" class=\"col-sm-4 control-label\">折扣率</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"discount\" placeholder=\"0.00\" value=\"{{#if discount}}{{discount}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"partner-code\" class=\"col-sm-4 control-label\">合作伙伴编码</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"partner-code\" placeholder=\"合作伙伴编码\" value=\"{{#if partnerCode}}{{partnerCode}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"partner-name\" class=\"col-sm-4 control-label\">合作伙伴名称</label>\n" +
    "                            <div class=\"col-sm-7\">\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"partner-name\" placeholder=\"合作伙伴名称\" value=\"{{#if partnerName}}{{partnerName}}{{/if}}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                </div>\n" +
    "                <div class=\"modal-footer\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary save-business-discount\">增加</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>";
  templates["src/templates/business-type.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <select class=\"form-control business-type\">\n" +
    "        {{#each businessTypes}}\n" +
    "            <option value=\"{{code}}\" {{selected this.code ../selectedBusinessType}}>{{message}}</option>\n" +
    "        {{/each}}\n" +
    "    </select>\n" +
    "</script>";
  templates["src/templates/daily-report.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "  {{#each this}}\n" +
    "    <tr>\n" +
    "        <td>{{ownerName}}</td>\n" +
    "        <td>{{warehouseName}}</td>\n" +
    "        <td>{{billTime}}</td>\n" +
    "        <td>{{billType}}</td>\n" +
    "        <td>{{billItem}}</td>\n" +
    "        <td>{{orderCode}}</td>\n" +
    "        <td>{{unit}}</td>\n" +
    "        <td>{{unitNum}}</td>\n" +
    "        <td>{{price}}</td>\n" +
    "        <td>{{payment}}</td>\n" +
    "    </tr>\n" +
    "    {{/each}}\n" +
    "</script>";
  templates["src/templates/loading.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <tr class=\"loading-image\">\n" +
    "        <td colspan=\"10\"><img src=\"../../src/assets/img/ajax-loader.gif\"/>数据加载中...</td>\n" +
    "    </tr>\n" +
    "</script>";
  templates["src/templates/monthly-report.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "  {{#each this}}\n" +
    "    <tr>\n" +
    "        <td>{{ownerName}}</td>\n" +
    "        <td>{{warehouseName}}</td>\n" +
    "        <td>{{startDatetime}}至{{endDatetime}}</td>\n" +
    "        <td>{{entryFee}}</td>\n" +
    "        <td>{{outFee}}</td>\n" +
    "        <td>{{keepFee}}</td>\n" +
    "        <td>{{serviceFee}}</td>\n" +
    "        <td class=\"bg-success\">{{totalFee}}</td>\n" +
    "		<td><button class=\"btn btn-primary\">下载</button></td>\n" +
    "    </tr>\n" +
    "    {{/each}}\n" +
    "</script>";
  templates["src/templates/provider-base-radio-new.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    <!-- Modal -->\n" +
    "    <div class=\"modal fade\" id=\"provider-base-radio-new\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n" +
    "        <div class=\"modal-dialog\" role=\"document\">\n" +
    "            <div class=\"modal-content\">\n" +
    "                <div class=\"modal-header\">\n" +
    "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "                    <h4 class=\"modal-title\" id=\"myModalLabel\">新增代理商抽成比例</h4>\n" +
    "                </div>\n" +
    "                <div class=\"modal-body\">\n" +
    "                    <form class=\"form-horizontal\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"provider-code\" class=\"col-sm-3 control-label\">代理商编码</label>\n" +
    "                            <div>\n" +
    "                                <span class=\"col-sm-4\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" id=\"provider-code\" placeholder=\"代理商编码\" value=\"{{#if providerCode}}{{providerCode}}{{/if}}\" />\n" +
    "                                </span>\n" +
    "                                <span class=\"col-sm-5\">(英文字母、下划线和数字)</span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"provider-name\" class=\"col-sm-3 control-label\">代理商名称</label>\n" +
    "                            <div>\n" +
    "                                <span class=\"col-sm-4\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" id=\"provider-name\" placeholder=\"代理商名称\" value=\"{{#if providerName}}{{providerName}}{{/if}}\" />\n" +
    "                                </span>\n" +
    "                                <span class=\"col-sm-5\">(中、英文、下划线和数字)</span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"radio\" class=\"col-sm-3 control-label\">抽成比例</label>\n" +
    "                            <div>\n" +
    "                                <span class=\"col-sm-4\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" id=\"radio\" placeholder=\"0.0000\" value=\"{{#if radio}}{{radio}}{{/if}}\" />\n" +
    "                                </span>\n" +
    "                                <span class=\"col-sm-5\">(大于0，小于等于1)</span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                </div>\n" +
    "                <div class=\"modal-footer\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary save-provider-base-radio\">增加</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>";
  templates["src/templates/table-base-discount.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    {{#each this}}\n" +
    "        <tr class=\"price base-discount\">\n" +
    "            <td><input type=\"checkbox\" class=\"base-discount-select\" value=\"{{id}}\"/></td>\n" +
    "            <td>{{businessType}}</td>\n" +
    "            <td>{{discount}}</td>\n" +
    "            <td><input type=\"button\" value=\"修改\" class=\"btn-default base-discount-update\" data-update-id=\"{{id}}\" /></td>\n" +
    "        </tr>\n" +
    "    {{/each}}\n" +
    "</script>";
  templates["src/templates/table-basic-price.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    {{#each this}}\n" +
    "        <tr class=\"price basic\">\n" +
    "            <td><input type=\"checkbox\" class=\"basic-price-select\" value=\"{{id}}\"/></td>\n" +
    "            <td>{{warehouseCode}}</td>\n" +
    "            <td>{{warehouseName}}</td>\n" +
    "            <td>{{billType}}</td>\n" +
    "            <td>{{billItem}}</td>\n" +
    "            <td>{{unit}}</td>\n" +
    "            <td>{{{price}}}</td>\n" +
    "            <td>{{{minPrice}}}</td>\n" +
    "            <td>{{{subPrice}}}</td>\n" +
    "            <td>{{{subMinPrice}}}</td>\n" +
    "            <td>{{period}}</td>\n" +
    "            <td>{{lat}}</td>\n" +
    "            <td><input type=\"button\" value=\"修改\" class=\"btn-default price-basic-update\" data-update-id=\"{{id}}\" /></td>\n" +
    "        </tr>\n" +
    "    {{/each}}\n" +
    "</script>";
  templates["src/templates/table-business-discount.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    {{#each this}}\n" +
    "        <tr class=\"price business-discount\">\n" +
    "            <td><input type=\"checkbox\" class=\"business-discount-select\" value=\"{{id}}\"/></td>\n" +
    "            <td>{{businessType}}</td>\n" +
    "            <td>{{discount}}</td>\n" +
    "            <td>{{partnerCode}}</td>\n" +
    "            <td>{{partnerName}}</td>\n" +
    "            <td><input type=\"button\" value=\"修改\" class=\"btn-default business-discount-update\" data-update-id=\"{{id}}\" /></td>\n" +
    "        </tr>\n" +
    "    {{/each}}\n" +
    "</script>";
  templates["src/templates/table-provider-base-radio.hbs"] = "<script class=\"handlebars\" type=\"text/x-handlebars-template\">\n" +
    "    {{#each this}}\n" +
    "        <tr class=\"provider provider-radio\">\n" +
    "            <td><input type=\"checkbox\" class=\"provider-radio-select\" value=\"{{id}}\"/></td>\n" +
    "            <td>{{providerCode}}</td>\n" +
    "            <td>{{providerName}}</td>\n" +
    "            <td>{{radio}}</td>\n" +
    "            <td><input type=\"button\" value=\"修改\" class=\"btn-default provider-radio-update\" data-update-id=\"{{id}}\" /></td>\n" +
    "        </tr>\n" +
    "    {{/each}}\n" +
    "</script>";
  templates["src/templates/toast.hbs"] = "<script class=\"toast-template\" type=\"text/x-handlebars-template\">\n" +
    "    <div class=\"toast inactive {{type}}\">\n" +
    "        <div class=\"logo\">\n" +
    "            <span class=\"{{logo}}\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"message\">{{message}}</div>\n" +
    "    </div>\n" +
    "</script>";
})(this.templates = this.templates || {});