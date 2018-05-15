package biz.llmall.commodity.model.service;
import biz.llmall.common.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ICategoryService {
    List<Category> getCategories();
    Category findCategoryById(Long id);
}
