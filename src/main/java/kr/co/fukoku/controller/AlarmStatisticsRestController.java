package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;

import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.filters.AlarmStatisticsFilter;
import kr.co.fukoku.model.*;

import kr.co.fukoku.model.form.AlarmJSON.AlarmFactory;
import kr.co.fukoku.model.response.ResponseRecord;
import kr.co.fukoku.repository_sqltem.AlarmStatisticsRepositoryBody;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/api/fukoku/alarm-statistics")
public class AlarmStatisticsRestController {

    @Autowired
    private AlarmStatisticsRepositoryBody repository;

    @RequestMapping(value="/number-factory", method = RequestMethod.GET)
    public ResponseList<Counting> getAllAlarmsByFactory(){

        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = repository.findNumberByFactory();
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/number-line/{factoryName}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByLine(@PathVariable("factoryName") String factoryName){

        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = repository.findNumberByLine(factoryName);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/number-machine/{line}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByMachine(@PathVariable("line") String line){

        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = repository.findNumberByMachine(line);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/auto-counting-alarm", method = RequestMethod.GET)
    public ResponseRecord<String> autoCountingAlarm(){
        ResponseRecord<String> response = new ResponseRecord<>();
        String result = repository.callAutoCountingAlarm();
        if(result != null){
            response.setCode(StatusCode.SUCCESS);
            response.setData(result);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;

    }

    @RequestMapping(value="/auto-counting-alarm-duration", method = RequestMethod.GET)
    public ResponseRecord<String> autoCountingAlarmDuration(){
        ResponseRecord<String> response = new ResponseRecord<>();
        String result = repository.callAutoCountingAlarmDuration();
        if(result != null){
            response.setCode(StatusCode.SUCCESS);
            response.setData(result);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;

    }

    @RequestMapping(value="/{factory}/{line}/{machine}/{year}", method = RequestMethod.GET)
    public ResponseList<MainAlarmStatistics> getMainAlarmStatistics(
            @PathVariable("factory") String factory,
            @PathVariable("line") String line,
            @PathVariable("machine") String machine,
            @PathVariable("year") String year
    ){

        ResponseList<MainAlarmStatistics> response = new ResponseList<>();
        List<MainAlarmStatistics> countingList = repository.getMainAlarmStatistic(factory, line, machine, year);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


    @RequestMapping(value="/duration/{factory}/{line}/{machine}/{year}", method = RequestMethod.GET)
    public ResponseList<MainAlarmStatistics> getMainAlarmStatisticsDuration(
            @PathVariable("factory") String factory,
            @PathVariable("line") String line,
            @PathVariable("machine") String machine,
            @PathVariable("year") String year
    ){

        ResponseList<MainAlarmStatistics> response = new ResponseList<>();
        List<MainAlarmStatistics> countingList = repository.getMainAlarmStatisticDuration(factory, line, machine, year);
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
            @ApiImplicitParam(name = "alarmName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "productionDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "limit", dataType = "integer", paramType = "query", defaultValue="15"),
            @ApiImplicitParam(name = "page", dataType = "integer", paramType = "query", defaultValue="1")

    })
    @RequestMapping(value="/findAlarmHistory", method = RequestMethod.GET)
    public ResponseList<AlarmHistory> getAllAlarmHistories(@ApiIgnore AlarmHistoryFilter alarmHistoryFilter, @ApiIgnore Pagination pagination) {
        ResponseList<AlarmHistory> response = new ResponseList<>();
        List<AlarmHistory> alarmHistoryList = repository.findAllAlarmHistory(alarmHistoryFilter, pagination);
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

    // Summation
    @RequestMapping(value="/sum/{factory}/{line}/{machine}/{year}", method = RequestMethod.GET)
    public ResponseList<MainAlarmStatistics> getMainAlarmStatisticsSum(
            @PathVariable("factory") String factory,
            @PathVariable("line") String line,
            @PathVariable("machine") String machine,
            @PathVariable("year") String year
    ){

        ResponseList<MainAlarmStatistics> response = new ResponseList<>();
        List<MainAlarmStatistics> countingList = repository.getMainAlarmStatisticSum(factory, line, machine, year);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


    @RequestMapping(value="/sum/duration/{factory}/{line}/{machine}/{year}", method = RequestMethod.GET)
    public ResponseList<MainAlarmStatistics> getMainAlarmStatisticsDurationSum(
            @PathVariable("factory") String factory,
            @PathVariable("line") String line,
            @PathVariable("machine") String machine,
            @PathVariable("year") String year
    ){

        ResponseList<MainAlarmStatistics> response = new ResponseList<>();
        List<MainAlarmStatistics> countingList = repository.getMainAlarmStatisticDurationSum(factory, line, machine, year);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


    // Graph
    @RequestMapping(value="/alarmGraphYear/{p_year}", method = RequestMethod.GET)
    public ResponseList<MainAlarmStatistics> graphAlarmCountingByYear(
            @PathVariable("p_year") String p_year
    ){

        ResponseList<MainAlarmStatistics> response = new ResponseList<>();
        List<MainAlarmStatistics> countingList = repository.graphAlarmCountingByYear(p_year);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

}
