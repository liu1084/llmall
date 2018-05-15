package biz.llmall.commodity.model.service.impl;
import biz.llmall.commodity.model.service.IWebLogAspect;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class WebLogAspect implements IWebLogAspect {

    private ThreadLocal<Long> startTimestamp = new ThreadLocal<>();

    @Pointcut("execution(* biz.llmall.commodity.controller..*.*(..))")
    private void webLog(){}


    @Override
    @Before("webLog()")
    public void beforeRequest(JoinPoint joinPoint) {
        startTimestamp.set(System.currentTimeMillis());

    }

    @Override
    public void afterReturning(Object ret) {
    }

    @Override
    public void afterException(Exception ex) {
    }
}
