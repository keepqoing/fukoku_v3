package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.One;

import kr.co.fukoku.model.Factory;
import kr.co.fukoku.model.ProcessMachine;
import kr.co.fukoku.model.ProcessVar;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.ProcessMachineFrm;
import kr.co.fukoku.model.form.ProductFrm;
import kr.co.fukoku.repository.sql.ProcessMachineSQLBuilder;

@Repository
public interface ProcessMachineRepository {

	@SelectProvider(type = ProcessMachineSQLBuilder.class, method = "find")
	@Results(value={
			@Result(property="nextSequence", column="next_sequence" ),
			@Result(property="process.name", column="ref_process"),//,one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")),
			@Result(property="machine.name", column="ref_machine")//,one = @One(select  = "kr.co.fukoku.repository.MachineRepository.findOne")
	    
	})
	List<ProcessMachine> findAll(ProcessMachineFrm f);
	
	@SelectProvider(type = ProcessMachineSQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") ProcessMachineFrm frm);
	
	@Select("Select * from process_machine where id=#{id}")
	@Results(value={
			@Result(property="nextSequence", column="next_sequence" ),
			@Result(property="process.name", column="ref_process"),//,one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")),
			@Result(property="machine.name", column="ref_machine"),//,one = @One(select  = "kr.co.fukoku.repository.MachineRepository.findOne")
	})
	ProcessMachine findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO process_machine ("
			+ " seq,ref_process,ref_machine,next_sequence "
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ " #{f.refProcessId}, "
			+ " #{f.refMachineId}, "
			+ " #{f.nextSequence} "
			+ ");")
	boolean save(@Param("f") ProcessMachineFrm frm);
	
	@Insert("<script>insert into process_machine ("
			+ " seq,  ref_process,ref_machine,next_sequence"
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.seq}, "
			+ " #{f.refProcessId}, "
			+ " #{f.refMachineId}, "
			+ " #{f.nextSequence} "
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<ProcessMachineFrm>  lst);
	
	@Update("UPDATE process_machine SET"
			+ "	seq=#{f.seq}, "
			+ " ref_process=#{f.refProcessId},"
			+ " ref_machine=#{f.refMachineId},"
			+ " next_sequence= #{f.nextSequence}"
			+ "	WHERE id=#{f.id}")
	boolean update(@Param("f") ProcessMachineFrm frm);
	
	@Delete("DELETE FROM process_machine WHERE id=#{id}")
	boolean delete(@Param("id") long id);


	
	
	
	
	@Insert("<script>insert into machine_process ("
			+ " ref_machine_id, ref_process_id"
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{mId}, "
			+ " #{f} "
			+ " )"
			+ "</foreach></script>")
	boolean saveLstProcessMachine(@Param("lst") List<Long>  refProcesses , @Param("mId") long refMachine);
	
	@Delete("DELETE FROM machine_process WHERE ref_machine_id=#{id}")
	boolean deleteMachineProcess(@Param("id") long id);
	
	

}
