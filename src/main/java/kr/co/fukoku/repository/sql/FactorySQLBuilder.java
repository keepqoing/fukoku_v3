package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.FactoryFrm;
import org.apache.ibatis.annotations.Param;

public class FactorySQLBuilder {

	public static String find(@Param("f") FactoryFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by seq  asc ");
		}
		
		//System.out.println(f.getStatus());;
		
		String status  = "";
		if(f.getStatus().equalsIgnoreCase("1")) {
			status = "	start_date <= CURRENT_TIMESTAMP and end_date >= CURRENT_TIMESTAMP and ";
		}else if(f.getStatus().equalsIgnoreCase("0")) {
			status = "	end_date < CURRENT_TIMESTAMP and ";
		}
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from factory where status='1' and \r\n" + 
	        				status +
	        		"		name like  '%"+  f.getName().trim() +"%'   "+f.getOrderBy()+";"
	        		);
	        System.out.println(buffer.toString());
	    return buffer.toString();
		
	
	}

}
