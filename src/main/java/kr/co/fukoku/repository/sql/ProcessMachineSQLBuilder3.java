package kr.co.fukoku.repository.sql;

import kr.co.fukoku.model.form.LineFrm;
import org.apache.ibatis.annotations.Param;

public class ProcessMachineSQLBuilder3 {

	/**
	 * 
	 * @param f
	 * order by ( order by seq  asc )
	 * name ( default '' )
	 * status ( default 3 )
	 * @return
	 */
	public static String find(@Param("f") LineFrm f) {
		
		if(f.getOrderBy() != null ) {
			System.out.print("getOrderBy ==========> " + f.getOrderBy());
		}else {
			f.setOrderBy(" order by seq  asc ");
		}
		
		// All, Active, Inactive
		if(f.getStatus().equalsIgnoreCase("3")) {
			f.setStatus("");
		}else {
			f.setStatus("  status='"+f.getStatus()+"' and ");
		}
		
		// If Expired
		String status  = "";
//		if(f.getStatus().equalsIgnoreCase("1")) {
//			status = "	start_date <= CURRENT_TIMESTAMP and end_date >= CURRENT_TIMESTAMP and ";
//		}else if(f.getStatus().equalsIgnoreCase("0")) {
//			status = "	end_date < CURRENT_TIMESTAMP and ";
//		}
		
		// By Factory
		String byFactory = "";
		if(f.getRefFactoryId() != 0) {
			byFactory = " ref_factory_id="+f.getRefFactoryId()+" and ";
		}
		
		// by name in (?,?,?)
		String nameIn = "";
		if(!f.getNameIn().equalsIgnoreCase("")) {
			nameIn = " name IN ("+f.getNameIn()+") and ";
		}
		
		
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select *, name as name2,  "+ f.getProductStatus() +" as productStatus  from line where   " +  byFactory + nameIn +
	        				status + f.getStatus() +
	        		"		name like  '%"+  f.getName().trim() +"%'   "+f.getOrderBy()+";"
	        		);
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}
	
	
	
	public static String findLineByFactoryIdAndStatus(@Param("id") long id , @Param("status") String getStatus ) {
		
		
		String status  = "";
		if(getStatus.equalsIgnoreCase("1")) {
			status = "	and status='1' ";
		}else if(getStatus.equalsIgnoreCase("0")) {
			status = "	and status='0' ";
		}else {
			status = "";
		}
		
		 StringBuffer buffer = new StringBuffer();
	        buffer.append(
	        		"select * from line where  ref_factory_id="+id + status+ " order by seq  asc");
	        System.out.print(buffer.toString());
	    return buffer.toString();
		
	
	}

}
