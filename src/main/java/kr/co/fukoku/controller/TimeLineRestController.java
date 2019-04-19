/*package kr.co.fukoku.controller;

import org.apache.ibatis.io.Resources;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.fukoku.filters.EquipStatusFilter;
import kr.co.fukoku.model.impl.TimeLine;
import kr.co.fukoku.model.impl.WorkingTimeAnalysis;
import kr.co.fukoku.service.TimeLineService;
import kr.co.fukoku.utils.Helper;

import java.nio.charset.Charset;
import java.util.*;

@RestController
@RequestMapping("/v1/api/fukoku/time-line")
public class TimeLineRestController {

    @Autowired
    private TimeLineService timeLineService;

    @Autowired
    private EquipStatusService equipStatusService;

    @RequestMapping(value = "/workPlanByCurrentTime", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> timeLineByDateAndLine(
            @RequestParam("line")String line,
            @RequestParam("crossDate") String crossDate
    ) throws Exception {

        WorkingTimeAnalysis workingTimeAnalysis =new WorkingTimeAnalysis();
        workingTimeAnalysis.setLine(line);
        workingTimeAnalysis.setCrossDate(crossDate);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("workPlanByCurrentTime" , timeLineService.getWorkingTimeAnalysis(workingTimeAnalysis) );
        //workingTimeCalculation.workPlanByCurrentTime("IB", "2018-09-04" , "2018-09-05", "06:00");

        EquipStatusFilter filter =  new EquipStatusFilter();
        filter.setLineName(line);
        List<String> getMachineName = equipStatusService.getMachineName(filter);
        TreeSet machineTreeSet = new  TreeSet();
        machineTreeSet.addAll(getMachineName);
        map.put("machines" , machineTreeSet );

        String endDatePlus = Helper.changeNumberOfDay(crossDate, +1, "yyyy-MM-dd");
        System.out.println("endDatePlus : "+endDatePlus);
        ArrayList<TimeLine> mStateTimeLines = timeLineService.mStateTimeLines( crossDate, crossDate+"T08:00:00.000",endDatePlus+"T08:00:00.000", line );
        ArrayList<TimeLine> alarmTimeLines = timeLineService.alarmTimeLine( crossDate, crossDate+"T08:00:00.000",endDatePlus+"T08:00:00.000", line );
        System.out.println("before : "+mStateTimeLines.size());

        TimeLine timeLine1 = null,timeLine2=null;
        for(String m:getMachineName){
            System.out.println("m : "+m);
            timeLine1 = new TimeLine( crossDate+"T07:58:00.000",  crossDate+"T07:59:00.000",  m,  "BLANK",  crossDate+"T07:58:00.000",  crossDate+"T07:59:00.000");
            timeLine2 = new TimeLine( endDatePlus+"T08:00:00.000",  endDatePlus+"T08:01:00.000",  m,  "BLANK",  endDatePlus+"T08:00:00.000",  endDatePlus+"T08:01:00.000");
            mStateTimeLines.add(timeLine1);
            mStateTimeLines.add(timeLine2);
       }
        System.out.println("after : "+mStateTimeLines.size());
        map.put("m_state_time_line" ,mStateTimeLines);

        TreeSet alarmNames = new  TreeSet();
        //int i=1;
        for(TimeLine a:alarmTimeLines){
            alarmNames.add(a.getTaskName());
            //a.setTaskName(a.getTaskName());
            //i++;
            System.out.println(a.getTaskName());
        }
        if(alarmTimeLines.size() != 0){
            alarmTimeLines.add(new TimeLine( crossDate+"T07:58:00.000",  crossDate+"T07:59:00.000",  alarmTimeLines.get(0).getTaskName(),  "BLANK",  crossDate+"T07:58:00.000",  crossDate+"T07:59:00.000"));
            alarmTimeLines.add(new TimeLine( endDatePlus+"T08:00:00.000",  endDatePlus+"T08:01:00.000",  alarmTimeLines.get(0).getTaskName(),  "BLANK",  endDatePlus+"T08:00:00.000",  endDatePlus+"T08:01:00.000"));
        }

        map.put("alarm_names" ,alarmNames);
        map.put("alarm_time_lines" ,alarmTimeLines);


        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);

    }

}
*/