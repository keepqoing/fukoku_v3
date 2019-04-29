package kr.co.fukoku.service.impl;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.FailureRateAnalysisFilter;
import kr.co.fukoku.model.FailureRateAnalysis;
import kr.co.fukoku.repository_sqltem.FailureRateAnalysisRepository;
import kr.co.fukoku.service.FailureRateAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@Service
public class FailureRateAnalysisServiceBody implements FailureRateAnalysisService {
    @Autowired
    private FailureRateAnalysisRepository failureRateAnalysisRepository;
    @Autowired
    private FailureRateAnalysisService faultTimeMonitoringService;

    @Override
    public List<FailureRateAnalysis> getFailureRateAnalysis(FailureRateAnalysisFilter filter) throws BusinessException, IOException, SQLException {


        return failureRateAnalysisRepository.findFailureTimeStopAutoWait(filter);
    }

    @SuppressWarnings("Duplicates")

    @Override
    public List<FailureRateAnalysis> getLineName() throws BusinessException, IOException, SQLException {
        return failureRateAnalysisRepository.findMachineName();
    }
}
