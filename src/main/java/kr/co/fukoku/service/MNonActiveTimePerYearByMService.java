package kr.co.fukoku.service;


import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.MFaultTimePerYearByMFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByM;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


public interface MNonActiveTimePerYearByMService {
    List<MNonActiveTimePerYearByM> getTotalHourByMachine(MFaultTimePerYearByMFilter filter) throws BusinessException, IOException;
    List<MNonActiveTimePerYearByM> findMachineName() throws SQLException, BusinessException;
    List<MNonActiveTimePerYearByM> findMachineNameBySelectLine(MFaultTimePerYearByMFilter filter) throws SQLException;
    List<MNonActiveTimePerYearByM> findGraphDataByMachine(MFaultTimePerYearByMFilter filter) throws SQLException;
    List<MNonActiveTimePerYearByM> getMachineName(MFaultTimePerYearByMFilter filter);
    List<MNonActiveTimePerYearByM> getTotalDuration(MFaultTimePerYearByMFilter filter);
    List<MNonActiveTimePerYearByM> getGraphData(MFaultTimePerYearByMFilter filter);
}
