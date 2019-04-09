package kr.co.fukoku.repository.sql;

import kr.co.fukoku.filters.CalHeatmapFilter;
import kr.co.fukoku.model.CalHeatmap;
import kr.co.fukoku.repository_sqltem.SQLStatement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CalHeatmapRepositoryBody implements CalHeatmapRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<CalHeatmap> countOK(CalHeatmapFilter calHeatmapFilter) {
        RowMapper<CalHeatmap> rowMapper = (rs, rowNum) -> {
            CalHeatmap calHeatmap = new CalHeatmap(
                    rs.getString("production_date"),
                    rs.getInt("amount")
            );
            return calHeatmap;
        };
//        === old code
//        if(calHeatmapFilter.getMachine().contains("IB"))
//            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_OK_IB.toString(), new Object[]{
//                    "%"+calHeatmapFilter.getMachine()+"%",
//                    "%"+calHeatmapFilter.getMachine()+"%",
//                    "%"+calHeatmapFilter.getDate()+"%",
//            }, rowMapper);
        if(calHeatmapFilter.getMachine().contains("ALL"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_OK_ALL_LINE.toString(), new Object[]{
                    "%"+calHeatmapFilter.getLine().replace("ALL","")+"%",
                    "%"+calHeatmapFilter.getMachine().replace("ALL","")+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("IB"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_OK_IB.toString(), new Object[]{
                    "%"+calHeatmapFilter.getLine().replace("ALL","")+"%",
                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("HA"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_OK_HA.toString(), new Object[]{
                    "%"+calHeatmapFilter.getLine().replace("ALL","")+"%",
                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("HB"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_OK_HB.toString(), new Object[]{
                    "%"+calHeatmapFilter.getLine().replace("ALL","")+"%",
                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("HC"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_OK_HC.toString(), new Object[]{
                    "%"+calHeatmapFilter.getLine().replace("ALL","")+"%",
                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%",
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("HD"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_OK_HD.toString(), new Object[]{
                    "%"+calHeatmapFilter.getLine().replace("ALL","")+"%",
                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%",
            }, rowMapper);
        else
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_OK_PD.toString(), new Object[]{
                    "%"+calHeatmapFilter.getLine().replace("ALL","")+"%",
                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%",
            }, rowMapper);
    }

    @Override
    public List<CalHeatmap> countDF(CalHeatmapFilter calHeatmapFilter) {
        RowMapper<CalHeatmap> rowMapper = (rs, rowNum) -> {
            CalHeatmap calHeatmap = new CalHeatmap(
                    rs.getString("production_date"),
                    rs.getInt("amount")
            );
            return calHeatmap;
        };
        if(calHeatmapFilter.getMachine().contains("ALL")){
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_DF.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getMachine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getDate() + "%" ,
            }, rowMapper);
        }else {
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_DF.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getMachine() + "%" ,
                    "%" + calHeatmapFilter.getDate() + "%" ,
            }, rowMapper);
        }
    }

    @Override
    public List<CalHeatmap> countNG(CalHeatmapFilter calHeatmapFilter) {
        RowMapper<CalHeatmap> rowMapper = (rs, rowNum) -> {
            CalHeatmap calHeatmap = new CalHeatmap(
                    rs.getString("production_date"),
                    rs.getInt("amount")
            );
            return calHeatmap;
        };
        if(calHeatmapFilter.getMachine().contains("ALL")){
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_NG.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getMachine().replace("ALL","") + "%",
                    "%"+calHeatmapFilter.getDate()+"%",
            }, rowMapper);
        }else{
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_NG.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%",
            }, rowMapper);
        }
    }

    @Override
    public List<CalHeatmap> countTT(CalHeatmapFilter calHeatmapFilter) {
        RowMapper<CalHeatmap> rowMapper = (rs, rowNum) -> {
            CalHeatmap calHeatmap = new CalHeatmap(
                    rs.getString("production_date"),
                    rs.getInt("amount")
            );
            return calHeatmap;
        };
        if(calHeatmapFilter.getMachine().contains("ALL"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_TT_ALL_LINE.toString(), new Object[]{

                    "%"+calHeatmapFilter.getMachine().replace("ALL","")+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("IB"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_TT_IB.toString(), new Object[]{

                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("HA"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_TT_HA.toString(), new Object[]{

                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("HB"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_TT_HB.toString(), new Object[]{

                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("HC"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_TT_HC.toString(), new Object[]{

                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else if(calHeatmapFilter.getMachine().contains("HD"))
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_TT_HD.toString(), new Object[]{

                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
        else
            return jdbcTemplate.query(SQLStatement.CalendarHeatmap.COUNT_TT_PD.toString(), new Object[]{

                    "%"+calHeatmapFilter.getMachine()+"%",
                    "%"+calHeatmapFilter.getDate()+"%"
            }, rowMapper);
    }

    @Override
    public List<CalHeatmap> countFS(CalHeatmapFilter calHeatmapFilter) {
        RowMapper<CalHeatmap> rowMapper = (rs, rowNum) -> {
            CalHeatmap calHeatmap = new CalHeatmap(
                    rs.getString("work_date"),
                    rs.getInt("number")
            );
            return calHeatmap;
        };

        if(calHeatmapFilter.getMachine().contains("ALL")){
            return jdbcTemplate.query(SQLStatement.CalendarHeatmapMachineState.COUNT_FS.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getMachine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getDate() + "%"
            }, rowMapper);
        }else {
            return jdbcTemplate.query(SQLStatement.CalendarHeatmapMachineState.COUNT_FS.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getMachine() + "%" ,
                    "%" + calHeatmapFilter.getDate() + "%"
            }, rowMapper);
        }
    }

    @Override
    public List<CalHeatmap> countNAS(CalHeatmapFilter calHeatmapFilter) {
        RowMapper<CalHeatmap> rowMapper = (rs, rowNum) -> {
            CalHeatmap calHeatmap = new CalHeatmap(
                    rs.getString("work_date"),
                    rs.getInt("number")
            );
            return calHeatmap;
        };
        if(calHeatmapFilter.getMachine().contains("ALL")){
            return jdbcTemplate.query(SQLStatement.CalendarHeatmapMachineState.COUNT_NAS.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getMachine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getDate() + "%" ,
            }, rowMapper);
        }else {
            return jdbcTemplate.query(SQLStatement.CalendarHeatmapMachineState.COUNT_NAS.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getMachine() + "%" ,
                    "%" + calHeatmapFilter.getDate() + "%" ,
            }, rowMapper);
        }

    }

    @Override
    public List<CalHeatmap> countAlarm(CalHeatmapFilter calHeatmapFilter) {
        RowMapper<CalHeatmap> rowMapper = (rs, rowNum) -> {
            CalHeatmap calHeatmap = new CalHeatmap(
                    rs.getString("work_date"),
                    rs.getInt("number")
            );
            return calHeatmap;
        };
        if(calHeatmapFilter.getMachine().contains("ALL")) {
            return jdbcTemplate.query(SQLStatement.CalendarHeatmapMachineState.COUNT_ALARM.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getMachine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getDate() + "%" ,
            }, rowMapper);
        }else {
            return jdbcTemplate.query(SQLStatement.CalendarHeatmapMachineState.COUNT_ALARM.toString(), new Object[]{
                    "%" + calHeatmapFilter.getLine().replace("ALL","") + "%",
                    "%" + calHeatmapFilter.getMachine() + "%" ,
                    "%" + calHeatmapFilter.getDate() + "%" ,
            }, rowMapper);
        }
    }
}