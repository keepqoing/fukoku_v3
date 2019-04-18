package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.NonActiveStateFilter;
import kr.co.fukoku.model.DefectiveProduct;
import kr.co.fukoku.model.NonActiveState;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface DefectiveProductRepository {
    List<DefectiveProduct> findAll(NonActiveStateFilter filter, Pagination pagination);
    List<Counting> findNumberByLine(String productionDate);
    List<Counting> findNumberByMachine(String line, String productionDate);

}
