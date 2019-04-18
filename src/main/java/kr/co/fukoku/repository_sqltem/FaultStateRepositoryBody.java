package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.FaultState;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class FaultStateRepositoryBody implements FaultStateRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;
//    @Autowired
//    private MachineService machineService;

    @Override
    public List<FaultState> findAll(FaultStateFilter faultStateFilter, Pagination pagination) {
//        Map<String, String> map = machineService.getAllMachineNameAndMapping();
        pagination.setTotalCount(count(faultStateFilter));
        RowMapper<FaultState> rowMapper = (rs, rowNum) -> {
            FaultState faultState = new FaultState(
                    rs.getInt("id"),
                    rs.getString("ref_line"),
                    rs.getString("ref_machine"),
                    rs.getString("ref_product"),
                    rs.getString("mstate"),
                    rs.getString("work_date"),
                    rs.getString("start_time"),
                    rs.getString("end_time"),
//                    Helper.secondsToString(Integer.parseInt(Helper.getDateRangeInSecond(rs.getString("start_time"), rs.getString("end_time")).toString())),
                    rs.getString("duration"),
                    rs.getString("alarm_name"),
                    rs.getString("alarm_code"),
                    rs.getString("item"),
                    rs.getString("sub_item"),
                    rs.getString("error"),
                    rs.getString("treatment"),
                    rs.getString("department"),
                    ""
            );
            return faultState;
        };
        return jdbcTemplate.query(SQLStatement.FaultStateSQL.FIND_ALL.toString(), new Object[]{
                "%"+faultStateFilter.getLine()+"%",
                "%"+faultStateFilter.getMachine()+"%",
                "%"+faultStateFilter.getDepartment()+"%",
                "%"+faultStateFilter.getProductionDate()+"%",
                pagination.getLimit(),pagination.getOffset()},
                rowMapper);
    }

    @Override
    public List<Counting> findNumberByLine(String dep, String productionDate) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("_name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.FaultStateSQL.COUNT_NUMBER_BY_LINE.toString(), new Object[]{"%"+dep+"%","%"+productionDate+"%"}, rowMapper);
    }

    @Override
    public List<Counting> findNumberByMachine(String line, String dep, String productionDate) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("mapping_name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.FaultStateSQL.COUNT_NUMBER_BY_MACHINE.toString(), new Object[]{"%"+dep+"%","%"+productionDate+"%",line}, rowMapper);
    }

    @Override
    public Long save(FaultState faultState) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(
                new PreparedStatementCreator() {
                    public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                        PreparedStatement ps = connection.prepareStatement(SQLStatement.FaultStateSQL.ADD.toString(), new String[] {"ref_line","ref_machine",
                                "ref_product","mstate","work_date", "start_time","end_time","duration","alarm_code","alarm_name","item","sub_item","error","treatment","department","identifier"});
                        ps.setString(1, faultState.getLine());
                        ps.setString(2, faultState.getMachine());
                        ps.setString(3, faultState.getProduct());
                        ps.setString(4, faultState.getmState());
                        ps.setString(5, faultState.getWorkDate());
                        ps.setString(6, faultState.getStartTime());
                        ps.setString(7, faultState.getEndTime());
                        ps.setString(8, faultState.getDuration());
                        ps.setString(9, faultState.getAlarmCode());
                        ps.setString(10, faultState.getAlarmName());
                        ps.setString(11, faultState.getItem());
                        ps.setString(12, faultState.getSubItem());
                        ps.setString(13, faultState.getError());
                        ps.setString(14, faultState.getTreatment());
                        ps.setString(15, faultState.getDepartment());
                        ps.setString(16, faultState.getIdentifier());
                        return ps;
                    }
                },
                keyHolder);
        return (Long) keyHolder.getKey();
    }
    private Long count(FaultStateFilter filter){
        return jdbcTemplate.queryForObject(SQLStatement.FaultStateSQL.COUNT.toString(), new Object[]{"%" + filter.getLine() + "%", "%" + filter.getMachine() + "%","%"+filter.getDepartment()+"%","%"+filter.getProductionDate()+"%"}, Long.class);
    }

    @Override
    public List<FreqValue> findFreqValue(FreqValueFilter filter) {
//        Map<String, String> map = machineService.getAllMachineNameAndMapping();
        RowMapper<FreqValue> rowMapper = (rs, rowNum) -> {
            FreqValue freqValue = new FreqValue(
                    rs.getInt("counting"),
                    rs.getString("ref_machine")+": [" + rs.getString("alarm_code")+"]"
            );
            return freqValue;
        };
        return jdbcTemplate.query(SQLStatement.FaultStateSQL.FREQ_VALUE.toString(), new Object[]{"%"+filter.getLine()+"%", filter.getStartDate(), filter.getEndDate()}, rowMapper);
    }

    @Override
    public boolean delete(int id) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.FaultStateSQL.DELETE.toString(), new Object[]{
                id
        });
        if (result == 1) {
            return true;
        }
        return false;
    }


}
