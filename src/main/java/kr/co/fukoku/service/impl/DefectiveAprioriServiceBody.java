package kr.co.fukoku.service.impl;

import kr.co.fukoku.model.DefectiveProduct;
import kr.co.fukoku.repository_sqltem.DefectiveAprioriRepository;
import kr.co.fukoku.service.DefectiveAprioriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefectiveAprioriServiceBody implements DefectiveAprioriService {

    @Autowired
    private DefectiveAprioriRepository defectiveAprioriRepository;

    @Override
    public List<DefectiveProduct> getAllDefectiveProduct() {
        return defectiveAprioriRepository.findAll();
    }

}
