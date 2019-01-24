package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.ProcessMachineFrm;

public class ProcessMachineSQLBuilder {

	public static String find(ProcessMachineFrm f) {
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from process_machine   order by seq asc;"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
