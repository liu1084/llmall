package biz.llmall.commodity.controller;
import biz.llmall.commodity.model.service.IBrandService;
import biz.llmall.common.entity.commodity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/brand")
public class BrandController {
    @Autowired
    private IBrandService brandService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Brand> getBrands() {
        return brandService.findBrands();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Brand getBrandById(@PathVariable("id") Long id) {
        return brandService.findBrandById(id);
    }
}
