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
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.ProductProcessVar;
import kr.co.fukoku.model.SensorAdHoc;
import kr.co.fukoku.model.form.LineFrm;


@Repository
public interface SensorAdHocRepository {

	@Select("SELECT * FROM sensor_ad_hoc  where ref_line=#{line}")
	@Results(value={
			@Result(property="seq", column="seq"),
			@Result(property="name", column="name"),
			@Result(property="type", column="type"),
			@Result(property="usl", column="usl"),
			@Result(property="lsl", column="lsl"),
			@Result(property="unitKind", column="unit_kind"),
			@Result(property="transformValue", column="transform_value"),
			@Result(property="remark", column="remark"),
			@Result(property="uslPlc", column="usl_plc"),
			@Result(property="lslPlc", column="lsl_plc"),
			@Result(property="sign", column="sign"),
			@Result(property="refLine",column="ref_line"),
	})
	List<ProductProcessVar> findSensorAdHoc(@Param("line") String lineId);
	
	@Select("SELECT * FROM sensor_ad_hoc  where ref_factory=#{refFactory}")
	@Results(value={
			@Result(property="seq", column="seq"),
			@Result(property="name", column="name"),
			@Result(property="type", column="type"),
			@Result(property="usl", column="usl"),
			@Result(property="lsl", column="lsl"),
			@Result(property="unitKind", column="unit_kind"),
			@Result(property="transformValue", column="transform_value"),
			@Result(property="remark", column="remark"),
			@Result(property="uslPlc", column="usl_plc"),
			@Result(property="lslPlc", column="lsl_plc"),
			@Result(property="sign", column="sign"),
			@Result(property="refFactory",column="ref_factory"),
	})
	List<ProductProcessVar> findSensorAdHocByRefFactory(@Param("refFactory") long refFactory);
	
	@Select("SELECT * from sensor_ad_hoc where id=#{id}")
	@Results(value={
			@Result(property="seq", column="seq"),
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
	
	@Insert("INSERT INTO sensor_ad_hoc ("+
			"	seq, " + 
			"	ref_line, " + 
			"	ref_factory, " + 
			"	name," + 
			"	type," + 
			"	usl," + 
			"	lsl," + 
			"	unit_kind," + 
			"	transform_value," + 
			"	remark,  usl_plc, lsl_plc, sign " + 
			" ) VALUES (" +
			"	#{f.seq}, "+
			"	#{f.refLine}, "+
			"	#{f.refFactory}, "
			+ " #{f.name}, "+
			"	#{f.type}, "
			+ " #{f.usl}, "
			+ " #{f.lsl}, "
			+ " #{f.unitKind}, "
			+ " #{f.transformValue},"
			+ " #{f.remark},  #{f.uslPlc}, #{f.lslPlc}, #{f.sign}"+
			");")
	boolean save(@Param("f") ProductProcessVar frm);
	
	@Update("UPDATE sensor_ad_hoc set"
			+ "	seq=#{f.seq}, " + 
			"	name=#{f.name}," + 
			"	type=#{f.type}," + 
			"	usl=#{f.usl}," +  
			"	lsl=#{f.lsl}," + 
			"	unit_kind=#{f.unitKind}," + 
			"	transform_value=#{f.transformValue}," +  
			"	remark=#{f.remark} , "
			+ " usl_plc=#{f.uslPlc}, "
			+ " lsl_plc=#{f.lslPlc}, "
			+ " sign=#{f.sign} "
			+ " where id=#{f.id}")
	boolean update(@Param("f") ProductProcessVar frm);
	
	@Delete("DELETE FROM sensor_ad_hoc WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
}
