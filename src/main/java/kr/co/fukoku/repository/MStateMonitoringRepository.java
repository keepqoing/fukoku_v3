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
	
	
	/***************** Mstate Monitoring********************/
	
	/**
	 * Find All Processes
	 * @return
	 */
	@Select("select * from process order by seq asc;")
	@Results(value={
			@Result(property="despPicture",column="desp_picture"),
			@Result(property="repVariableName",column="rep_variable_name")
	})
	List<kr.co.fukoku.model.Process> findAllProcesses();
	
	/**
	 * Find All Lines
	 * @return
	 */
	@Select("SELECT *, name  as name2 FROM line ORDER BY seq ASC")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name"),
			@Result(property="name", column="name2"),
			@Result(property="processChain", column="name",
				one = @One(select  = "findProcessChainByRefLineV2")
			),
			@Result(property="dailySeq", column="name2",
			  one = @One(select  = "findLastDailySeqV2")
		    )
			
	})
	List<Line> findAllLines();
	
	@Select("select * from process_chain where  ref_line=#{ref_line} GROUP BY ref_line;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="name",column="name"),
			@Result(property="refLine",column="ref_line"),
			@Result(property="processChainElement", column="id",
				many = @Many(select  = "findProcessChainElementByRefChainIdV2")
			)
	})
	ProcessChain findProcessChainByRefLineV2(@Param("name") String name );
	
	@Select("select * from process_chain_element where ref_process_chain_id=#{ref_process_chain_id} order by stage asc;")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="refProduct",column="ref_product"),
			@Result(property="refProcessChainId",column="ref_process_chain_id"),
			@Result(property="processChainMachine", column="id",
				many = @Many(select  = "findProcessChainMachineByRefIdV2")
			)
	})
	List<ProcessChainElement> findProcessChainElementByRefChainIdV2(@Param("ref_process_chain_id") String refLine );
	
	@Select("select pcm.id, pcm.seq, pcm.ref_process, pcm.ref_machine, pcm.ref_process_chain_element, pcm.next_sequence , "
			+ "p.id as process_id from process_chain_machine pcm inner join process p on pcm.ref_process = p.name "
			+ "where ref_process_chain_element=#{id} order by seq asc;")
	@Results(value={
			@Result(property="id", column="id"),
			@Result(property="refProcess",column="ref_process"),
			@Result(property="refMachine",column="ref_machine"),
			@Result(property="refProcessChainElement",column="ref_process_chain_element"),
			@Result(property="nextSequence",column="next_sequence"),
			@Result(property="mstate", column="ref_machine",
			  one = @One(select  = "findLastMStateV2")
		    )
	})
	List<ProcessChainMachine> findProcessChainMachineByRefIdV2(@Param("id") long id );
	
	@Select("select work_date, line, machine , SUBSTRING_INDEX(SUBSTRING_INDEX(mstate_id, '_' , -3), '_' , 1) as mstate_id "
			+ " ,(select CONCAT(daily_seq, ' ', product_name) AS product_amt     from monitoring_workpiece_amount_tmp where \r\n" + 
			"			machine_name=machine \r\n" + 
			"			order by id desc limit 1) AS product_amt "
			+ " from monitoring_mstate_tmp where machine=#{ref_machine} order by id desc limit 1")
	Map<String, Object> findLastMStateV2(@Param("ref_machine") String refMachine );
	
	
	@Select("select daily_seq as pi_ds,  product_name as pi_m from monitoring_workpiece_amount_tmp where \r\n" + 
			"machine_name=(select ref_machine from process_chain_machine  where SUBSTRING_INDEX(ref_machine,'_',1) = #{line} order by seq desc limit 1) \r\n" + 
			"order by id desc limit 1;")
	Map<String, Object> findLastDailySeqV2(@Param("line") String refMachine );
	
	
	
	/*****************End Mstate Monitoring******************/
	 

}
