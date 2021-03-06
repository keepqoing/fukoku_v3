package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.ProcessChain;
import kr.co.fukoku.model.ProcessChainElement;
import kr.co.fukoku.model.ProcessChainMachine;
import kr.co.fukoku.model.ProcessChainProduct;
import kr.co.fukoku.model.ProductProcessVar;

@Repository
public interface WorkpieceParamsRepository {
	
	@Select("select id, name from line order by seq asc;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="name", column="name"),
	})
	List<Line> findAll();
	
	/*** Machine & Product ****/
	@Select("select * from process_chain where  ref_line=#{ref_line} GROUP BY ref_line;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="name",column="name"),
			@Result(property="refLine",column="ref_line"),
			@Result(property="processChainProduct", column="id",
				many = @Many(select  = "findProcessChainProductByRefChainId")
		    ),
			@Result(property="processChainElement", column="id",
				many = @Many(select  = "findProcessChainElementByRefChainId")
			)
	})
	ProcessChain findProcessChainByRefLine(@Param("ref_line") String name );
	
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
	})
	List<ProcessChainMachine> findProcessChainMachineByRefId(@Param("id") long id );
	/*** End Machine & Product ****/
	
	
	/***** Process var ***/
	@Select("select\r\n" + 
			"	ppv.id,\r\n" + 
			"	ppv.seq,\r\n" + 
			"	ppv.ref_product_id,\r\n" + 
			"	ppv.ref_process_var_id,\r\n" + 
			"	ppv.ref_process_chain_machine_id,\r\n" + 
			"	ppv.type,\r\n" + 
			"	ppv.usl,\r\n" + 
			"	ppv.lsl,\r\n" + 
			"	ppv.usl_plc,\r\n" + 
			"	ppv.lsl_plc,\r\n" + 
			"	ppv.unit_kind,\r\n" + 
			"	ppv.transform_value,\r\n" + 
			"	ppv.remark,\r\n" + 
			"	ppv.status,\r\n" + 
			"	pv.name\r\n" + 
			"from process_var pv inner  join product_process_var ppv on pv.id=ppv.ref_process_var_id "
			+ "where  ppv.ref_process_chain_machine_id=#{process_chain_machine_id} group by pv.name order by ref_product_id asc;") //and pv.id=#{process_id} 
	@Results(value={
			@Result(property="refProductId",column="ref_product_id"),
			@Result(property="refProcessChainElementId",column="ref_process_chain_element_id"),
			@Result(property="unitKind",column="unit_kind"),
			@Result(property="transformValue",column="transform_value"),
			@Result(property="refProcessChainMachineId",column="ref_process_chain_machine_id"),
			@Result(property="lslPlc",column="lsl_plc"),
			@Result(property="uslPlc",column="usl_plc"),
	})
	List<ProductProcessVar> finProductProcessVar(@Param("process_chain_machine_id") long process_chain_machine_id );
}
