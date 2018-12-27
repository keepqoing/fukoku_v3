package kr.co.fukoku.repository;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
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

@Repository
public interface ProcessMachineRepository {

	@Select("Select * from process_machine where status='1'")
	@Results(value={
			@Result(property="process", column="ref_process_id",
				one = @One(select  = "kr.co.fukoku.repository.Process.findAll")
		    ),
			@Result(property="machine", column="ref_machine_id",
				one = @One(select  = "kr.co.fukoku.repository.Machine.findAll")
	    )
	})
	List<ProcessMachine> findAll();
	
	@Select("Select * from process_machine where id=#{id} and status='1'")
	@Results(value={
			@Result(property="process", column="ref_process_id",
					one = @One(select  = "kr.co.fukoku.repository.Process.findAll")
			)
	})
	ProcessMachine findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO process_machine ("
			+ " seq, name, ref_process_id,ref_machine_id, remark"
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.refProcessId}, "
			+ " #{f.refMachineId}, "
			+ " #{f.remark}"
			+ ");")
	boolean save(@Param("f") ProcessMachineFrm frm);
	
	@Update("UPDATE process_machine SET"
			+ "	seq=#{f.seq}, "
			+ " name=#{f.name},"
			+ " ref_process_id=#{f.refProcessId},"
			+ " ref_machine_id=#{f.refMachineId},"
			+ " remark=#{f.remark} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") ProcessMachineFrm frm);
	
	@Delete("DELETE FROM process_machine WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
}
