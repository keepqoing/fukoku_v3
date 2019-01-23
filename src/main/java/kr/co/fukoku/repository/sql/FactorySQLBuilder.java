package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.FactoryFrm;

public class FactorySQLBuilder {

	public static String find(FactoryFrm f) {
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from factory where status='1' and \r\n" + 
	        		"		start_date <= CURRENT_TIMESTAMP and end_date >= CURRENT_TIMESTAMP and\r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   order by id asc;"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
