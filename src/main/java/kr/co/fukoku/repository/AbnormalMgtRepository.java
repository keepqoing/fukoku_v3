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
            @Result(property = "factory", column="ref_factory_id",
                one = @One(select = "kr.co.fukoku.repository.FactoryRepository.findOne")
            ),
            @Result(property = "department", column="ref_department_id",
                    one = @One(select = "kr.co.fukoku.repository.DepartmentRepository.findOne")
            ),
            @Result(property = "line", column="ref_line_id",
                    one = @One(select = "kr.co.fukoku.repository.LineRepository.findOne")
            )
    })
    List<AbnormalMgt> findAll(@Param("f") AbnormalMgtFrm f);

    @SelectProvider(type = AbnormalMgtSQLBuilder.class, method = "find")
    List<Map<String, Object>> findMap(@Param("f") AbnormalMgtFrm f);

    @Select("SELECT * FROM abnormal_mgt WHERE name = #{name} ")
    @Results(value={
            @Result(property = "factory", column="ref_factory_id",
                    one = @One(select = "kr.co.fukoku.repository.FactoryRepository.findOne")
            ),
            @Result(property = "department", column="ref_department_id",
                    one = @One(select = "kr.co.fukoku.repository.DepartmentRepository.findOne")
            ),
            @Result(property = "line", column="ref_line_id",
                    one = @One(select = "kr.co.fukoku.repository.LineRepository.findOne")
            )
    })
    AbnormalMgt findOne(@Param("name") String name);


    @Select("SELECT * FROM abnormal_mgt WHERE id = #{id} ")
    @Results(value={
            @Result(property = "factory", column="ref_factory_id",
                    one = @One(select = "kr.co.fukoku.repository.FactoryRepository.findOne")
            ),
            @Result(property = "department", column="ref_department_id",
                    one = @One(select = "kr.co.fukoku.repository.DepartmentRepository.findOne")
            ),
            @Result(property = "line", column="ref_line_id",
                    one = @One(select = "kr.co.fukoku.repository.LineRepository.findOne")
            )
    })
    AbnormalMgt findOneById(@Param("id") int id);

    @Insert("INSERT INTO abnormal_mgt ("
            + " seq, name, ref_factory_id , ref_department_id, ref_line_id, data "
            + ") VALUES ("
            + "	#{f.seq}, "
            + "	#{f.name}, "
            + "	#{f.refFactoryId}, "
            + " #{f.refDepartmentId}, "
            + " #{f.refLineId}, "
            + " #{f.data}"
            + ");")
    boolean save(@Param("f") AbnormalMgtFrm f);

    @Insert("<script>INSERT INTO abnormal_mgt ("
            + " seq, name, ref_factory_id , ref_department_id, ref_line_id, data "
            + ") VALUES "
            + " <foreach collection='lst' item='f' separator=','>("
            + "	#{f.seq}, "
            + "	#{f.name}, "
            + "	#{f.refFactoryId}, "
            + " #{f.refDepartmentId}, "
            + " #{f.refLineId}, "
            + " #{f.data}"
            + " )"
            + "</foreach></script>")
    boolean saveLst(@Param("lst") List<AbnormalMgtFrm>  lst);

    @Update("UPDATE abnormal-mgt SET"
            + "	seq = #{f.seq}, "
            + "	name = #{f.name}, "
            + "	ref_factory_id = #{f.refFactoryId}, "
            + " ref_department_id = #{f.refDepartmentId},"
            + " ref_line_id = #{f.refLineId} ,"
            + " data = #{f.data}"
            + "		 WHERE id = #{f.id}")
    boolean update(@Param("f") AbnormalMgtFrm f);
}
