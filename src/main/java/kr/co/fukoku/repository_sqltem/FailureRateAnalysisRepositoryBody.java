package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.FailureRateAnalysisFilter;
import kr.co.fukoku.model.FailureRateAnalysis;
import kr.co.fukoku.model.MNonActiveTimePerYearByM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class FailureRateAnalysisRepositoryBody implements FailureRateAnalysisRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public FailureRateAnalysisRepositoryBody() {
    }

    @Override
    public List<FailureRateAnalysis> findFailureTimeStopAutoWait(FailureRateAnalysisFilter filter) throws SQLException {
        System.out.println("@@@@@@@@@@@@@@@@@findFailureTimeStopAutoWait@@@@@@@@@@@@@@@@@");

        RowMapper<FailureRateAnalysis> rowMapper = (rs, rowNum) -> {
            FailureRateAnalysis failureRateAnalysis = new FailureRateAnalysis(

                    rs.getString("line"),
                    rs.getString("machine"),
                    rs.getString("mtbf"),
                    rs.getString("mttr"),
                    rs.getString("date"),
                    rs.getString("stop_auto_wait"),
                    rs.getString("activetime"),
                    rs.getString("workingtime"),
                    rs.getString("planingnonworkingtime"),
                    rs.getString("freqmtbf")


            );
           // System.out.println("VBVB "+rs.getString("mstate"));
            return failureRateAnalysis;
        };
        return jdbcTemplate.query(SQLStatement.FailureTimeStopWait.FIND_FAILURE_PER_MONTH2.toString(), new Object[]{filter.getLineName(),filter.getLineName()+"_"+filter.getMachineName(),filter.getStartTime()}, rowMapper);

    }

    @Override
    public List<FailureRateAnalysis> findMachineName() throws SQLException {
        System.out.println("@@@@@@@@@@@@@@@findMachineName()@@@@@@@@@@@@@@@@@@@");

        RowMapper<MNonActiveTimePerYearByM> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByM mFaultTimePerYearByMachine = new MNonActiveTimePerYearByM(

                    rs.getString("machine")
            );
            return mFaultTimePerYearByMachine;
        };
        return null/*jdbcTemplate.query(SQLStatement.MFaultTimePerYearByMachine.FIND_MACHINE_NAME.toString(), new Object[]{}, rowMapper)*/;
    }



}
