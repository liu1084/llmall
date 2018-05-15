package biz.llmall.commodity.model.service;
import org.aspectj.lang.JoinPoint;

public interface IWebLogAspect {
    void beforeRequest(JoinPoint joinPoint);
    void afterReturning(Object ret);
    void afterException(Exception ex);
}
