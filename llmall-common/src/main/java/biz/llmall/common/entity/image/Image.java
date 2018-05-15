package biz.llmall.common.entity.image;
import lombok.Data;

@Data
public class Image {
    private double width;
    private double height;
    private String mimeType;
    private String url;
}
