package biz.llmall.commodity.model.mapper;
import biz.llmall.common.entity.User;

public interface UserMapper {
    int deleteByPrimaryKey(Long id);
    int insert(User record);
    User selectByPrimaryKey(Long id);
    int updateByPrimaryKey(User record);
}