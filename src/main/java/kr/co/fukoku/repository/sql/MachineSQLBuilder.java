package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.MachineFrm;
import kr.co.fukoku.model.form.ProcessVarFrm;

public class MachineSQLBuilder {

	public static String find(MachineFrm f) {
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from machine where status='1' and \r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   order by id asc;"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
