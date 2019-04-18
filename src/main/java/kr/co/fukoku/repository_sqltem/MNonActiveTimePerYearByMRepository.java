package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.MFaultTimePerYearByMFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByM;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface MNonActiveTimePerYearByMRepository {
    List<MNonActiveTimePerYearByM> fineTotalHourByMachine(MFaultTimePerYearByMFilter filter) throws SQLException, IOException;
    List<MNonActiveTimePerYearByM> findMachineName() throws SQLException, BusinessException;
    List<MNonActiveTimePerYearByM> findMachineNameBySelectLine(MFaultTimePerYearByMFilter filter) throws SQLException;
    List<MNonActiveTimePerYearByM> findGraphDataByMachine(MFaultTimePerYearByMFilter filter) throws SQLException;
    List<MNonActiveTimePerYearByM> findMachineNameInAllLine(MFaultTimePerYearByMFilter filter);
    List<MNonActiveTimePerYearByM> findNonOperationTimeEachMachine(MFaultTimePerYearByMFilter filter);
    List<MNonActiveTimePerYearByM> findGraphData(MFaultTimePerYearByMFilter filter);
}
