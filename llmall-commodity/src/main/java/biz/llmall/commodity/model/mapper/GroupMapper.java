package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.user.Group;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface GroupMapper {
    int deleteByPrimaryKey(Long id);
    int insert(Group record);
    int insertSelective(Group record);
    Group selectByPrimaryKey(Long id);
    int updateByPrimaryKeySelective(Group record);
    int updateByPrimaryKey(Group record);
    List<Group> findGroups();
}