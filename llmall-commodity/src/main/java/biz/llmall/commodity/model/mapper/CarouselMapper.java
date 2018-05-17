package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.carousel.Carousel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Mapper
@Repository
public interface CarouselMapper {
    int deleteCarouselByPrimaryKey(Long id);
    int insertCarousel(Carousel record);
    Carousel selectCarouselByPrimaryKey(Long id);
    int updateCarouselByPrimaryKey(Carousel record);
    List<Carousel> findCarousels(@Param("currentDatetime") Date currentDatetime);
}