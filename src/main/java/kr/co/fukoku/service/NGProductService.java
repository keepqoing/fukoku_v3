package kr.co.fukoku.service;


import kr.co.fukoku.filters.NGProductFilter;
import kr.co.fukoku.model.NGProduct;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface NGProductService {
    List<NGProduct> getAllNGProducts(NGProductFilter filter, Pagination pagination);
    List<Counting> getNumberAlarmByLine(String productionDate);
    List<Counting> getNumberAlarmByMachine(String line, String productionDate);
    NGProduct getNGProduct(int id);
    boolean addNGProduct(NGProduct ngProduct);
    boolean updateStatus(int status);
}
