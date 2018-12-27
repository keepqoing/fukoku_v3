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
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.ProductFrm;

@Repository
public interface FactoryRepository {

	@Select("Select * from factory where status='1'")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="productType",column="product_type"),
			@Result(property="product", column="ref_product_id",
				one = @One(select  = "kr.co.fukoku.repository.ProductRepository.findOne")
		    )
	})
	List<Factory> findAll();
	
	@Select("Select * from factory where id=#{id} and status='1'")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="productType",column="product_type"),
			@Result(property="product", column="ref_product_id",
				one = @One(select  = "kr.co.fukoku.repository.ProductRepository.findOne")
			)
	})
	Factory findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO factory ("
			+ " seq, name, ref_product_id, address , product_type,start_date, end_date, remark"
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.refProductId}, "
			+ " #{f.address}, "
			+ " #{f.productType}, "
			+ " #{f.startDate}, "
			+ " #{f.endDate}, "
			+ " #{f.remark}"
			+ ");")
	boolean save(@Param("f") FactoryFrm frm);
	
	@Update("UPDATE factory SET"
			+ "	seq=#{f.seq}, "
			+ " name=#{f.name},"
			+ " ref_product_id=#{f.refProductId},"
			+ " address=#{f.address} ,"
			+ " product_type=#{f.productType},"
			+ " start_date=#{f.startDate},"
			+ " end_date=#{f.endDate},"
			+ " remark=#{f.remark} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") FactoryFrm frm);
	
	@Delete("DELETE FROM factory WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
}
