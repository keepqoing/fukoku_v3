package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.Department;
import kr.co.fukoku.model.form.DepartmentFrm;
import kr.co.fukoku.repository.sql.DepartmentSQLBuilder;

@Repository
public interface DepartmentRepository {

	@SelectProvider(type = DepartmentSQLBuilder.class, method = "find")
	List<Department> findAll(@Param("f") DepartmentFrm frm);
	
	@SelectProvider(type = DepartmentSQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") DepartmentFrm frm);
	
	@Select("Select * from department where id=#{id} and status='1'")
	Department findOne(@Param("id") long  id);
	
	@Insert("insert into department ("
			+ " seq, name, code , parent, remark "
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.code}, "
			+ " #{f.parent}, "
			+ " #{f.remark}"
			+ ");")
	boolean save(@Param("f") DepartmentFrm frm);
	
	@Insert("<script>insert into department ("
			+ " seq, name, code , parent, remark "
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.code}, "
			+ " #{f.parent}, "
			+ " #{f.remark}"
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<DepartmentFrm>  lst);
	
	@Update("UPDATE department SET"
			+ "	seq=#{f.seq}, "
			+ " name=#{f.name},"
			+ " code=#{f.code} ,"
			+ " parent=#{f.parent},"
			+ " remark=#{f.remark} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") DepartmentFrm frm);
	
	@Delete("DELETE FROM department WHERE id=#{id}")
	boolean delete(@Param("id") long id);

	// Chomrern - as of 2019-02-18
	@Select("SELECT distinct name FROM department")
	List<Department> getAllDepartment();
}
