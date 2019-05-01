package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.WorkTimeCalendarFilter;
import kr.co.fukoku.model.WorkTimeCalendar;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
public class WorkTimeCalendarRepositoryBody implements WorkTimeCalendarRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<WorkTimeCalendar> findAll(WorkTimeCalendarFilter filter) throws SQLException {
        RowMapper<WorkTimeCalendar> rowMapper = (rs, rowNum) -> {
            WorkTimeCalendar workTimeCalendar = new WorkTimeCalendar(
                    rs.getInt("id"),
                    rs.getInt("ref_operating_time"),
                    rs.getInt("total"),
                    rs.getString("line"),
                    rs.getString("ref_product"),
                    rs.getString("_date"),
                    rs.getString("short_date")
            );
            workTimeCalendar.setWorkingTypeName(rs.getString("work_type_name"));
            workTimeCalendar.setTimeTag(rs.getString("time_tag"));
            workTimeCalendar.setStartDate(rs.getString("start_date"));
            workTimeCalendar.setEndDate(rs.getString("end_date"));
            workTimeCalendar.setStartDay(rs.getString("start_day"));
            workTimeCalendar.setEndDay(rs.getString("end_day"));
            workTimeCalendar.setStartTime(rs.getString("start_time"));
            workTimeCalendar.setEndTime(rs.getString("end_time"));
            workTimeCalendar.setCrossDate(rs.getString("cross_date"));
            workTimeCalendar.setCrossDateLabel(rs.getString("cross_date_label"));
            workTimeCalendar.setDuration(rs.getInt("duration"));
            return workTimeCalendar;
        };
        return jdbcTemplate.query(SQLStatement.WorkTimeCalendarSQL.FIND_ALL.toString(), new Object[]{filter.getLine(), filter.getShortDate()}, rowMapper);
    }

    @Override
    public WorkTimeCalendar findOne(int id) throws SQLException {
        try {
            RowMapper<WorkTimeCalendar> rowMapper = (rs, rowNum) -> {
                WorkTimeCalendar workTimeCalendar = new WorkTimeCalendar(
                        rs.getInt("id"),
                        rs.getInt("ref_operating_time"),
                        rs.getInt("total"),
                        rs.getString("ref_line"),
                        rs.getString("ref_product"),
                        rs.getString("_date"),
                        rs.getString("short_date")
                );
                workTimeCalendar.setCrossDate(rs.getString("cross_date"));
                workTimeCalendar.setCrossDateLabel(rs.getString("cross_date_label"));
                return workTimeCalendar;
            };
            return jdbcTemplate.queryForObject(SQLStatement.WorkTimeCalendarSQL.FIND_BY_ID.toString(), new Object[]{id}, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public boolean save(WorkTimeCalendar workTimeCalendar) throws SQLException {
        KeyHolder keyHolder = new GeneratedKeyHolder();


        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement statement = con.prepareStatement("INSERT INTO assign_working_time(ref_operating_time, total, ref_line, ref_product, _date, short_date, cross_date, cross_date_label) VALUES(?, ?, ?, ?, ?, ?, ?, ?);", Statement.RETURN_GENERATED_KEYS);
                statement.setInt(1, workTimeCalendar.getRefOperatingTime());
                statement.setInt(2, workTimeCalendar.getTotal());
                statement.setString(3, workTimeCalendar.getRefLine());
                statement.setString(4, workTimeCalendar.getRefProduct());
                statement.setString(5, workTimeCalendar.getDate());
                statement.setString(6, workTimeCalendar.getShortDate());
                statement.setString(7, workTimeCalendar.getCrossDate());
                statement.setString(8, workTimeCalendar.getCrossDateLabel());
                return statement;
            }
        }, keyHolder);

        return true;
    }

    @Override
    public boolean update(WorkTimeCalendar workTimeCalendar) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.WorkTimeCalendarSQL.UPDATE.toString(), new Object[]{
                workTimeCalendar.getRefOperatingTime(),
                workTimeCalendar.getTotal(),
                workTimeCalendar.getRefProduct(),
                workTimeCalendar.getCrossDate(),
                workTimeCalendar.getCrossDateLabel(),
                workTimeCalendar.getId()
        });


        if (result == 1) {
            System.out.println("====> workTimeCalendar.getId() ===> " + workTimeCalendar.getId());

            return true;
        }


        return false;
    }

    @Override
    public boolean delete(int id) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.WorkTimeCalendarSQL.DELETE.toString(), new Object[]{id});
        if (result == 1) {
            System.out.println("====> id ===> " + id);

            return true;
        }
        return false;
    }
}