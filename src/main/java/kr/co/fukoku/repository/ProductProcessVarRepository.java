package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.ProductProcessVar;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.ProductFrm;
import kr.co.fukoku.model.form.ProductProcessVarFrm;
import kr.co.fukoku.repository.sql.FactorySQLBuilder;
import kr.co.fukoku.repository.sql.ProductSQLBuilder;

@Repository
public interface ProductProcessVarRepository {

	
	@Select("SELECT * from product_process_var where id=#{id}")
	@Results(value={
			@Result(property="seq", column="seq"),
			@Result(property="refProcessMachineId", column="ref_process_chain_machine_id"),
			@Result(property="refProuductId", column="ref_product_id"),
			@Result(property="name", column="name"),
			@Result(property="type", column="type"),
			@Result(property="usl", column="usl"),
			@Result(property="lsl", column="lsl"),
			@Result(property="unitKind", column="unit_kind"),
			@Result(property="transformValue", column="transform_value"),
			@Result(property="remark", column="remark")
	})
	ProductProcessVar findOne(@Param("id") long id);
	
	@Insert("INSERT INTO product_process_var ("+
			"	seq, " + 
			"	ref_process_chain_machine_id," + 
			"	ref_product_id," + 
			"	name," + 
			"	type," + 
			"	usl," + 
			"	lsl," + 
			"	unit_kind," + 
			"	transform_value," + 
			"	remark" + 
			" ) VALUES (" +
			"	#{f.seq}, "
			+ " #{f.refProcessMachineId}, "
			+ " #{f.refProuductId}, "
			+ " #{f.name}, "+
			"	#{f.type}, "
			+ " #{f.usl}, "
			+ " #{f.lsl}, "
			+ " #{f.unitKind}, "
			+ " #{f.transformValue},"
			+ " #{f.remark}"+
			");")
	boolean save(@Param("f") ProductProcessVar frm);
	
	@Update("delete from product_process_var where id =#{id} ")
	boolean delete(@Param("id") long id);
	
	@Update("UPDATE product_process_var set"
			+ "	seq=#{f.seq}, " + 
			"	ref_product_id=#{f.refProuductId}," + 
			"	ref_process_chain_machine_id=#{f.refProcessMachineId}," + 
			"	name=#{f.name}," + 
			"	type=#{f.type}," + 
			"	usl=#{f.usl}," +  
			"	lsl=#{f.lsl}," + 
			"	unit_kind=#{f.unitKind}," + 
			"	transform_value=#{f.transformValue}," +  
			"	remark=#{f.remark} where id=#{f.id}")
	boolean update(@Param("f") ProductProcessVar frm);
	
	
}
