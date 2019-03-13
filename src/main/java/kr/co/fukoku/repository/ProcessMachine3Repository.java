package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.Factory;
import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.ProcessChain;
import kr.co.fukoku.model.ProcessChainElement;
import kr.co.fukoku.model.ProcessChainMachine;
import kr.co.fukoku.model.ProcessChainProduct;
import kr.co.fukoku.model.ProductProcessVar;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.repository.sql.FactorySQLBuilder;
import kr.co.fukoku.repository.sql.ProcessMachineSQLBuilder3;

@Repository
public interface ProcessMachine3Repository {
	
	@Select("select COUNT(DISTINCT(name)) as count from process_chain_element")
	long countStage();
	
	@SelectProvider(type = ProcessMachineSQLBuilder3.class, method = "find")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name"),
			@Result(property="name", column="name2"),
			@Result(property="processChain", column="name",
				one = @One(select  = "kr.co.fukoku.repository.ProcessMachine3Repository.findProcessChainByRefLine")
			)
	})
	List<Line> findAll(@Param("f") LineFrm f);
	
	
	
	@Select("select * from process_chain where  ref_line=#{ref_line} GROUP BY ref_line;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="name",column="name"),
			@Result(property="refLine",column="ref_line"),
			@Result(property="processChainProduct", column="id",
				many = @Many(select  = "kr.co.fukoku.repository.ProcessMachine3Repository.findProcessChainProductByRefChainId")
		    ),
			@Result(property="processChainElement", column="id",
				many = @Many(select  = "kr.co.fukoku.repository.ProcessMachine3Repository.findProcessChainElementByRefChainId")
			)
	})
	ProcessChain findProcessChainByRefLine(@Param("name") String name );
	
	
	
	
	@Select("select * from process_chain_product where ref_process_chain_id=#{ref_process_chain_id} order  by  id asc;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="refProduct",column="ref_product"),
			@Result(property="refProcessChainId",column="ref_process_chain_id")
	})
	List<ProcessChainProduct> findProcessChainProductByRefChainId(@Param("ref_process_chain_id") String refLine );
	
	@Select("select * from process_chain_element where ref_process_chain_id=#{ref_process_chain_id} order by stage asc;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="refProduct",column="ref_product"),
			@Result(property="refProcessChainId",column="ref_process_chain_id"),
			@Result(property="processChainMachine", column="id",
				many = @Many(select  = "kr.co.fukoku.repository.ProcessMachine3Repository.findProcessChainMachineByRefId")
			)
	})
	List<ProcessChainElement> findProcessChainElementByRefChainId(@Param("ref_process_chain_id") String refLine );
	
	
	
	@Select("select pcm.id, pcm.seq, pcm.ref_process, pcm.ref_machine, pcm.ref_process_chain_element, pcm.next_sequence , "
			+ "p.id as process_id from process_chain_machine pcm inner join process p on pcm.ref_process = p.name "
			+ "where ref_process_chain_element=#{id} order by seq asc;")
	@Results(value={
			@Result(property="id", column="id"),
			@Result(property="refProcess",column="ref_process"),
			@Result(property="refMachine",column="ref_machine"),
			@Result(property="refProcessChainElement",column="ref_process_chain_element"),
			@Result(property="nextSequence",column="next_sequence"),
			@Result(property="productProcessVars", column="process_chain_machine_id=id,process_id=process_id",
				many = @Many(select  = "kr.co.fukoku.repository.ProcessMachine3Repository.finProductProcessVar")
			)	
	})
	List<ProcessChainMachine> findProcessChainMachineByRefId(@Param("id") long id );
	
	@Select("select\r\n" + 
			"	ppv.id,\r\n" + 
			"	ppv.seq,\r\n" + 
			"	ppv.ref_product_id,\r\n" + 
			"	ppv.ref_process_var_id,\r\n" + 
			"	ppv.ref_process_chain_machine_id,\r\n" + 
			"	ppv.type,\r\n" + 
			"	ppv.usl,\r\n" + 
			"	ppv.lsl,\r\n" + 
			"	ppv.unit_kind,\r\n" + 
			"	ppv.transform_value,\r\n" + 
			"	ppv.remark,\r\n" + 
			"	ppv.status,\r\n" + 
			"	pv.name\r\n" + 
			"from process_var pv inner  join product_process_var ppv on pv.id=ppv.ref_process_var_id "
			+ "where  ppv.ref_process_chain_machine_id=#{process_chain_machine_id} order by ref_product_id asc;") //and pv.id=#{process_id} 
	@Results(value={
			@Result(property="refProductId",column="ref_product_id"),
			@Result(property="refProcessChainElementId",column="ref_process_chain_element_id"),
			@Result(property="unitKind",column="unit_kind"),
			@Result(property="transformValue",column="transform_value"),
			@Result(property="refProcessChainMachineId",column="ref_process_chain_machine_id"),
	})
	List<ProductProcessVar> finProductProcessVar(Map<Object, String> params);
	
	
	
	// Other 
	@SelectProvider(type = ProcessMachineSQLBuilder3.class, method = "findLineByFactoryIdAndStatus")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name")
	})
	List<Line> findLineByFactoryId(@Param("id") long id, @Param("status") String status);
	
	 
	
	
	/**
	 * 
	 * Find One Line
	 * @param f
	 * @return
	 */
	
	@SelectProvider(type = ProcessMachineSQLBuilder3.class, method = "find")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name"),
			@Result(property="name", column="name2"),
			@Result(property="processChain", column="refLine=name, productStatus=productStatus ",
				one = @One(select  = "kr.co.fukoku.repository.ProcessMachine3Repository.findProcessChainByRefLinePassProductStatus")
			)
	})
	List<Line> findAllByLineNameAndProductStatus(@Param("f") LineFrm f);
	
	
	
	@Select("select * , #{productStatus} as productStatus from process_chain  where  ref_line=#{refLine}  GROUP BY ref_line;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="name",column="name"),
			@Result(property="refLine",column="ref_line"),
			@Result(property="processChainProduct", column="refProcessChainId=id,productStatus=productStatus",
				many = @Many(select  = "kr.co.fukoku.repository.ProcessMachine3Repository.findProcessChainProductByRefChainIdByProductStatus")
		    ),
			@Result(property="processChainElement", column="id",
				many = @Many(select  = "kr.co.fukoku.repository.ProcessMachine3Repository.findProcessChainElementByRefChainId")
			)
	})
	ProcessChain findProcessChainByRefLinePassProductStatus(Map<String, Object> params );
	
	
	public static String findProcessChainByStatus(Map<String, Object> params  ) {
		// All, Active, Inactive
		String status = " ";
		System.out.println(params.get("productStatus"));
		int s = (int) params.get("productStatus");
		if(  s == 3 ) {
			status = " ";
		}else {
			status = "  and status='"+params.get("productStatus")+"'";
		}
		StringBuffer buffer = new StringBuffer();
        buffer.append(
        		"select * from process_chain_product where ref_process_chain_id=#{refProcessChainId} "+status+" order  by  id asc;"
        );
        System.out.println(buffer.toString());
        return buffer.toString();
	}
	
	//@Select("select * from process_chain_product where ref_process_chain_id=#{refProcessChainId} and status=#{productStatus} order  by  id asc;")
	@SelectProvider(type = ProcessMachine3Repository.class, method = "findProcessChainByStatus")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="refProduct",column="ref_product"),
			@Result(property="refProcessChainId",column="ref_process_chain_id")
	})
	List<ProcessChainProduct> findProcessChainProductByRefChainIdByProductStatus(Map<String, Object> params  );
	
	
	
	
//	@SelectProvider(type = FactorySQLBuilder.class, method = "find")
//	@Results(value={
//			@Result(property="startDate",column="start_date"),
//			@Result(property="endDate",column="end_date"),
//			@Result(property="lines", column="id",
//				many = @Many(select  = "kr.co.fukoku.repository.FactoryRepository.findAll")
//			)
//	})
//	List<Factory> findFactory(@Param("f") LineFrm f );

}
