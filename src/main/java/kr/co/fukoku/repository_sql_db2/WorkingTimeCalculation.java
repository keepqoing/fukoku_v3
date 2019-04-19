package kr.co.fukoku.repository_sql_db2;


import kr.co.fukoku.configuration.mapper.SqlDbV2Mapper;
import kr.co.fukoku.model.impl.TimeLine;
import kr.co.fukoku.model.impl.WorkingTimeAnalysis;
import kr.co.fukoku.repository_sql_db2.sql.WorkpieceSQLBuilder;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@SqlDbV2Mapper
public interface WorkingTimeCalculation {

    @Select("select * from assign_working_time A " +
            "                     INNER JOIN operating_time O ON O.id = A.ref_operating_time " +
            "                     where cross_date = #{work_date}  AND A.ref_line=#{line} AND O.id=#{operating_time_id} ORDER BY A._date ASC, O.start_time ASC;")
    ArrayList<HashMap<String, Object>> work_plan_list(@Param("work_date") String work_date , @Param("line")  String line , @Param("operating_time_id") int operating_time_id );

    @Select("select * from operating_time where start_date <= #{work_date} and end_date >= #{work_date} AND ref_line=#{line};")
    ArrayList<HashMap<String, Object>> stop_plan_list(@Param("work_date") String start_date , @Param("line") String line);





    @SelectProvider(type = WorkpieceSQLBuilder.class , method="work_plan_by_current_time")
    ArrayList<HashMap<String , Object>> work_plan_by_current_time(@Param("line")  String line  ,@Param("cross_date") String cross_date , @Param("work_date")  String work_date, @Param("current_end_time") String current_end_time);

    @SelectProvider(type = WorkpieceSQLBuilder.class , method="loading_time_by_current_time")
    long loading_time_by_current_time(@Param("line")  String line  ,@Param("cross_date") String cross_date , @Param("work_date")  String work_date, @Param("current_end_time") String current_end_time);


    //@Select("select * from operating_time where id=#{id};")
    //ArrayList<HashMap<String, Object>> work_plan_list_by_id(@Param("id") int operating_time_id);



    /*
    * TimeLine
    * */
    @Select("select * from operating_time where start_date <= #{work_date} and end_date >= #{work_date} AND ref_line=#{line};")
    @Results({
            @Result(property = "spStartTime" , column = "start_time"),
            @Result(property = "spStopTime" , column = "end_time"),
            @Result(property = "spStartDate" , column = "start_date"),
            @Result(property = "spEndDate" , column = "end_date"),
    })
    ArrayList<WorkingTimeAnalysis> stopPlanByDateAndLine(@Param("work_date") String start_date , @Param("line") String line);

    @Select("select * from assign_working_time A " +
            "                     INNER JOIN operating_time O ON O.id = A.ref_operating_time " +
            "                     where cross_date = #{work_date}  AND A.ref_line=#{line}  ORDER BY A._date ASC, O.start_time ASC;")
    @Results({
            @Result(property = "crossDate" , column = "cross_date"),
            @Result(property = "date" , column = "_date"),
            @Result(property = "startTime" , column = "start_time"),
            @Result(property = "endTime" , column = "end_time"),
    })
    ArrayList<WorkingTimeAnalysis> workPlanByDateAndLine(@Param("work_date") String work_date , @Param("line")  String line  );

    @Select("select * from working_time_analysis where cross_date = #{cross_date} AND line=#{line};")
    @Results({
            @Result(property = "crossDate" , column = "cross_date"),
            @Result(property = "date" , column = "_date"),
            @Result(property = "startTime" , column = "start_time"),
            @Result(property = "endTime" , column = "end_time"),
            @Result(property = "duration" , column = "duration"),
    })
    ArrayList<WorkingTimeAnalysis> workingTimeByDateAndLine(@Param("cross_date") String cross_date , @Param("line") String line);


    //@Select("select machine, product_name, SUBSTRING_INDEX(SUBSTRING_INDEX(mstate_id, '_' , -3), '_' , 1) as status  ,work_date,start_time, end_time from mstate_ib where  work_date=#{cross_date} ORDER BY UNIX_TIMESTAMP(start_time) ;")
    @SelectProvider(type = WorkpieceSQLBuilder.class , method="mStateTimeLine")
    @Results({
            @Result(property = "startDate" , column = "start_time"),
            @Result(property = "endDate" , column = "end_time"),
            @Result(property = "taskName" , column = "machine"),
            @Result(property = "status" , column = "status"),
            @Result(property = "startDateFrm" , column = "start_time"),
            @Result(property = "endDateFrm" , column = "end_time"),
    })
    ArrayList<TimeLine> mStateTimeLine(@Param("cross_date") String crossDate, @Param("start_date_time") String startDateTime , @Param("end_date_time") String endDateTime , @Param("line") String line);

    @SelectProvider(type = WorkpieceSQLBuilder.class , method="alarmTimeLine")
    @Results({
            @Result(property = "startDate" , column = "start_time"),
            @Result(property = "endDate" , column = "end_time"),
            @Result(property = "taskName" , column = "alarm_name"),
            @Result(property = "status" , column = "status"),
            @Result(property = "startDateFrm" , column = "start_time"),
            @Result(property = "endDateFrm" , column = "end_time")
    })
    ArrayList<TimeLine> alarmTimeLine(@Param("cross_date") String crossDate, @Param("start_date_time") String startDateTime , @Param("end_date_time") String endDateTime , @Param("line") String line);


}
