package biz.llmall.common.dto.commodity;
import biz.llmall.common.entity.commodity.Category;
import lombok.Data;

/**
 * t1.id as id0, t1.name as name0, t2.id as id1, t2.name as name1, t2.parent_id as parentId1
 */
@Data
public class CategoryDTO  {
    private String id0;
    private String name0;
    private String id1;
    private String name1;
    private String parentId1;
}
