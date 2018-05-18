package biz.llmall.commodity.controller;
import biz.llmall.commodity.model.service.ICategoryService;
import biz.llmall.common.dto.response.APIResponse;
import biz.llmall.common.dto.response.EnumStatus;
import biz.llmall.common.entity.commodity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/category")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public APIResponse<List<Category>> getCategories() {
        try {
            List<Category> categories = categoryService.getCategories();
            return APIResponse.success(categories);
        } catch (Exception ex) {
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
