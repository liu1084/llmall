package biz.llmall.common.entity.commodity;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class Category implements Serializable {
    private Long id;
    private String name;
    private Long parentId;
    private Date createTime;
    private Date updateTime;
    private List<Commodity> commodities;
}