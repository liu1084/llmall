package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.commodity.Category;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CategoryMapper {
    int deleteCategoryByPrimaryKey(Long id);
    int insertCategory(Category record);
    Category selectCategoryByPrimaryKey(Long id);
    int updateCategoryByPrimaryKey(Category record);
    List<Category> findCategories();
}