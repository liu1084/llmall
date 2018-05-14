package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.Brand;

public interface BrandMapper {
    int deleteByPrimaryKey(Long id);
    int insert(Brand record);
    Brand selectByPrimaryKey(Long id);
    int updateByPrimaryKey(Brand record);
}