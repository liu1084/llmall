package biz.llmall.common.entity.commodity;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class Brand {
    private Long id;
    private String name;
    private String shortName;
    private String logoBig;
    private String logoMiddle;
    private String logoSmall;
    private String description;
    private Date createTime;
    private Date updateTime;
    private Set<Commodity> commodities;
}