package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Options;

import kr.co.fukoku.model.Factory;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.model.form.MachineFrm;
import kr.co.fukoku.model.form.ProductFrm;
import kr.co.fukoku.repository.sql.LineSQLBuilder;
import kr.co.fukoku.repository.sql.MachineSQLBuilder;

@Repository
public interface MachineRepository {

	
	@SelectProvider(type = MachineSQLBuilder.class, method = "find")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="importDate",column="import_date"),
			@Result(property="facilityStaff",column="facility_staff"),
			@Result(property="facilityContactPerson",column="facility_contact_person"),
			@Result(property="plcType",column="plc_type"),
			@Result(property="plcCommunicationDevice", column="plc_communication_device"),
			@Result(property="process", column="ref_process_id",
				one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")
			),
			@Result(property="processes", column="id",
				many = @Many(select  = "kr.co.fukoku.repository.ProcessRepository.findProcessMachine")
			)
	})
	List<Machine> findAll(@Param("f") MachineFrm f);
	
	@SelectProvider(type = MachineSQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") MachineFrm f);
	
	@Select("Select * from machine where id=#{id} and status='1'")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="importDate",column="import_date"),
			@Result(property="facilityStaff",column="facility_staff"),
			@Result(property="facilityContactPerson",column="facility_contact_person"),
			@Result(property="plcType",column="plc_type"),
			@Result(property="plcCommunicationDevice", column="plc_communication_device"),
			@Result(property="process", column="ref_process_id",
				one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")
			),
			@Result(property="processes", column="id",
				many = @Many(select  = "kr.co.fukoku.repository.ProcessRepository.findProcessMachine")
			)
	})		
	Machine findOne(@Param("id") long  id);
	
	@Insert("INSERT INTO machine ("
			+ " seq, name, ref_process_id,ip ,import_date, code, manufacturer, facility_staff"
			+ " , plc_type, plc_communication_device ,remark, facility_contact_person, station, acronym"
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ "	#{f.refProcessId}, "
			+ " #{f.ip}, "
			+ " #{f.importDate}, "
			+ " #{f.code}, "
			+ " #{f.manufacturer}, "
			+ " #{f.facilityStaff}, "
			+ " #{f.plcType}, "
			+ " #{f.plcCommunicationDevice}, "
			+ " #{f.remark},"
			+ " #{f.facilityContactPerson},"
			+ " #{f.station}, #{f.acronym}"
			+ ");")
	@SelectKey(statement="SELECT LAST_INSERT_ID()", keyProperty="f.id", before=false, resultType=long.class)
	long save(@Param("f") MachineFrm frm);
	
	@Insert("<script>insert into machine ("
			+ " seq, name, ref_process_id,ip ,import_date, code, manufacturer, facility_staff"
			+ " , plc_type, plc_communication_device ,remark, facility_contact_person, station, acronym"
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.seq}, "
			+ "	#{f.name}, "
			+ "	#{f.refProcessId}, "
			+ " #{f.ip}, "
			+ " #{f.importDate}, "
			+ " #{f.code}, "
			+ " #{f.manufacturer}, "
			+ " #{f.facilityStaff}, "
			+ " #{f.plcType}, "
			+ " #{f.plcCommunicationDevice}, "
			+ " #{f.remark},"
			+ " #{f.facilityContactPerson},"
			+ " #{f.station}, #{f.acronym}"
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<MachineFrm>  lst);
	
	@Update("UPDATE machine SET"
			+ "	seq=#{f.seq}, "
			+ " name=#{f.name},"
			+ " ref_process_id=#{f.refProcessId},"
			+ " ip=#{f.ip},"
			+ " import_date=#{f.importDate},"
			+ " code=#{f.code},"
			+ " manufacturer=#{f.manufacturer},"
			+ " facility_staff=#{f.facilityStaff},"
			+ " plc_type=#{f.plcType},"
			+ " plc_communication_device=#{f.plcCommunicationDevice},"
			+" facility_contact_person=#{f.facilityContactPerson},"
			+ " remark=#{f.remark}, "
			+ " station=#{f.station}, acronym= #{f.acronym} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") MachineFrm frm);
	
	@Delete("DELETE FROM machine WHERE id=#{id}")
	boolean delete(@Param("id") long id);


	// Chomrern as of 2019-01-14
	@Select("SELECT m.*\n" +
			"FROM process p INNER JOIN machine_process mp\n" +
			"ON p.id = mp.ref_process_id INNER JOIN machine m\n" +
			"ON mp.ref_machine_id = m.id\n" +
			"WHERE p.name = #{process_name} AND m.status = '1';")
	@Results(value={
			@Result(property="importDate",column="import_date"),
			@Result(property="facilityStaff",column="facility_staff"),
			@Result(property="facilityContactPerson",column="facility_contact_person"),
			@Result(property="plcType",column="plc_type"),
			@Result(property="plcCommunicationDevice", column="plc_communication_device"),
			@Result(property="process", column="ref_process_id",
					one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")
			)
	})
	List<Machine> findAllByProcess(@Param("process_name") String process_name);


	// Chomrern - as of 2019-03-11. This api is requested by Bakhit
	@Select("Select * from machine where status='1'")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="importDate",column="import_date"),
			@Result(property="facilityStaff",column="facility_staff"),
			@Result(property="facilityContactPerson",column="facility_contact_person"),
			@Result(property="plcType",column="plc_type"),
			@Result(property="plcCommunicationDevice", column="plc_communication_device"),
			@Result(property="process", column="ref_process_id",
					one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")
			),
			@Result(property="processes", column="id",
					many = @Many(select  = "kr.co.fukoku.repository.ProcessRepository.findProcessMachine")
			)
	})
	List<Machine> findAllMachines();



	// Chomrern - as of 2019-03-11. This api is requested by Bakhit
	@Select("Select DISTINCT \n" +
			"\tCASE WHEN SUBSTR(name,4) IN ('Pre1','Pre2','Pre3') THEN 'Pre' ELSE SUBSTR(name,4) END name from machine where status='1'")

	List<Machine> findAllDistinctMachines();

	// Chomrern - as of 2019-03-11. This api is requested by Bakhit
	@Select("Select * from machine where status='1' AND LEFT(name, 2) = #{line} ORDER BY seq")
	@Results(value={
			@Result(property="id",column="id"),
			@Result(property="importDate",column="import_date"),
			@Result(property="facilityStaff",column="facility_staff"),
			@Result(property="facilityContactPerson",column="facility_contact_person"),
			@Result(property="plcType",column="plc_type"),
			@Result(property="plcCommunicationDevice", column="plc_communication_device"),
			@Result(property="process", column="ref_process_id",
					one = @One(select  = "kr.co.fukoku.repository.ProcessRepository.findOne")
			),
			@Result(property="processes", column="id",
					many = @Many(select  = "kr.co.fukoku.repository.ProcessRepository.findProcessMachine")
			)
	})
	List<Machine> findAllMachinesByLine(@Param("line") String line);
}
