package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.AlarmStatisticsFilter;
import kr.co.fukoku.model.AlarmStatistics;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AlarmStatisticsRepositoryBody implements AlarmStatisticsRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    

    @Override
    public List<AlarmStatistics> findAll(AlarmStatisticsFilter alarmStatisticsFilter, Pagination pagination) {
        pagination.setTotalCount(count(alarmStatisticsFilter));
        RowMapper<AlarmStatistics> rowMapper = (rs, rowNum) -> {
          AlarmStatistics alarmStatistics = new AlarmStatistics();
          alarmStatistics.setAlarm_name(rs.getString("alarm_name"));
          alarmStatistics.setAlarm_count(rs.getLong("alarm_count"));

          return alarmStatistics;
        };
        System.out.println(alarmStatisticsFilter.toString());

        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.FIND_ALL.toString(), new Object[]{
                "%" + alarmStatisticsFilter.getLine() + "%",
                "%" + alarmStatisticsFilter.getMachine() + "%",
                alarmStatisticsFilter.getStartYear(),
                alarmStatisticsFilter.getEndYear(),
                pagination.getLimit(),
                pagination.getOffset()
        }, rowMapper);

    }

    @Override
    public List<Counting> findNumberByFactory(String startYear, String endYear) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.COUNT_NUMNBER_BY_FACTORY.toString(),
                new Object[]{startYear, endYear}, rowMapper);
    }

    @Override
    public List<Counting> findNumberByLine(String factoryName, String startYear, String endYear) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.COUNT_NUMBER_BY_LINE.toString(),
                new Object[]{factoryName, startYear, endYear}, rowMapper);
    }

    @Override
    public List<Counting> findNumberByMachine(String line, String startYear, String endYear) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("ref_machine"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.COUNT_NUMBER_BY_MACHINE.toString(),
                new Object[]{line, startYear, endYear}, rowMapper);
    }

    private Long count(AlarmStatisticsFilter alarmStatisticsFilter) {
        return jdbcTemplate.queryForObject(SQLStatement.AlarmStatisticsSQL.COUNT.toString(), new Object[]{"%" + alarmStatisticsFilter.getLine() + "%", "%" + alarmStatisticsFilter.getMachine() + "%",
                alarmStatisticsFilter.getStartYear(),  alarmStatisticsFilter.getEndYear()}, Long.class);

    }
}
