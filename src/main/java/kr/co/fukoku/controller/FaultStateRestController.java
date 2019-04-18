package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;

import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.FaultState;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.form.FaultStateForm;
import kr.co.fukoku.service.FaultStateService;
import kr.co.fukoku.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/fault-state")
public class FaultStateRestController {

    @Autowired
    private FaultStateService faultStateService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "department", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "productionDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "limit", dataType = "string", paramType = "query", defaultValue = "15"),
            @ApiImplicitParam(name = "page", dataType = "string", paramType = "query", defaultValue = "1"),
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<FaultState> getAllFaultStates(@ApiIgnore FaultStateFilter filter, @ApiIgnore Pagination pagination) {
        ResponseList<FaultState> response = new ResponseList<>();
        List<FaultState> errorStateList = faultStateService.getAllFaultStates(filter, pagination);
        if (errorStateList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(errorStateList);
            response.setPagination(pagination);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Response addFaultState(@Valid @RequestBody FaultStateForm faultStateForm) {
        Response response = new Response();
        FaultState faultState = new FaultState();
        faultState.setLine(faultStateForm.getLine());
                faultState.setMachine(faultStateForm.getMachine());
                faultState.setProduct(faultStateForm.getProduct());
                faultState.setmState(faultStateForm.getmState());
                faultState.setWorkDate(faultStateForm.getWorkDate());
                faultState.setStartTime(faultStateForm.getStartTime());
                faultState.setEndTime(faultStateForm.getEndTime());
                faultState.setDuration(Helper.getDateRangeInSecond(faultState.getStartTime(), faultState.getEndTime())+"");
                faultState.setAlarmCode(faultStateForm.getAlarmCode());
                faultState.setAlarmName(faultStateForm.getAlarmName());
                faultState.setItem(faultStateForm.getItem());
                faultState.setSubItem(faultStateForm.getSubItem());
                faultState.setError(faultStateForm.getError());
                faultState.setTreatment(faultStateForm.getTreatment());
                faultState.setDepartment(faultStateForm.getDepartment());
                faultState.setIdentifier(faultStateForm.getIdentifier());

        if (faultStateService.addFaultState(faultState) > 0) {
            response.setCode(StatusCode.SUCCESS);
        } else {
            response.setCode(StatusCode.NOT_SUCCESS);
        }
        return response;
    }

    @RequestMapping(value="/number-line/{dep}/{productionDate}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByLine(@PathVariable("dep") String dep, @PathVariable("productionDate") String productionDate){
        if(dep.equals("0"))
            dep="";
        if(productionDate.equals("0"))
            productionDate="";
        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = faultStateService.getNumberByLine(dep, productionDate);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/number-machine/{line}/{dep}/{productionDate}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByMachine(@PathVariable("line") String line, @PathVariable("dep") String dep, @PathVariable("productionDate") String productionDate){
        if(dep.equals("0"))
            dep="";
        if(productionDate.equals("0"))
            productionDate="";
        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = faultStateService.getNumberByMachine(line, dep, productionDate);
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
    @RequestMapping(value="/fault-freq-val", method = RequestMethod.GET)
    public ResponseList<FreqValue> getFreqValue(@ApiIgnore FreqValueFilter filter) {
        if(filter.getStartDate().equals("")||filter.getEndDate().equals("")){
            filter.setStartDate(Helper.getCurrentDate());
            filter.setEndDate(Helper.getCurrentDate());
        }
        ResponseList<FreqValue> response = new ResponseList<>();
        List<FreqValue> freqValuesList = faultStateService.getFreqValue(filter);
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

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Response deleteFaultStateAnalysis(@PathVariable("id") int id) throws SQLException {
        Response response = new Response();
        boolean result = faultStateService.deleteFaultStateAnalysis(id);
        if(result){
            response.setCode(StatusCode.SUCCESS);
        }else{
            response.setCode(StatusCode.NOT_SUCCESS);
        }
        return response;
    }
}
