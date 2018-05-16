package biz.llmall.common.entity.commodity;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Data
public class Commodity implements Serializable {
    private Long id;
    private Long brandId;
    private String CommodityName;
    private BigDecimal price;
    private Long categoryId;
    private Date createTime;
    private Date updateTime;
    private String description;
    private Set<CommodityImage> commodityImages;
}