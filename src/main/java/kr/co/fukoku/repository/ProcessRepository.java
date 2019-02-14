package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.model.form.ProcessFrm;
import kr.co.fukoku.repository.sql.LineSQLBuilder;
import kr.co.fukoku.repository.sql.ProcessSQLBuilder;

@Repository
public interface ProcessRepository {

	@SelectProvider(type = ProcessSQLBuilder.class, method = "find")
	@Results(value={
			@Result(property="despPicture",column="desp_picture"),
			@Result(property="repVariableName",column="rep_variable_name")
	})
	List<kr.co.fukoku.model.Process> findAll(@Param("f") ProcessFrm frm);
	
	@SelectProvider(type = ProcessSQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") ProcessFrm frm);
	
	@Select("Select * from process where id=#{id} and status='1' ")
	@Results(value={
			@Result(property="despPicture",column="desp_picture"),
			@Result(property="repVariableName",column="rep_variable_name")
	})
	kr.co.fukoku.model.Process findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO process ("
			+ "	seq, name, type, remark, rep_variable_name "
			+ ") VALUES ("
			+ "	#{f.seq}, #{f.name}, #{f.type}, #{f.remark}, #{f.repVariableName}"
			+ ");")
	boolean save(@Param("f") ProcessFrm frm);
	
	@Insert("<script>insert into process ("
			+ "	seq, name, type, remark, rep_variable_name "
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.seq}, #{f.name}, #{f.type}, #{f.remark}, #{f.repVariableName}"
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<ProcessFrm>  lst);
	
	@Update("UPDATE process SET"
			+ "	seq=#{f.seq}, "
			+ "	name=#{f.name}, "
			+ "	type=#{f.type}, "
			+ " remark=#{f.remark},  rep_variable_name = #{f.repVariableName} "
			+ " WHERE id=#{f.id}")
	boolean update(@Param("f") ProcessFrm frm);
	
	@Delete("DELETE FROM process WHERE id=#{id}")
	boolean delete(@Param("id") long id);

	// Chomrern as of 2019-01-28
	@Select("Select * from process where status='1'")
	List<kr.co.fukoku.model.Process> findAllProcesses();
	
	
	@Select("select *,pm.id as process_machine_id from process p inner join process_machine pm on p.id = pm.ref_process_id where pm.ref_machine_id=#{id}")
	@Results(value={
			@Result(property="id",column="process_machine_id"),
			@Result(property="despPicture",column="desp_picture"),
			@Result(property="repVariableName",column="rep_variable_name")
	})
	List<kr.co.fukoku.model.Process> findProcessMachine(@Param("id") long  id);
	
}
