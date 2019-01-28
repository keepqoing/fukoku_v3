package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.LineFrm;
import org.apache.ibatis.annotations.Param;

public class LineSQLBuilder {

	public static String find(@Param("f") LineFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by seq  asc ");
		}
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from line where status='1' and \r\n" + 
	        		"		start_date <= CURRENT_TIMESTAMP and end_date >= CURRENT_TIMESTAMP and\r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   "+f.getOrderBy()+";"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
