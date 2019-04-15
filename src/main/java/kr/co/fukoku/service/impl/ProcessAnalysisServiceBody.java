package kr.co.fukoku.service.impl;


import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.DashBoardFilter2;
import kr.co.fukoku.filters.ProductStatusFilter;
import kr.co.fukoku.model.ProcessAnalysis;
import kr.co.fukoku.model.ProductStatusGraphNew;
import kr.co.fukoku.repository_sqltem.ProcessAnalysisRepository;
import kr.co.fukoku.service.ProcessAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class ProcessAnalysisServiceBody implements ProcessAnalysisService {

    @Autowired
    private ProcessAnalysisRepository processAnalysisRepository;


    @Override
    public List<ProcessAnalysis> getProcessAnalysisResult(DashBoardFilter2 dashBoardFilter2) throws SQLException {
        return processAnalysisRepository.getProcessAnalysisResult(dashBoardFilter2);
    }

    @Override
    public List<ProductStatusGraphNew> getAllProductStatusGraphs(ProductStatusFilter productStatusFilter) throws BusinessException, SQLException {
        return processAnalysisRepository.findAllGraphs(productStatusFilter);
    }
}