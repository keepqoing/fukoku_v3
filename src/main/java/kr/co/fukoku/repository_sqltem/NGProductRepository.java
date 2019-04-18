package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.NGProductFilter;
import kr.co.fukoku.model.NGProduct;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface NGProductRepository {
    List<NGProduct> findAll(NGProductFilter filter, Pagination pagination);
    List<Counting> findAlarmByLine(String productionDate);
    List<Counting> findAlarmByMachine(String line, String productionDate);
    NGProduct findOne(int id);
    boolean save(NGProduct defectiveProduct);
    boolean updateStatus(int status);
}
