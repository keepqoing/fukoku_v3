package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.model.FaultState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FaultAprioriRepositoryBody implements FaultAprioriRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<FaultState> findAll(FaultStateFilter faultStateFilter) {
        RowMapper<FaultState> rowMapper = (rs, rowNum) -> {
            FaultState faultState = new FaultState(
                    rs.getInt("id"),
                    rs.getString("ref_line"),
                    rs.getString("ref_machine"),
                    rs.getString("ref_product"),
                    rs.getString("mstate"),
                    rs.getString("work_date"),
                    rs.getString("start_time"),
                    rs.getString("end_time"),
//                    Helper.secondsToString(Integer.parseInt(Helper.getDateRangeInSecond(rs.getString("start_time"), rs.getString("end_time")).toString())),
                    rs.getString("duration"),
                    rs.getString("alarm_name"),
                    rs.getString("alarm_code"),
                    rs.getString("item"),
                    rs.getString("sub_item"),
                    rs.getString("error"),
                    rs.getString("treatment"),
                    rs.getString("department"),
                    ""
            );
            return faultState;
        };

        return jdbcTemplate.query(SQLStatement.FaultAprioriSQL.FIND_ALL.toString(),
                rowMapper);
    }


}
