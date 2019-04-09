package kr.co.fukoku.controller;


import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.DashBoardFilter2;
import kr.co.fukoku.filters.ProductStatusFilter;
import kr.co.fukoku.model.ProcessAnalysis;
import kr.co.fukoku.model.ProductStatusGraphNew;
import kr.co.fukoku.service.ProcessAnalysisService;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController

@RequestMapping("/v3/api/fukoku/process-analysis")
public class ProcessAnalysisRestController {

    @Autowired
    private ProcessAnalysisService processAnalysisService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "start_date", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "end_date", dataType = "string", paramType = "query")

    })
    @RequestMapping( method = RequestMethod.GET)
    public ResponseList<ProcessAnalysis> getProcessAnalysisResult(@ApiIgnore DashBoardFilter2 dashBoardFilter2) throws SQLException {
        ResponseList<ProcessAnalysis> response = new ResponseList<>();
        List<ProcessAnalysis> paList = new ArrayList<>();
        paList = processAnalysisService.getProcessAnalysisResult(dashBoardFilter2);
        if(paList == null){
            return response;
        }

        if(paList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(paList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endDate", dataType = "string", paramType = "query")
    })
    @RequestMapping(value = "/graph", method = RequestMethod.GET)
    public ResponseList<ProductStatusGraphNew> getAllProductStatusGraphs(@ApiIgnore ProductStatusFilter filter) throws BusinessException, SQLException {
        ResponseList<ProductStatusGraphNew> response = new ResponseList<>();
        List<ProductStatusGraphNew> productStatusGraphList = processAnalysisService.getAllProductStatusGraphs(filter);
        if(productStatusGraphList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(productStatusGraphList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


}