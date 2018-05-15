package biz.llmall.common.entity;
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