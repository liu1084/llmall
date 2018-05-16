package biz.llmall.commodity.model.service.impl;
import biz.llmall.commodity.model.service.IWebLogAspect;
import com.google.gson.Gson;
import com.inamik.text.tables.GridTable;
import com.inamik.text.tables.SimpleTable;
import com.inamik.text.tables.grid.Border;
import com.inamik.text.tables.grid.Util;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

import static com.inamik.text.tables.Cell.Functions.LEFT_ALIGN;
import static com.inamik.text.tables.Cell.Functions.VERTICAL_CENTER;

@Aspect
@Component
@Slf4j
public class WebLogAspect implements IWebLogAspect {
    private ThreadLocal<Long> startTimestamp = new ThreadLocal<>();
    private ThreadLocal<SimpleTable> simpleTableThreadLocal = new ThreadLocal<>();

    @Pointcut("execution(* biz.llmall.commodity.controller..*.*(..))")
    private void webLog() {
    }

    @Override
    @Before("webLog()")
    public void beforeRequest(JoinPoint joinPoint) {
        startTimestamp.set(System.currentTimeMillis());
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        int height = 5;
        int width = 10;
        SimpleTable simpleTable = SimpleTable.of()
                .nextRow()
                .nextCell().addLine("Request URL")
                .nextCell().addLine("HTTP Method")
                .nextCell().addLine("Remote IP")
                .nextCell().addLine("Class Name")
                .nextCell().addLine("Method Name")
                .nextCell().addLine("Method Args")
                .applyToCell(VERTICAL_CENTER.withHeight(height))
                .applyToCell(LEFT_ALIGN.withWidth(width))
                .nextRow()
                .nextCell().addLine(request.getRequestURL().toString())
                .nextCell().addLine(request.getMethod())
                .nextCell().addLine(request.getRemoteHost())
                .nextCell().addLine(joinPoint.getSignature().getDeclaringTypeName())
                .nextCell().addLine(joinPoint.getSignature().getName())
                .nextCell().addLine(Arrays.toString(joinPoint.getArgs()))
                .applyToCell(VERTICAL_CENTER.withHeight(height))
                .applyToCell(LEFT_ALIGN.withWidth(width));
        simpleTableThreadLocal.set(simpleTable);
    }

    @Override
    @AfterReturning(returning = "ret", pointcut = "webLog()")
    public void afterReturning(Object ret) {
        SimpleTable simpleTable = simpleTableThreadLocal.get();
        GridTable gridTable = simpleTable.toGrid();
        gridTable = Border.of(Border.Chars.of('+', '-', '|')).apply(gridTable);
        Util.print(gridTable);
        log.debug("Response: " + new Gson().toJson(ret));
        log.debug("Elapsed Time: " + (System.currentTimeMillis() - startTimestamp.get()));
    }

    @Override
    @AfterThrowing(pointcut = "webLog()", throwing = "ex")
    public void afterException(Exception ex) {
        log.debug(new Gson().toJson(ex));
    }
}
