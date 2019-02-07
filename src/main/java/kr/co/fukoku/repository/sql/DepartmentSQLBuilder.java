package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.DepartmentFrm;
import kr.co.fukoku.model.form.FactoryFrm;
import org.apache.ibatis.annotations.Param;

public class DepartmentSQLBuilder {

	public static String find(@Param("f") DepartmentFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by seq  asc ");
		}
		
		//System.out.println(f.getStatus());;
		
		
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from department where status='1' and \r\n" + 
	        		"		name like  '%"+  f.getName().trim() +"%'   "+f.getOrderBy()+";"
	        		);
	        System.out.println(buffer.toString());
	    return buffer.toString();
		
	
	}

}
