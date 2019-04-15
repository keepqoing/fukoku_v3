package kr.co.fukoku.service;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.DashBoardFilter2;
import kr.co.fukoku.filters.ProductStatusFilter;
import kr.co.fukoku.model.ProcessAnalysis;
import kr.co.fukoku.model.ProductStatusGraphNew;

import java.sql.SQLException;
import java.util.List;

public interface ProcessAnalysisService {
    List<ProcessAnalysis> getProcessAnalysisResult(DashBoardFilter2 dashBoardFilter2) throws SQLException;
    List<ProductStatusGraphNew> getAllProductStatusGraphs(ProductStatusFilter productStatusFilter) throws BusinessException, SQLException;
}
