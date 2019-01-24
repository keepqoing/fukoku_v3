package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.ProcessFrm;
import kr.co.fukoku.model.form.ProductFrm;

public class ProcessSQLBuilder {

	public static String find(ProcessFrm f) {
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from process where status='1' and \r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   order by seq asc;"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
