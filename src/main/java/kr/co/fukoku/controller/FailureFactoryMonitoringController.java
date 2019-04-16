package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.FailureFactoryMonitoringFilter;
import kr.co.fukoku.model.FailureFactoryMonitoring;
import kr.co.fukoku.service.FailureFactoryMonitoringService;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/FailureFactoryMonitoring")
public class FailureFactoryMonitoringController {
    @Autowired
    private FailureFactoryMonitoringService failureFactoryMonitoringService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "lineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endTime", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value = "/FailureFactoryMonitoringMachine", method = RequestMethod.GET)
    public ResponseList<FailureFactoryMonitoring> getTotalHourByMachine(@ApiIgnore FailureFactoryMonitoringFilter filter) throws BusinessException, IOException, SQLException {
        System.out.println("******************************Run in Class FailureFactoryMonitoringController****************************** ");
        ResponseList<FailureFactoryMonitoring> response = new ResponseList<>();
        List<FailureFactoryMonitoring> failureFactoryMonitoring = failureFactoryMonitoringService.getMachineInFactory(filter);
        if(failureFactoryMonitoring.size() != 0){

            response.setCode(StatusCode.FOUND);
            response.setData(failureFactoryMonitoring);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/getFactoryName", method = RequestMethod.GET)
    public ResponseList<FailureFactoryMonitoring> getFactoryName() throws BusinessException, IOException, SQLException {
        System.out.println("******************************Run in Class FailureFactoryMonitoringController getFactoryName****************************** ");
        ResponseList<FailureFactoryMonitoring> response = new ResponseList<>();
        List<FailureFactoryMonitoring> factoryName = failureFactoryMonitoringService.getFactoryName();
        if(factoryName.size() != 0){

            response.setCode(StatusCode.FOUND);
            response.setData(factoryName);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

}
