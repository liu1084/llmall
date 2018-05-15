package biz.llmall.common.entity;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class Category {
    private Long id;
    private String name;
    private Long parentId;
    private Date createTime;
    private Date updateTime;
    private Set<Commodity> commodities;
}