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

import kr.co.fukoku.model.ProcessVar;
import kr.co.fukoku.model.form.ProcessFrm;
import kr.co.fukoku.model.form.ProcessVarFrm;
import kr.co.fukoku.repository.sql.LineSQLBuilder;
import kr.co.fukoku.repository.sql.ProcessVarSQLBuilder;

@Repository
public interface ProcessVarRepository {

	@SelectProvider(type = ProcessVarSQLBuilder.class, method = "find")
	@Results(value={
			@Result(property="itemType", column="item_type"),
			@Result(property="process", column="ref_process_id",
				one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")
		    )
	})
	List<ProcessVar> findAll(@Param("f") ProcessVarFrm f);
	
	@SelectProvider(type = ProcessVarSQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") ProcessVarFrm f);
	
	@Select("Select * from process_var where id=#{id} and status='1'")
	@Results(value={
			
			@Result(property="itemType", column="item_type"),
			@Result(property="process", column="ref_process_id",
					one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")
			)
	})
	ProcessVar findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO process_var ("
			+ " seq, name, ref_process_id, remark,item_type,  acronym"
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.refProcessId}, "
			+ " #{f.remark},"
			+ " #{f.itemType},  #{f.acronym} "
			+ ");")
	boolean save(@Param("f") ProcessVarFrm frm);
	
	@Insert("<script>insert into process_var ("
			+ " seq, name, ref_process_id, remark,item_type,  acronym"
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.refProcessId}, "
			+ " #{f.remark},"
			+ " #{f.itemType},  #{f.acronym} "
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<ProcessVarFrm>  lst);
	
	@Update("UPDATE process_var SET"
			+ "	seq=#{f.seq}, "
			+ " name=#{f.name},"
			+ " ref_process_id=#{f.refProcessId},"
			+ " remark=#{f.remark} , item_type=#{f.itemType} , acronym=#{f.acronym}"
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") ProcessVarFrm frm);
	
	@Delete("DELETE FROM process_var WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
}
