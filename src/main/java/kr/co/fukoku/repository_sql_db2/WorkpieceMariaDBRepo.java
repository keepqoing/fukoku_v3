package kr.co.fukoku.repository_sql_db2;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.configuration.mapper.SqlDbV2Mapper;
import kr.co.fukoku.filters.WorkpieceFilter;
import kr.co.fukoku.model.impl.WorkPieceMariaDBdto;
import kr.co.fukoku.model.impl.WorkingTimeAnalysis;
import kr.co.fukoku.repository_sql_db2.sql.WorkpieceSQLBuilderMariaDB;

import java.util.ArrayList;
import java.util.Map;

@SqlDbV2Mapper
public interface WorkpieceMariaDBRepo {

    @SelectProvider(type = WorkpieceSQLBuilderMariaDB.class, method = "findWorkpieceByLineMachineProcessProductEndTimeStartTime")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "rowKey", column = "row_key"),
            @Result(property = "lineName", column = "li_ln"),
            @Result(property = "machineName", column = "mi_mn"),
            @Result(property = "mState", column = "msi_ms"),
            @Result(property = "productionDate", column = "pi_pd"),
            @Result(property = "dailySeq", column = "pi_ds"),
            @Result(property = "model", column = "pi_m"),
            @Result(property = "productCycle", column = "pi_pc"),
            @Result(property = "productStartTime", column = "pi_pst"),
            @Result(property = "productEndTime", column = "pi_pet"),
            @Result(property = "rememberField", column = "pi_rf"),
            @Result(property = "limitChanged", column = "pdi_lc"),
            @Result(property = "seq", column = "pdi_s"),
            @Result(property = "name", column = "pdi_n"),
            @Result(property = "productDetailStartTime", column = "pdi_pdst"),
            @Result(property = "productDetailEndTime", column = "pdi_pdet"),
            @Result(property = "lcl", column = "pdi_lcl"),
            @Result(property = "ucl", column = "pdi_ucl"),
            @Result(property = "quality", column = "pdi_q"),
            @Result(property = "readPoint", column = "pdi_rp"),
            @Result(property = "readData", column = "pdi_rd"),
            @Result(property = "epochProductStartTime", column = "pi_pest"),
            @Result(property = "epochProductDetailStartTime", column = "pdi_pdest"),
            @Result(property = "epochProductEndTime", column = "pi_peet"),
            @Result(property = "epochProductDetailEndTime", column = "pdi_pdeet"),
            @Result(property = "machineCode", column = "pi_mc"),
            @Result(property = "dailySeqOk", column = "pi_dsok"),
            @Result(property = "dailySeqNg", column = "pi_dsng"),
            @Result(property = "pQuality", column = "pi_q")
    })
    ArrayList<WorkPieceMariaDBdto> findWorkpieceByLineMachineProcessProductEndTimeStartTime(@Param("f") WorkpieceFilter workpieceFilter);


    @SelectProvider(type = WorkpieceSQLBuilderMariaDB.class, method = "findWorkpieceMaxDsGroupByWorkDayByLineMachineProcessProductEndTimeStartTime")
    @Results({
            @Result(property = "productionDate", column = "pi_pd"),
            @Result(property = "dailySeq", column = "max_ds"),
            @Result(property = "dailySeqOk", column = "max_dsok"),
            @Result(property = "model", column = "pi_m")
    })
    ArrayList<WorkPieceMariaDBdto> findWorkpieceMaxDsGroupByWorkDayByLineMachineProcessProductEndTimeStartTime(@Param("f") WorkpieceFilter workpieceFilter);

    // call new_proc_cal_working_time('IB','2018-09-04','2018-09-04','08:00');
    @Select("call new_proc_cal_working_time_2( " +
            "   #{line,jdbcType=TINYINT,mode=IN}," +
            "   #{startDate,jdbcType=TINYINT,mode=IN}," +
            "   #{endDate,jdbcType=TINYINT,mode=IN}," +
            "   #{endTime,jdbcType=TINYINT,mode=IN})"
            )
    @Results({
            @Result(property = "crossDate" , column = "cross_date"),
            @Result(property = "date" , column = "_date"),
            @Result(property = "startTime" , column = "start_time"),
            @Result(property = "endTime" , column = "end_time"),
            @Result(property = "duration" , column = "duration"),
    })
    ArrayList<WorkingTimeAnalysis> findWorkingTime(@Param("line") String line, @Param("startDate") String startDate, @Param("endDate") String endDate, @Param("endTime") String endTime);

    @SelectProvider(type = WorkpieceSQLBuilderMariaDB.class, method = "getMaxDsAndTargetByModelFromLastMachine")
    ArrayList<Map<String,Object>> getMaxDsAndTargetByModelFromLastMachine(@Param("f") WorkpieceFilter workpieceFilter);

    @SelectProvider(type = WorkpieceSQLBuilderMariaDB.class, method = "getWorkPlanGroupByModel")
    ArrayList<Map<String,Object>> getWorkPlanGroupByModel(@Param("f") WorkpieceFilter workpieceFilter);
    
    



}


