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

import kr.co.fukoku.model.DatabaseInfor;
import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.DatabaseInforFrm;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.repository.sql.DatabaseInforSQLBuilder;
import kr.co.fukoku.repository.sql.LineSQLBuilder;

@Repository
public interface DatabaseInforRepository {

	@SelectProvider(type = DatabaseInforSQLBuilder.class, method = "find")
	@Results(value={
			@Result(property="name",column="db_name"),
			@Result(property="ipAddress",column="db_ip_address"),
			@Result(property="port",column="db_port_no"),
			@Result(property="username",column="db_user_name"),
			@Result(property="password",column="db_user_password"),
			@Result(property="type",column="db_type"),
			@Result(property="remark",column="remark"),
	})
	List<DatabaseInfor> findAll(@Param("f") DatabaseInforFrm f);
	
	@SelectProvider(type = DatabaseInforSQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") DatabaseInforFrm frm);
	
	@Select("Select * from data_storage_manage where id=#{id} and status='1' ")
	@Results(value={
			@Result(property="name",column="db_name"),
			@Result(property="ipAddress",column="db_ip_address"),
			@Result(property="port",column="db_port_no"),
			@Result(property="username",column="db_user_name"),
			@Result(property="password",column="db_user_password"),
			@Result(property="type",column="db_type"),
			@Result(property="remark",column="remark"),
	})
	DatabaseInfor findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO data_storage_manage ("
			+ " seq, db_name, db_ip_address, db_port_no , db_user_name,db_user_password, db_type, remark"
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.ipAddress}, "
			+ " #{f.port}, "
			+ " #{f.username}, "
			+ " #{f.password}, "
			+ " #{f.type}, "
			+ " #{f.remark}"
			+ ");")
	boolean save(@Param("f") DatabaseInforFrm frm);
	
	@Insert("<script>insert into data_storage_manage ("
			+ " seq, db_name, db_ip_address, db_port_no , db_user_name,db_user_password, db_type, remark"
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.ipAddress}, "
			+ " #{f.port}, "
			+ " #{f.username}, "
			+ " #{f.password}, "
			+ " #{f.type}, "
			+ " #{f.remark}"
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<DatabaseInforFrm>  lst);
	
	@Update("UPDATE data_storage_manage SET"
			+ "	seq=#{f.seq}, "
			+ " db_name=#{f.name},"
			+ " db_ip_address=#{f.ipAddress},"
			+ " db_port_no=#{f.port} ,"
			+ " db_user_name=#{f.username},"
			+ " db_user_password=#{f.password},"
			+ " db_type=#{f.type},"
			+ " remark=#{f.remark} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") DatabaseInforFrm frm);
	
	@Delete("DELETE FROM data_storage_manage WHERE id=#{id}")
	boolean delete(@Param("id") long id);


	
}
