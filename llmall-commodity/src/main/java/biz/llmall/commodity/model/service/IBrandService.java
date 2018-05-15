package biz.llmall.commodity.model.service;
import biz.llmall.common.entity.commodity.Brand;

import java.util.List;

public interface IBrandService {
    List<Brand> findBrands();
    Brand findBrandById(Long id);
}
