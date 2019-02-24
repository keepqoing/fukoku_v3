package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.DatabaseInforFrm;
import kr.co.fukoku.model.form.LineFrm;
import org.apache.ibatis.annotations.Param;

public class DatabaseInforSQLBuilder {

	public static String find(@Param("f") DatabaseInforFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by seq  asc ");
		}
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from data_storage_manage where status='1' and " + 
	        		"		db_name like  '%"+  f.getName().trim() +"%'   "+f.getOrderBy()+";"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
