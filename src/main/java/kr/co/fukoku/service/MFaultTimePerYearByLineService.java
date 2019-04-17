package kr.co.fukoku.service;



import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.MFaultTimePerYearByLineFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByLine;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


public interface MFaultTimePerYearByLineService {
    List<MNonActiveTimePerYearByLine> getTotalHourByLine(MFaultTimePerYearByLineFilter filter) throws BusinessException, IOException;
    List<MNonActiveTimePerYearByLine> getLineName() throws BusinessException, IOException;
    List<MNonActiveTimePerYearByLine> getGraphData(MFaultTimePerYearByLineFilter filter) throws BusinessException, IOException, SQLException;
    List<MNonActiveTimePerYearByLine> getMachineName(MFaultTimePerYearByLineFilter filter) throws BusinessException, IOException, SQLException;
    List<MNonActiveTimePerYearByLine> getTotalDuration(MFaultTimePerYearByLineFilter filter);
}
