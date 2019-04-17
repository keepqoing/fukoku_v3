package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.filters.NonActiveStateFilter;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.model.NonActiveState;

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
public class NonActiveStateRepositoryBody implements NonActiveStateRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
//    @Autowired
//    private MachineRepository machineRepository;

    @Override
    public List<NonActiveState> findAll(NonActiveStateFilter filter, Pagination pagination) {
        pagination.setTotalCount(count(filter));
//        Map<String, String> map = machineService.getAllMachineNameAndMapping();
//        List<Machine> map = machineRepository.findAllMachines();
        RowMapper<NonActiveState> rowMapper = (rs, rowNum) -> {
            NonActiveState nonActiveState = new NonActiveState();
            nonActiveState.setId(rs.getInt("id"));
            nonActiveState.setLine(rs.getString("ref_line"));
            nonActiveState.setMachine(rs.getString("ref_machine"));
            nonActiveState.setProduct(rs.getString("ref_product"));
            nonActiveState.setmState(findString(rs.getString("mstate")));
            nonActiveState.setWorkDate(rs.getString("work_date"));
            nonActiveState.setStartTime(rs.getString("start_time").replace("T", " "));
            nonActiveState.setEndTime(rs.getString("end_time").replace("T", " "));
            nonActiveState.setDuration(Helper.secondsToString(Integer.parseInt(rs.getString("duration").toString())));
            nonActiveState.setAlarmCode(rs.getString("alarm_code"));
            nonActiveState.setAlarmName(rs.getString("alarm_name"));



            return nonActiveState;
        };
        return jdbcTemplate.query(SQLStatement.NonActiveStateSQL.FIND_ALL.toString(), new Object[]
                {
                        "%" + filter.getLine() + "%"
                        , "%" + filter.getMachine() + "%"
                        , "%" + filter.getProductionDate() + "%"
                        , pagination.getLimit()
                        , pagination.getOffset()
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
        return jdbcTemplate.query(SQLStatement.NonActiveStateSQL.COUNT_NUMBER_BY_LINE.toString(), new Object[]{"%" + productionDate + "%"}, rowMapper);
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
        return jdbcTemplate.query(SQLStatement.NonActiveStateSQL.COUNT_NUMBER_BY_MACHINE.toString(), new Object[]{"%" + productionDate + "%", line}, rowMapper);
    }

    @Override
    public boolean save(NonActiveState nonActiveState) {
        int result = jdbcTemplate.update(SQLStatement.NonActiveStateSQL.ADD.toString(), new Object[]{
                nonActiveState.getLine(),
                nonActiveState.getMachine(),
                nonActiveState.getProduct(),
                nonActiveState.getmState(),
                nonActiveState.getWorkDate(),
                nonActiveState.getStartTime(),
                nonActiveState.getEndTime(),
                nonActiveState.getDuration(),
                nonActiveState.getAlarmCode(),
                nonActiveState.getAlarmName(),
                nonActiveState.getDepartment()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public List<FreqValue> countFreqValue(FreqValueFilter filter) {
//        Map<String, String> map = machineService.getAllMachineNameAndMapping();
        RowMapper<FreqValue> rowMapper = (rs, rowNum) -> {
            FreqValue freqValue = new FreqValue(
                    rs.getInt("counting"),
                    rs.getString("ref_line") + " " + rs.getString("ref_machine")+": [" + rs.getString("alarm_name")+"]"
            );
            return freqValue;
        };
        return jdbcTemplate.query(SQLStatement.NonActiveStateSQL.FIND_FREQ.toString(), new Object[]{"%"+filter.getLine()+"%", filter.getStartDate(), filter.getEndDate(), filter.getLimit()}, rowMapper);
    }

    @Override
    public List<FreqValue> countMSFreqValue(FreqValueFilter filter) {
//        Map<String, String> map = machineService.getAllMachineNameAndMapping();
        RowMapper<FreqValue> rowMapper = (rs, rowNum) -> {
            FreqValue freqValue = new FreqValue(
                    rs.getInt("counting"),
                    rs.getString("ref_line") + " " + rs.getString("ref_machine")+": [" + rs.getString("mstate")+"]"
            );
            return freqValue;
        };
        return jdbcTemplate.query(SQLStatement.NonActiveStateSQL.FIND_MS_FREQ.toString(), new Object[]{"%"+filter.getLine()+"%", filter.getStartDate(), filter.getEndDate(), filter.getLimit()}, rowMapper);
    }

    @Override
    public boolean addNew(NonActiveState nonActiveState) {
        if(countByMStateID(nonActiveState.getmState()) > 0){
            return updateEndTimeAndDuration(nonActiveState.getEndTime(), nonActiveState.getDuration(), nonActiveState.getmState());
        }else{
            return save(nonActiveState);

        }
    }

    @Override
    public boolean updateEndTimeAndDuration(String endTime, String duration, String mstateId) {
        int result = jdbcTemplate.update(SQLStatement.NonActiveStateSQL.UPDATE_ENDTIME_DURATION.toString(), new Object[]
                {
                        endTime,
                        duration,
                        mstateId
                });
        return result!=0;
    }

    @Override
    public int countByMStateID(String mstateId) {
       return jdbcTemplate.queryForObject(SQLStatement.NonActiveStateSQL.COUNT_BY_MSTATE_ID.toString(), new Object[]
               {
                       mstateId
               }, Integer.class);

    }

    private Long count(NonActiveStateFilter filter) {
        return jdbcTemplate.queryForObject(SQLStatement.NonActiveStateSQL.COUNT.toString(), new Object[]
                {
                        "%" + filter.getLine() + "%"
                        , "%" + filter.getMachine() + "%"
                        , "%" + filter.getProductionDate() + "%"
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
