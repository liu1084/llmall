package biz.llmall.commodity.controller;
import biz.llmall.commodity.model.service.IGenerateRandomImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/image")
public class ImageController {
    @Autowired
    private IGenerateRandomImageService generateRandomImageService;

    @RequestMapping
    public void generateRandom(){
        generateRandomImageService.generateImage();
    }
}
