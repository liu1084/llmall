package biz.llmall.commodity;

import com.spring4all.swagger.EnableSwagger2Doc;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"biz.llmall.commodity"})
@MapperScan(basePackages = {"biz.llmall.commodity.model.mapper"})
@EnableSwagger2Doc
public class CommodityApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommodityApplication.class, args);
	}
}
