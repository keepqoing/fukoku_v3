package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.NewCorrelationFilter;
import kr.co.fukoku.service.NewCorrelationService;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/v1/api/fukoku/new-correlation")
public class NewCorrelationRestController {

    @Autowired
    private NewCorrelationService correlationService;



    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine1", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine2", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "process1", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "process2", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startDate1", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endDate1", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startDate2", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endDate2", dataType = "string", paramType = "query")
    })
    @RequestMapping( method = RequestMethod.GET)
    public ResponseList<Map<String, Object>> getAllReadData(@ApiIgnore NewCorrelationFilter filter) throws BusinessException, IOException {
        ResponseList<Map<String, Object>> response = new ResponseList<>();
        Map<String, Object> correlationModelMap = correlationService.getAllNewCorrelation(filter);
        if(correlationModelMap != null){
            response.setCode(StatusCode.FOUND);
            response.setData1(correlationModelMap);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

}