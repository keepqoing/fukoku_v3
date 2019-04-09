package kr.co.fukoku.repository.previousRepo;

import kr.co.fukoku.filters.DailyMstateAnalysisFilter;
import kr.co.fukoku.model.DailyMstateAnalysis;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

@Repository
public interface DailyMstateAnalysisRepo {


    @SelectProvider(type = DailyMstateAnalysisRepoSQLBuilder.class , method="productionStatus")
    ArrayList<DailyMstateAnalysis> productionStatus(@Param("f") DailyMstateAnalysisFilter f);


    @SelectProvider(type = DailyMstateAnalysisRepoSQLBuilder.class , method="findDailyMstateAnalysises")
    ArrayList<DailyMstateAnalysis> findDailyMstateAnalysises(@Param("f") DailyMstateAnalysisFilter f);

    @SelectProvider(type = DailyMstateAnalysisRepoSQLBuilder.class , method="processDefectPeriodStatus")
    ArrayList<Map<String,Object>> processDefectPeriodStatus(@Param("f") DailyMstateAnalysisFilter f);

    @Delete("<script> " +
            " DELETE FROM fukoku_v2.transaction_detail WHERE id IN ("+
            "   <foreach collection='IDs' item='item' index='index' separator=','>" +
            "       #{item} " +
            "   </foreach>" +
            " ) </script>")
    boolean deleteTranscationDetailById(@Param("IDs") ArrayList<Long> IDs);

    @SelectProvider(type = DailyMstateAnalysisRepoSQLBuilder.class , method="breakdowntimeanalysisbyline")
    ArrayList<Map<String,Object>> breakdowntimeanalysisbyline(@Param("f") DailyMstateAnalysisFilter f);

    @Select("SELECT E.id, E._code, E._name, E.remark, D._name AS department FROM fukoku_v2.error E INNER JOIN fukoku_v2.department_product_categories D ON E.ref_department = D.id  \n" +
            "                WHERE D._name = '품질보증부' \n" +
            "                ORDER BY E.id DESC  ")
    ArrayList<Map<String,Object>> errorNames();

    @Select("SELECT count(*) as count_error ,error,ref_line FROM fukoku_v2.defective_product_analysis  where  production_date >= #{f.start_date} AND  production_date <= #{f.end_date}   GROUP BY ref_line,error ;  ")
    ArrayList<Map<String,Object>> countError(@Param("f") DailyMstateAnalysisFilter f);









}
