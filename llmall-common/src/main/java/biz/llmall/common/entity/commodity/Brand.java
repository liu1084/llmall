package biz.llmall.common.entity.commodity;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class Brand implements Serializable {
    private Long id;
    private String brandName;
    private String logoLg;
    private String logoMd;
    private String logoSm;
    private String description;
    private Date createTime;
    private Date updateTime;
    private List<Commodity> commodities;
}