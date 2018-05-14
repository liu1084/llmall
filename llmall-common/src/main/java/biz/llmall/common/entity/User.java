package biz.llmall.common.entity;
import lombok.Data;

import java.util.Date;

@Data
public class User {
    private Long id;
    private Long groupId;
    private String nickname;
    private String email;
    private String mobile;
    private String password;
    private String salt;
    private Boolean enable;
    private Date createTime;
    private Date updateTime;
}