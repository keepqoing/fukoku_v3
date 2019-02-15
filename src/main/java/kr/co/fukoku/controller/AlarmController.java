package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.filters.AlarmStatisticsFilter;
import kr.co.fukoku.model.AlarmStatistics;
import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.*;
import kr.co.fukoku.repository.AlarmRepository;
import kr.co.fukoku.repository.ProcessModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v3/api/fukoku/alarm")
public class AlarmController {

    @Autowired
    private AlarmRepository repository;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "startYear", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endYear", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query")
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findAllAlarm(@ApiIgnore AlarmStatisticsFilter alarmStatisticsFilter)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<AlarmStatistics> alarmStatistics = repository.findAllAlarm(
                    alarmStatisticsFilter.getStartYear(),
                    alarmStatisticsFilter.getEndYear(),
                    alarmStatisticsFilter.getFactory(),
                    alarmStatisticsFilter.getLine(),
                    alarmStatisticsFilter.getMachine());

            if(alarmStatistics.size() > 0 ) {
                for(AlarmStatistics a : alarmStatistics){

                    // Get all Procss Product
                    List<AlarmProduct> alarmProducts =
                            repository.findAllAlarmByProduct(
                                    alarmStatisticsFilter.getStartYear(),
                                    alarmStatisticsFilter.getEndYear(),
                                    alarmStatisticsFilter.getLine(),
                                    alarmStatisticsFilter.getMachine(),
                                    a.getAlarmName()
                            );

                    if(alarmProducts.size() > 0){
                        for(AlarmProduct ap : alarmProducts){
                            List<AlarmProductYear> alarmProductYears = repository.findAllAlarmByProductYear(
                                    alarmStatisticsFilter.getStartYear(),
                                    alarmStatisticsFilter.getEndYear(),
                                    alarmStatisticsFilter.getLine(),
                                    alarmStatisticsFilter.getMachine(),
                                    a.getAlarmName(),
                                    ap.getRefProduct()
                            );
                            if(alarmProductYears.size() > 0){
                                ap.setAlarmProductYears(alarmProductYears);
                            }
                        }
                    }

                    a.setAlarmProducts(alarmProducts);

//                    System.out.println(a.toString());
                }
                    map.put("data", alarmStatistics);
                    map.put("code", 200);
            }else {
                map.put("code", 404);
                map.put("message", "Data not found!");
            }
        }catch(Exception e) {
            e.printStackTrace();
            map.put("code", 500);
            map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }
}
