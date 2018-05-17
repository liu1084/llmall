package biz.llmall.common.entity.image;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class Image implements Serializable {
    private Long id;
    private String name;
    private Double width;
    private Double height;
    private String format;
    private String url;
    private Date createTime;
    private Date updateTime;
}
