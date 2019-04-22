package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.DashBoardFilter2;
import kr.co.fukoku.filters.ProductStatusFilter;
import kr.co.fukoku.model.ProcessAnalysis;
import kr.co.fukoku.model.ProductStatusGraphNew;

import java.sql.SQLException;
import java.util.List;


public interface ProcessAnalysisRepository {
    List<ProcessAnalysis> getProcessAnalysisResult(DashBoardFilter2 dashBoardFilter2) throws SQLException;
    List<ProductStatusGraphNew> findAllGraphs(ProductStatusFilter filter) throws SQLException;
}
