package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.filters.DashBoardFilter2;
import kr.co.fukoku.model.DailyMstateAnalysis;
import kr.co.fukoku.model.DashBoard2;
import kr.co.fukoku.service.DashBoard2Service;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/dashboard-v")
public class DashBoard2RestController {

    @Autowired
    private DashBoard2Service dashBoard2Service;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "start_date", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "end_date", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "end_time", dataType = "string", paramType = "query")
    })
    @RequestMapping( method = RequestMethod.GET)
    public ResponseList<DashBoard2> getDashBoardResult(@ApiIgnore DashBoardFilter2 dashBoardFilter2) throws SQLException {
        ResponseList<DashBoard2> response = new ResponseList<>();
        List<DashBoard2> dashBoard2List = new ArrayList<>();
        dashBoard2List = dashBoard2Service.getDashBoardResult(dashBoardFilter2);
        if(dashBoard2List == null){
            return response;
        }

        if(dashBoard2List.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(dashBoard2List);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "start_date", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "end_date", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "end_time", dataType = "string", paramType = "query")
    })
    @RequestMapping( value = "/daily_analysis", method = RequestMethod.GET)
    public ResponseList<DailyMstateAnalysis> getDailyMStateAnalysis(@ApiIgnore DashBoardFilter2 dashBoardFilter2) throws SQLException {
        ResponseList<DailyMstateAnalysis> response = new ResponseList<>();
        List<DailyMstateAnalysis> dList = new ArrayList<>();
        dList = dashBoard2Service.getDailyMStateAnalysis(dashBoardFilter2);
        if(dList == null){
            return response;
        }

        if(dList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(dList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


}