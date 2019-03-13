package kr.co.fukoku.service;



import kr.co.fukoku.filters.DashBoardFilter2;
import kr.co.fukoku.model.DailyMstateAnalysis;
import kr.co.fukoku.model.DashBoard2;

import java.sql.SQLException;
import java.util.List;

public interface DashBoard2Service {
    List<DashBoard2> getDashBoardResult(DashBoardFilter2 dashBoardFilter2) throws SQLException;
    List<DailyMstateAnalysis> getDailyMStateAnalysis(DashBoardFilter2 dashBoardFilter2) throws SQLException;
}
