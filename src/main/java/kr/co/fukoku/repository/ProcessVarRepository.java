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
import kr.co.fukoku.model.ProcessVar;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.ProcessVarFrm;
import kr.co.fukoku.model.form.ProductFrm;

@Repository
public interface ProcessVarRepository {

	@Select("Select * from process_var where status='1'")
	@Results(value={
			@Result(property="process", column="ref_process_id",
				one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")
		    )
	})
	List<ProcessVar> findAll();
	
	@Select("Select * from process_var where id=#{id} and status='1'")
	@Results(value={
			@Result(property="process", column="ref_process_id",
					one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")
			)
	})
	ProcessVar findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO process_var ("
			+ " seq, name, ref_process_id, remark"
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.refProcessId}, "
			+ " #{f.remark}"
			+ ");")
	boolean save(@Param("f") ProcessVarFrm frm);
	
	@Update("UPDATE process_var SET"
			+ "	seq=#{f.seq}, "
			+ " name=#{f.name},"
			+ " ref_process_id=#{f.refProcessId},"
			+ " remark=#{f.remark} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") ProcessVarFrm frm);
	
	@Delete("DELETE FROM process_var WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
}
