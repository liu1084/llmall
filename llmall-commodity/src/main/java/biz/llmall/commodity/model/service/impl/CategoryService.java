package biz.llmall.commodity.model.service.impl;
import biz.llmall.commodity.model.mapper.CategoryMapper;
import biz.llmall.commodity.model.service.ICategoryService;
import biz.llmall.common.entity.commodity.Category;
import biz.llmall.common.entity.commodity.CategoryLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    @Cacheable("getCategories")
    public Map<String, List<CategoryLevel>> getCategories() {
        List<CategoryLevel> categories = categoryMapper.findCategories();
        Map<String, List<CategoryLevel>> map = new ConcurrentHashMap<>();
        categories.stream().forEach(categoryLevel -> {
            List<CategoryLevel> cl = categories.stream().filter(category -> category.getParentId1().equals(categoryLevel.getId0())).collect(Collectors.toList());
            map.put(categoryLevel.getName0(), cl);
        });
        return map;
    }

    @Override
    @Cacheable("findCategoryById")
    public Category findCategoryById(Long id) {
        return categoryMapper.selectCategoryByPrimaryKey(id);
    }
}
