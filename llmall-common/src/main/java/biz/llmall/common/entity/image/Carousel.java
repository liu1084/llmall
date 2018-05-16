package biz.llmall.common.entity.image;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class Carousel implements Serializable {
    private List<Image> images = new ArrayList<>();
    private Boolean roundAtLast = true;
    private int interval = 3;
    private Boolean auto = true;
}
