package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.DashBoardFilter2;
import kr.co.fukoku.filters.ProductStatusFilter;
import kr.co.fukoku.model.ProcessAnalysis;
import kr.co.fukoku.model.ProductStatusGraphNew;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;


@Repository
public class ProcessAnalysisRepositoryBody implements ProcessAnalysisRepository {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<ProcessAnalysis> getProcessAnalysisResult(DashBoardFilter2 dashBoardFilter2) throws SQLException {
        try {
            RowMapper<ProcessAnalysis> rowMapper = (rs, rowNum) -> {
                ProcessAnalysis pa = new ProcessAnalysis();

                pa.setLine(rs.getString("line"));
                pa.setMachine(rs.getString("machine"));
                pa.setProduct_model(rs.getString("product_model"));
                pa.setStart_date(rs.getString("start_date"));
                pa.setEnd_date(rs.getString("end_date"));
                pa.setWork_date(rs.getString("work_date"));

                pa.setWorking_time_h(rs.getDouble("working_time_h"));
                pa.setActive_time_h(rs.getDouble("active_time_h"));
                pa.setWorking_nonactive_time_h(rs.getDouble("working_nonactive_time_h"));
                pa.setWorking_nonactive_time_rate(rs.getDouble("working_nonactive_time_rate"));
                pa.setUph(rs.getDouble("uph"));

                pa.setTotal_product(rs.getInt("total_product"));
                pa.setOk_product(rs.getInt("ok_product"));
                pa.setDefective_product(rs.getInt("defective_product"));
                pa.setDefective_product_rate(rs.getDouble("defective_product_rate"));
                pa.setNg_product(rs.getInt("ng_product"));
                pa.setNg_product_rate(rs.getDouble("ng_product_rate"));
                pa.setTheoretical_product_qty(rs.getDouble("theoretical_product_qty"));
                pa.setProcess_cycle_time_s(rs.getDouble("process_cycle_time_s"));
                pa.setTotal_product_rate(rs.getDouble("total_product_rate"));
                pa.setTime_operation_rate(rs.getDouble("time_operation_rate"));
                pa.setOk_product_rate(rs.getDouble("ok_product_rate"));
                pa.setTarget_product_qty(rs.getInt("target_product_qty"));
                pa.setTheoretical_cycle_time_s(rs.getDouble("theoretical_cycle_time_s"));
                pa.setBypassed_product(rs.getInt("bypassed_product"));
                pa.setBypassed_product_rate(rs.getDouble("bypassed_product_rate"));
                pa.setRow_num(rs.getInt("row_num"));

                return pa;
            };

            return jdbcTemplate.query(SQLStatement.DashBoard2.FIND_PROCESS_ANALYSIS.toString(), new Object[]{
                    dashBoardFilter2.getLine(),
                    dashBoardFilter2.getMachine(),
                    dashBoardFilter2.getStart_date(),
                    dashBoardFilter2.getEnd_date()

            }, rowMapper);

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<ProductStatusGraphNew> findAllGraphs(ProductStatusFilter filter) throws SQLException {
        RowMapper<ProductStatusGraphNew> rowMapper = (rs, rowNum) -> {
            ProductStatusGraphNew productStatusGraph = new ProductStatusGraphNew();
            productStatusGraph.setDay(rs.getString("work_date"));
            productStatusGraph.setTotalProduct(rs.getInt("total_product"));
            productStatusGraph.setTimeOperationRate(rs.getDouble("time_operation_rate"));
            productStatusGraph.setOkProductRate(rs.getDouble("ok_product_rate"));
            productStatusGraph.setProcessCycleTime(rs.getDouble("process_cycle_time_s"));
            productStatusGraph.setTheoreticalCycleTime(rs.getDouble("theoretical_cycle_time_s"));
            productStatusGraph.setUph(rs.getDouble("uph"));
            productStatusGraph.setByPassedProductRate(rs.getDouble("bypassed_product_rate"));
            return productStatusGraph;
        };
        return jdbcTemplate.query(SQLStatement.DashBoard2.FIND_PROCESS_ANALYSIS.toString(), new Object[]{
                filter.getLine(),
                filter.getMachine(),
                filter.getStartDate(),
                filter.getEndDate()
        }, rowMapper);
    }
}