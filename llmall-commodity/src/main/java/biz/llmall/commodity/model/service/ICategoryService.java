package biz.llmall.commodity.model.service;
import biz.llmall.common.entity.commodity.Category;
import biz.llmall.common.entity.commodity.CategoryLevel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface ICategoryService {
    Map<String, List<CategoryLevel>> getCategories();
    Category findCategoryById(Long id);
}
