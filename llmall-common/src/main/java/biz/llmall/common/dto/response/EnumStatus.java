package biz.llmall.common.dto.response;
import biz.llmall.common.IStatus;
import org.apache.commons.lang3.StringUtils;

public enum EnumStatus implements IStatus {
    SUCCESS(200, "请求处理成功"),
    UNAUTHORIZED(401, "用户认证失败"),
    FORBIDDEN(403, "权限不足"),
    SERVICE_ERROR(500, "服务器错误"),
    CAPTCHA_INVALID(405, "验证码校验失败");
    private Integer code;
    private String message;

    EnumStatus(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public static String getMessageByCode(String code) {
        for (EnumStatus item : EnumStatus.values()) {
            if (code.equals(item.code)) {
                return item.message;
            }
        }
        return null;
    }

    public static Integer getCodeByMessage(String message) {
        for (EnumStatus item : EnumStatus.values()) {
            if (StringUtils.equals(message, item.message)) {
                return item.code;
            }
        }
        return null;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
