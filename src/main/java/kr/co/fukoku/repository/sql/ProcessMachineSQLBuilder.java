package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.ProcessMachineFrm;

public class ProcessMachineSQLBuilder {

	public static String find(ProcessMachineFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by id  asc ");
		}
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from process_machine   "+f.getOrderBy()+";"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
