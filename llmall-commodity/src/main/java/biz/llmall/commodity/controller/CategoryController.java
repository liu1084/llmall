package biz.llmall.commodity.controller;
import biz.llmall.commodity.model.service.ICategoryService;
import biz.llmall.common.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/category")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Category getCategroyById(@PathVariable("id") Long id) {
        return categoryService.findCategoryById(id);
    }
}
