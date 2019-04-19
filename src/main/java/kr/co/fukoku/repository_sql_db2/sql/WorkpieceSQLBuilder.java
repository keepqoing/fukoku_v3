package kr.co.fukoku.repository_sql_db2.sql;

import org.apache.ibatis.annotations.Param;

import kr.co.fukoku.filters.WorkpieceFilter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class WorkpieceSQLBuilder {

    public static String findWorkpieceAnalysis(@Param("f")WorkpieceFilter filter){

        StringBuffer buffer = new StringBuffer();
        buffer.append("" +
                "SELECT  " +
                /*
                "              ROUND( (total_wp_pt_cycle/ 1000) / freq_total_wp_cycle) as workpiece_cycle ," +
                "              ROUND( (total_pure_cycle/ 1000) / freq_total_wp_cycle) as pure_cycle ," +
                "              ROUND( (total_process_cycle/ 1000) / freq_total_wp_cycle) as process_cycle ," +
                "              ROUND( (total_pure_interval/ 1000) /freq_total_wp_cycle) as pure_interval," +
                */

                "              sum(total_wp_pt_cycle) as workpiece_cycle ," +
                "              sum(total_pure_cycle) as pure_cycle ," +
                "              sum(total_process_cycle) as process_cycle ," +
                "              sum(total_pure_interval) as pure_interval," +
                "              product_date , is_data, process_name,rd, avg_lsl, avg_usl, min_rd, max_rd,total_rd,freq_total_wp_cycle,model, min_lsl, min_usl, max_usl, max_lsl, id " +
                "             FROM " +
                "              workpiece_analysis_" + filter.getLineName().toLowerCase() +"_30  " +
                "            WHERE  " +
                "             line_name = #{f.lineName} AND " +
                "              machine_name = #{f.machineName} AND  " +
               // "              model = #{f.model} AND  " +
                "              product_date >= CAST( #{f.startTime} AS DATE) AND product_date <= CAST( #{f.endTime} AS DATE)  AND is_data='1' ");
                if(!filter.getModel().equalsIgnoreCase("ALL")){
                    buffer.append(" AND model='"+filter.getModel()+"'");
                }
                String processesName = "";
                if(filter.getLstProcessName() != null ){
                    for(int i=0;i<filter.getLstProcessName().size();i++){
                        System.out.println("PN "+ i + " "+ filter.getLstProcessName().get(i));
                        processesName += "'"+filter.getLstProcessName().get(i)+"',";
                    }
                    buffer.append(" AND process_name in ("+processesName.substring(0 , processesName.length() - 1)+")");
                }else{
                    buffer.append(" AND process_name = '"+filter.getProcessName()+"'");
                }
                buffer.append("  GROUP BY product_date");
                buffer.append("  ORDER BY UNIX_TIMESTAMP(start_time) ASC");

                System.out.println(buffer.toString());
        return buffer.toString();
    }



    public static String findWorkpieceAnalysisByDataIsNotNull(@Param("f")WorkpieceFilter filter){

        StringBuffer buffer = new StringBuffer();
        buffer.append("" +
                "SELECT  " +
                "              ROUND( (total_wp_pt_cycle/ 1000) / freq_total_wp_cycle) as workpiece_cycle ," +
                "              ROUND( (total_pure_cycle/ 1000) / freq_total_wp_cycle) as pure_cycle ," +
                "              ROUND( (total_process_cycle/ 1000) / freq_total_wp_cycle) as process_cycle ," +
                "              ROUND( (total_pure_interval/ 1000) /freq_total_wp_cycle) as pure_interval," +
                "              product_date , is_data, process_name,rd, avg_lsl, avg_usl, min_rd, max_rd,total_rd,freq_total_wp_cycle, rp, min_lsl, min_usl, max_usl, max_lsl, id " +
                "             FROM " +
                "              workpiece_analysis_" + filter.getLineName().toLowerCase()+"_30  " +
                "            WHERE  " +
                "             line_name = #{f.lineName} AND " +
                "              machine_name = #{f.machineName} AND  " +
                // "              model = #{f.model} AND  " +
                "              product_date >= CAST( #{f.startTime} AS DATE) AND product_date <= CAST( #{f.endTime} AS DATE)  ");
        if(!filter.getModel().equalsIgnoreCase("ALL")){
            buffer.append(" AND model='"+filter.getModel()+"'");
        }
        String processesName = "";
        if(filter.getLstProcessName() != null ){
            for(int i=0;i<filter.getLstProcessName().size();i++){
                System.out.println("PN "+ i + " "+ filter.getLstProcessName().get(i));
                processesName += "'"+filter.getLstProcessName().get(i)+"',";
            }
            buffer.append(" AND process_name in ("+processesName.substring(0 , processesName.length() - 1)+")");
        }else{
            buffer.append(" AND process_name = '"+filter.getProcessName()+"'");
        }

        buffer.append("  ORDER BY UNIX_TIMESTAMP(start_time) ASC ");

        System.out.println(buffer.toString());
        return buffer.toString();
    }







    public static String findWorkpieceAnalysisDetail(@Param("f")WorkpieceFilter filter) {
        System.out.println("st: "+filter.getStartTime());
        System.out.println("et: "+filter.getEndTime());



        StringBuffer buffer = new StringBuffer();
        buffer.append("" +
                "SELECT  " +
                "              ROUND( (total_wp_pt_cycle/ 1000) / freq_total_wp_cycle) as workpiece_cycle ," +
                "              ROUND( (total_pure_cycle/ 1000) / freq_total_wp_cycle) as pure_cycle ," +
                "              ROUND( (total_process_cycle/ 1000) / freq_total_wp_cycle) as process_cycle ," +
                "              ROUND( (total_pure_interval/ 1000) /freq_total_wp_cycle) as pure_interval," +
                "              product_date , is_data, process_name,rd, avg_lsl, avg_usl, min_rd, " +
                "              max_rd,total_rd,freq_total_wp_cycle, rp, start_time, end_time, min_lsl, min_usl, max_usl, max_lsl, model," +
                "              total_product, total_good_product, total_detective_product,id, pd_lsl, pd_usl, pd_start, pd_end, pd_seq, pd_cycle, pd_max_rd , id as pd_id " +
                "             FROM " +
                "              workpiece_analysis_" +filter.getLineName().toLowerCase()+"_30  " +
                "            WHERE  " +
                "             line_name = #{f.lineName} AND " +
                "              machine_name = #{f.machineName} AND  " +
                // "              model = #{f.model} AND  " +
                //"              start_time BETWEEN #{f.startTime} AND  #{f.endTime}  AND is_data='1' ");
               // "             product_date >= CAST(#{f.startDateFormat} AS DATE) AND product_date <= CAST(#{f.endDateFormat} AS DATE) ");
                "              UNIX_TIMESTAMP(st_time) >= UNIX_TIMESTAMP(#{f.startTime}) AND UNIX_TIMESTAMP(ed_time) <= UNIX_TIMESTAMP(#{f.endTime}) ");
        if(!filter.getModel().equalsIgnoreCase("ALL")){
            buffer.append(" AND model='"+filter.getModel()+"'");
        }
        String processesName = "";
        if(filter.getLstProcessName() != null ){
            for(int i=0;i<filter.getLstProcessName().size();i++){
                System.out.println("PN "+ i + " "+ filter.getLstProcessName().get(i));
                processesName += "'"+filter.getLstProcessName().get(i)+"',";
            }
            buffer.append(" AND process_name in ("+processesName.substring(0 , processesName.length() - 1)+")");
        }else{
            buffer.append(" AND process_name = '"+filter.getProcessName()+"'");
        }

        buffer.append(" ORDER BY UNIX_TIMESTAMP(start_time) ASC");
        System.out.println(buffer.toString());
        return buffer.toString();
    }


    public static String findTargetAndProducedProduct(@Param("f")WorkpieceFilter filter){
        StringBuffer buffer = new StringBuffer();

        //if(!filter.getLineName().equalsIgnoreCase("")){
         /*
            buffer.append(" SELECT " +
                    "      MAX(W.daily_seq) as products, " +
                    "      AB.target ,  '"+filter.getLineName()+"' as line_name " +
                    "FROM workpiece_analysis_"+filter.getLineName().toLowerCase()+" W, " +
                    "     (SELECT SUM(A.total) as target " +
                    "      FROM assign_working_time A " +
                    "      WHERE  A.ref_line ='"+filter.getLineName().toLowerCase()+"' AND A._date ='"+filter.getStartTime()+"'" +
                    "      ) AS AB " +
                    "WHERE W.product_date ='"+filter.getStartTime()+"' AND W.line_name='"+filter.getLineName().toLowerCase()+"'");
       */
        //}else{
        try{
            String dt = "";
            String timeStamp = new SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
            //System.out.println(timeStamp);
            dt = timeStamp;  // Start date
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Calendar c = Calendar.getInstance();
            c.setTime(sdf.parse(dt));
            c.add(Calendar.DATE, -0);  // number of days to add
            dt = sdf.format(c.getTime());
            if(filter.getStartTime().equals("")){
                filter.setStartTime(dt);
            }
        }catch (Exception e){
            e.printStackTrace();
        }

            buffer.append(" SELECT " +
                    "      MAX(W.daily_seq) as products, " +
                    "      AB.target ,  'IB'  as line_name " +
                    "FROM good_product_analysis_ib W, " +
                    "     (SELECT SUM(A.total) as target " +
                    "      FROM assign_working_time A " +
                    "      WHERE  A.ref_line ='IB' AND A._date ='"+filter.getStartTime()+"'" +
                    "      ) AS AB " +
                    "WHERE W.production_date ='"+filter.getStartTime()+"' AND W.ref_line='IB' AND ref_machine='IB_Runout'");
            buffer.append(" UNION ");
            buffer.append(" SELECT " +
                    "      MAX(W.daily_seq) as products, " +
                    "      AB.target , 'HC'  as line_name " +
                    "FROM good_product_analysis_hc W, " +
                    "     (SELECT SUM(A.total) as target " +
                    "      FROM assign_working_time A " +
                    "      WHERE  A.ref_line ='HC' AND A._date ='"+filter.getStartTime()+"'" +
                    "      ) AS AB " +
                    "WHERE W.production_date ='"+filter.getStartTime()+"' AND W.ref_line='HC' AND ref_machine='HC_TP'");
            buffer.append(" UNION ");
            buffer.append(" SELECT " +
                    "      MAX(W.daily_seq) as products, " +
                    "      AB.target ,  'HD'   as line_name " +
                    "FROM good_product_analysis_hd W, " +
                    "     (SELECT SUM(A.total) as target " +
                    "      FROM assign_working_time A " +
                    "      WHERE  A.ref_line ='HD' AND A._date ='"+filter.getStartTime()+"'" +
                    "      ) AS AB " +
                    "WHERE W.production_date ='"+filter.getStartTime()+"' AND W.ref_line='HD' AND ref_machine='HD_Runout'");
            buffer.append(" UNION ");
            buffer.append(" SELECT " +
                    "      MAX(W.daily_seq) as products, " +
                    "      AB.target , 'HA'  as line_name " +
                    "FROM good_product_analysis_ha W, " +
                    "     (SELECT SUM(A.total) as target " +
                    "      FROM assign_working_time A " +
                    "      WHERE  A.ref_line ='HA' AND A._date ='"+filter.getStartTime()+"'" +
                    "      ) AS AB " +
                    "WHERE W.production_date ='"+filter.getStartTime()+"' AND W.ref_line='HA' AND ref_machine='HA_Runout'");
        buffer.append(" UNION ");
        buffer.append(" SELECT " +
                "      MAX(W.daily_seq) as products, " +
                "      AB.target , 'PD'  as line_name " +
                "FROM good_product_analysis_pd W, " +
                "     (SELECT SUM(A.total) as target " +
                "      FROM assign_working_time A " +
                "      WHERE  A.ref_line ='PD' AND A._date ='"+filter.getStartTime()+"'" +
                "      ) AS AB " +
                "WHERE W.production_date ='"+filter.getStartTime()+"' AND W.ref_line='PD' AND ref_machine='PD_Pnt'");
        buffer.append(" UNION ");
        buffer.append(" SELECT " +
                "      MAX(W.daily_seq) as products, " +
                "      AB.target , 'HB'  as line_name " +
                "FROM good_product_analysis_hb W, " +
                "     (SELECT SUM(A.total) as target " +
                "      FROM assign_working_time A " +
                "      WHERE  A.ref_line ='HB' AND A._date ='"+filter.getStartTime()+"'" +
                "      ) AS AB " +
                "WHERE W.production_date ='"+filter.getStartTime()+"' AND W.ref_line='HB' AND ref_machine='HB_Tmarker'");
       // }



        System.out.println(buffer.toString());
        return  buffer.toString();
    }



    public static String work_plan_by_current_time(@Param("line")  String line  ,@Param("cross_date") String cross_date , @Param("work_date")  String work_date, @Param("current_end_time") String current_end_time){

        StringBuffer buffer = new StringBuffer();
        buffer.append("select * from assign_working_time A " +
                        " INNER JOIN operating_time O ON O.id = A.ref_operating_time "+
                "                                 where cross_date =#{cross_date}  AND A.ref_line=#{line} AND " +
                "             TIMESTAMP(_date) <= TIMESTAMP(#{work_date}) AND " +
                "             TIMESTAMP(CONCAT(_date,' ',end_time)) <= TIMESTAMP('"+ work_date  +" "+ current_end_time+"')"  +
                "             ORDER BY A._date ASC, O.start_time ASC;");

        System.out.println(buffer.toString());
        return buffer.toString();
    }


    public static String loading_time_by_current_time(@Param("line")  String line  ,@Param("cross_date") String cross_date , @Param("work_date")  String work_date, @Param("current_end_time") String current_end_time){

        StringBuffer buffer = new StringBuffer();
        buffer.append("select sum(duration) from working_time_analysis " +
                "                                 where cross_date =#{cross_date}  AND line=#{line} AND " +
                "             TIMESTAMP(_date) <= TIMESTAMP(#{work_date}) AND " +
                "             TIMESTAMP(CONCAT(_date,' ',end_time)) <= TIMESTAMP('"+ work_date  +" "+ current_end_time+"')"  +
                "             ORDER BY _date ASC, start_time ASC;");

        System.out.println(buffer.toString());
        return buffer.toString();
    }


    public static String mStateTimeLine(@Param("cross_date") String crossDate,@Param("start_date_time") String startTime, @Param("end_date_time") String endTime , @Param("line") String line){
        StringBuffer buffer = new StringBuffer();
        buffer.append("select machine, product_name, SUBSTRING_INDEX(SUBSTRING_INDEX(mstate_id, '_' , -3), '_' , 1) as status  ," +
                " work_date ," +
                "   IF(m.start_time < #{start_date_time},#{start_date_time},m.start_time) as start_time, " +
                "   IF(m.end_time > #{end_date_time},#{end_date_time},m.end_time) as end_time" +
                " from mstate_"+line.toLowerCase()+" m where  " +
                " work_date=#{cross_date} "+
                " ORDER BY UNIX_TIMESTAMP(start_time) ;");

        System.out.println(buffer.toString());
        return buffer.toString();
    }


    public static String alarmTimeLine(@Param("cross_date") String crossDate,@Param("start_date_time") String startTime, @Param("end_date_time") String endTime , @Param("line") String line){
        StringBuffer buffer = new StringBuffer();
        buffer.append("select ref_line, ref_machine, ref_product , SUBSTRING_INDEX(SUBSTRING_INDEX(machine_state, '_' , -3), '_' , 1) as status , CONCAT(\"[\",ref_machine,\"] \",alarm_name) as alarm_name,  " +
                " work_date ," +
                "   IF(a.start_time < #{start_date_time},#{start_date_time},a.start_time) as start_time, " +
                "   IF(a.end_time > #{end_date_time},#{end_date_time},a.end_time) as end_time" +
                " from alarm_histories a where  " +
                " work_date=#{cross_date} and ref_line=#{line} "+
                " ORDER BY ref_machine,UNIX_TIMESTAMP(start_time) ;");
        System.out.println(buffer.toString());
        return buffer.toString();
    }


}
