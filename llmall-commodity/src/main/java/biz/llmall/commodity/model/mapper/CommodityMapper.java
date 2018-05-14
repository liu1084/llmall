package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.Commodity;

import java.util.List;

public interface CommodityMapper {
    int deleteByPrimaryKey(Long id);
    int insert(Commodity record);
    Commodity selectByPrimaryKey(Long id);
    int updateByPrimaryKeyWithBLOBs(Commodity record);
    int updateByPrimaryKey(Commodity record);
    List<Commodity> getCommoditiesByBrandId(Long id);
}