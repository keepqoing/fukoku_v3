package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.ProductFrm;
import org.apache.ibatis.annotations.Param;

public class ProductSQLBuilder {

	public static String find(@Param("f") ProductFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by id asc ");
		}
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from product where status='1' and \r\n" + 
	        		"		start_date <= CURRENT_TIMESTAMP and end_date >= CURRENT_TIMESTAMP and\r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   "+f.getOrderBy()+";"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
