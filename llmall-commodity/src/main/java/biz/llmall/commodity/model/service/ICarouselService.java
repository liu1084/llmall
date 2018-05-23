package biz.llmall.commodity.model.service;
import biz.llmall.common.entity.carousel.Carousel;
import org.joda.time.DateTime;

import java.util.Date;
import java.util.List;

public interface ICarouselService {
    List<Carousel> findCarousels(Date currentDatetime);
    Carousel findCarouselById(Long id);
}
