package biz.llmall.commodity.model.service;
import biz.llmall.common.entity.commodity.Commodity;

import java.util.List;

public interface ICommodityService {
    List<Commodity> findCommoditiesTopX(int max);
    Commodity findCommodityByPrimaryId(Long id);
}
