package biz.llmall.common.entity.user;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserGroup implements Serializable {
    private User user;
    private Group group;
}
