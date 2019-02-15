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
import kr.co.fukoku.model.form.ProductProcessVarFrm;
import kr.co.fukoku.repository.sql.FactorySQLBuilder;
import kr.co.fukoku.repository.sql.ProductSQLBuilder;

@Repository
public interface ProductProcessVarRepository {

	

	
	@Insert("INSERT INTO product_process_var ("+
			"	seq, " + 
			"	ref_process_var_id," + 
			"	ref_prouduct_id" + 
			"	ref_process_machine_id," + 
			"	ref_process_chain_element_id," + 
			"	name," + 
			"	type," + 
			"	usl," + 
			"	lsl," + 
			"	unit_kind," + 
			"	transform_value," + 
			"	remark," + 
			" ) VALUES (" +
			"	#{f.seq}, #{f.refProcessVarId}, #{f.refProuductId}, #{f.refProcessMachineId}, #{f.refProcessChainElementId}, #{f.name},"+
			"	#{f.type}, #{f.usl}, #{f.lsl}, #{f.unitKind}, #{f.transformValue}, #{f.remark}, #{f.status}"+
			");")
	boolean save(@Param("f") ProductProcessVarFrm frm);
	
	@Update("delete from product_process_var where id =#{id} ")
	boolean delete(@Param("id") long id);
	
	@Update("UPDATE product_process_var set"
			+ "	seq=#{f.seq}, " + 
			"	ref_process_var_id=#{f.refProcessVarId},," + 
			"	ref_prouduct_id=#{f.refProuductId}," + 
			"	ref_process_machine_id=#{f.refProcessMachineId}," + 
			"	ref_process_chain_element_id=#{f.refProcessChainElementId}," + 
			"	name=#{f.name}," + 
			"	type=#{f.type}" + 
			"	usl=#{f.usl}" +  
			"	lsl=#{f.lsl}" + 
			"	unit_kind=#{f.unitKind}" + 
			"	transform_value=#{f.transformValue}" +  
			"	remark=#{f.remark} where id=#{f.id}")
	boolean update(@Param("f") ProductProcessVarFrm frm);
	
	
}
