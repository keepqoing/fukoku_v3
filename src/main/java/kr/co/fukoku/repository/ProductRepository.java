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

import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.ProductFrm;
import kr.co.fukoku.repository.sql.FactorySQLBuilder;
import kr.co.fukoku.repository.sql.ProductSQLBuilder;

@Repository
public interface ProductRepository {

	@SelectProvider(type = ProductSQLBuilder.class, method = "find")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="customerName",column="customer_name")
	})
	List<Product> findAll(@Param("f") ProductFrm f);
	
	@Select("Select * from product where id=#{id} and status='1' ")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="customerName",column="customer_name")
	})
	Product findOne(@Param("id") long  id);
	
	@SelectProvider(type = ProductSQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") ProductFrm frm);
	
	@Insert("INSERT INTO product ("
			+ "	name, type, start_date, end_date, customer_name, remark, acronym "
			+ ") VALUES ("
			+ "	#{f.name}, #{f.type}, #{f.startDate}, #{f.endDate}, #{f.customerName}, #{f.remark} , #{f.acronym}"
			+ ");")
	boolean save(@Param("f") ProductFrm frm);
	
	@Insert("<script>insert into product ("
			+ " name, type, start_date, end_date, customer_name, remark, acronym"
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.name}, #{f.type}, #{f.startDate}, #{f.endDate}, #{f.customerName}, #{f.remark}, #{f.acronym}"
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<ProductFrm>  lst);
	
	
	@Update("UPDATE product SET"
			+ "	name=#{f.name}, "
			+ "	type=#{f.type}, "
			+ "	start_date=#{f.startDate}, "
			+ "	end_date=#{f.endDate},"
			+ " remark=#{f.remark}, "
			+ " customer_name=#{f.customerName} , acronym = #{f.acronym}" 
			+ " WHERE id=#{f.id}")
	boolean update(@Param("f") ProductFrm frm);
	
	@Delete("DELETE FROM product WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
	@Select("Select type,id from product where  status='1' AND start_date <= CURRENT_TIMESTAMP and end_date >= CURRENT_TIMESTAMP  GROUP BY type")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="customerName",column="customer_name")
	})
	List<Product> findAllDistinct();

	// Chomrern - as of 2019-01-28
	@Select("SELECT * FROM product WHERE status='1'")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="customerName",column="customer_name")
	})
	List<Product> findAllProducts();
}
