package kr.co.fukoku.repository;


import kr.co.fukoku.model.form.AlarmJSON.AlarmFactory;
import kr.co.fukoku.model.form.AlarmJSON.AlarmLine;
import kr.co.fukoku.model.form.AlarmJSON.AlarmMachine;
import kr.co.fukoku.model.form.AlarmJSON.AlarmProduct;
import kr.co.fukoku.model.form.AlarmJSON.AlarmValue;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmJsonRepository {
    String tableName = "fukoku_v2.alarm_counting";
    String viewName = "fukoku_v2.viewAlarmJsonTotalDay";

    //============ Reading data
    // SELECT ALL FACTORIES FROM table
    @Select("SELECT distinct factory FROM " + tableName)
    List<AlarmFactory> findAllAlarmFactory();

    // Find all lines as in given Factory
    @Select("SELECT DISTINCT line FROM " + tableName + " WHERE factory = #{p_factory};")
    List<AlarmLine> findAllLinesInFactory(@Param("p_factory") String p_factory);

    // Find all machines as in given Factory and Line
    @Select("SELECT DISTINCT machine FROM " + tableName + " WHERE factory = #{p_factory} AND line = #{p_line};")
    List<AlarmMachine> findAllMachinesInLine(@Param("p_factory") String p_factory,
                                             @Param("p_line") String p_line);


    // Find all alarms as in given Factory, Line and Machine
    @Select("SELECT DISTINCT alarm FROM " + tableName + " WHERE  factory = #{p_factory} AND line = #{p_line} AND machine = #{p_machine}")
    List<AlarmValue> findAllAlarmsInMachine(@Param("p_factory") String p_factory,
                                            @Param("p_line") String p_line,
                                            @Param("p_machine") String p_machine);

    // Find all products in given Alarm
    @Select("SELECT product, a_year, total_alarm_year, total_product_year FROM " + tableName +
            " WHERE factory = #{p_factory} AND line = #{p_line} AND machine = #{p_machine} AND alarm = #{p_alarm}")
    List<AlarmProduct> findAllProductsInAlarm(@Param("p_factory") String p_factory,
                                              @Param("p_line") String p_line,
                                              @Param("p_machine") String p_machine,
                                              @Param("p_alarm") String p_alarm);

    // Find total month in given Alarm
    @Select("SELECT  "+
            " CONCAT_WS(',', total_m1,total_m2,total_m3,total_m4,total_m5,total_m6, " +
            " total_m7,total_m8,total_m9,total_m10,total_m11,total_m12) total_month " +
            " FROM " + tableName +
            " WHERE factory = #{p_factory} AND line = #{p_line} AND machine = #{p_machine} AND alarm = #{p_alarm} " +
            " AND product = #{p_product} AND a_year = #{p_year} ")
    @Results(value={
            @Result(property="total_month",column="total_month")
    })
    String findAllTotalMonthsInAlarm(@Param("p_factory") String p_factory,
                                              @Param("p_line") String p_line,
                                              @Param("p_machine") String p_machine,
                                              @Param("p_alarm") String p_alarm,
                                              @Param("p_product") String p_product,
                                              @Param("p_year") String p_year);


    // Find total month in given Alarm
    @Select("SELECT  total_day "+
            " FROM " + viewName +
            " WHERE factory = #{p_factory} AND line = #{p_line} AND machine = #{p_machine} AND alarm = #{p_alarm} " +
            " AND product = #{p_product} AND a_year = #{p_year} ")
    @Results(value={
            @Result(property="total_day",column="total_day")
    })
    String findAllTotalDaysInAlarm(@Param("p_factory") String p_factory,
                                     @Param("p_line") String p_line,
                                     @Param("p_machine") String p_machine,
                                     @Param("p_alarm") String p_alarm,
                                     @Param("p_product") String p_product,
                                     @Param("p_year") String p_year);

}
