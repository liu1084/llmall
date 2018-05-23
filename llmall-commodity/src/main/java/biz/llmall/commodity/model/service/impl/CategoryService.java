package biz.llmall.commodity.model.service.impl;
import biz.llmall.commodity.model.mapper.CategoryMapper;
import biz.llmall.commodity.model.service.ICategoryService;
import biz.llmall.common.entity.commodity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    @Autowired private CategoryMapper categoryMapper;

    @Override
    @Cacheable("getCategories")
    public List<Category> getCategories() {
        return categoryMapper.findCategories();
    }

    @Override
    @Cacheable("findCategoryById")
    public Category findCategoryById(Long id) {
        return categoryMapper.selectCategoryByPrimaryKey(id);
    }
}
