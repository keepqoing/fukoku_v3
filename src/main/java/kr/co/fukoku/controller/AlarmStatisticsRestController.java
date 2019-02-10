package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;

import kr.co.fukoku.filters.AlarmStatisticsFilter;
import kr.co.fukoku.model.AlarmStatistics;

import kr.co.fukoku.repository_sqltem.AlarmStatisticsRepositoryBody;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/alarm-statistics")
public class AlarmStatisticsRestController {

    @Autowired
    private AlarmStatisticsRepositoryBody repository;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endTime", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "page", dataType = "integer", paramType = "query", defaultValue="1"),
            @ApiImplicitParam(name = "limit", dataType = "integer", paramType = "query", defaultValue="15")
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<AlarmStatistics> getAllAlarmStatistics(@ApiIgnore AlarmStatisticsFilter alarmStatisticsFilter, @ApiIgnore Pagination pagination) {
        ResponseList<AlarmStatistics> response = new ResponseList<>();
        List<AlarmStatistics> alarmStatisticsList = repository.findAll(alarmStatisticsFilter, pagination);
        if(alarmStatisticsList != null) {
            if (alarmStatisticsList.size() != 0) {
                response.setCode(StatusCode.FOUND);
                response.setData(alarmStatisticsList);
                response.setPagination(pagination);
            } else {
                response.setCode(StatusCode.NOT_FOUND);
            }
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


    @RequestMapping(value="/number-factory/{startTime}/{endTime}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByLine(@PathVariable("startTime") String startTime,
                                                       @PathVariable("endTime") String endTime){

        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = repository.findNumberByFactory(startTime, endTime);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/number-line/{factoryName}/{startTime}/{endTime}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByLine(@PathVariable("factoryName") String factoryName,
                                                       @PathVariable("startTime") String startTime,
                                                       @PathVariable("endTime") String endTime){

        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = repository.findNumberByLine(factoryName, startTime, endTime);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/number-machine/{line}/{startTime}/{endTime}", method = RequestMethod.GET)
    public ResponseList<Counting> getNumberAlarmByMachine(@PathVariable("line") String line,
                                                          @PathVariable("startTime") String startTime,
                                                          @PathVariable("endTime") String endTime){

        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> countingList = repository.findNumberByMachine(line, startTime, endTime);
        if (countingList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(countingList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }


}
