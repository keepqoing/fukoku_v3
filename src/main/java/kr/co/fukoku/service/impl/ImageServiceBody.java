package kr.co.fukoku.service.impl;

import kr.co.fukoku.model.Image;
import kr.co.fukoku.repository_sqltem.ImageRepository;
import kr.co.fukoku.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceBody implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public boolean addImage(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public List<Image> getAllImageByTranId(int id) {
        return imageRepository.findAllByTranId(id);
    }
}
