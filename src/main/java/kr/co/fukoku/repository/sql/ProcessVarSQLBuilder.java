package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.model.form.ProcessVarFrm;
import org.apache.ibatis.annotations.Param;

public class ProcessVarSQLBuilder {

	public static String find(@Param("f") ProcessVarFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by id  asc ");
		}
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from process_var where status='1' and \r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   "+f.getOrderBy()+";"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
