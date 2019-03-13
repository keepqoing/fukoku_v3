package kr.co.fukoku.service.impl;


import kr.co.fukoku.filters.DashBoardFilter2;
import kr.co.fukoku.model.DailyMstateAnalysis;
import kr.co.fukoku.model.DashBoard2;
import kr.co.fukoku.repository_sqltem.DashBoard2Repository;
import kr.co.fukoku.service.DashBoard2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class DashBoard2ServiceBody implements DashBoard2Service {

    @Autowired
    private DashBoard2Repository dashBoard2Repository;


    @Override
    public List<DashBoard2> getDashBoardResult(DashBoardFilter2 dashBoardFilter2) throws SQLException {
        return dashBoard2Repository.getDashBoardResult(dashBoardFilter2);
    }

    @Override
    public List<DailyMstateAnalysis> getDailyMStateAnalysis(DashBoardFilter2 dashBoardFilter2) throws SQLException {
        return dashBoard2Repository.getDailyMStateAnalysis(dashBoardFilter2);
    }
}