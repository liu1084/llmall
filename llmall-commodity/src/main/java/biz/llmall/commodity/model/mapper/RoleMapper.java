package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.Role;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface RoleMapper {
    int deleteByPrimaryKey(Long id);
    int insert(Role record);
    int insertSelective(Role record);
    Role selectByPrimaryKey(Long id);
    int updateByPrimaryKeySelective(Role record);
    int updateByPrimaryKey(Role record);
    List<Role> findRoles();
}