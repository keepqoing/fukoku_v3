package kr.co.fukoku.service;


import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;

import kr.co.fukoku.model.impl.TimeLine;
import kr.co.fukoku.model.impl.WorkingTimeAnalysis;


public interface TimeLineService {

    ArrayList<TimeLine> getWorkingTimeAnalysis(WorkingTimeAnalysis workingTimeAnalysis) throws SQLException, ParseException;
    ArrayList<TimeLine> mStateTimeLines(String crossDate, String startDateTime, String endDateTime, String line);
    ArrayList<TimeLine> alarmTimeLine(String crossDate, String startDateTime, String endDateTime, String line);


}
