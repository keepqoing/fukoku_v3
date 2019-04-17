package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.filters.NonActiveStateFilter;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.NonActiveState;
import kr.co.fukoku.model.form.NonActiveStateForm;
import kr.co.fukoku.service.NonActiveStateService;
import kr.co.fukoku.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/non-active-state")
public class NonActiveStateRestController {

    @Autowired
    private NonActiveStateService nonActiveStateService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "productionDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "limit", dataType = "string", paramType = "query", defaultValue = "15"),
            @ApiImplicitParam(name = "page", dataType = "string", paramType = "query", defaultValue = "1"),
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<NonActiveState> getAllNonMovingStates(@ApiIgnore NonActiveStateFilter filter, @ApiIgnore Pagination pagination) {
        ResponseList<NonActiveState> response = new ResponseList<>();
        List<NonActiveState> nonActiveStateList = nonActiveStateService.getAllNonMovingStates(filter, pagination);
        if (nonActiveStateList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(nonActiveStateList);
            response.setPagination(pagination);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Response addNonMovingState(@Valid @RequestBody NonActiveStateForm nonMovingStateForm) {
        Response response = new Response();
        NonActiveState nonActiveState = new NonActiveState(
                nonMovingStateForm.getLine(),
                nonMovingStateForm.getMachine(),
                nonMovingStateForm.getProduct(),
                nonMovingStateForm.getmState(),
                nonMovingStateForm.getWorkDate(),
                nonMovingStateForm.getStartTime(),
                nonMovingStateForm.getEndTime(),
                nonMovingStateForm.getDuration(),
                nonMovingStateForm.getAlarmCode(),
                nonMovingStateForm.getAlarmName()
        );
        nonActiveState.setDepartment(nonMovingStateForm.getDepartment());
        if (nonActiveStateService.addNonMovingState(nonActiveState)) {
            response.setCode(StatusCode.SUCCESS);
        } else {
            response.setCode(StatusCode.NOT_SUCCESS);
        }
        return response;
    }

    @RequestMapping(value="/number-line/{productionDate}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByLine(@PathVariable("productionDate") String productionDate){
        if(productionDate.equals("0"))
            productionDate = "";
        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = nonActiveStateService.getNumberByLine(productionDate);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/number-machine/{line}/{productionDate}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByMachine(@PathVariable("line") String line, @PathVariable("productionDate") String productionDate){
        if(productionDate.equals("0"))
            productionDate = "";
        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = nonActiveStateService.getNumberByMachine(line, productionDate);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endDate", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/nas-freq-val", method = RequestMethod.GET)
    public ResponseList<FreqValue> getAllFreqValues(@ApiIgnore FreqValueFilter filter) {
        if(filter.getStartDate().equals("")||filter.getEndDate().equals("")){
            filter.setStartDate(Helper.getCurrentDate());
            filter.setEndDate(Helper.getCurrentDate());
        }
        ResponseList<FreqValue> response = new ResponseList<>();
        List<FreqValue> freqValuesList = nonActiveStateService.countFreqValue(filter);
        if(freqValuesList != null) {
            if (freqValuesList.size() != 0) {
                response.setCode(StatusCode.FOUND);
                response.setData(freqValuesList);
            } else {
                response.setCode(StatusCode.NOT_FOUND);
            }
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endDate", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/nas-ms-freq-val", method = RequestMethod.GET)
    public ResponseList<FreqValue> getAllMSFreqValues(@ApiIgnore FreqValueFilter filter) {
        if(filter.getStartDate().equals("")||filter.getEndDate().equals("")){
            filter.setStartDate(Helper.getCurrentDate());
            filter.setEndDate(Helper.getCurrentDate());
        }
        ResponseList<FreqValue> response = new ResponseList<>();
        List<FreqValue> freqValuesList = nonActiveStateService.countMSFreqValue(filter);
        if(freqValuesList != null) {
            if (freqValuesList.size() != 0) {
                response.setCode(StatusCode.FOUND);
                response.setData(freqValuesList);
            } else {
                response.setCode(StatusCode.NOT_FOUND);
            }
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

}
