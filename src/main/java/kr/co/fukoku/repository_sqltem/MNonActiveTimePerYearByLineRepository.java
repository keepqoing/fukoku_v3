package kr.co.fukoku.repository_sqltem;



import kr.co.fukoku.filters.MFaultTimePerYearByLineFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByLine;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


public interface MNonActiveTimePerYearByLineRepository {
    List<MNonActiveTimePerYearByLine> findTotalHourByLine(MFaultTimePerYearByLineFilter filter) throws SQLException, IOException;
    List<MNonActiveTimePerYearByLine> findLineName() throws SQLException, IOException;
    List<MNonActiveTimePerYearByLine> findGraphData(MFaultTimePerYearByLineFilter filter) throws SQLException, IOException;
    List<MNonActiveTimePerYearByLine> findMachineName(MFaultTimePerYearByLineFilter filter);
    List<MNonActiveTimePerYearByLine> findTotalDuraton(MFaultTimePerYearByLineFilter filter);
}
