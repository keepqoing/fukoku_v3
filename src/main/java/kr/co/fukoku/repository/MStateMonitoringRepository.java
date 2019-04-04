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
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.ProductProcessVar;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.repository.sql.FactorySQLBuilder;
import kr.co.fukoku.repository.sql.ProcessMachineSQLBuilder3;

@Repository
public interface MStateMonitoringRepository {
	
	
	@Select("select * from process order by seq asc")
	@Results(value={
			@Result(property="despPicture",column="desp_picture"),
			@Result(property="repVariableName",column="rep_variable_name"),
			@Result(property="products", column="ref_product_id",
		    	many = @Many(select  = "findProducts")
		    )
	})
	List<kr.co.fukoku.model.Process> findAllProcess( );
	
	@Select("Select * from product where id=#{id} and status='1' ")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="customerName",column="customer_name")
	})
	List<Product> findProducts(@Param("id") long  id);
	
	
	
	
	
	
	
	
	
	
	@SelectProvider(type = ProcessMachineSQLBuilder3.class, method = "find")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name"),
			@Result(property="name", column="name2"),
			@Result(property="processChain", column="name",
				one = @One(select  = "findProcessChainByRefLine")
			)
	})
	List<Line> findAll(@Param("f") LineFrm f);
	
	
	
	@Select("select * from process_chain where  ref_line=#{ref_line} GROUP BY ref_line;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="name",column="name"),
			@Result(property="refLine",column="ref_line"),
			@Result(property="processChainProduct", column="id",
				many = @Many(select  = "findProcessChainProductByRefChainId")
		    ),
			@Result(property="processChainProductProducedAmount", column="id",
			     many = @Many(select  = "findProcessChainProductByRefChainIdWithProducedAmount")
	        ),
			@Result(property="processChainElement", column="id",
				many = @Many(select  = "findProcessChainElementByRefChainId")
			)
	})
	ProcessChain findProcessChainByRefLine(@Param("name") String name );
	
	
	
	
	@Select("select * from process_chain_product where ref_process_chain_id=#{ref_process_chain_id} order  by  id desc limit 1;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="refProduct",column="ref_product"),
			@Result(property="refProcessChainId",column="ref_process_chain_id")
	})
	List<ProcessChainProduct> findProcessChainProductByRefChainIdWithProducedAmount(@Param("ref_process_chain_id") String refLine );
	
	@Select("select * from process_chain_product where ref_process_chain_id=#{ref_process_chain_id} order  by  id;")
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
				many = @Many(select  = "findProcessChainMachineByRefId")
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
				many = @Many(select  = "finProductProcessVar")
			)	,
			@Result(property="mstate", column="ref_machine",
			  one = @One(select  = "findLastedMState")
		    )	
			
	})
	List<ProcessChainMachine> findProcessChainMachineByRefId(@Param("id") long id );
	
	
	
	
	@Select("select work_date, line, machine , SUBSTRING_INDEX(SUBSTRING_INDEX(mstate_id, '_' , -3), '_' , 1) as mstate_id from monitoring_mstate_tmp where machine=#{ref_machine} order by row_key desc limit 1")
	Map<String, Object> findLastedMState(@Param("ref_machine") String refMachine );
	
	
	
	
	
	
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
}
