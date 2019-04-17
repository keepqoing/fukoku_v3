package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.model.FaultMachineModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class FaultMachineMonitorRepositoryBory implements FaultMachineMonitorRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<FaultMachineModel> getFaultDataFromDB(String year) throws SQLException{
        try {
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
                FaultMachineModel fm = new FaultMachineModel();
                fm.setLineName(rs.getString("ref_line"));
                //fm.setMachineName(rs.getString("ref_machine"));
                fm.setDuration(Double.parseDouble(rs.getString("duration")));
                fm.setEnd_time(rs.getString("end_time"));
                fm.setMonthly(Integer.parseInt(rs.getString("monthly")));
                return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FIND_FAULT_DATA_BY_YEAR.toString(),
                    new Object[]{
                        year+"%"
                    }, rowMapper);
        } catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public List<FaultMachineModel> getRealOperateTime(String year) throws SQLException{
        try{
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
              FaultMachineModel fm = new FaultMachineModel();
              fm.setLineName(rs.getString("line"));
              fm.setDuration(Double.parseDouble(rs.getString("duration")));
              fm.setMonthly(Integer.parseInt(rs.getString("monthly")));
              return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FIND_FAULT_REAL_OPERATION_TIME_BY_YEAR.toString(),
                    new Object[]{
                            year+"%"
                    }, rowMapper);
        }catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<FaultMachineModel> getFaultDataFromDBWithLine(String year, String line) throws SQLException{
        try {
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
                FaultMachineModel fm = new FaultMachineModel();
                fm.setLineName(rs.getString("ref_line"));
                fm.setMachineName(rs.getString("ref_machine"));
                fm.setDuration(Double.parseDouble(rs.getString("duration")));
                fm.setEnd_time(rs.getString("end_time"));
                fm.setMonthly(Integer.parseInt(rs.getString("monthly")));
                fm.setDisplayName(rs.getString("display_name"));
                return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FIND_FAULT_DATA_BY_LINE.toString(),
                    new Object[]{
                            year+"%",
                            line
                    }, rowMapper);
        } catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<FaultMachineModel> getRealOperateTimeByLIne(String year, String line) throws SQLException{
        try{
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
                FaultMachineModel fm = new FaultMachineModel();
                fm.setLineName(rs.getString("line"));
                fm.setMachineName(rs.getString("machine_name"));
                fm.setDuration(Double.parseDouble(rs.getString("duration")));
                fm.setMonthly(Integer.parseInt(rs.getString("monthly")));
                fm.setDisplayName(rs.getString("display_name"));
                return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FIND_FAULT_REAL_OPERATION_TIME_BY_LINE.toString(),
                    new Object[]{
                            year+"%",
                            line
                    }, rowMapper);
        }catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<FaultMachineModel> getFaultDataFromDBWithMachine(String year, String machine) throws SQLException{
        try {
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
                FaultMachineModel fm = new FaultMachineModel();
                fm.setLineName(rs.getString("ref_line"));
                fm.setMachineName(rs.getString("ref_machine"));
                fm.setDuration(Double.parseDouble(rs.getString("duration")));
                fm.setEnd_time(rs.getString("end_time"));
                fm.setMonthly(Integer.parseInt(rs.getString("monthly")));
                fm.setDisplayName(rs.getString("display_name"));
                return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FINE_FAULT_DATA_BY_MACHINE.toString(),
                    new Object[]{
                            year+"%",
                            "%"+machine+"%"
                    }, rowMapper);
        } catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<FaultMachineModel> getRealOperateTimeByMachine(String year, String machine) throws SQLException{
        try{
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
                FaultMachineModel fm = new FaultMachineModel();
                fm.setLineName(rs.getString("line"));
                fm.setMachineName(rs.getString("machine_name"));
                fm.setDuration(Double.parseDouble(rs.getString("duration")));
                fm.setMonthly(Integer.parseInt(rs.getString("monthly")));
                fm.setDisplayName(rs.getString("display_name"));
                return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FINE_FAULT_REAL_OPERATION_TIME_BY_MACHINE.toString(),
                    new Object[]{
                            year+"%",
                            "%"+machine+"%"
                    }, rowMapper);
        }catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<FaultMachineModel> getFrequencyAlam(String line, String machine,String startDate, String endDate) throws SQLException{
        try{
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
                FaultMachineModel fm = new FaultMachineModel();
                fm.setLineName(rs.getString("ref_line"));
                fm.setMachineName(rs.getString("ref_machine"));
                fm.setEnd_time(rs.getString("end_time"));
                fm.setAlarmCode(rs.getString("alarm_code"));
                fm.setAlarmName(rs.getString("alarm_name"));
                fm.setFrequency(rs.getString("frequency"));
                return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FIND_FREQUENCY_FAULT_CODE.toString(),
                    new Object[]{
                            line,
                            machine,
                            startDate,
                            endDate
                    }, rowMapper);
        }catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<FaultMachineModel> getFrequencyNonMovingState(String line, String machine,String startDate, String endDate) throws SQLException{
        try{
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
                FaultMachineModel fm = new FaultMachineModel();
                fm.setLineName(rs.getString("ref_line"));
                fm.setMachineName(rs.getString("ref_machine"));
                fm.setEnd_time(rs.getString("end_time"));
                fm.setAlarmCode(rs.getString("alarm_code"));
                fm.setAlarmName(rs.getString("alarm_name"));
                fm.setFrequency(rs.getString("frequency"));
                fm.setmState(rs.getString("mstate"));
                return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FIND_FREQUENCY_NON_MOVE_STATE.toString(),
                    new Object[]{
                            line,
                            machine,
                            startDate,
                            endDate
                    }, rowMapper);
        }catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<FaultMachineModel> getFrequencyError(String line,String startDate, String endDate) throws SQLException{
        try{
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
                FaultMachineModel fm = new FaultMachineModel();
                fm.setLineName(rs.getString("ref_line"));
                fm.setMachineName(rs.getString("ref_machine"));
                fm.setEnd_time(rs.getString("end_time"));
                fm.setAlarmCode(rs.getString("alarm_code"));
                fm.setAlarmName(rs.getString("alarm_name"));
                fm.setErrorName(rs.getString("error"));
                fm.setErrorCount(Integer.parseInt(rs.getString("error_count")));
                fm.setItemName(rs.getString("item"));
                fm.setItemCount(Integer.parseInt(rs.getString("item_count")));
                fm.setSubItemNamet(rs.getString("sub_item"));
                fm.setSubItemCount(Integer.parseInt(rs.getString("sub_item_count")));
                fm.setTreatment(rs.getString("treatment"));
                fm.setTreatmentCount(Integer.parseInt(rs.getString("treatment_count")));
                return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FIND_FREQUENCY_ERROR_STATE.toString(),
                    new Object[]{
                            "%"+line+"%",
                            startDate,
                            endDate
                    }, rowMapper);
        }catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
    /*public List<FaultMachineModel> getFrequencyError(String line, String machine,String startDate, String endDate) throws SQLException{
        try{
            RowMapper<FaultMachineModel> rowMapper = (rs, rowNum) -> {
                FaultMachineModel fm = new FaultMachineModel();
                fm.setLineName(rs.getString("ref_line"));
                fm.setMachineName(rs.getString("ref_machine"));
                fm.setEnd_time(rs.getString("end_time"));
                fm.setAlarmCode(rs.getString("alarm_code"));
                fm.setAlarmName(rs.getString("alarm_name"));
                fm.setFrequency(rs.getString("frequency"));
                fm.setErrorName(rs.getString("error"));
                fm.setErrorCount(Integer.parseInt(rs.getString("error_count")));
                fm.setItemName(rs.getString("item"));
                fm.setItemCount(Integer.parseInt(rs.getString("item_count")));
                fm.setSubItemNamet(rs.getString("sub_item"));
                fm.setSubItemCount(Integer.parseInt(rs.getString("sub_item_count")));
                fm.setTreatment(rs.getString("treatment"));
                fm.setTreatmentCount(Integer.parseInt(rs.getString("treatment_count")));
                return fm;
            };
            return jdbcTemplate.query(SQLStatement.FaultMachineMonitor.FIND_FREQUENCY_ERROR_STATE.toString(),
                    new Object[]{
                            line,
                            startDate,
                            endDate
                    }, rowMapper);
        }catch (EmptyResultDataAccessException e){
            System.out.println("Error");
            e.printStackTrace();
            return new ArrayList<>();
        }
    }*/


    /*public static void main(String arg[]){
        FaultMachineMonitorRepositoryBory faultMachineMonitorRepositoryBory = new FaultMachineMonitorRepositoryBory();
        List<FaultMachineModel> lstModel= new ArrayList<>();
    }*/
}
