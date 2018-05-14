package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.CommodityImage;

public interface CommodityImageMapper {
    int deleteByPrimaryKey(Long id);
    int insert(CommodityImage record);
    CommodityImage selectByPrimaryKey(Long id);
    int updateByPrimaryKey(CommodityImage record);
}