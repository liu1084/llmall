package biz.llmall.commodity.model.service.impl;
import biz.llmall.commodity.model.mapper.CarouselMapper;
import biz.llmall.commodity.model.service.ICarouselService;
import biz.llmall.common.entity.carousel.Carousel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CarouselService implements ICarouselService {
    @Autowired
    private CarouselMapper carouselMapper;

    @Override
    public List<Carousel> findCarousels(Date currentDatetime) {
        return carouselMapper.findCarousels(currentDatetime);
    }
}
