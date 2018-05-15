package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.user.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserMapper {
    int deleteByPrimaryKey(Long id);
    int insert(User record);
    int insertSelective(User record);
    User selectByPrimaryKey(Long id);
    int updateByPrimaryKeySelective(User record);
    int updateByPrimaryKey(User record);
    List<User> findUsers();
}