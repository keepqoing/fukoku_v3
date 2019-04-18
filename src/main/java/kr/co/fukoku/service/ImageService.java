package kr.co.fukoku.service;

import kr.co.fukoku.model.Image;

import java.util.List;

public interface ImageService {
    boolean addImage(Image image);
    List<Image> getAllImageByTranId(int id);
}
