package biz.llmall.commodity.model.service;
import biz.llmall.common.entity.carousel.CarouselImage;
import biz.llmall.common.entity.commodity.CommodityImage;

import java.io.File;
import java.util.List;

public interface IGenerateRandomImageService {
    List<CommodityImage> getCommodityImages();
    List<CarouselImage> getCarouseImages();
    void generateImage();
}
