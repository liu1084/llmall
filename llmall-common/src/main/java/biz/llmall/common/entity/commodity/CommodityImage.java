package biz.llmall.common.entity.commodity;
import biz.llmall.common.entity.image.Image;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class CommodityImage extends Image implements Serializable {
    private Long id;
    private Long commodityId;
    private Date createTime;
    private Date updateTime;
}