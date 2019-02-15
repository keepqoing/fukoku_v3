package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Helper;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AlarmHistoryRepositoryBody implements AlarmHistoryRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<AlarmHistory> findAll(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination) {
        pagination.setTotalCount(count(alarmHistoryFilter));

        RowMapper<AlarmHistory> rowMapper = (rs, rowNum) -> {
            AlarmHistory alarmHistory = new AlarmHistory();
            alarmHistory.setId(rs.getInt("id"));
            alarmHistory.setLine(rs.getString("ref_line"));
            alarmHistory.setMachine(rs.getString("ref_machine"));
            alarmHistory.setProduct(rs.getString("ref_product"));
            alarmHistory.setMstate(findString(rs.getString("machine_state")));
            alarmHistory.setWorkDate(rs.getString("work_date"));
            alarmHistory.setStartTime(rs.getString("start_time").replace("T"," "));
            alarmHistory.setEndTime(rs.getString("end_time").replace("T", " "));
            alarmHistory.setDuration(Helper.secondsToString(Integer.parseInt(Helper.getDateRangeInSecond(rs.getString("start_time").replace("T", " "), rs.getString("end_time").replace("T", " ")).toString())));
            alarmHistory.setAlarmCode(rs.getString("alarm_code"));
            alarmHistory.setAlarmName(rs.getString("alarm_name"));
            alarmHistory.setAlarmId(rs.getString("alarm_id"));

            return alarmHistory;
        };
        System.out.println(alarmHistoryFilter.toString());

        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.FIND_ALARM_HISTORY.toString(), new Object[]{
                "%" + alarmHistoryFilter.getLine() + "%",
                 alarmHistoryFilter.getAlarmName() ,
                alarmHistoryFilter.getStartTime(),
                alarmHistoryFilter.getEndTime(),
                pagination.getLimit(),
                pagination.getOffset()
        }, rowMapper);
    }


    private Long count(AlarmHistoryFilter alarmHistoryFilter) {
        return jdbcTemplate.queryForObject(SQLStatement.AlarmStatisticsSQL.
                COUNT_ALARM_HISTORY.toString(), new Object[]{
                        "%" + alarmHistoryFilter.getLine() + "%",
                        alarmHistoryFilter.getAlarmName() ,
                        alarmHistoryFilter.getStartTime(),
                        alarmHistoryFilter.getEndTime()
                }, Long.class);

    }

    private String findString(String str){
        String s = str.toLowerCase();
        if(s.contains("stop"))
            return "STOP";
        else if(s.contains("wait"))
            return "WAIT";
        else if(s.contains("manual"))
            return "MANUAL";
        else if(s.contains("auto"))
            return "AUTO";
        else
            return str;
    }

}
