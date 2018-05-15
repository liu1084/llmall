package biz.llmall.commodity.model.service;

import biz.llmall.common.dto.image.CarouselDTO;

import java.util.List;

public interface ICarouselService {
    List<CarouselDTO> getCarousels();

}
