package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.CommodityImage;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CommodityImageMapper {
    int deleteByPrimaryKey(Long id);
    int insert(CommodityImage record);
    CommodityImage selectByPrimaryKey(Long id);
    int updateByPrimaryKey(CommodityImage record);
    List<CommodityImage> findCommodityImages();
}