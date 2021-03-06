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
			@Result(property="refProductId", column="ref_product_id"),
			@Result(property="refProcessVarId", column="ref_process_var_id"),
			@Result(property="name", column="name"),
			@Result(property="type", column="type"),
			@Result(property="usl", column="usl"),
			@Result(property="lsl", column="lsl"),
			@Result(property="unitKind", column="unit_kind"),
			@Result(property="transformValue", column="transform_value"),
			@Result(property="remark", column="remark"),
			@Result(property="uslPlc", column="usl_plc"),
			@Result(property="lslPlc", column="lsl_plc"),
			@Result(property="sign", column="sign")
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
			"	remark, ref_process_var_id , usl_plc, lsl_plc, sign " + 
			" ) VALUES (" +
			"	#{f.seq}, "
			+ " #{f.refProcessMachineId}, "
			+ " #{f.refProductId}, "
			+ " #{f.name}, "+
			"	#{f.type}, "
			+ " #{f.usl}, "
			+ " #{f.lsl}, "
			+ " #{f.unitKind}, "
			+ " #{f.transformValue},"
			+ " #{f.remark}, #{f.refProcessVarId} , #{f.uslPlc}, #{f.lslPlc}, #{f.sign}"+
			");")
	boolean save(@Param("f") ProductProcessVar frm);
	
	@Update("delete from product_process_var where id =#{id} ")
	boolean delete(@Param("id") long id);
	
	@Update("UPDATE product_process_var set"
			+ "	seq=#{f.seq}, " + 
			"	ref_product_id=#{f.refProductId}," + 
			"	ref_process_chain_machine_id=#{f.refProcessMachineId}," + 
			"	name=#{f.name}," + 
			"	type=#{f.type}," + 
			"	usl=#{f.usl}," +  
			"	lsl=#{f.lsl}," + 
			"	unit_kind=#{f.unitKind}," + 
			"	transform_value=#{f.transformValue}," +  
			"	remark=#{f.remark} , "
			+ " ref_process_var_id=#{f.refProcessVarId}, "
			+ " usl_plc=#{f.uslPlc}, "
			+ " lsl_plc=#{f.lslPlc}, "
			+ " sign=#{f.sign} "
			+ " where id=#{f.id}")
	boolean update(@Param("f") ProductProcessVar frm);
	
	
}
