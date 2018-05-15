package biz.llmall.commodity.model.service;
import biz.llmall.common.entity.Brand;

import java.util.List;

public interface IBrandService {
    List<Brand> findBrands();
    Brand findBrandById(Long id);
}
