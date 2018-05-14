package biz.llmall.common.entity;
import lombok.Data;

import java.util.Set;

@Data
public class Category {
    private Long id;
    private String name;
    private Long parentId;
    private Set<Commodity> commodities;
}
