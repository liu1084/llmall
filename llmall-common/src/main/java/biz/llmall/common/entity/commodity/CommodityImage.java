package biz.llmall.common.entity.commodity;
import biz.llmall.common.entity.image.Image;
import lombok.Data;

import java.io.Serializable;

@Data
public class CommodityImage extends Image implements Serializable {
    private Long commodityId;
}