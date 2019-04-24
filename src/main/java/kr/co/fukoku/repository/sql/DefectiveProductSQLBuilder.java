package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.DefectiveProduct;
import org.apache.ibatis.annotations.Param;

public class DefectiveProductSQLBuilder {

	public static String find(@Param("f") DefectiveProduct f) {

		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"SELECT\n" +
							"\tIFNULL(id,'') id,\n" +
							"\tIFNULL(date,'') date,\n" +
							"\tIFNULL(line,'') line,\n" +
							"\tIFNULL(product_name,'') product_name,\n" +
							"\tIFNULL(amount,'') amount,\n" +
							"\tIFNULL(type,'') type,\n" +
							"\tIFNULL(machine,'') machine,\n" +
							"\tIFNULL(reason,'') reason,\n" +
							"\tIFNULL(assembly_state,'') assembly_state,\n" +
							"\tIFNULL(detail,'') detail,\n" +
							"\tIFNULL(important,'') important,\n" +
							"\tIFNULL(related_file,'') related_file\n" +
							"FROM\n" +
							"\tfukoku_v2.VIEW_DEFECTIVE_PRODUCT_V2"
	        		);

		System.out.println("buffer value is ");
		System.out.println(buffer.toString());
	    return buffer.toString();

	}

}
