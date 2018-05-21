package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.carousel.CarouselImage;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CarouselImageMapper {
    int deleteCarouselImageByPrimaryKey(Long id);
    int insertCarouselImage(CarouselImage record);
    CarouselImage selectCarouselImageByPrimaryKey(Long id);
    int updateCarouselImageByPrimaryKey(CarouselImage record);
    List<CarouselImage> findCarouseImages();
}