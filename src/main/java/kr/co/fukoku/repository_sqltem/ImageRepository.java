package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.model.Image;

import java.util.List;

public interface ImageRepository {
    boolean save(Image image);
    List<Image> findAllByTranId(int id);
}
