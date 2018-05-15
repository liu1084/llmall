package biz.llmall.common.entity.user;
import biz.llmall.common.entity.user.Role;
import biz.llmall.common.entity.user.User;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class Group {
    private Long id;
    private String name;
    private String role;
    private Date createTime;
    private Date updateTime;
    private Set<User> users;
    private Set<Role> roles;
}