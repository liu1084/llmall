package biz.llmall.common.entity.carousel;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class Carousel implements Serializable {
    private Long id;
    private Date startTime;
    private Date endTime;
    private Boolean roundAtLast;
    private Boolean auto;
    private Integer order;
    private Date createTime;
    private Date updateTime;
    private List<CarouselImage> carouselImages;
}