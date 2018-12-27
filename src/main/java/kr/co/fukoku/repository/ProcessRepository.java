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

import kr.co.fukoku.model.form.ProcessFrm;

@Repository
public interface ProcessRepository {

	@Select("Select * from process where status='1'")
	List<kr.co.fukoku.model.Process> findAll();
	
	@Select("Select * from process where id=#{id} and status='1'")
	kr.co.fukoku.model.Process findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO process ("
			+ "	seq, name, type, remark"
			+ ") VALUES ("
			+ "	#{f.seq}, #{f.name}, #{f.type}, #{f.remark}"
			+ ");")
	boolean save(@Param("f") ProcessFrm frm);
	
	@Update("UPDATE process SET"
			+ "	seq=#{f.seq}, "
			+ "	name=#{f.name}, "
			+ "	type=#{f.type}, "
			+ " remark=#{f.remark}"
			+ " WHERE id=#{f.id}")
	boolean update(@Param("f") ProcessFrm frm);
	
	@Delete("DELETE FROM process WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
}
