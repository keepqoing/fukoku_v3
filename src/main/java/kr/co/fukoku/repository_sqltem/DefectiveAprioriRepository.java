package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.model.DefectiveProduct;

import java.util.List;

public interface DefectiveAprioriRepository {
    List<DefectiveProduct> findAll();
}
