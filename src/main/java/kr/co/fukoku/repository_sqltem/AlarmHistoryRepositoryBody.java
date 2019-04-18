package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.MonthlySummarization;
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
        return jdbcTemplate.query(SQLStatement.AlarmHistorySQL.FIND_ALL.toString(), new Object[]{
                "%" + alarmHistoryFilter.getLine() + "%",
                "%" + alarmHistoryFilter.getMachine() + "%",
                "%" + alarmHistoryFilter.getProductionDate() + "%",
                pagination.getLimit(),
                pagination.getOffset()
        }, rowMapper);
    }

    @Override
    public List<Counting> findNumberByLine(String productionDate) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("_name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.AlarmHistorySQL.COUNT_NUMBER_BY_LINE.toString(), new Object[]{"%"+productionDate+"%"}, rowMapper);
    }

    @Override
    public List<Counting> findNumberByMachine(String line, String productionDate) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("mapping_name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.AlarmHistorySQL.COUNT_NUMBER_BY_MACHINE.toString(), new Object[]{"%"+productionDate+"%", line}, rowMapper);
    }

    @Override
    public boolean save(AlarmHistory alarmHistory) {
        int result = jdbcTemplate.update(SQLStatement.AlarmHistorySQL.ADD.toString(), new Object[]{
                alarmHistory.getLine(),
                alarmHistory.getMachine(),
                alarmHistory.getProduct(),
                alarmHistory.getMstate(),
                alarmHistory.getWorkDate(),
                alarmHistory.getStartTime(),
                alarmHistory.getEndTime(),
                alarmHistory.getDuration(),
                alarmHistory.getAlarmCode(),
                alarmHistory.getAlarmName(),
                alarmHistory.getAlarmId()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public Long countAlarmHistorybyAlarmId(String alarmId) {
        return jdbcTemplate.queryForObject(SQLStatement.AlarmHistorySQL.COUNT_ALARM_BY_ID.toString(), new Object[]{alarmId}, Long.class);
    }

    @Override
    public boolean updateTime(String endTime, String duration, String alarmId) {
        int result = jdbcTemplate.update(SQLStatement.AlarmHistorySQL.UPDATE_TIME.toString(), new Object[]{
                endTime,
                duration,
                alarmId
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public List<FreqValue> getAlarmFreq(FreqValueFilter filter) {

        RowMapper<FreqValue> rowMapper = (rs, rowNum) -> {
            FreqValue freqValue = new FreqValue(
//                    rs.getInt("counting"),
//                    map.get(rs.getString("ref_machine"))+": [" + rs.getString("alarm_code")+"]"
                    rs.getInt("counting"),
                    rs.getString("alarm_name"),
                    //map.get(rs.getString("ref_machine"))+": [" + rs.getString("alarm_name")+"]",
                    rs.getString("ref_machine"),
                    rs.getString("alarm_code")
            );
            return freqValue;
        };
        return jdbcTemplate.query(SQLStatement.AlarmHistorySQL.ALARM_FREQ.toString(), new Object[]{"%"+filter.getLine()+"%", filter.getStartDate(), filter.getEndDate()}, rowMapper);
    }

    @Override
    public List<MonthlySummarization> getMonthlyAlarmSummarization(String p_year) {
        RowMapper<MonthlySummarization> rowMapper = (rs, rowNum) -> {
            MonthlySummarization monthSum = new MonthlySummarization(
                    rs.getString("line"),
                    rs.getDouble("m_1"),
                    rs.getDouble("m_2"),
                    rs.getDouble("m_3"),
                    rs.getDouble("m_4"),
                    rs.getDouble("m_5"),
                    rs.getDouble("m_6"),
                    rs.getDouble("m_7"),
                    rs.getDouble("m_8"),
                    rs.getDouble("m_9"),
                    rs.getDouble("m_10"),
                    rs.getDouble("m_11"),
                    rs.getDouble("m_12"),
                    rs.getDouble("total"),
                    rs.getFloat("ratio")
            );
            return monthSum;
        };


        return jdbcTemplate.query(SQLStatement.AlarmHistorySQL.MONTHLY_SUM.toString(),new Object[]{
                "%"+p_year+"%"
        }, rowMapper);
    }

    @Override
    public List<MonthlySummarization> getMonthlyAlarmSummarization(String p_line, String p_year) {
        RowMapper<MonthlySummarization> rowMapper = (rs, rowNum) -> {
            MonthlySummarization monthSum = new MonthlySummarization(
                    rs.getString("line"),
                    rs.getString("machine"),
                    rs.getDouble("m_1"),
                    rs.getDouble("m_2"),
                    rs.getDouble("m_3"),
                    rs.getDouble("m_4"),
                    rs.getDouble("m_5"),
                    rs.getDouble("m_6"),
                    rs.getDouble("m_7"),
                    rs.getDouble("m_8"),
                    rs.getDouble("m_9"),
                    rs.getDouble("m_10"),
                    rs.getDouble("m_11"),
                    rs.getDouble("m_12"),
                    rs.getDouble("total"),
                    rs.getFloat("ratio")
            );
            return monthSum;
        };


        return jdbcTemplate.query(SQLStatement.AlarmHistorySQL.MONTHLY_SUM_BY_LINE.toString(),new Object[]{
                p_line,
                p_year+"%"
        }, rowMapper);
    }

    @Override
    public List<MonthlySummarization> getMonthlyAlarmSumByMachine(String p_machine, String p_year) {
        RowMapper<MonthlySummarization> rowMapper = (rs, rowNum) -> {
            MonthlySummarization monthSum = new MonthlySummarization(
                    rs.getString("line"),
                    rs.getString("machine"),
                    rs.getDouble("m_1"),
                    rs.getDouble("m_2"),
                    rs.getDouble("m_3"),
                    rs.getDouble("m_4"),
                    rs.getDouble("m_5"),
                    rs.getDouble("m_6"),
                    rs.getDouble("m_7"),
                    rs.getDouble("m_8"),
                    rs.getDouble("m_9"),
                    rs.getDouble("m_10"),
                    rs.getDouble("m_11"),
                    rs.getDouble("m_12"),
                    rs.getDouble("total"),
                    rs.getFloat("ratio")
            );
            return monthSum;
        };


        return jdbcTemplate.query(SQLStatement.AlarmHistorySQL.MONTHLY_SUM_BY_MACHINE.toString(),new Object[]{
                '%'+p_machine+'%',
                p_year+"%"
        }, rowMapper);
    }

    @Override
    public List<MonthlySummarization> getMonthlyAlarmSumByLineMachine(AlarmHistoryFilter alarmHistoryFilter) {
        RowMapper<MonthlySummarization> rowMapper = (rs, rowNum) -> {
            MonthlySummarization monthSum = new MonthlySummarization(
                    rs.getString("line"),
                    rs.getString("machine"),
                    rs.getDouble("m_1"),
                    rs.getDouble("m_2"),
                    rs.getDouble("m_3"),
                    rs.getDouble("m_4"),
                    rs.getDouble("m_5"),
                    rs.getDouble("m_6"),
                    rs.getDouble("m_7"),
                    rs.getDouble("m_8"),
                    rs.getDouble("m_9"),
                    rs.getDouble("m_10"),
                    rs.getDouble("m_11"),
                    rs.getDouble("m_12"),
                    rs.getDouble("total"),
                    rs.getFloat("ratio")
            );
            return monthSum;
        };


        return jdbcTemplate.query(SQLStatement.AlarmHistorySQL.MONTHLY_SUM_BY_LINE_MACHINE.toString(),new Object[]{
                '%'+ alarmHistoryFilter.getLine() +'%',
                '%'+ alarmHistoryFilter.getMachine() +'%',
                '%'+ alarmHistoryFilter.getStartTime() +"%"
        }, rowMapper);
    }

    private Long count(AlarmHistoryFilter alarmHistoryFilter) {
        return jdbcTemplate.queryForObject(SQLStatement.AlarmHistorySQL.COUNT.toString(), new Object[]{"%" + alarmHistoryFilter.getLine() + "%", "%" + alarmHistoryFilter.getMachine() + "%", "%" + alarmHistoryFilter.getProductionDate() + "%"}, Long.class);

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
