package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.model.form.ProcessVarFrm;

public class ProcessVarSQLBuilder {

	public static String find(ProcessVarFrm f) {
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from process_var where status='1' and \r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   order by seq asc;"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
