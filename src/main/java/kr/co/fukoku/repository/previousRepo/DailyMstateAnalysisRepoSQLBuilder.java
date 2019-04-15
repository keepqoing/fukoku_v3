package kr.co.fukoku.repository.previousRepo;

import kr.co.fukoku.filters.DailyMstateAnalysisFilter;
import org.apache.ibatis.annotations.Param;

public class DailyMstateAnalysisRepoSQLBuilder {

    public static String findDailyMstateAnalysises(@Param("f") DailyMstateAnalysisFilter filter){
        System.out.println(filter.toString());
        StringBuffer buffer = new StringBuffer();
        buffer.append("select " +
                "id,\n" +
                "\tline,\n" +
                "\tmachine,\n" +
                "\tproduct_model,\n" +
                "\tstart_date,\n" +
                "\tend_date,\n" +
                "\twork_date,\n" +
                "\tcalendar_work_time_s,\n" +
                "\tplanned_work_time_s,\n" +
                "\tplanned_stop_time_s,\n" +
                "\tworking_time_s,\n" +
                "\ttarget_working_time_s,\n" +
                "\trun_time_s,\n" +
                "\tstop_time_s,\n" +
                "\twait_time_s,\n" +
                "\tmanual_time_s,\n" +
                "\toffline_time_s,\n" +
                "\tactive_time_s,\n" +
                "\tnon_active_time_s,\n" +
                "\tnon_planned_stop_time_s,\n" +
                "\tworking_nonactive_time_s,\n" +
                "\ttheoretical_cycle_time_s,\n" +
                "\tFORMAT(process_cycle_time_s,2) as process_cycle_time_s,\n" +
                "\talarm_time_s,\n" +
                "\tfault_time_s,\n" +
                "\tFORMAT(time_operation_rate,2) as time_operation_rate,\n" +
                "\tFORMAT(total_product_rate,2) as total_product_rate,\n" +
                "\tFORMAT(ok_product_rate,2) as ok_product_rate,\n" +
                "\tFORMAT(machine_efficiency_rate,2) as machine_efficiency_rate,\n" +
                "\tFORMAT(uph,2) as uph ,\n" +
                "\ttarget_product_qty,\n" +
                "\ttheoretical_product_qty,\n" +
                "\ttotal_product,\n" +
                "\tok_product,\n" +
                "\tng_product,\n"+
                "\tbypassed_product,\n"+
                "\tbypassed_product_rate * 100 bypassed_product_rate"+
                " from fukoku_v2.daily_mstate_analysis_"+filter.getLine().toLowerCase() +" WHERE ");
        if(!filter.getLine().equalsIgnoreCase("")){
            buffer.append(" line=#{f.line} ");
        }
        if(!filter.getMachine().equalsIgnoreCase("")){
            buffer.append(" AND  machine= #{f.machine} ");
        }
        if(!filter.getStart_date().equalsIgnoreCase("") && !filter.getEnd_date().equalsIgnoreCase("")){
            buffer.append(" AND  start_date >= #{f.start_date} AND  end_date <= #{f.end_date} ");
        }
        buffer.append(" ORDER BY work_date DESC");

        System.out.println(buffer.toString());
        System.out.println("################# "+ filter.toString());

        return buffer.toString();
    }



    public static String productionStatus(@Param("f") DailyMstateAnalysisFilter filter){
        System.out.println(filter.toString());
        String lines[] = new String[]{"ha", "hb", "hc", "hd", "ib", "pd"};
        StringBuffer buffer = new StringBuffer();
        int i=0;
        for (String l: lines) {
            i++;
            buffer.append("select " +
                    "id,\n" +
                    "\tline,\n" +
                    "\tmachine,\n" +
                    "\tproduct_model,\n" +
                    "\tstart_date,\n" +
                    "\tend_date,\n" +
                    "\twork_date,\n" +
                    "\tcalendar_work_time_s,\n" +
                    "\tplanned_work_time_s,\n" +
                    "\tplanned_stop_time_s,\n" +
                    "\tworking_time_s,\n" +
                    "\ttarget_working_time_s,\n" +
                    "\trun_time_s,\n" +
                    "\tstop_time_s,\n" +
                    "\twait_time_s,\n" +
                    "\tmanual_time_s,\n" +
                    "\toffline_time_s,\n" +
                    "\tactive_time_s,\n" +
                    "\tnon_active_time_s,\n" +
                    "\tnon_planned_stop_time_s,\n" +
                    "\tworking_nonactive_time_s,\n" +
                    "\ttheoretical_cycle_time_s,\n" +
                    "\tFORMAT(process_cycle_time_s,2) as process_cycle_time_s,\n" +
                    "\talarm_time_s,\n" +
                    "\tfault_time_s,\n" +
                    "\tFORMAT(time_operation_rate,2) as time_operation_rate,\n" +
                    "\tFORMAT(total_product_rate,2) as total_product_rate,\n" +
                    "\tFORMAT(ok_product_rate,2) as ok_product_rate,\n" +
                    "\tFORMAT(machine_efficiency_rate,2) as machine_efficiency_rate,\n" +
                    "\tFORMAT(uph,2) as uph ,\n" +
                    "\ttarget_product_qty,\n" +
                    "\ttheoretical_product_qty,\n" +
                    "\ttotal_product,\n" +
                    "\tok_product,\n" +
                    "\tng_product"+
                    " from daily_mstate_analysis_"+l +" WHERE ");
            /*if(!filter.getLine().equalsIgnoreCase("")){
                buffer.append(" line=#{f.line} ");
            }*/
            if(!filter.getMachine().equalsIgnoreCase("")){
                buffer.append("   machine LIKE  '%"+ filter.getMachine()+"%' ");
            }
            if(!filter.getStart_date().equalsIgnoreCase("") && !filter.getEnd_date().equalsIgnoreCase("")){
                buffer.append(" AND  start_date >= #{f.start_date} AND  end_date <= #{f.end_date} ");
            }

            if(i < lines.length){
                buffer.append(" UNION ");
            }else{
                buffer.append(" ORDER BY work_date DESC ");
            }
        }


        System.out.println(buffer.toString());
        System.out.println("################# "+ filter.toString());

        return buffer.toString();
    }


    public static String processDefectPeriodStatus(@Param("f") DailyMstateAnalysisFilter filter){
        System.out.println(filter.toString());
        StringBuffer buffer = new StringBuffer();
        buffer.append("SELECT \n" +
                "\t'HA' as line,\n" +
                "\tIFNULL(SUM(total_product),0) as  total_product, \n" +
                "  IFNULL(SUM(ng_product),0) as  ng_product,\n" +
                "\t IFNULL(FORMAT(SUM(  (ng_product / total_product)  * 100), 2),0)  as  ng_product_rate\n" +
                "FROM daily_mstate_analysis_ha WHERE start_date >= #{f.start_date} AND  end_date <= #{f.end_date} \n" +
                "UNION\n" +
                "SELECT \n" +
                "\t'HB' as line,\n" +
                "\tIFNULL(SUM(total_product),0) as  total_product, \n" +
                "  IFNULL(SUM(ng_product),0) as  ng_product,\n" +
                "\t IFNULL(FORMAT(SUM(  (ng_product / total_product)  * 100), 2),0)  as  ng_product_rate\n" +
                "FROM daily_mstate_analysis_hb WHERE start_date >= #{f.start_date} AND  end_date <= #{f.end_date} \n" +
                "UNION\n" +
                "SELECT \n" +
                "\t'HD' as line,\n" +
                "\tIFNULL(SUM(total_product),0) as  total_product, \n" +
                "  IFNULL(SUM(ng_product),0) as  ng_product,\n" +
                "\t IFNULL(FORMAT(SUM(  (ng_product / total_product)  * 100), 2),0)  as  ng_product_rate\n" +
                "FROM daily_mstate_analysis_hd WHERE start_date >= #{f.start_date} AND  end_date <= #{f.end_date} \n" +
                "UNION\n" +
                "SELECT \n" +
                "\t'IB' as line,\n" +
                "\tIFNULL(SUM(total_product),0) as  total_product, \n" +
                "  IFNULL(SUM(ng_product),0) as  ng_product,\n" +
                "\t IFNULL(FORMAT(SUM(  (ng_product / total_product)  * 100), 2),0)  as  ng_product_rate\n" +
                "FROM daily_mstate_analysis_ib WHERE start_date >= #{f.start_date} AND  end_date <= #{f.end_date} \n" +
                "UNION\n" +
                "SELECT \n" +
                "\t'PD' as line,\n" +
                "\tIFNULL(SUM(total_product),0) as  total_product, \n" +
                "  IFNULL(SUM(ng_product),0) as  ng_product,\n" +
                "\t IFNULL(FORMAT(SUM(  (ng_product / total_product)  * 100), 2),0)  as  ng_product_rate\n" +
                "FROM daily_mstate_analysis_pd WHERE start_date >= #{f.start_date} AND  end_date <= #{f.end_date} " +
                " UNION " +
                " SELECT " +
                " 'HC' as line," +
                " IFNULL(SUM(total_product),0) as  total_product, " +
                " IFNULL(SUM(ng_product),0) as  ng_product, " +
                " IFNULL(FORMAT(SUM(  (ng_product / total_product)  * 100), 2),0)  as  ng_product_rate " +
                "   FROM daily_mstate_analysis_hc WHERE start_date >= #{f.start_date} AND  end_date <= #{f.end_date} ");
        System.out.println(buffer.toString());
        System.out.println("################# "+ filter.toString());
        return buffer.toString();
    }

    public static String breakdowntimeanalysisbyline(@Param("f") DailyMstateAnalysisFilter filter){
        System.out.println(filter.toString());
        String lines[] = new String[]{"ha", "hb", "hc", "hd", "ib", "pd"};
        StringBuffer buffer = new StringBuffer();
        int i=0;
        System.out.println("###### filter.getLine() "+filter.getLine());
        System.out.println("###### filter.getLine() "+filter.getMachine());
        if(filter.getLine() == null && filter.getMachine() != null){
            String likeMachine = "";
            String groupBy =" ,machine ";
            if(filter.getMachine() != null){
                likeMachine = " AND machine LIKE '%"+filter.getMachine()+"%' ";
            }
            for (String l: lines) {
                i++;
                System.out.println(l);
                buffer.append(" \n" +
                        "SELECT \n" +
                        "\tline , \n" +
                        "\tYEAR(start_date) AS year, \n" +
                        "\tMONTH(start_date) AS month, \n" +
                        " machine, "+
                        "\tSUM(working_time_s) * num_of_machines as working_time_s, \n" +
                        "\tSUM(non_active_time_s)  as non_active_time_s,\n" +
                        "\tSUM(CAST(working_nonactive_time_s AS INT)) AS working_nonactive_time_s, " +
                        " SUM(CAST(alarm_time_s AS INT)) AS alarm_time_s,  "+
                        " num_of_machines , " +
                        " machine," +
                        " SUM(fault_time_s) as fault_time_s  \n" +
                        "FROM(\n" +
                        "\tSELECT line ,  start_date, \n" +
                        "\tSUM(CAST(working_time_s AS INT)) AS working_time_s,\n" +
                        "\tSUM(CAST(non_active_time_s AS INT)) AS non_active_time_s,\n" +
                        "\tSUM(CAST(working_nonactive_time_s AS INT)) AS working_nonactive_time_s, \n" +
                        " SUM(CAST(alarm_time_s AS INT)) AS alarm_time_s,  "+
                        "(SELECT COUNT(LMD.join_name) FROM machines M \n" +
                        "\t\tINNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id \n" +
                        "\t\tINNER JOIN _lines L ON LMD.ref_line_id = L.id  \n" +
                        "\t\tINNER JOIN factories F ON L.ref_factory = F.id  \n" +
                        "\t\tWHERE  L._name = '"+l.toUpperCase()+"')as num_of_machines, machine," +
                        " SUM(CAST(fault_time_s AS INT)) AS fault_time_s "+
                        "\tFROM daily_mstate_analysis_"+ l +" GROUP BY start_date " +groupBy+ " \n" +
                        ") AS A\n" +
                        "WHERE YEAR(start_date) = #{f.work_date} "+ likeMachine +"\n" +
                        "GROUP BY 1,2,3\n" + groupBy +
                        "  ");
                if(i < lines.length){
                    buffer.append(" UNION ");
                }else{
                    buffer.append(" ORDER BY month, line ASC ");
                }
            }
        }else if(filter.getLine() == null){
            String likeMachine = "";
            String groupBy =""; //" ",machine ";
            if(filter.getMachine() != null){
                likeMachine = " AND machine LIKE '%"+filter.getMachine()+"%' ";
            }
            for (String l: lines) {
                i++;
                System.out.println(l);
                buffer.append(" \n" +
                        "SELECT \n" +
                        "\tline , \n" +
                        "\tYEAR(start_date) AS year, \n" +
                        "\tMONTH(start_date) AS month, \n" +
                        " machine, "+
                        "\tSUM(working_time_s) * num_of_machines as working_time_s, \n" +
                        "\tSUM(non_active_time_s)  as non_active_time_s,\n" +
                        "\tSUM(CAST(working_nonactive_time_s AS INT)) AS working_nonactive_time_s, " +
                        " SUM(CAST(alarm_time_s AS INT)) AS alarm_time_s,  "+
                        " num_of_machines , " +
                        " machine," +
                        " SUM(fault_time_s) as fault_time_s  \n" +
                        "FROM(\n" +
                        "\tSELECT line ,  start_date, \n" +
                        "\tSUM(CAST(working_time_s AS INT)) AS working_time_s,\n" +
                        "\tSUM(CAST(non_active_time_s AS INT)) AS non_active_time_s,\n" +
                        "\tSUM(CAST(working_nonactive_time_s AS INT)) AS working_nonactive_time_s, \n" +
                        " SUM(CAST(alarm_time_s AS INT)) AS alarm_time_s,  "+
                        "(SELECT COUNT(LMD.join_name) FROM machines M \n" +
                        "\t\tINNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id \n" +
                        "\t\tINNER JOIN _lines L ON LMD.ref_line_id = L.id  \n" +
                        "\t\tINNER JOIN factories F ON L.ref_factory = F.id  \n" +
                        "\t\tWHERE  L._name = '"+l.toUpperCase()+"')as num_of_machines, machine," +
                        " SUM(CAST(fault_time_s AS INT)) AS fault_time_s "+
                        "\tFROM daily_mstate_analysis_"+ l +" GROUP BY start_date " +groupBy+ " \n" +
                        ") AS A\n" +
                        "WHERE YEAR(start_date) = #{f.work_date} "+ likeMachine +"\n" +
                        "GROUP BY 1,2,3\n" + groupBy +
                        "  ");
                if(i < lines.length){
                    buffer.append(" UNION ");
                }else{
                    buffer.append(" ORDER BY month, line ASC ");
                }
            }
        }else {
            String line = "";
            if(filter.getLine() != null){
                line = " AND line='"+filter.getLine().toUpperCase()+"' ";
            }
            buffer.append(" \n" +
                    "SELECT \n" +
                    "\tline , \n" +
                    "\tYEAR(start_date) AS year, \n" +
                    "\tMONTH(start_date) AS month, \n" +
                    "\tSUM(working_time_s) * num_of_machines as working_time_s, \n" +
                    "\tSUM(non_active_time_s)  as non_active_time_s,\n" +
                    "\tSUM(CAST(working_nonactive_time_s AS INT)) AS working_nonactive_time_s, " +
                    " SUM(CAST(alarm_time_s AS INT)) AS alarm_time_s,  "+
                    " num_of_machines , " +
                    " machine," +
                    " SUM(fault_time_s) as fault_time_s  \n" +
                    "FROM(\n" +
                    "\tSELECT line ,  start_date, \n" +
                    "\tSUM(CAST(working_time_s AS INT)) AS working_time_s,\n" +
                    "\tSUM(CAST(non_active_time_s AS INT)) AS non_active_time_s,\n" +
                    "\tSUM(CAST(working_nonactive_time_s AS INT)) AS working_nonactive_time_s, \n" +
                    " SUM(CAST(alarm_time_s AS INT)) AS alarm_time_s,  "+
                    "(SELECT COUNT(LMD.join_name) FROM machines M \n" +
                    "\t\tINNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id \n" +
                    "\t\tINNER JOIN _lines L ON LMD.ref_line_id = L.id  \n" +
                    "\t\tINNER JOIN factories F ON L.ref_factory = F.id  \n" +
                    "\t\tWHERE  L._name = '"+filter.getLine().toUpperCase()+"')as num_of_machines," +
                    " machine ," +
                    " SUM(CAST(fault_time_s AS INT)) AS fault_time_s "+
                    "\tFROM daily_mstate_analysis_"+ filter.getLine().toLowerCase() +" GROUP BY start_date,machine\n" +
                    ") AS A\n" +
                    "WHERE YEAR(start_date) = #{f.work_date} " + line +"  \n" +
                    "GROUP BY 1,2,3,machine\n" +
                    "  ");
        }

        System.out.println("################# "+ filter.toString());
        System.out.println("################# "+ buffer.toString());
        return buffer.toString();
    }



}
