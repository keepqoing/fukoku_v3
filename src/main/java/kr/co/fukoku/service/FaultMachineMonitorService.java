package kr.co.fukoku.service;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.model.FaultMachineModel;

import java.util.List;

public interface FaultMachineMonitorService {
    List<FaultMachineModel> getFaultMachineData(String year) throws BusinessException;
    List<FaultMachineModel> getFaultMachineDataByLine(String year, String line) throws BusinessException;
    List<FaultMachineModel> getFaultMachineDataByMachine(String year, String machine) throws BusinessException;
    List<FaultMachineModel> getFrequencyAlarm(FaultMachineModel fm);
    List<FaultMachineModel> getFrequencyNonMovingState(FaultMachineModel fm);
    List<FaultMachineModel> getFrequencyError(FaultMachineModel fm);
}
