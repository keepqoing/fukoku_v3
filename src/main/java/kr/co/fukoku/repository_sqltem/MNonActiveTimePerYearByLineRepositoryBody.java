
package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.MFaultTimePerYearByLineFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByLine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.List;


@Repository
public class MNonActiveTimePerYearByLineRepositoryBody implements MNonActiveTimePerYearByLineRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    public MNonActiveTimePerYearByLineRepositoryBody() {
    }

    @Override
    public List<MNonActiveTimePerYearByLine> findTotalHourByLine(MFaultTimePerYearByLineFilter filter) throws SQLException {
        System.out.println("!!!!!!!!!!!!!!!!!!!!! "+filter.getLineName()+" "+filter.getStartTime());
        RowMapper<MNonActiveTimePerYearByLine> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByLine mFaultTimePerYearByLine = new MNonActiveTimePerYearByLine(
                    rs.getString("line"),
                    rs.getString("machine"),
                    rs.getString("s_m_1"),
                    rs.getString("s_m_2"),
                    rs.getString("s_m_3"),
                    rs.getString("s_m_4"),
                    rs.getString("s_m_5"),
                    rs.getString("s_m_6"),
                    rs.getString("s_m_7"),
                    rs.getString("s_m_8"),
                    rs.getString("s_m_9"),
                    rs.getString("s_m_10"),
                    rs.getString("s_m_11"),
                    rs.getString("s_m_12"),
                    rs.getString("total_active"),
                    rs.getString("total_stoptime"),
                    "0"

            );
            return mFaultTimePerYearByLine;
        };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByLine.NON_ACTIVE_BY_LINE.toString(), new Object[]{filter.getLineName(),filter.getStartTime()}, rowMapper);
    }

    @Override
    public List<MNonActiveTimePerYearByLine> findLineName() {

        RowMapper<MNonActiveTimePerYearByLine> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByLine findLineName = new MNonActiveTimePerYearByLine(
                    rs.getString("line")
            );
            return findLineName;
        };
        return jdbcTemplate.query(SQLStatement.findEachMonthAsHours.FIND_LINE_NAME.toString(), new Object[]{}, rowMapper);
    }

    @Override
    public List<MNonActiveTimePerYearByLine> findGraphData(MFaultTimePerYearByLineFilter filter) throws SQLException, IOException {
        RowMapper<MNonActiveTimePerYearByLine> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByLine mFaultTimePerYearByLine = new MNonActiveTimePerYearByLine(
                    rs.getString("date"),
                    rs.getString("line"),
                    new DecimalFormat("##.###").format(Double.valueOf(rs.getString("stop_auto_wait"))),
                    rs.getString("machine"),
                    "",
                    ""

            );
            return mFaultTimePerYearByLine;
        };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByLine.STOP_AUTO_STOP_WAIT_Graph.toString(), new Object[]{filter.getLineName(),filter.getStartTime()}, rowMapper);

    }

    @Override
    public List<MNonActiveTimePerYearByLine> findMachineName(MFaultTimePerYearByLineFilter filter) {
        RowMapper<MNonActiveTimePerYearByLine> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByLine mFaultTimePerYearByMachine = new MNonActiveTimePerYearByLine(

                    rs.getString("machine"),""
            );
            //System.out.println("PreFix_Machine_Name: "+rs.getString("machine"));
            return mFaultTimePerYearByMachine;
        };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByMachine.FIND_MACHINE_NAME_BY_LINE.toString(), new Object[]{filter.getLineName()}, rowMapper);


    }

    @Override
    public List<MNonActiveTimePerYearByLine> findTotalDuraton(MFaultTimePerYearByLineFilter filter) {
        System.out.println("<<<<<>>>>>> "+filter.getStartTime()+" Korea:"+filter.getMachineName()+" "+filter.getLineName()+" Eng:"+filter.getMachineNameEng());
        RowMapper<MNonActiveTimePerYearByLine> rowMapper = null;
        try {
            rowMapper = (rs, rowNum) -> {
                MNonActiveTimePerYearByLine mFaultTimePerYearByAllLine = new MNonActiveTimePerYearByLine();
                mFaultTimePerYearByAllLine.setNon_operating_time(rs.getDouble("Non_operating_rate"));
                return mFaultTimePerYearByAllLine;
            };
        } catch (EmptyResultDataAccessException e){
            System.out.println("ERROR ========> " + e.getMessage());
            e.printStackTrace();
            return null;
        }
        return jdbcTemplate.query(SQLStatement.MFAULTTIMEBREAKDOWNTIMEANALYSISBYLINE.GET_DATAFAULTIME_BY_MACHINE.toString(), new Object[]{filter.getStartTime()+"%",filter.getMachineNameEng(),filter.getMachineNameEng(),filter.getStartTime()+"%",filter.getStartTime()+"%",filter.getMachineName(),filter.getLineName()}, rowMapper);

    }
}
