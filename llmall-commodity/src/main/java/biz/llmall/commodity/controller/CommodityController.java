package biz.llmall.commodity.controller;
import biz.llmall.commodity.model.service.ICommodityService;
import biz.llmall.common.dto.response.APIResponse;
import biz.llmall.common.dto.response.EnumStatus;
import biz.llmall.common.entity.commodity.Commodity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping(value = "/api/commodity", method = RequestMethod.GET)
public class CommodityController {
    @Autowired
    private ICommodityService commodityService;
    private static final int TOP_MAX = 15;

    @RequestMapping(value = "")
    public APIResponse<List<Commodity>> findCommoditiesTopX() {
        try {
            List<Commodity> commodities = commodityService.findCommoditiesTopX(TOP_MAX);
            return APIResponse.success(commodities);
        } catch (Exception ex) {
            return APIResponse.error(EnumStatus.SERVICE_ERROR, ex.getMessage());
        }
    }

    @RequestMapping(value = "/{id}")
    public APIResponse<Commodity> findCommodityByPrimaryId(@PathVariable("id") String id) {
        try {
            Pattern pattern = Pattern.compile("\\d+");
            Matcher matcher = pattern.matcher(id);
            if (!matcher.matches()) {
                return APIResponse.error(EnumStatus.SERVICE_ERROR);
            }
            return APIResponse.success(commodityService.findCommodityByPrimaryId(Long.valueOf(id)));
        } catch (Exception ex) {
            return APIResponse.error(EnumStatus.SERVICE_ERROR, ex.getMessage());
        }
    }
}
