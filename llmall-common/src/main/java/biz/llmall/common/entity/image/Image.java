package biz.llmall.common.entity.image;
import lombok.Data;

import java.io.Serializable;

@Data
public class Image implements Serializable {
    private double width;
    private double height;
    private String mimeType;
    private String url;
}
