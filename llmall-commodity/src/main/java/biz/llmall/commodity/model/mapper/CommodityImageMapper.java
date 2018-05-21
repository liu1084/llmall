package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.commodity.CommodityImage;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CommodityImageMapper {
    int deleteCommodityImageByPrimaryKey(Long id);
    int insertCommodityImage(CommodityImage record);
    CommodityImage selectCommodityImageByPrimaryKey(Long id);
    int updateCommodityImageByPrimaryKey(CommodityImage record);
    List<CommodityImage> findCommodityImages();
}