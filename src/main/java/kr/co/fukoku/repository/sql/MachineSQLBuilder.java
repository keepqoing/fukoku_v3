package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.MachineFrm;
import kr.co.fukoku.model.form.ProcessVarFrm;
import org.apache.ibatis.annotations.Param;

public class MachineSQLBuilder {

	public static String find(@Param("f") MachineFrm f) {
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from machine where status='1' and \r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   order by id asc;"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
