package kr.co.fukoku.service.impl;


import org.apache.ibatis.io.Resources;
import org.springframework.beans.factory.annotation.Autowired;

import kr.co.fukoku.model.impl.TimeLine;
import kr.co.fukoku.model.impl.WorkingTimeAnalysis;
import kr.co.fukoku.repository_sql_db2.WorkingTimeCalculation;
import kr.co.fukoku.repository_sql_db2.WorkpieceMariaDBRepo;
import kr.co.fukoku.service.TimeLineService;
import kr.co.fukoku.utils.Helper;

import java.nio.charset.Charset;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@org.springframework.stereotype.Service
public class TimeLineServiceImpl implements TimeLineService {

    @Autowired
    WorkingTimeCalculation workingTimeCalculation;

    @Autowired
    WorkpieceMariaDBRepo workpieceMariaDBRepo;

    @Override
    public ArrayList<TimeLine> getWorkingTimeAnalysis(WorkingTimeAnalysis workingTimeAnalysis) throws SQLException, ParseException {


        String endDatePlus = Helper.changeNumberOfDay(workingTimeAnalysis.getCrossDate(), +1, "yyyy-MM-dd");
        System.out.println("endDatePlus : "+endDatePlus);


        ArrayList<WorkingTimeAnalysis> workPlan = workingTimeCalculation.workPlanByDateAndLine(workingTimeAnalysis.getCrossDate(), workingTimeAnalysis.getLine());
        ArrayList<WorkingTimeAnalysis> stopPlan = workingTimeCalculation.stopPlanByDateAndLine(workingTimeAnalysis.getCrossDate(), workingTimeAnalysis.getLine());
        ArrayList<WorkingTimeAnalysis> workingTime = workpieceMariaDBRepo.findWorkingTime(workingTimeAnalysis.getLine() , workingTimeAnalysis.getCrossDate(), endDatePlus, "08:00");



        ArrayList<TimeLine> timeLines = new ArrayList<TimeLine>();
        if(workPlan.size() > 0){
            for(WorkingTimeAnalysis w : workPlan){
                timeLines.add(new TimeLine(w.getDate() + " "+ "07:58",w.getDate() + " "+ "07:59","작업계획","BLANK",w.getDate() + " "+ "07:58",w.getDate() + " "+"07:59"));
                timeLines.add(new TimeLine(endDatePlus + " "+ "08:00",endDatePlus + " "+ "08:01","작업계획","BLANK",endDatePlus + " "+ "08:00",endDatePlus + " "+"08:01"));
                timeLines.add(new TimeLine(w.getDate() + " "+ w.getStartTime(),w.getDate() + " "+ w.getEndTime(),"작업계획","WORK_PLAN",w.getDate() + " "+ w.getStartTime(),w.getDate() + " "+ w.getEndTime() ));
            }
        }
        if(stopPlan.size() > 0){
            for(WorkingTimeAnalysis w : stopPlan){
                timeLines.add(new TimeLine(workingTimeAnalysis.getCrossDate() + " "+ "07:58",workingTimeAnalysis.getCrossDate() + " "+ "07:59","계획정지시간","BLANK",workingTimeAnalysis.getCrossDate() + " "+ "07:58",workingTimeAnalysis.getCrossDate() + " "+ "07:59" ));
                timeLines.add(new TimeLine(endDatePlus + " "+ "08:00",endDatePlus + " "+ "08:01" ,"계획정지시간","BLANK",endDatePlus + " "+ "08:00",endDatePlus + " "+ "08:01" ));
                timeLines.add(new TimeLine(workingTimeAnalysis.getCrossDate() + " "+ w.getSpStartTime(),workingTimeAnalysis.getCrossDate() + " "+ w.getSpStopTime(),"계획정지시간","STOP_PLAN",workingTimeAnalysis.getCrossDate() + " "+ w.getSpStartTime(),workingTimeAnalysis.getCrossDate() + " "+ w.getSpStopTime() ));
            }
        }
        if(workingTime.size() > 0){
            for(WorkingTimeAnalysis w : workingTime){
                //System.out.println(w.getDate() + " "+ w.getStartTime());
                timeLines.add(new TimeLine( w.getDate() + " "+ "07:58", w.getDate() + " "+ "07:59","부하시간","BLANK", w.getDate() + " "+ "07:58", w.getDate() + " "+ "07:59" ));
                timeLines.add(new TimeLine( endDatePlus + " "+ "08:00",endDatePlus + " "+ "08:01","부하시간","BLANK", endDatePlus + " "+ "08:00",endDatePlus + " "+ "08:01" ));
                timeLines.add(new TimeLine( w.getDate() + " "+ w.getStartTime(), w.getDate() + " "+ w.getEndTime(),"부하시간","WORKING_TIME", w.getDate() + " "+w.getStartTime(), w.getDate() + " "+ w.getEndTime() ));
            }
        }

        return timeLines;
    }

    @Override
    public ArrayList<TimeLine> mStateTimeLines(String crossDate, String startDateTime, String endDateTime, String line) {
        ArrayList<TimeLine> timeLines = workingTimeCalculation.mStateTimeLine(crossDate, startDateTime, endDateTime,line);
        /*if(timeLines.size() > 0){
            TimeLine t = new TimeLine( cross_date+"T08:00:00.000",  cross_date+"T08:00:01.000",  timeLines.get(0).getTaskName(),  "MANUAL",  cross_date+"T08:00:00.000",  cross_date+"T08:00:01.000");
            timeLines.add(0, t);
        }*/
        return timeLines;
    }

    @Override
    public ArrayList<TimeLine> alarmTimeLine(String crossDate, String startDateTime, String endDateTime, String line) {
        ArrayList<TimeLine> alarmTimeLines = workingTimeCalculation.alarmTimeLine(crossDate, startDateTime, endDateTime,line);
        return alarmTimeLines;
    }


    public String changeDateFormat(String  dateTime, String fromFormat, String toFormat)  {
        //SimpleDateFormat frmFrmat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        //SimpleDateFormat toFrmat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat frmFrmat = new SimpleDateFormat(fromFormat);
        SimpleDateFormat toFrmat = new SimpleDateFormat(toFormat);
        Date date = null;
        String date1 = "";
        try {
            date = frmFrmat.parse(dateTime);
            date1 = toFrmat.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date1;
    }
}
