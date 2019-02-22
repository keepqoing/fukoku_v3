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
public interface ProcessChainProductRepository {

	@Select("select pcp.ref_product, pcp.id as process_chain_product_id from process_chain_element  pce inner join process_chain_product pcp on pce.ref_process_chain_id = pcp.ref_process_chain_id where pce.id=#{id}; ")
	@Results(value={
			@Result(property="startDate",column="start_date"),
			@Result(property="endDate",column="end_date"),
			@Result(property="customerName",column="customer_name")
	})
	List<Map<String, Object>> findProcessChainProductByProcessChainElement(@Param("id") long id);
	
	
}
