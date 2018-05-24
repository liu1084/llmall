package biz.llmall.common.entity.commodity;
import lombok.Data;

import java.io.Serializable;

@Data
public class CategoryLevel implements Serializable {
    private Long id0;
    private String name0;
    private Long id1;
    private String name1;
    private Long parentId1;
}
