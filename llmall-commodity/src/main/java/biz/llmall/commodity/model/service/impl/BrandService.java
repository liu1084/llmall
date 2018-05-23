package biz.llmall.commodity.model.service.impl;
import biz.llmall.commodity.model.mapper.BrandMapper;
import biz.llmall.commodity.model.service.IBrandService;
import biz.llmall.common.entity.commodity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService implements IBrandService {
    @Autowired
    private BrandMapper brandMapper;

    @Override
    @Cacheable("findBrands")
    public List<Brand> findBrands() {
        return brandMapper.findBrands();
    }

    @Override
    @Cacheable("findBrandById")
    public Brand findBrandById(Long id) {
        return brandMapper.selectBrandByPrimaryKey(id);
    }
}
