package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.StateNameFrm;
import org.apache.ibatis.annotations.Param;

public class StateNameSQLBuilder {

	public static String find(@Param("f") StateNameFrm f) {

		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from state_name where status='1' and \r\n" +
	        		"		eng_name like  '%"+  f.getEngName().trim().replace("string","") +"%' OR " +
							" korean_name like '%"+  f.getKoreanName().trim().replace("strong","") +"%' ;"
	        		);
	        System.out.println(buffer.toString());
	    return buffer.toString();

	}

}
