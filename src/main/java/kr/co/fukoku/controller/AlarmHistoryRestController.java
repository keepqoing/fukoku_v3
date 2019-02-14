package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.service.AlarmHistoryService;
import kr.co.fukoku.utils.Pagination;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/alarm-history")
public class AlarmHistoryRestController {

    @Autowired
    private AlarmHistoryService alarmHistoryService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "alarmName", dataType = "string", paramType = "query"),
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
}
