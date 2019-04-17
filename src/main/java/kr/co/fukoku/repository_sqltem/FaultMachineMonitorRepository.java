package kr.co.fukoku.repository_sqltem;



import kr.co.fukoku.model.FaultMachineModel;

import java.sql.SQLException;
import java.util.List;


public interface FaultMachineMonitorRepository {
    List<FaultMachineModel> getFaultDataFromDB(String year) throws SQLException;
    List<FaultMachineModel> getRealOperateTime(String year) throws SQLException;
    List<FaultMachineModel> getFaultDataFromDBWithLine(String year, String line) throws SQLException;
    List<FaultMachineModel> getRealOperateTimeByLIne(String year, String line) throws SQLException;
    List<FaultMachineModel> getRealOperateTimeByMachine(String year, String machine) throws SQLException;
    List<FaultMachineModel> getFaultDataFromDBWithMachine(String year, String machine) throws SQLException;
    List<FaultMachineModel> getFrequencyAlam(String line, String machine, String startDate, String endDate) throws SQLException;
    List<FaultMachineModel> getFrequencyNonMovingState(String line, String machine, String startDate, String endDate) throws SQLException;
    //List<FaultMachineModel> getFrequencyError(String line, String machine,String startDate, String endDate) throws SQLException;
    List<FaultMachineModel> getFrequencyError(String line, String startDate, String endDate) throws SQLException;
}
