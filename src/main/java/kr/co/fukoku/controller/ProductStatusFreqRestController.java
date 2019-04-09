package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.ProductStatusFreqFilter;
import kr.co.fukoku.model.Pie;
import kr.co.fukoku.model.ProductStatusFreq;
import kr.co.fukoku.service.ProductStatusFreqService;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/product_status_freq")
public class ProductStatusFreqRestController {

    @Autowired
    private ProductStatusFreqService productStatusFreqService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "startDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value="/graph-by-machine", method = RequestMethod.GET)
    public ResponseList<ProductStatusFreq> getAllReadDataGraphByMachine(@ApiIgnore ProductStatusFreqFilter filter) throws BusinessException, IOException {
        ResponseList<ProductStatusFreq> response = new ResponseList<>();
        List<ProductStatusFreq> productStatusFreqList = productStatusFreqService.getAllProductStatusFreqPerMachineGraph(filter);
        if(productStatusFreqList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(productStatusFreqList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "startDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query")

    })
    @RequestMapping(value="/graph-by-line", method = RequestMethod.GET)
    public ResponseList<ProductStatusFreq> getAllReadDataGraphByLine(@ApiIgnore ProductStatusFreqFilter filter) throws BusinessException, IOException {
        ResponseList<ProductStatusFreq> response = new ResponseList<>();
        List<ProductStatusFreq> productStatusFreqList = productStatusFreqService.getAllProductStatusFreqPerLineGraph(filter);
        if(productStatusFreqList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(productStatusFreqList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "startDate", dataType = "string", paramType = "query")

    })
    @RequestMapping(value="/graph-by-ok-product", method = RequestMethod.GET)
    public ResponseList<Pie> getAllReadDataGraphByOKProduct(@ApiIgnore ProductStatusFreqFilter filter) throws BusinessException, IOException {
        ResponseList<Pie> response = new ResponseList<>();
        List<Pie> productStatusFreqList = productStatusFreqService.getAllProductStatusFreqOKProductGraph(filter);
        if(productStatusFreqList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(productStatusFreqList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "startDate", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/graph-by-ng-product", method = RequestMethod.GET)
    public ResponseList<Pie> getAllReadDataGraphByNG(@ApiIgnore ProductStatusFreqFilter filter) throws BusinessException, IOException {
        ResponseList<Pie> response = new ResponseList<>();
        List<Pie> productStatusFreqList = productStatusFreqService.getAllProductStatusFreqNGGraph(filter);
        if(productStatusFreqList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(productStatusFreqList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "startDate", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/graph-by-df-product", method = RequestMethod.GET)
    public ResponseList<Pie> getAllReadDataGraphByDF(@ApiIgnore ProductStatusFreqFilter filter) throws BusinessException, IOException {
        ResponseList<Pie> response = new ResponseList<>();
        List<Pie> productStatusFreqList = productStatusFreqService.getAllProductStatusFreqDFGraph(filter);
        if(productStatusFreqList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(productStatusFreqList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }
}
