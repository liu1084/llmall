package biz.llmall.common.dto.response;
import biz.llmall.common.IException;
import biz.llmall.common.IStatus;
import biz.llmall.common.entity.pagination.CommonPage;
import biz.llmall.common.entity.pagination.Pagination;
import com.google.gson.Gson;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

@Data
@ApiModel
@NoArgsConstructor
public class APIResponse<T> implements Serializable {
    @ApiModelProperty(name = "返回是否成功")
    private Boolean success;
    @ApiModelProperty(name = "返回失败后的错误码")
    private Integer errorCode;
    @ApiModelProperty(name = "返回失败后的错误信息")
    private String errorMsg;
    @ApiModelProperty(name = "返回成功后的分页对象")
    private Pagination pagination;
    @ApiModelProperty(name = "返回成功后的对象")
    private T result;

    public static APIResponse success() {
        APIResponse APIResponse = new APIResponse();
        APIResponse.setSuccess(Boolean.TRUE);
        return APIResponse;
    }

    public static <T> APIResponse<T> success(T result) {
        APIResponse<T> APIResponse = new APIResponse<>();
        APIResponse.setSuccess(Boolean.TRUE);
        APIResponse.setResult(result);
        return APIResponse;
    }

    public static <T> APIResponse<T> success(CommonPage page) {
        APIResponse APIResponse = new APIResponse<>();
        APIResponse.setSuccess(Boolean.TRUE);
        if (page != null) {
            APIResponse.setResult(page.getList());
            APIResponse.setPagination(new Pagination(page.getPageSize(), page.getCurrent(), page.getTotal(), page.getTotalPageNum()));
        }
        return APIResponse;
    }

    public static <T> APIResponse<T> success(T result, Pagination pagination) {
        APIResponse<T> APIResponse = new APIResponse<>();
        APIResponse.setSuccess(Boolean.TRUE);
        APIResponse.setResult(result);
        APIResponse.setPagination(pagination);
        return APIResponse;
    }

    public static <T> APIResponse<T> error(IStatus status) {
        APIResponse<T> APIResponse = new APIResponse<>();
        APIResponse.setSuccess(Boolean.FALSE);
        APIResponse.setErrorCode(status.getCode());
        APIResponse.setErrorMsg(status.getMessage());
        return APIResponse;
    }

    public static <T> APIResponse<T> error(IStatus status, String errorMsg) {
        APIResponse<T> APIResponse = new APIResponse<>();
        APIResponse.setSuccess(Boolean.FALSE);
        APIResponse.setErrorCode(status.getCode());
        APIResponse.setErrorMsg(errorMsg);
        return APIResponse;
    }

    public static <T> APIResponse<T> error(IException e) {
        APIResponse<T> APIResponse = new APIResponse<>();
        APIResponse.setSuccess(Boolean.FALSE);
        if (e != null) {
            APIResponse.setErrorCode(e.getCode());
            APIResponse.setErrorMsg(e.getMessage());
        }
        return APIResponse;
    }

    public static <T> APIResponse<T> error(IException e, String errorMsg) {
        APIResponse<T> APIResponse = new APIResponse<>();
        APIResponse.setSuccess(Boolean.FALSE);
        if (e != null) {
            APIResponse.setErrorCode(e.getCode());
        }
        if (!StringUtils.isBlank(errorMsg)) {
            APIResponse.setErrorMsg(errorMsg);
        }
        return APIResponse;
    }

    public static <T> APIResponse<T> valueOf(Boolean result) {
        APIResponse<T> APIResponse = new APIResponse<>();
        APIResponse.setSuccess(result);
        return APIResponse;
    }

    @Override
    public String toString() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
