package biz.llmall.common.entity.pagination;
import com.github.pagehelper.Page;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class CommonPage<T> extends Pagination implements Serializable {
    private List list = new ArrayList<>();

    public CommonPage() {
        super();
    }

    public CommonPage(Page page) {
        super();
        this.list = page.getResult();
        super.setCurrent(page.getPageNum());
        super.setPageSize(page.getPageSize());
        super.setTotal(page.getTotal());
    }

    public CommonPage(List<T> list, Page page) {
        super();
        this.list = list;
        super.setCurrent(page.getPageNum());
        super.setPageSize(page.getPageSize());
        super.setTotal(page.getTotal());
    }

    public CommonPage(List<T> list, Integer current, Integer pageSize, Long total) {
        super();
        this.list = list;
        super.setCurrent(current);
        super.setPageSize(pageSize);
        super.setTotal(total);
    }
}
