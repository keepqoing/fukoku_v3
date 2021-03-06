package kr.co.fukoku.repository;

import kr.co.fukoku.model.AlarmStatistics;
import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.*;
import kr.co.fukoku.model.form.AlarmModel.MainAlarm;
import kr.co.fukoku.model.form.AlarmModel.Yearly;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository {


    //============ Reading data
    // 1.1 - Select all rows from alarm_histories
    @Select("CALL proc_alarm_count_by_month_year_v2(" +
            "#{startYear}, "+
            "#{endYear}, "+
            "#{factory}, "+
            "#{line}, "+
            "#{machine} "+
            ")")
    @Results(value={
            @Result(property="alarmName",column="alarm_name"),
            @Result(property="alarmCount",column="total"),
            @Result(property="alarmId",column="id")
    })
    List<AlarmStatistics> findAllAlarm(@Param("startYear") String startYear,
                                       @Param("endYear") String endYear,
                                       @Param("factory") String factory,
                                       @Param("line") String line,
                                       @Param("machine") String machine
                                       );

    // 1.2 - Select all rows from alarm_histories
    @Select("CALL proc_alarm_count_by_product_v2(" +
            "#{startYear}, "+
            "#{endYear}, "+
            "#{line}, "+
            "#{machine}, "+
            "#{alarm_name} "+
            ")")
    @Results(value={
            @Result(property="refProduct",column="ref_product"),
            @Result(property="total",column="total")
    })
    List<AlarmProduct> findAllAlarmByProduct(   @Param("startYear") String startYear,
                                                 @Param("endYear") String endYear,
                                                 @Param("line") String line,
                                                 @Param("machine") String machine,
                                                 @Param("alarm_name") String alarm_name );


    // 1.3 - Select all product by year
    @Select("CALL proc_alarm_count_by_product_year_v2(" +
            "#{startYear}, "+
            "#{endYear}, "+
            "#{line}, "+
            "#{machine}, "+
            "#{alarm_name}, "+
            "#{product_name} "+
            ")")
    @Results(value={
            @Result(property="year",column="a_year")

    })
    List<AlarmProductYear> findAllAlarmByProductYear(
                                             @Param("startYear") String startYear,
                                             @Param("endYear") String endYear,
                                             @Param("line") String line,
                                             @Param("machine") String machine,
                                             @Param("alarm_name") String alarm_name,
                                             @Param("product_name") String product_name);



    // 1.3 - Select all product by year
    @Select("CALL proc_auto_counting_alarm();")
    int callAutoCountingAlarm();



    //======================== NEW VERSION
    @Select("CALL proc_test_alarm(" +
            "#{tableName}, "+
            "#{columNames}, "+
            "#{whereClause}" +
            ")")
    @Results(value={
            @Result(property="alarm",column="alarm"),
            @Result(property="line",column="line"),
            @Result(property="machine",column="machine"),
            @Result(property="product",column="product"),
            @Result(property="year",column="a_year"),

    })
    List<MainAlarm> findAllMainAlarms(
            @Param("tableName") String tableName,
            @Param("columNames") String columNames,
            @Param("whereClause") String whereClause
            );

    @Select("CALL proc_test_alarm(" +
            "#{tableName}, "+
            "#{columNames}, "+
            "#{whereClause}" +
            ")")
    @Results(value={
            @Result(property="year",column="a_year")

    })
    List<Yearly> findAllYears(
            @Param("tableName") String tableName,
            @Param("columNames") String columNames,
            @Param("whereClause") String whereClause
    );

}
