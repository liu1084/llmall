package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.commodity.Commodity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Mapper
@Repository
public interface CommodityMapper {
    int deleteCommodityByPrimaryKey(Long id);
    int insertCommodity(Commodity record);
    Commodity selectCommodityByPrimaryKey(Long id);
    int updateCommodityByPrimaryKeyWithBLOBs(Commodity record);
    int updateCommodityByPrimaryKey(Commodity record);
    List<Commodity> getCommoditiesByBrandId(Long brandId);
    List<Commodity> findCommodities();
    List<Commodity> findCommoditiesTopX(@Param("max") int max);
}