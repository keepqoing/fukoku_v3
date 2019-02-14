package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.OperatingTimeFilter;
import kr.co.fukoku.model.OperatingTime;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class OperatingTimeRepositoryBody implements OperatingTimeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<OperatingTime> findAll(OperatingTimeFilter operatingTimeFilter, Pagination pagination) throws SQLException {
        pagination.setTotalCount(count(operatingTimeFilter));
        RowMapper<OperatingTime> rowMapper = (rs, rowNum) -> {
            OperatingTime operatingTime = new OperatingTime(
                    rs.getInt("id"),
                    rs.getString("working_code"),
                    rs.getString("working_type_name"),
                    rs.getString("work_type_name"),
                    rs.getString("time_tag"),
                    rs.getString("action_type"),
                    rs.getString("start_time"),
                    rs.getString("end_time"),
                    rs.getInt("ref_item"),
                    rs.getString("start_day"),
                    rs.getString("end_day"),
                    rs.getString("start_date"),
                    rs.getString("end_date")
            );
            operatingTime.setDuration(rs.getInt("duration"));
            operatingTime.setLine(rs.getString("ref_line"));
            return operatingTime;
        };
        if(operatingTimeFilter.getActionType().equals("") && operatingTimeFilter.getWorkingTypeName().equals("")) {
            return jdbcTemplate.query(SQLStatement.OperatingTimeSQL.FIND_ALL.toString(), new Object[]{"%"+operatingTimeFilter.getLine()+"%",pagination.getLimit(), pagination.getOffset()}, rowMapper);
        }else if(!operatingTimeFilter.getActionType().equals("") && operatingTimeFilter.getWorkingTypeName().equals("")) {
            return jdbcTemplate.query(SQLStatement.OperatingTimeSQL.FIND_ALL_BY_ACTION_TYPE.toString(), new Object[]{"%"+operatingTimeFilter.getLine()+"%",operatingTimeFilter.getActionType(), pagination.getLimit(), pagination.getOffset()}, rowMapper);
        }else if(!operatingTimeFilter.getActionType().equals("") && !operatingTimeFilter.getWorkingTypeName().equals("")) {
            return jdbcTemplate.query(SQLStatement.OperatingTimeSQL.FIND_ALL_BY_ACTION_TYPE_AND_WORKING_TYPE_NAME.toString(), new Object[]{"%"+operatingTimeFilter.getLine()+"%",operatingTimeFilter.getWorkingTypeName(), operatingTimeFilter.getActionType(), pagination.getLimit(), pagination.getOffset()}, rowMapper);
        }else if(operatingTimeFilter.getActionType().equals("") && !operatingTimeFilter.getWorkingTypeName().equals("")) {
            return jdbcTemplate.query(SQLStatement.OperatingTimeSQL.FIND_ALL_BY_WORKING_TYPE_NAME.toString(), new Object[]{"%"+operatingTimeFilter.getLine()+"%",operatingTimeFilter.getActionType(), pagination.getLimit(), pagination.getOffset()}, rowMapper);
        }else {
            return null;
        }
    }

    @Override
    public List<OperatingTime> findAll() throws SQLException {
        RowMapper<OperatingTime> rowMapper = (rs, rowNum) -> {
            OperatingTime operatingTime = new OperatingTime(
                    rs.getInt("id"),
                    rs.getString("working_code"),
                    rs.getString("working_type_name"),
                    rs.getString("work_type_name"),
                    rs.getString("time_tag"),
                    rs.getString("action_type"),
                    rs.getString("start_time"),
                    rs.getString("end_time"),
                    rs.getInt("ref_item"),
                    rs.getString("start_day"),
                    rs.getString("end_day"),
                    rs.getString("start_date"),
                    rs.getString("end_date")
            );
            return operatingTime;
        };
        return jdbcTemplate.query(SQLStatement.OperatingTimeSQL.FIND_ALL_BY_WORKING_TIME_FOR_SELECT_BOX.toString(), new Object[]{}, rowMapper);
    }

    @Override
    public List<OperatingTime> findAllTimeRange(OperatingTimeFilter filter) throws SQLException {
        RowMapper<OperatingTime> rowMapper = (rs, rowNum) -> {
            OperatingTime operatingTime = new OperatingTime();
            operatingTime.setStartDate(rs.getString("start_date"));
            operatingTime.setDuration(rs.getDouble("duration"));
            return operatingTime;
        };
        return jdbcTemplate.query(SQLStatement.OperatingTimeSQL.FIND_ALL_BY_TIME_RANGE.toString(), new Object[]{filter.getStartTime(),filter.getEndTime(),filter.getStartTime(),filter.getEndTime()}, rowMapper);
    }

    @Override
    public OperatingTime findOne(int id) throws SQLException {
        try {
            RowMapper<OperatingTime> rowMapper = (rs, rowNum) -> {
                OperatingTime operatingTime = new OperatingTime(
                        rs.getInt("id"),
                        rs.getString("working_code"),
                        rs.getString("working_type_name"),
                        rs.getString("work_type_name"),
                        rs.getString("time_tag"),
                        rs.getString("action_type"),
                        rs.getString("start_time"),
                        rs.getString("end_time"),
                        rs.getInt("ref_item"),
                        rs.getString("start_day"),
                        rs.getString("end_day"),
                        rs.getString("start_date"),
                        rs.getString("end_date")
                );
                operatingTime.setDuration(rs.getDouble("duration"));
                operatingTime.setLine(rs.getString("ref_line"));
                return operatingTime;
            };
            return jdbcTemplate.queryForObject(SQLStatement.OperatingTimeSQL.FIND_BY_ID.toString(),
                    new Object[]{
                            id
                    }, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public boolean save(OperatingTime operatingTime) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.OperatingTimeSQL.ADD.toString(), new Object[]{
                operatingTime.getWorkingCode(),
                operatingTime.getWorkingTypeName(),
                operatingTime.getWorkTypeName(),
                operatingTime.getTimeTag(),
                operatingTime.getActionType(),
                operatingTime.getStartTime(),
                operatingTime.getEndTime(),
                operatingTime.getDuration(),
                operatingTime.getItem(),
                operatingTime.getStartDay(),
                operatingTime.getEndDay(),
                operatingTime.getStartDate(),
                operatingTime.getEndDate(),
                operatingTime.getLine()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean update(OperatingTime operatingTime) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.OperatingTimeSQL.UPDATE.toString(), new Object[]{
                operatingTime.getWorkingCode(),
                operatingTime.getWorkingTypeName(),
                operatingTime.getWorkTypeName(),
                operatingTime.getTimeTag(),
                operatingTime.getActionType(),
                operatingTime.getStartTime(),
                operatingTime.getEndTime(),
                operatingTime.getDuration(),
                operatingTime.getItem(),
                operatingTime.getStartDay(),
                operatingTime.getEndDay(),
                operatingTime.getStartDate(),
                operatingTime.getEndDate(),
                operatingTime.getLine(),
                operatingTime.getId()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.OperatingTimeSQL.DELETE.toString(),
                new Object[]{
                        id
                });
        if (result == 1) {
            return true;
        }
        return false;
    }

    private Long count(OperatingTimeFilter operatingTimeFilter){
        if(operatingTimeFilter.getActionType().equals("") && operatingTimeFilter.getWorkingTypeName().equals(""))
            return jdbcTemplate.queryForObject(SQLStatement.OperatingTimeSQL.COUNT_ALL.toString(), new Object[]{"%"+operatingTimeFilter.getLine()+"%"}, Long.class);
        else if(!operatingTimeFilter.getActionType().equals("") && operatingTimeFilter.getWorkingTypeName().equals(""))
            return jdbcTemplate.queryForObject(SQLStatement.OperatingTimeSQL.COUNT_ALL_BY_ACTION_TYPE.toString(), new Object[]{"%"+operatingTimeFilter.getLine()+"%",operatingTimeFilter.getActionType()}, Long.class);
        else if(!operatingTimeFilter.getActionType().equals("") && !operatingTimeFilter.getWorkingTypeName().equals(""))
            return jdbcTemplate.queryForObject(SQLStatement.OperatingTimeSQL.COUNT_ALL_BY_ACTION_TYPE_AND_WORKING_TYPE_NAME.toString(), new Object[]{"%"+operatingTimeFilter.getLine()+"%",operatingTimeFilter.getWorkingTypeName(), operatingTimeFilter.getActionType()}, Long.class);
        else if(operatingTimeFilter.getActionType().equals("") && !operatingTimeFilter.getWorkingTypeName().equals(""))
            return jdbcTemplate.queryForObject(SQLStatement.OperatingTimeSQL.COUNT_ALL_WORKING_TYPE_NAME.toString(), new Object[]{"%"+operatingTimeFilter.getLine()+"%",operatingTimeFilter.getActionType()}, Long.class);
        else
            return 0L;
    }
}