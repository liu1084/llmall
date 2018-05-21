package biz.llmall.commodity.model.service.impl;
import biz.llmall.commodity.model.mapper.CarouselImageMapper;
import biz.llmall.commodity.model.mapper.CommodityImageMapper;
import biz.llmall.commodity.model.service.IGenerateRandomImageService;
import biz.llmall.common.entity.carousel.CarouselImage;
import biz.llmall.common.entity.commodity.CommodityImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Service
public class GenerateRandomImageService implements IGenerateRandomImageService {
    private final String BASE_URL = "https://picsum.photos";
    @Autowired
    private CarouselImageMapper carouselImageMapper;
    @Autowired
    private CommodityImageMapper commodityImageMapper;
    private String imageBasePath = "/data/static";

    @Override
    public List<CommodityImage> getCommodityImages() {
        return commodityImageMapper.findCommodityImages();
    }

    @Override
    public List<CarouselImage> getCarouseImages() {
        return carouselImageMapper.findCarouseImages();
    }

    @Override
    public void generateImage() {
        List<CommodityImage> commodityImages = getCommodityImages();
        List<CarouselImage> carouselImages = getCarouseImages();
        List<String> imageNames = new ArrayList<>();
        commodityImages.stream().forEach(ci -> {
            String url = ci.getUrl();
            String[] segments = url.split("/");
            String imageName = segments[segments.length - 1];
            imageNames.add(imageName);
        });
        double COMMODITY_WIDTH = 234.3;
        double COMMODITY_HEIGHT = 221.1;
        saveImage(imageNames, COMMODITY_WIDTH, COMMODITY_HEIGHT);
        imageNames.clear();
        carouselImages.stream().forEach(ci -> {
            String url = ci.getUrl();
            String[] segments = url.split("/");
            String imageName = segments[segments.length - 1];
            imageNames.add(imageName);
        });
        double CAROUSEL_WIDTH = 1152;
        double CAROUSEL_HEIGHT = 443;
        saveImage(imageNames, CAROUSEL_WIDTH, CAROUSEL_HEIGHT);
    }

    private void saveImage(List<String> imageNames, double width, double height){
        imageNames.stream().forEach(name -> {
            InputStream is = null;
            OutputStream os = null;
            try {
                URL url = new URL(BASE_URL
                        + File.separator + width
                        + File.separator + height
                        + File.separator + "?image=" + (new Random().nextInt(100) + 1));
                is = url.openStream();
                os = new FileOutputStream(imageBasePath + File.separator + name);
                byte[] b = new byte[2048];
                int length;
                while ((length = is.read(b)) != -1) {
                    os.write(b, 0, length);
                }
                Thread.sleep(2000);
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
                URL url = null;
                try {
                    url = new URL(BASE_URL
                            + File.separator + width
                            + File.separator + height
                            + File.separator + "?image=1");
                    is = url.openStream();
                    os = new FileOutputStream(imageBasePath + File.separator + name);
                    byte[] b = new byte[2048];
                    int length;
                    while ((length = is.read(b)) != -1) {
                        os.write(b, 0, length);
                    }
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            } finally {
                if (is != null) {
                    try {
                        is.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if (os != null) {
                    try {
                        os.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
    }
}
