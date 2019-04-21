package kr.co.fukoku.repository_sql_db2.sql;


import org.apache.ibatis.annotations.Param;

public class LineMachineProcessProductSQLBuilder {

	public static String findLine(@Param("name") String name) {
		String byName = " ";
		if(!name.equalsIgnoreCase("NA")) {
			byName = " WHERE _name='"+name+"'";
		}
		StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from _lines "+ byName +" order by _name asc ");
	    return buffer.toString();
		
	
	}

}
