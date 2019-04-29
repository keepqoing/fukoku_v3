package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.FailureRateAnalysisFilter;
import kr.co.fukoku.model.FailureRateAnalysis;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface FailureRateAnalysisRepository {
    List<FailureRateAnalysis> findFailureTimeStopAutoWait(FailureRateAnalysisFilter filter) throws SQLException, IOException;
    List<FailureRateAnalysis> findMachineName() throws SQLException, IOException;
}
