package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.ProcessFrm;
import kr.co.fukoku.model.form.ProductFrm;
import org.apache.ibatis.annotations.Param;

public class ProcessSQLBuilder {

	public static String find(@Param("f") ProcessFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by seq  asc ");
		}
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from process where status='1' and \r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   "+f.getOrderBy()+";"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
