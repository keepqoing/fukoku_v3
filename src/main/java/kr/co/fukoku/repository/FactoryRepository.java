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


import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.ProductFrm;

@Repository
public interface FactoryRepository {

	@Select("Select * from factory where status='1'")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="productType",column="product_type"),
			@Result(property="product", column="ref_product_id",
				one = @One(select  = "kr.co.fukoku.repository.Product.findAll")
		    )
	})
	List<Product> findAll();
	
	@Select("Select * from factory where id=#{id} and status='1'")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="productType",column="product_type"),
			@Result(property="product", column="ref_product_id",
				one = @One(select  = "kr.co.fukoku.repository.Product.findAll")
			)
	})
	Product findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO product ("
			+ "	name, type, start_date, end_date, customer_name, remark"
			+ ") VALUES ("
			+ "	#{f.name}, #{f.type}, #{f.startDate}, #{f.endDate}, #{f.customerName}, #{f.remark}"
			+ ");")
	boolean save(@Param("f") ProductFrm frm);
	
	@Update("UPDATE product SET"
			+ "	name=#{f.name}, "
			+ "	type=#{f.type}, "
			+ "	start_date=#{f.startDate}, "
			+ "	end_date=#{f.endDate},"
			+ " remark=#{f.remark}"
			+ " WHERE id=#{f.id}")
	boolean update(@Param("f") ProductFrm frm);
	
	@Delete("DELETE FROM product WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
}
