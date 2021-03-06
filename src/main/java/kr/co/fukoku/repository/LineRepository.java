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

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.repository.sql.LineSQLBuilder;

@Repository
public interface LineRepository {

	@SelectProvider(type = LineSQLBuilder.class, method = "find")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name"),
			@Result(property="factory", column="ref_factory_id",
				one = @One(select  = "kr.co.fukoku.repository.FactoryRepository.findOne")
		    ),
			@Result(property="product", column="ref_product_id",
				one = @One(select  = "kr.co.fukoku.repository.ProductRepository.findOne")
			)
	})
	List<Line> findAll(@Param("f") LineFrm f);
	
	@SelectProvider(type = LineSQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") LineFrm frm);
	
	@Select("Select * from line where id=#{id} and status='1' ")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name"),
			@Result(property="factory", column="ref_factory_id",
				one = @One(select  = "kr.co.fukoku.repository.FactoryRepository.findOne")
		    ),
			@Result(property="product", column="ref_product_id",
				one = @One(select  = "kr.co.fukoku.repository.ProductRepository.findOne")
			)
	})
	Line findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO line ("
			+ " seq, name, ref_factory_id, layout_name , ref_product_id,start_date, end_date, remark,  acronym "
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.refFactoryId}, "
			+ " #{f.layoutName}, "
			+ " #{f.refProductId}, "
			+ " #{f.startDate}, "
			+ " #{f.endDate}, "
			+ " #{f.remark},  #{f.acronym}"
			+ ");")
	boolean save(@Param("f") LineFrm frm);
	
	@Insert("<script>insert into line ("
			+ " seq, name, ref_factory_id, layout_name , ref_product_id,start_date, end_date, remark, acronym"
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.refFactoryId}, "
			+ " #{f.layoutName}, "
			+ " #{f.refProductId}, "
			+ " #{f.startDate}, "
			+ " #{f.endDate}, "
			+ " #{f.remark}, #{f.acronym}"
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<LineFrm>  lst);
	
	@Update("UPDATE line SET"
			+ "	seq=#{f.seq}, "
			+ " name=#{f.name},"
			+ " ref_factory_id=#{f.refFactoryId},"
			+ " layout_name=#{f.layoutName} ,"
			+ " ref_product_id=#{f.refProductId},"
			+ " start_date=#{f.startDate},"
			+ " end_date=#{f.endDate},"
			+ " remark=#{f.remark}, acronym = #{f.acronym} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") LineFrm frm);
	
	@Delete("DELETE FROM line WHERE id=#{id}")
	boolean delete(@Param("id") long id);


	//	Chomrern as of 2019-01-28
	@Select("SELECT * FROM line WHERE status='1' ORDER BY seq ")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name"),
			@Result(property="factory", column="ref_factory_id",
					one = @One(select  = "kr.co.fukoku.repository.FactoryRepository.findOne")
			),
			@Result(property="product", column="ref_product_id",
					one = @One(select  = "kr.co.fukoku.repository.ProductRepository.findOne")
			)
	})
	List<Line> findAllLines();

	//	Chomrern as of 2019-01-28
	@Select("SELECT * FROM line WHERE status='1' AND ref_factory_id = #{fid} ORDER BY seq ")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name"),
			@Result(property="factory", column="ref_factory_id",
					one = @One(select  = "kr.co.fukoku.repository.FactoryRepository.findOne")
			),
			@Result(property="product", column="ref_product_id",
					one = @One(select  = "kr.co.fukoku.repository.ProductRepository.findOne")
			)
	})
	List<Line> findAllLinesByFactoryID(@Param("fid") long fid);

	@Select("SELECT ln.*, aml.id as abnormal_mgt_id "+
	" FROM line ln INNER JOIN abnormal_mgt_line aml "+
	" ON ln.id = aml.ref_line_id "+
	" WHERE aml.ref_abnormal_mgt_id = #{id} ")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="layoutName",column="layout_name")
	})
	List<Line> findAbnormalMgtLine(@Param("id") long id);
	
}
