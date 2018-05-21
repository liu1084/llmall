package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.commodity.Commodity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Mapper
@Repository
public interface CommodityMapper {
    int deleteByPrimaryKey(Long id);
    int insert(Commodity record);
    Commodity selectByPrimaryKey(Long id);
    int updateByPrimaryKeyWithBLOBs(Commodity record);
    int updateByPrimaryKey(Commodity record);
    List<Commodity> getCommoditiesByBrandId(Long brandId);
    List<Commodity> findCommodities();
    List<Commodity> findCommoditiesTopX(@Param("max") int max);
}