package biz.llmall.common.entity.carousel;
import biz.llmall.common.entity.image.Image;
import lombok.Data;

import java.io.Serializable;

@Data
public class CarouselImage extends Image implements Serializable {
    private Long carouselId;
}