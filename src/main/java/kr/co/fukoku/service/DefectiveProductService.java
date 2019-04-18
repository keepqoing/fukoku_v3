package kr.co.fukoku.service;


import kr.co.fukoku.filters.NonActiveStateFilter;
import kr.co.fukoku.model.DefectiveProduct;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface DefectiveProductService {
    List<DefectiveProduct> getAllDefectiveProduct(NonActiveStateFilter filter, Pagination pagination);
    List<Counting> getNumberByLine(String productionDate);
    List<Counting> getNumberByMachine(String line, String productionDate);

}
