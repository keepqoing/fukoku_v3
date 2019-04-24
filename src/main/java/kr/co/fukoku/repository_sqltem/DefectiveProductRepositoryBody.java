package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.NonActiveStateFilter;
import kr.co.fukoku.model.DefectiveProduct;
import kr.co.fukoku.model.NonActiveState;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Helper;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DefectiveProductRepositoryBody implements DefectiveProductRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<DefectiveProduct> downloadAll() {
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
        return jdbcTemplate.query(SQLStatement.DefectiveProductListSQL.DOWNLOAD_ALL.toString(),
                new Object[]{}, rowMapper);
    }

    @Override
    public List<DefectiveProduct> findAll(NonActiveStateFilter filter, Pagination pagination) {
        pagination.setTotalCount(count(filter));

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
        return jdbcTemplate.query(SQLStatement.DefectiveProductListSQL.FIND_ALL.toString(), new Object[]
                {
                        "%" + filter.getLine() + "%"
                        , "%" + filter.getMachine() + "%"
                        , "%" + filter.getProductionDate() + "%"
                        , pagination.getLimit()
                        , pagination.getOffset()
                }, rowMapper);
    }

    @Override
    public List<Counting> findNumberByLine(String productionDate) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("_name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.DefectiveProductListSQL.COUNT_NUMBER_BY_LINE.toString(), new Object[]{"%" + productionDate + "%"}, rowMapper);
    }

    @Override
    public List<Counting> findNumberByMachine(String line, String productionDate) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("mapping_name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.DefectiveProductListSQL.COUNT_NUMBER_BY_MACHINE.toString(), new Object[]{"%" + productionDate + "%", line}, rowMapper);
    }

    private Long count(NonActiveStateFilter filter) {
        return jdbcTemplate.queryForObject(SQLStatement.DefectiveProductListSQL.COUNT.toString(), new Object[]
                {
                        "%" + filter.getLine() + "%"
                        , "%" + filter.getMachine() + "%"
                        , "%" + filter.getProductionDate() + "%"
                }, Long.class);

    }



}
