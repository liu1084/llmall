package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.Category;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CategoryMapper {
    int deleteByPrimaryKey(Long id);
    int insert(Category record);
    int insertSelective(Category record);
    Category selectByPrimaryKey(Long id);
    int updateByPrimaryKeySelective(Category record);
    int updateByPrimaryKey(Category record);
    List<Category> findCategories();
}