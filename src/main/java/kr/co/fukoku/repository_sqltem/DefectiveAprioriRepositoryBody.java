package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.model.DefectiveProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DefectiveAprioriRepositoryBody implements DefectiveAprioriRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<DefectiveProduct> findAll() {
        RowMapper<DefectiveProduct> rowMapper = (rs, rowNum) -> {
            DefectiveProduct defectiveProduct = new DefectiveProduct();
            defectiveProduct.setId(rs.getInt("id"));
            defectiveProduct.setDate(rs.getString("date"));
            defectiveProduct.setLine(rs.getString("line"));
            defectiveProduct.setProductName(rs.getString("product_name"));
            defectiveProduct.setAmount(rs.getInt("amount"));
            defectiveProduct.setType(rs.getString("type"));
            defectiveProduct.setMachine(rs.getString("machine"));
            defectiveProduct.setReason(rs.getString("reason"));
            defectiveProduct.setAssemblyState(rs.getString("assembly_state"));
            defectiveProduct.setDetail(rs.getString("detail"));
            defectiveProduct.setImportant(rs.getString("important"));
            defectiveProduct.setRelatedFile(rs.getString("related_file"));

            return defectiveProduct;
        };
        return jdbcTemplate.query(SQLStatement.DefectiveAprioriSQL.FIND_ALL.toString(), rowMapper);
    }



}
