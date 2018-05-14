package biz.llmall.common.entity;
import lombok.Data;

import java.util.Date;

@Data
public class CommodityImage {
    private Long id;
    private Long commodityId;
    private String url;
    private Date createTime;
    private Date updateTime;
}