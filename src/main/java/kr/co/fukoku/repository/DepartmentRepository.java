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

import kr.co.fukoku.model.Department;
import kr.co.fukoku.model.Factory;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.DepartmentFrm;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.ProductFrm;

@Repository
public interface DepartmentRepository {

	@Select("Select * from department where status='1'")
	List<Department> findAll();
	
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
	
}
