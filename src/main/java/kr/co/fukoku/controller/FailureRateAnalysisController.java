package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.FailureRateAnalysisFilter;
import kr.co.fukoku.model.FailureRateAnalysis;
import kr.co.fukoku.service.FailureRateAnalysisService;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/api/fukoku/FailureRateAnalysis")
public class FailureRateAnalysisController {
    @Autowired
    private FailureRateAnalysisService failureRateAnalysisService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "lineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value = "/getFailureRateAnalysis", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> getFailureRateAnalysis(@ApiIgnore FailureRateAnalysisFilter filter) throws BusinessException, IOException, SQLException {
        System.out.println("******************************Run in Class FailureRateAnalysis Controller****************************** ");
        System.out.println("+++++++++++++++++ "+filter.getLineName()+" "+filter.getMachineName()+" "+filter.getStartTime());
        ResponseList<FailureRateAnalysis> response = new ResponseList<>();
        List<FailureRateAnalysis> failureRateAnalysis = failureRateAnalysisService.getFailureRateAnalysis(filter);
        Map<String, List<FailureRateAnalysis>> failureRateAnalysisGroup= failureRateAnalysis.stream().collect(Collectors.groupingBy(FailureRateAnalysis::getMachine));
        failureRateAnalysis.stream().forEach(x-> System.out.println("MMMMNNNN: "+x.getMtbf()));
        Map<String, Object> dataJson = new HashMap<>();
        dataJson.put("GraphData", "");
        dataJson.put("DataTables", "");
        if(failureRateAnalysis.size() != 0){
            System.out.println("Has Data");
           // response.setCode(StatusCode.FOUND);
            //response.setData(failureRateAnalysis);
        }else{
            System.out.println("NOT FOUND");
            response.setCode(StatusCode.NOT_FOUND);
        }
        return  new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.OK);
    }

}
