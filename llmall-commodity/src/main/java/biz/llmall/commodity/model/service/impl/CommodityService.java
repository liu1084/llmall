package biz.llmall.commodity.model.service.impl;
import biz.llmall.commodity.model.mapper.CommodityMapper;
import biz.llmall.commodity.model.service.ICommodityService;
import biz.llmall.common.entity.commodity.Commodity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommodityService implements ICommodityService {
    @Autowired
    private CommodityMapper commodityMapper;

    @Override
    @Cacheable("findCommoditiesTopX")
    public List<Commodity> findCommoditiesTopX(int max) {
        return commodityMapper.findCommoditiesTopX(max);
    }

    @Override
    @Cacheable("findCommodityByPrimaryId")
    public Commodity findCommodityByPrimaryId(Long id) {
        return commodityMapper.selectCommodityByPrimaryKey(id);
    }
}
