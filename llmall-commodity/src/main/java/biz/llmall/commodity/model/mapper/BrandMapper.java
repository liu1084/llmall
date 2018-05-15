package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.commodity.Brand;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BrandMapper {
    int deleteByPrimaryKey(Long id);
    int insert(Brand record);
    Brand selectByPrimaryKey(Long id);
    int updateByPrimaryKey(Brand record);
    List<Brand> findBrands();
}