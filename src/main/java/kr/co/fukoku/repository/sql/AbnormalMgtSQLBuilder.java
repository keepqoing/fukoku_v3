package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.AbnormalMgtFrm;
import kr.co.fukoku.model.form.DepartmentFrm;
import org.apache.ibatis.annotations.Param;

public class AbnormalMgtSQLBuilder {

	public static String find(@Param("f") AbnormalMgtFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by name ");
		}

		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from abnormal_mgt where " +
	        		"		name like  '%"+  f.getName().trim() +"%'   "+f.getOrderBy()+";"
	        		);
	        System.out.println(buffer.toString());
	    return buffer.toString();
		
	
	}

}
