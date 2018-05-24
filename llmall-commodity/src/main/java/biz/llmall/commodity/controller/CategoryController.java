package biz.llmall.commodity.controller;
import biz.llmall.commodity.model.service.ICategoryService;
import biz.llmall.common.dto.response.APIResponse;
import biz.llmall.common.dto.response.EnumStatus;
import biz.llmall.common.entity.commodity.Category;
import biz.llmall.common.entity.commodity.CategoryLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/category")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public APIResponse<Map<String, List<CategoryLevel>>> getCategories() {
        try {
           Map<String, List<CategoryLevel>> categories = categoryService.getCategories();

            return APIResponse.success(categories);
        } catch (Exception ex) {
            ex.printStackTrace();
            return APIResponse.error(EnumStatus.SERVICE_ERROR, ex.getMessage());
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public APIResponse<Category> getCategoryById(@PathVariable("id") Long id) {
        try {
            Category category = categoryService.findCategoryById(id);
            return APIResponse.success(category);
        } catch (Exception ex) {
            return APIResponse.error(EnumStatus.SERVICE_ERROR, ex.getMessage());
        }
    }
}
