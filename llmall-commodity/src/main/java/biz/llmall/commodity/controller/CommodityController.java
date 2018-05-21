package biz.llmall.commodity.controller;
import biz.llmall.commodity.model.service.ICommodityService;
import biz.llmall.common.entity.commodity.Commodity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/commodity")
public class CommodityController {
    @Autowired private ICommodityService commodityService;
    private static final int TOP_MAX = 15;
    @RequestMapping(value = "")
    public List<Commodity> findCommoditiesTopX(){
        return commodityService.findCommoditiesTopX(TOP_MAX);
    }
}
