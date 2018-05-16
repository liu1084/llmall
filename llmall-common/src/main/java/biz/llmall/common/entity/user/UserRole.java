package biz.llmall.common.entity.user;
import lombok.Data;

@Data
public class UserRole {
    private User user;
    private Role role;
}
