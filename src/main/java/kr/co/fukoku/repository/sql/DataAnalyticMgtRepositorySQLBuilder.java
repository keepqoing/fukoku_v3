package kr.co.fukoku.repository.sql;

import org.apache.ibatis.annotations.Param;

import kr.co.fukoku.model.form.ProductFrm;

public class DataAnalyticMgtRepositorySQLBuilder {
	
	public static String find() {
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from monitoring_mstate_tmp");
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
