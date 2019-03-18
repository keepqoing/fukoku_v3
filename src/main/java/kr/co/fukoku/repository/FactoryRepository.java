package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.Factory;
import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.repository.sql.FactorySQLBuilder;

@Repository
public interface FactoryRepository {

	
	@SelectProvider(type = FactorySQLBuilder.class, method = "find")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
//			@Result(property="lines", column="id",
//				many = @Many(select  = "kr.co.fukoku.repository.FactoryRepository.findLineByRefFactoryId")
//			)
	})
	List<Factory> findAll(@Param("f") FactoryFrm frm);
	
//	@Select("SELECT * FROM line WHERE ref_factory_id=#{ref_factory_id}")
//	List<Line> findLineByRefFactoryId(@Param("ref_factory_id") long id);
	
	@SelectProvider(type = FactorySQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") FactoryFrm frm);
	
	@Select("select * from factory where status='1' and \n" +
	//		"start_date <= CURRENT_TIMESTAMP and end_date >= CURRENT_TIMESTAMP and \n" +
			"id =#{id} order by id asc;")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date")
	})
	Factory findOne(@Param("id") long  id);
	
	@Insert("insert into factory ("
			+ " seq, name, address , start_date, end_date, remark, acronym"
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.address}, "
			+ " #{f.startDate}, "
			+ " #{f.endDate}, "
			+ " #{f.remark},"
			+ " #{f.acronym} "
			+ ");")
	boolean save(@Param("f") FactoryFrm frm);
	
	@Insert("<script>insert into factory ("
			+ " seq, name, address , start_date, end_date, remark, acronym"
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.address}, "
			+ " #{f.startDate}, "
			+ " #{f.endDate}, "
			+ " #{f.remark}, #{f.acronym}"
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<FactoryFrm>  lst);
	
	@Update("UPDATE factory SET"
			+ "	seq=#{f.seq}, "
			+ " name=#{f.name},"
			+ " address=#{f.address} ,"
			+ " start_date=#{f.startDate},"
			+ " end_date=#{f.endDate},"
			+ " remark=#{f.remark} , acronym = #{f.acronym} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") FactoryFrm frm);
	
	@Delete("DELETE FROM factory WHERE id=#{id}")
	boolean delete(@Param("id") long id);


	@Select("SELECT * FROM factory ORDER BY seq;")
	List<Factory> findAllFactories();
	
	@Select("SELECT * FROM TS_EFN_GETDATA WHERE GetDT BETWEEN  '2018-12-01 00:00:00.000' AND '2018-12-07 00:00:00.000' order by GetDT ASC")
	List<Map<String, Object>> findMapSimpac();
	
}
