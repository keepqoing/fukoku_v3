package kr.co.fukoku.repository;

import kr.co.fukoku.model.form.ProcessChainElementModelFrm;
import kr.co.fukoku.model.form.ProcessMachineModelFrm;
import kr.co.fukoku.model.form.ProcessModel;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessModelRepository {

    // Insert into proccess_chain table and get the last_insert_id for next table's (process_chain_element) foreign key
    @Insert("INSERT INTO process_chain ("
            + "	seq, name, ref_line, ref_product, status"
            + ") VALUES ("
            + "	#{f.seq}, #{f.name}, #{f.ref_line}, #{f.ref_product}, #{f.status} "
            + ")")
   // @Options(useGeneratedKeys = true, keyProperty = "id")
    @Options(useGeneratedKeys = true, keyProperty = "ID", keyColumn = "ID")
//    @SelectKey(before = false, keyProperty = "ID", statement = "SELECT LAST_INSERT_ID()", resultType = int.class)
    int save(@Param("f") ProcessModel frm);

    @Select("SELECT LAST_INSERT_ID()")
    int getLastID();


    // Insert into process_chain_element table and get the last_insert_id for next table's (process_machine) foreign key
    @Insert("INSERT INTO process_chain_element ("
            + "	stage, name, ref_process_chain_id"
            + ") VALUES ("
            + "	#{f.stage}, #{f.name}, #{f.ref_process_chain_id} "
            + ");")
    int saveProcessChainElement(@Param("f") ProcessChainElementModelFrm frm);

    @Select("SELECT LAST_INSERT_ID()")
    int getLastPCEID();


    // Insert into process_machine table
    @Insert("INSERT INTO process_machine ("
            + " seq, ref_process_id, ref_machine_id, ref_process_chain_element, next_sequence"
            + ") VALUES ("
            + "	#{f.seq}, "
            + " #{f.refProcessId}, "
            + " #{f.refMachineId}, "
            + " #{f.refProcessChainElement}, "
            + " #{f.next_sequence}"
            + ");")
    int saveProcessMachine(@Param("f") ProcessMachineModelFrm frm);


    //============ Reading data
    // 1.1 - Select all rows from process_chain table
    @Select("SELECT * FROM process_chain")
    List<ProcessModel> findAllProcessModels();

    // 1.2 - Select row from process_chain table by LINE
    @Select("SELECT * FROM process_chain WHERE ref_line IN (#{lines})")
    List<ProcessModel> findProcessModelById(@Param("lines") String lines);

    // 2 - Select all rows from process_chain_element table
    @Select("SELECT * FROM process_chain_element WHERE ref_process_chain_id = #{pcID}")
    List<ProcessChainElementModelFrm> findAllProcessChainElements(@Param("pcID") long pcID);

    // 3 - Select all rows from process_chain table
    @Select("SELECT * FROM process_machine WHERE ref_process_chain_element = #{pceID}")
    @Results(value={
            @Result(property="refProcessId",column="ref_process_id"),
            @Result(property="refMachineId",column="ref_machine_id"),
            @Result(property="refProcessChainElement",column="ref_process_chain_element")

    })
    List<ProcessMachineModelFrm> findAllProcessMachines(@Param("pceID") long pceID);




}
