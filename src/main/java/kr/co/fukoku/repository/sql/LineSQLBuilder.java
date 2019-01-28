package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.LineFrm;
import org.apache.ibatis.annotations.Param;

public class LineSQLBuilder {

	public static String find(@Param("f") LineFrm f) {
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from line where status='1' and \r\n" + 
	        		"		start_date <= CURRENT_TIMESTAMP and end_date >= CURRENT_TIMESTAMP and\r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   order by seq asc;"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
