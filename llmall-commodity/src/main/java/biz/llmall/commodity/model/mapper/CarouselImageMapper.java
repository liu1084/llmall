package biz.llmall.commodity.model.mapper;

import biz.llmall.common.entity.carousel.CarouselImage;

public interface CarouselImageMapper {
    int deleteByPrimaryKey(Long id);

    int insert(CarouselImage record);

    int insertSelective(CarouselImage record);

    CarouselImage selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(CarouselImage record);

    int updateByPrimaryKey(CarouselImage record);
}