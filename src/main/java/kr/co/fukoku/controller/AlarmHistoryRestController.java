package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.MonthlySummarization;
import kr.co.fukoku.model.form.AlarmHistoryForm;
import kr.co.fukoku.service.AlarmHistoryService;
import kr.co.fukoku.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/alarm-history")
public class AlarmHistoryRestController {

    @Autowired
    private AlarmHistoryService alarmHistoryService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "productionDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "page", dataType = "integer", paramType = "query", defaultValue="1"),
            @ApiImplicitParam(name = "limit", dataType = "integer", paramType = "query", defaultValue="15")
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<AlarmHistory> getAllAlarmHistories(@ApiIgnore AlarmHistoryFilter alarmHistoryFilter, @ApiIgnore Pagination pagination) {
        ResponseList<AlarmHistory> response = new ResponseList<>();
        List<AlarmHistory> alarmHistoryList = alarmHistoryService.getAllAlarmHistories(alarmHistoryFilter, pagination);
        if(alarmHistoryList != null) {
            if (alarmHistoryList.size() != 0) {
                response.setCode(StatusCode.FOUND);
                response.setData(alarmHistoryList);
                response.setPagination(pagination);
            } else {
                response.setCode(StatusCode.NOT_FOUND);
            }
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/number-line/{productionDate}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByLine(@PathVariable("productionDate") String productionDate){
        if(productionDate.equals("0"))
            productionDate = "";
        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = alarmHistoryService.getNumberAlarmByLine(productionDate);
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
        List<Counting> countingList = alarmHistoryService.getNumberAlarmByMachine(line, productionDate);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Response addErrorState(@Valid @RequestBody AlarmHistoryForm alarmHistoryForm) {
        Response response = new Response();
        AlarmHistory alarmHistory = new AlarmHistory();
        alarmHistory.setLine(alarmHistoryForm.getLine());
        alarmHistory.setMachine(alarmHistoryForm.getMachine());
        alarmHistory.setProduct(alarmHistoryForm.getProduct());
        alarmHistory.setMstate(alarmHistoryForm.getMstate());
        alarmHistory.setWorkDate(alarmHistoryForm.getWorkDate());
        alarmHistory.setStartTime(alarmHistoryForm.getStartTime());
        alarmHistory.setEndTime(alarmHistoryForm.getEndTime());
        alarmHistory.setDuration(Helper.getDateRangeInSecond(alarmHistoryForm.getStartTime(), alarmHistoryForm.getEndTime()).toString());
        alarmHistory.setAlarmCode(alarmHistoryForm.getAlarmCode());
        alarmHistory.setAlarmName(alarmHistoryForm.getAlarmName());
        alarmHistory.setAlarmId(alarmHistoryForm.getAlarmId());

        if (alarmHistoryService.addAlarmHistory(alarmHistory)) {
            response.setCode(StatusCode.SUCCESS);
        } else {
            response.setCode(StatusCode.NOT_SUCCESS);
        }
        return response;
    }


    @RequestMapping(value="/monthly/{p_work_date}", method = RequestMethod.GET)
    public ResponseList<MonthlySummarization> getMonthlyAlarm(@PathVariable("p_work_date") String p_work_date){
        if(p_work_date.equals("0"))
            p_work_date = "";
        ResponseList<MonthlySummarization> response = new ResponseList<>();
        List<MonthlySummarization> mList = alarmHistoryService.getMonthlyAlarmSummarization(p_work_date);
        if (mList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(mList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


    @RequestMapping(value="/monthly/{p_line}/{p_work_date}", method = RequestMethod.GET)
    public ResponseList<MonthlySummarization> getMonthlyAlarm(@PathVariable("p_line") String p_line, @PathVariable("p_work_date") String p_work_date){
        if(p_work_date.equals("0"))
            p_work_date = "";
        ResponseList<MonthlySummarization> response = new ResponseList<>();
        List<MonthlySummarization> mList = alarmHistoryService.getMonthlyAlarmSummarization(p_line,p_work_date);
        if (mList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(mList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/monthly/machine/{p_machine}/{p_work_date}", method = RequestMethod.GET)
    public ResponseList<MonthlySummarization> getMonthlyAlarmMachine(@PathVariable("p_machine") String p_machine, @PathVariable("p_work_date") String p_work_date){
        if(p_work_date.equals("0"))
            p_work_date = "";
        ResponseList<MonthlySummarization> response = new ResponseList<>();
        List<MonthlySummarization> mList = alarmHistoryService.getMonthlyAlarmSumByMachine(p_machine,p_work_date);
        if (mList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(mList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/monthly/line-machine",method = RequestMethod.GET)
    public ResponseList<MonthlySummarization> getMonthlyAlarmLineMachine(@ApiIgnore AlarmHistoryFilter alarmHistoryFilter){
        ResponseList<MonthlySummarization> response = new ResponseList<>();
        List<MonthlySummarization> mList = alarmHistoryService.getMonthlyAlarmSumByLineMachine(alarmHistoryFilter);
        if (mList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(mList);
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
    @RequestMapping(value="/alarm-freq-val", method = RequestMethod.GET)
    public ResponseList<FreqValue> getAllAlarmHistories(@ApiIgnore FreqValueFilter filter) {
        if(filter.getStartDate().equals("")||filter.getEndDate().equals("")){
            filter.setStartDate(Helper.getCurrentDate());
            filter.setEndDate(Helper.getCurrentDate());
        }
        ResponseList<FreqValue> response = new ResponseList<>();
        List<FreqValue> freqValuesList = alarmHistoryService.getFreqValue(filter);
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
