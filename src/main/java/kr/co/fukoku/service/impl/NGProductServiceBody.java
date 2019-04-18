package kr.co.fukoku.service.impl;


import kr.co.fukoku.filters.NGProductFilter;
import kr.co.fukoku.model.NGProduct;
import kr.co.fukoku.repository_sqltem.NGProductRepository;
import kr.co.fukoku.service.NGProductService;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NGProductServiceBody implements NGProductService {

    @Autowired
    private NGProductRepository ngProductRepository;

    @Override
    public List<NGProduct> getAllNGProducts(NGProductFilter filter, Pagination pagination) {
        return ngProductRepository.findAll(filter, pagination);
    }

    @Override
    public List<Counting> getNumberAlarmByLine(String productionDate) {
        return ngProductRepository.findAlarmByLine(productionDate);
    }

    @Override
    public List<Counting> getNumberAlarmByMachine(String line, String productionDate) {
        return ngProductRepository.findAlarmByMachine(line, productionDate);
    }

    @Override
    public NGProduct getNGProduct(int id) {
        return ngProductRepository.findOne(id);
    }

    @Override
    public boolean addNGProduct(NGProduct ngProduct) {
        return ngProductRepository.save(ngProduct);
    }

    @Override
    public boolean updateStatus(int status) {
        return ngProductRepository.updateStatus(status);
    }
}