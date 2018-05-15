package biz.llmall.common.entity.commodity;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Data
public class Commodity {
    private Long id;
    private Long brandId;
    private String name;
    private BigDecimal price;
    private Long categoryId;
    private Long parentId;
    private Date createTime;
    private Date updateTime;
    private String description;
    private Set<CommodityImage> commodityImages;
}