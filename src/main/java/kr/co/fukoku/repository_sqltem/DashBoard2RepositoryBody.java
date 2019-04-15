package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.DashBoardFilter2;
import kr.co.fukoku.model.DailyMstateAnalysis;
import kr.co.fukoku.model.DashBoard2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class DashBoard2RepositoryBody implements DashBoard2Repository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<DashBoard2> getDashBoardResult(DashBoardFilter2 dashBoardFilter2) throws SQLException {
        try {
            RowMapper<DashBoard2> rowMapper = (rs, rowNum) -> {
                DashBoard2 dashBoard2 = new DashBoard2();
                dashBoard2.setWork_plan(rs.getString("work_plan"));
//            dashBoard2.setPlanned_work_time(rs.getString("planned_work_time"));
                dashBoard2.setWorking_time(rs.getDouble("working_time"));
                dashBoard2.setWk_non_active_time(rs.getDouble("wk_non_active_time"));

                dashBoard2.setTheoretical_cycle_time(rs.getDouble("theoretical_cycle_time"));
                dashBoard2.setTarget_product_qty(rs.getDouble("target_product_qty"));

//            dashBoard2.setNon_active_time(rs.getString("non_active_time"));
//            dashBoard2.setPlanned_stop_time(rs.getString("planned_stop_time"));
//            dashBoard2.setNon_planned_stop_time(rs.getString("non_planned_stop_time"));
                dashBoard2.setTotal_product(rs.getDouble("total_product"));
                dashBoard2.setBypassed_product(rs.getDouble("bypassed_product"));
                dashBoard2.setNg_product(rs.getDouble("ng_product"));
                dashBoard2.setTime_operation_rate(rs.getDouble("time_operation_rate"));
                dashBoard2.setTotal_product_rate(rs.getDouble("total_product_rate"));
                dashBoard2.setBypassed_product_rate(rs.getDouble("bypassed_product_rate"));
                dashBoard2.setMachine_efficiency_rate(rs.getDouble("machine_efficiency_rate"));


                return dashBoard2;
            };
//            System.out.println(SQLStatement.DashBoard2.FIND_DASHBOARD2.toString());
//            System.out.println("dashBoardFilter2.getLine()" + dashBoardFilter2.getLine());
//            System.out.println("dashBoardFilter2.getMachine()" + dashBoardFilter2.getMachine());
//            System.out.println("dashBoardFilter2.getStart_date()" + dashBoardFilter2.getStart_date());
//            System.out.println("dashBoardFilter2.getEnd_date()" + dashBoardFilter2.getEnd_date());
//            System.out.println("dashBoardFilter2.getEnd_time()" + dashBoardFilter2.getEnd_time());

            return jdbcTemplate.query(SQLStatement.DashBoard2.FIND_DASHBOARD2.toString(), new Object[]{
                    dashBoardFilter2.getLine(),
                    dashBoardFilter2.getMachine(),
                    dashBoardFilter2.getStart_date(),
                    dashBoardFilter2.getEnd_date(),
                    dashBoardFilter2.getEnd_time()
            }, rowMapper);

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<DailyMstateAnalysis> getDailyMStateAnalysis(DashBoardFilter2 dashBoardFilter2) throws SQLException {
        try {
            RowMapper<DailyMstateAnalysis> rowMapper = (rs, rowNum) -> {
                DailyMstateAnalysis d = new DailyMstateAnalysis();
                d.setLine(rs.getString("line"));
                d.setMachine(rs.getString("machine"));
                d.setProduct_model(rs.getString("product_model"));
                d.setStart_date(rs.getString("start_date"));
                d.setEnd_date(rs.getString("end_date"));
                d.setWork_date(rs.getString("work_date"));
                d.setCalendar_work_time_s(rs.getString("calendar_work_time_s"));
                d.setPlanned_work_time_s(rs.getString("planned_work_time_s"));
                d.setPlanned_stop_time_s(rs.getString("planned_stop_time_s"));
                d.setWorking_time_s(rs.getString("working_time_s"));
                d.setTarget_working_time_s(rs.getString("target_working_time_s"));
                d.setRun_time_s(rs.getString("run_time_s"));
                d.setStop_time_s(rs.getString("stop_time_s"));
                d.setWait_time_s(rs.getString("wait_time_s"));
                d.setManual_time_s(rs.getString("manual_time_s"));
                d.setOffline_time_s(rs.getString("offline_time_s"));
                d.setActive_time_s(rs.getString("active_time_s"));
                d.setNon_active_time_s(rs.getString("non_active_time_s"));
                d.setNon_planned_stop_time_s(rs.getString("non_planned_stop_time_s"));
                d.setWorking_nonactive_time_s(rs.getString("working_nonactive_time_s"));
                d.setTheoretical_cycle_time_s(rs.getString("theoretical_cycle_time_s"));
                d.setProcess_cycle_time_s(rs.getString("process_cycle_time_s"));
                d.setAlarm_time_s(rs.getString("alarm_time_s"));
                d.setFault_time_s(rs.getString("fault_time_s"));
                d.setTime_operation_rate(rs.getString("time_operation_rate"));
                d.setTotal_product_rate(rs.getString("total_product_rate"));
                d.setOk_product_rate(rs.getString("ok_product_rate"));
                d.setMachine_efficiency_rate(rs.getString("machine_efficiency_rate"));
                d.setUph(rs.getString("uph"));
                d.setTarget_product_qty(rs.getString("target_product_qty"));
                d.setTheoretical_product_qty(rs.getString("theoretical_product_qty"));
                d.setTotal_product(rs.getString("total_product"));
                d.setOk_product(rs.getString("ok_product"));
                d.setNg_product(rs.getString("ng_product"));
                d.setBypassed_product(rs.getString("bypassed_product"));
                d.setBypassed_product_rate(rs.getString("bypassed_product_rate"));

                return d;
            };


            return jdbcTemplate.query(SQLStatement.DashBoard2.FIND_DAILY_ANALYSIS.toString(), new Object[]{
                    dashBoardFilter2.getLine(),
                    dashBoardFilter2.getMachine(),
                    dashBoardFilter2.getStart_date(),
                    dashBoardFilter2.getEnd_date(),
                    dashBoardFilter2.getEnd_time()

            }, rowMapper);

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}