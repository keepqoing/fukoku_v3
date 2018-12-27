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
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.MachineFrm;
import kr.co.fukoku.model.form.ProductFrm;

@Repository
public interface MachineRepository {

	@Select("Select * from machine where status='1'")
	@Results(value={
			@Result(property="importDate",column="import_date"),
			@Result(property="facilityStaff",column="facility_staff"),
			@Result(property="plcType",column="plc_type"),
			@Result(property="plcCommunication", column="plc_communication")
	})
	List<Machine> findAll();
	
	@Select("Select * from machine where id=#{id} and status='1'")
	@Results(value={
			@Result(property="importDate",column="import_date"),
			@Result(property="facilityStaff",column="facility_staff"),
			@Result(property="plcType",column="plc_type"),
			@Result(property="plcCommunication", column="plc_communication")
	})
	Machine findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO machine ("
			+ " seq, name, ip ,import_date, code, manufacturer, facility_staff"
			+ " , plc_type, plc_communication ,remark"
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ " #{f.ip}, "
			+ " #{f.importDate}, "
			+ " #{f.code}, "
			+ " #{f.manufacturer}, "
			+ " #{f.facilityStaff}, "
			+ " #{f.plcType}, "
			+ " #{f.plcCommunication}, "
			+ " #{f.remark}"
			+ ");")
	boolean save(@Param("f") MachineFrm frm);
	
	@Update("UPDATE machine SET"
			+ "	seq=#{f.seq}, "
			+ " name=#{f.name},"
			+ " ip=#{f.ip},"
			+ " import_date=#{f.importDate},"
			+ " code=#{f.code},"
			+ " manufacturer=#{f.manufacturer},"
			+ " facility_staff=#{f.facilityStaff},"
			+ " plc_type=#{f.plcType},"
			+ " plc_communication=#{f.plcCommunication},"
			+ " remark=#{f.remark} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") MachineFrm frm);
	
	@Delete("DELETE FROM machine WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
}
