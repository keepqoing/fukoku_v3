package kr.co.fukoku.service;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.FailureRateAnalysisFilter;
import kr.co.fukoku.model.FailureRateAnalysis;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface FailureRateAnalysisService {
    List<FailureRateAnalysis> getFailureRateAnalysis(FailureRateAnalysisFilter filter) throws BusinessException, IOException, SQLException;
    List<FailureRateAnalysis> getLineName() throws BusinessException, IOException, SQLException;
}
