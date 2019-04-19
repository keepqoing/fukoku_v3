package kr.co.fukoku.repository_sql_db2.sql;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.ibatis.annotations.Param;

import kr.co.fukoku.filters.WorkpieceFilter;


public class WorkpieceSQLBuilderMariaDB {

	public static String getMaxDsAndTargetByModelFromLastMachine(@Param("f") WorkpieceFilter filter){
        System.out.println(filter.toString());
        StringBuffer buffer = new StringBuffer();
        buffer.append("SELECT  \r\n" + 
        		"               'HA' as ref_line, gpa.machine_name ,gpa.product_name as model , IFNULL(max(CAST(gpa.daily_seq AS INTEGER)),0) AS max_ds, \r\n" + 
        		"                (SELECT IFNULL(sum(total),0)  FROM assign_working_time WHERE _date=gpa.work_date and ref_product=gpa.product_name) as max_target\r\n" + 
        		"                FROM monitoring_workpiece_product_amount gpa WHERE \r\n" + 
        		"                gpa.machine_name=(SELECT LMD.join_name-- ,  LMD.seq\r\n" + 
        		"                                FROM machines M  \r\n" + 
        		"                                INNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id  \r\n" + 
        		"                                INNER JOIN _lines L ON LMD.ref_line_id = L.id  \r\n" + 
        		"                                INNER JOIN factories F ON L.ref_factory = F.id \r\n" + 
        		"                                WHERE F._name LIKE '%%' AND L._name LIKE  gpa.line_name ORDER BY LMD.seq DESC LIMIT 1)\r\n" + 
        		"                and gpa.work_date='"+filter.getStartTime()+"' and line_name='HA' GROUP BY gpa.product_name\r\n" + 
                "UNION\n" +
                "SELECT  \r\n" + 
                "               'HB' as ref_line, gpa.machine_name ,gpa.product_name as model , IFNULL(max(CAST(gpa.daily_seq AS INTEGER)),0) AS max_ds, \r\n" + 
                "                (SELECT IFNULL(sum(total),0)  FROM assign_working_time WHERE _date=gpa.work_date and ref_product=gpa.product_name) as max_target\r\n" + 
                "                FROM monitoring_workpiece_product_amount gpa WHERE \r\n" + 
                "                gpa.machine_name=(SELECT LMD.join_name-- ,  LMD.seq\r\n" + 
                "                                FROM machines M  \r\n" + 
                "                                INNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id  \r\n" + 
                "                                INNER JOIN _lines L ON LMD.ref_line_id = L.id  \r\n" + 
                "                                INNER JOIN factories F ON L.ref_factory = F.id \r\n" + 
                "                                WHERE F._name LIKE '%%' AND L._name LIKE  gpa.line_name ORDER BY LMD.seq DESC LIMIT 1)\r\n" + 
                "                and gpa.work_date='"+filter.getStartTime()+"' and line_name='HB' GROUP BY gpa.product_name\r\n" + 
                "UNION\n" +
                "SELECT  \r\n" + 
                "               'HC' as ref_line, gpa.machine_name ,gpa.product_name as model , IFNULL(max(CAST(gpa.daily_seq AS INTEGER)),0) AS max_ds, \r\n" + 
                "                (SELECT IFNULL(sum(total),0)  FROM assign_working_time WHERE _date=gpa.work_date and ref_product=gpa.product_name) as max_target\r\n" + 
                "                FROM monitoring_workpiece_product_amount gpa WHERE \r\n" + 
                "                gpa.machine_name=(SELECT LMD.join_name-- ,  LMD.seq\r\n" + 
                "                                FROM machines M  \r\n" + 
                "                                INNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id  \r\n" + 
                "                                INNER JOIN _lines L ON LMD.ref_line_id = L.id  \r\n" + 
                "                                INNER JOIN factories F ON L.ref_factory = F.id \r\n" + 
                "                                WHERE F._name LIKE '%%' AND L._name LIKE  gpa.line_name ORDER BY LMD.seq DESC LIMIT 1)\r\n" + 
                "                and gpa.work_date='"+filter.getStartTime()+"' and line_name='HC' GROUP BY gpa.product_name\r\n" + 
                "" +
                "UNION\n" +
                "SELECT  \r\n" + 
                "               'HD' as ref_line, gpa.machine_name ,gpa.product_name as model , IFNULL(max(CAST(gpa.daily_seq AS INTEGER)),0) AS max_ds, \r\n" + 
                "                (SELECT IFNULL(sum(total),0)  FROM assign_working_time WHERE _date=gpa.work_date and ref_product=gpa.product_name) as max_target\r\n" + 
                "                FROM monitoring_workpiece_product_amount gpa WHERE \r\n" + 
                "                gpa.machine_name=(SELECT LMD.join_name-- ,  LMD.seq\r\n" + 
                "                                FROM machines M  \r\n" + 
                "                                INNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id  \r\n" + 
                "                                INNER JOIN _lines L ON LMD.ref_line_id = L.id  \r\n" + 
                "                                INNER JOIN factories F ON L.ref_factory = F.id \r\n" + 
                "                                WHERE F._name LIKE '%%' AND L._name LIKE  gpa.line_name ORDER BY LMD.seq DESC LIMIT 1)\r\n" + 
                "                and gpa.work_date='"+filter.getStartTime()+"' and line_name='HD' GROUP BY gpa.product_name\r\n" + 
                "" +
                "UNION\n" +
                "SELECT  \r\n" + 
                "               'IB' as ref_line, gpa.machine_name ,gpa.product_name as model , IFNULL(max(CAST(gpa.daily_seq AS INTEGER)),0) AS max_ds, \r\n" + 
                "                (SELECT IFNULL(sum(total),0)  FROM assign_working_time WHERE _date=gpa.work_date and ref_product=gpa.product_name) as max_target\r\n" + 
                "                FROM monitoring_workpiece_product_amount gpa WHERE \r\n" + 
                "                gpa.machine_name=(SELECT LMD.join_name-- ,  LMD.seq\r\n" + 
                "                                FROM machines M  \r\n" + 
                "                                INNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id  \r\n" + 
                "                                INNER JOIN _lines L ON LMD.ref_line_id = L.id  \r\n" + 
                "                                INNER JOIN factories F ON L.ref_factory = F.id \r\n" + 
                "                                WHERE F._name LIKE '%%' AND L._name LIKE  gpa.line_name ORDER BY LMD.seq DESC LIMIT 1)\r\n" + 
                "                and gpa.work_date='"+filter.getStartTime()+"' and line_name='IB' GROUP BY gpa.product_name\r\n" + 
                "" +
                "UNION\n" +
                "SELECT  \r\n" + 
                "               'PD' as ref_line, gpa.machine_name ,gpa.product_name as model , IFNULL(max(CAST(gpa.daily_seq AS INTEGER)),0) AS max_ds, \r\n" + 
                "                (SELECT IFNULL(sum(total),0)  FROM assign_working_time WHERE _date=gpa.work_date and ref_product=gpa.product_name) as max_target\r\n" + 
                "                FROM monitoring_workpiece_product_amount gpa WHERE \r\n" + 
                "                gpa.machine_name=(SELECT LMD.join_name-- ,  LMD.seq\r\n" + 
                "                                FROM machines M  \r\n" + 
                "                                INNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id  \r\n" + 
                "                                INNER JOIN _lines L ON LMD.ref_line_id = L.id  \r\n" + 
                "                                INNER JOIN factories F ON L.ref_factory = F.id \r\n" + 
                "                                WHERE F._name LIKE '%%' AND L._name LIKE  gpa.line_name ORDER BY LMD.seq DESC LIMIT 1)\r\n" + 
                "                and gpa.work_date='"+filter.getStartTime()+"' and line_name='PD' GROUP BY gpa.product_name\r\n" + 
                "" +
                "ORDER BY ref_line ASC;\n");
        System.out.println(buffer.toString());
        return buffer.toString();
    }
	
	
	  public static String getWorkPlanGroupByModel(@Param("f")WorkpieceFilter filter){
	        System.out.println(filter.toString());
	        StringBuffer buffer = new StringBuffer();
	        buffer.append("select ref_line,ref_product, sum(total) as target from assign_working_time where  cross_date='"+filter.getStartTime()+"' GROUP BY ref_product,ref_line");
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
	  
	  
//////////////////////////////////////
	  
	  
	  public static String findWorkpieceByLineMachineProcessProductEndTimeStartTime(@Param("f")WorkpieceFilter filter){
	        System.out.println(filter.toString());
	        StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        "SELECT *   FROM " +
	                "              workpiece_" +filter.getLineName().toLowerCase() +
	                "            WHERE  " +
	                "              li_ln = #{f.lineName} AND " +
	                "              mi_mn = #{f.machineName} AND  " +
	                "              pdi_n = #{f.processName} AND  " +
	                "              UNIX_TIMESTAMP(pi_pst) >= UNIX_TIMESTAMP(#{f.startTime}) AND UNIX_TIMESTAMP(pi_pet) <= UNIX_TIMESTAMP(#{f.endTime}) ");
	        if(!filter.getModel().equalsIgnoreCase("ALL")){
	            buffer.append(" AND pi_m='"+filter.getModel()+"'");
	        }
	        buffer.append(" ORDER BY UNIX_TIMESTAMP(pi_pst) ASC");
	        return buffer.toString();
	    }

	    public static String findWorkpieceMaxDsGroupByWorkDayByLineMachineProcessProductEndTimeStartTime(@Param("f")WorkpieceFilter filter){
	        System.out.println(filter.toString());
	        StringBuffer buffer = new StringBuffer();
	        buffer.append(
	                "SELECT pi_pd,pi_m , max(CAST(pi_ds AS INTEGER)) as max_ds, max(CAST(pi_dsok AS INTEGER)) as max_dsok  FROM " +
	                        "              workpiece_" +filter.getLineName().toLowerCase() +
	                        "            WHERE  " +
	                        "              li_ln = #{f.lineName} AND " +
	                        "              mi_mn = #{f.machineName} AND  " +
	                        "              pdi_n = #{f.processName} AND  " +
	                        "              UNIX_TIMESTAMP(pi_pst) >= UNIX_TIMESTAMP(#{f.startTime}) AND UNIX_TIMESTAMP(pi_pet) <= UNIX_TIMESTAMP(#{f.endTime}) ");
	        if(!filter.getModel().equalsIgnoreCase("ALL")){
	            buffer.append(" AND pi_m='"+filter.getModel()+"'");
	        }
	        buffer.append(" GROUP BY pi_pd ORDER BY UNIX_TIMESTAMP(pi_pst) ASC");

	        return buffer.toString();
	    }


	   
	  
	  
	  
}
