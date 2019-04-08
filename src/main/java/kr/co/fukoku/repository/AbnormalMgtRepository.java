package kr.co.fukoku.repository;

import kr.co.fukoku.model.AbnormalMgt;
import kr.co.fukoku.model.form.AbnormalMgtFrm;
import kr.co.fukoku.repository.sql.AbnormalMgtSQLBuilder;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AbnormalMgtRepository {
    @SelectProvider(type = AbnormalMgtSQLBuilder.class, method = "find")
    @Results(value={
            @Result(property = "id", column="id"),
            @Result(property = "factory", column="ref_factory_id",
                one = @One(select = "kr.co.fukoku.repository.FactoryRepository.findOne")
            ),
            @Result(property = "department", column="ref_department_id",
                    one = @One(select = "kr.co.fukoku.repository.DepartmentRepository.findOne")
            ),
            @Result(property = "lines", column="id",
                    many = @Many(select = "kr.co.fukoku.repository.LineRepository.findAbnormalMgtLine")
            )
    })
    List<AbnormalMgt> findAll(@Param("f") AbnormalMgtFrm f);

    @SelectProvider(type = AbnormalMgtSQLBuilder.class, method = "find")
    List<Map<String, Object>> findMap(@Param("f") AbnormalMgtFrm f);

    @Select("SELECT * FROM abnormal_mgt WHERE name = #{name} ")
    @Results(value={
            @Result(property = "id", column="id"),
            @Result(property = "factory", column="ref_factory_id",
                    one = @One(select = "kr.co.fukoku.repository.FactoryRepository.findOne")
            ),
            @Result(property = "department", column="ref_department_id",
                    one = @One(select = "kr.co.fukoku.repository.DepartmentRepository.findOne")
            ),
            @Result(property = "lines", column="id",
                    many = @Many(select = "kr.co.fukoku.repository.LineRepository.findAbnormalMgtLine")
            )
    })
    AbnormalMgt findOne(@Param("name") String name);


    @Select("SELECT * FROM abnormal_mgt WHERE id = #{id} ")
    @Results(value={
            @Result(property = "id", column="id"),
            @Result(property = "factory", column="ref_factory_id",
                    one = @One(select = "kr.co.fukoku.repository.FactoryRepository.findOne")
            ),
            @Result(property = "department", column="ref_department_id",
                    one = @One(select = "kr.co.fukoku.repository.DepartmentRepository.findOne")
            ),
            @Result(property = "lines", column="id",
                    many = @Many(select = "kr.co.fukoku.repository.LineRepository.findAbnormalMgtLine")
            )
    })
    AbnormalMgt findOneById(@Param("id") long id);

    @Insert("INSERT INTO abnormal_mgt ("
            + " seq, name, ref_factory_id , ref_department_id, data "
            + ") VALUES ("
            + "	#{f.seq}, "
            + "	#{f.name}, "
            + "	#{f.refFactoryId}, "
            + " #{f.refDepartmentId}, "
            + " #{f.data}"
            + ");")
    @SelectKey(statement = "SELECT LAST_INSERT_ID()", keyProperty = "f.id", before = false, resultType = long.class)
    long save(@Param("f") AbnormalMgtFrm f);

    @Insert("<script>INSERT INTO abnormal_mgt ("
            + " seq, name, ref_factory_id , ref_department_id, data "
            + ") VALUES "
            + " <foreach collection='lst' item='f' separator=','>("
            + "	#{f.seq}, "
            + "	#{f.name}, "
            + "	#{f.refFactoryId}, "
            + " #{f.refDepartmentId}, "
            + " #{f.data}"
            + " )"
            + "</foreach></script>")
    boolean saveLst(@Param("lst") List<AbnormalMgtFrm>  lst);

    @Update("UPDATE abnormal_mgt SET"
            + "	seq = #{f.seq}, "
            + "	name = #{f.name}, "
            + "	ref_factory_id = #{f.refFactoryId}, "
            + " ref_department_id = #{f.refDepartmentId},"
            + " data = #{f.data}"
            + "		 WHERE id = #{f.id}")
    boolean update(@Param("f") AbnormalMgtFrm f);

    @Delete("DELETE FROM abnormal_mgt WHERE id=#{id}")
    boolean delete(@Param("id") long id);

    /***
     *
    Insert List of Liens to abnormal_mgt_line table
     */
    @Insert("<script>insert into abnormal_mgt_line ("
            + " ref_abnormal_mgt_id, ref_line_id"
            + ") VALUES "
            + " <foreach collection='lst' item='f' separator=','>("
            + "	#{am}, "
            + " #{f} "
            + " )"
            + "</foreach></script>")
    boolean saveLstAbnormalMgtLine(@Param("lst") List<Long>  refLine , @Param("am") long refAbnormalMgt);

    @Delete("DELETE FROM abnormal_mgt_line WHERE ref_abnormal_mgt_id=#{id}")
    boolean deleteAbnormalMgtLine(@Param("id") long id);

}
