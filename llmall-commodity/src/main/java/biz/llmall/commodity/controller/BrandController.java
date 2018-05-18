package biz.llmall.commodity.controller;
import biz.llmall.commodity.model.service.IBrandService;
import biz.llmall.common.dto.response.APIResponse;
import biz.llmall.common.dto.response.EnumStatus;
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
    public APIResponse<List<Brand>> getBrands() {
        try {
            List<Brand> brands = brandService.findBrands();
            return APIResponse.success(brands);
        } catch (Exception ex) {
            return APIResponse.error(EnumStatus.SERVICE_ERROR, ex.getMessage());
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public APIResponse<Brand> getBrandById(@PathVariable("id") Long id) {
        try {
            Brand brands = brandService.findBrandById(id);
            return APIResponse.success(brands);
        } catch (Exception ex) {
            return APIResponse.error(EnumStatus.SERVICE_ERROR, ex.getMessage());
        }
    }
}
