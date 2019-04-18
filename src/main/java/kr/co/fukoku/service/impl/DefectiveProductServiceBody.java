package kr.co.fukoku.service.impl;

import kr.co.fukoku.filters.NonActiveStateFilter;
import kr.co.fukoku.model.DefectiveProduct;
import kr.co.fukoku.model.NonActiveState;
import kr.co.fukoku.repository_sqltem.DefectiveProductRepository;
import kr.co.fukoku.repository_sqltem.NonActiveStateRepository;
import kr.co.fukoku.service.DefectiveProductService;
import kr.co.fukoku.service.NonActiveStateService;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefectiveProductServiceBody implements DefectiveProductService {

    @Autowired
    private DefectiveProductRepository defectiveProductRepository;

    @Override
    public List<DefectiveProduct> getAllDefectiveProduct(NonActiveStateFilter filter, Pagination pagination) {
        return defectiveProductRepository.findAll(filter, pagination);
    }

    @Override
    public List<Counting> getNumberByLine(String productionDate) {
        return defectiveProductRepository.findNumberByLine(productionDate);
    }

    @Override
    public List<Counting> getNumberByMachine(String line, String productionDate) {
        return defectiveProductRepository.findNumberByMachine(line, productionDate);
    }

}
