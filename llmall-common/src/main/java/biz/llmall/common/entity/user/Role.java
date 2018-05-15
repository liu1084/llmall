package biz.llmall.common.entity.user;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class Role {
    private Long id;
    private String name;
    private Date createTime;
    private Date updateTime;
    private Set<User> users;
    private Set<Group> groups;
}