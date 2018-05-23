package biz.llmall.commodity.controller;
import biz.llmall.commodity.model.service.ICarouselService;
import biz.llmall.common.dto.response.APIResponse;
import biz.llmall.common.dto.response.EnumStatus;
import biz.llmall.common.entity.carousel.Carousel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/carousel")
public class CarouselController {
    @Autowired
    private ICarouselService carouselService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public APIResponse<List<Carousel>> findCarousels() {
        try {
            List<Carousel> carousels = carouselService.findCarousels(new Date());
            return APIResponse.success(carousels);
        } catch (Exception ex) {
            return APIResponse.error(EnumStatus.SERVICE_ERROR, ex.getMessage());
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public APIResponse<Carousel> getCarouselById(@PathVariable("id") Long id) {
        try {
            Carousel carousel = carouselService.findCarouselById(id);
            return APIResponse.success(carousel);
        } catch (Exception ex) {
            return APIResponse.error(EnumStatus.SERVICE_ERROR, ex.getMessage());
        }
    }
}
