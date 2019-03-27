package kr.co.fukoku.repository;

import kr.co.fukoku.model.form.AlarmAppearance.AlarmAppearanceGraph;
import kr.co.fukoku.model.form.AlarmJSON.AlarmFactory;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmAppearanceRepository {
    @Select("CALL procGetAlarmAppearance(#{line}, #{machine}, #{work_date});")
    @Results(value={
            @Result(property="time",column="time_series"),
            @Result(property="hasAlarm",column="has_alarm")
    })
    List<AlarmAppearanceGraph> findAlarmAppearance(
            @Param("line") String line,
            @Param("machine") String machine,
            @Param("work_date") String work_date
    );
}
