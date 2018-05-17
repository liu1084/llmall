package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.commodity.Brand;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BrandMapper {
    int deleteBrandByPrimaryKey(Long id);
    int insertBrand(Brand record);
    Brand selectBrandByPrimaryKey(Long id);
    int updateBrandByPrimaryKey(Brand record);
    List<Brand> findBrands();
}