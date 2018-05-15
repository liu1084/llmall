package biz.llmall.common.dto.exception;
import biz.llmall.common.IException;
import biz.llmall.common.IStatus;
import com.google.gson.Gson;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.Errors;

public class CommonException extends RuntimeException implements IException {
    private Integer code;
    private String message;
    @Setter(AccessLevel.PRIVATE)
    @Getter(AccessLevel.PRIVATE)
    private Gson gson;

    @Override
    public Integer getCode() {
        return this.code;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    public CommonException(IStatus status) {
        this.code = status.getCode();
        this.message = status.getMessage();
    }

    public CommonException(IStatus status, String message) {
        this.code = status.getCode();
        this.message = status.getMessage() + "Cause by: " + message;
    }

    public CommonException(Integer code, String message) {
        this.message = message;
        this.code = code;
    }

    public CommonException(Integer code, Errors errors) {
        this.code = code;
        this.message = gson.toJson(errors.getAllErrors());
    }

    public CommonException(IStatus status, Errors errors) {
        this.code = status.getCode();
        this.message = gson.toJson(errors.getAllErrors());
    }
}
