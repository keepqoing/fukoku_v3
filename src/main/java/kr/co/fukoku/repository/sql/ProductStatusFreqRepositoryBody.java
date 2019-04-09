package kr.co.fukoku.repository.sql;

import kr.co.fukoku.filters.ProductStatusFreqFilter;
import kr.co.fukoku.model.ProductStatusFreqOrigin;
import kr.co.fukoku.repository_sqltem.SQLStatement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class ProductStatusFreqRepositoryBody implements ProductStatusFreqRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<ProductStatusFreqOrigin> findAllByMachine(ProductStatusFreqFilter productStatusFreqFilter) throws SQLException {
        RowMapper<ProductStatusFreqOrigin> rowMapper = (rs, rowNum) -> {
            ProductStatusFreqOrigin productStatusFreqOrigin = new ProductStatusFreqOrigin(
                    rs.getString("line_name"),
                    rs.getString("machine_name"),
                    rs.getString("production_date"),
                    rs.getInt("total_product"),
                    rs.getInt("good_product"),
                    rs.getInt("ng_product"),
                    rs.getInt("defective_product")
            );
            return productStatusFreqOrigin;
        };

        return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByMachine.FIND_ALL_LINE_BY_MACHINE.toString(), new Object[]{productStatusFreqFilter.getStartDate(), productStatusFreqFilter.getMachine()}, rowMapper);

    }

    @Override
    public List<ProductStatusFreqOrigin> findAllByLine(ProductStatusFreqFilter productStatusFreqFilter) throws SQLException {
        RowMapper<ProductStatusFreqOrigin> rowMapper = (rs, rowNum) -> {
            ProductStatusFreqOrigin productStatusFreqOrigin = new ProductStatusFreqOrigin(
                    rs.getString("line_name"),
                    rs.getString("machine_name"),
                    rs.getString("production_date"),
                    rs.getInt("total_product"),
                    rs.getInt("good_product"),
                    rs.getInt("ng_product"),
                    rs.getInt("defective_product")
            );
            return productStatusFreqOrigin;
        };
        if(productStatusFreqFilter.getLine().equals("ALL")) {

            return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByLine.FIND_ALL_LINE.toString(), new Object[]{productStatusFreqFilter.getStartDate()}, rowMapper);
        }
        else if(productStatusFreqFilter.getLine().equals("IB"))
            return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByLine.FIND_ALL_IB.toString(), new Object[]{productStatusFreqFilter.getStartDate()}, rowMapper);
        else if(productStatusFreqFilter.getLine().equals("HA"))
            return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByLine.FIND_ALL_HA.toString(), new Object[]{productStatusFreqFilter.getStartDate()}, rowMapper);
        else if(productStatusFreqFilter.getLine().equals("HB"))
            return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByLine.FIND_ALL_HB.toString(), new Object[]{productStatusFreqFilter.getStartDate()}, rowMapper);
        else if(productStatusFreqFilter.getLine().equals("HC"))
            return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByLine.FIND_ALL_HC.toString(), new Object[]{productStatusFreqFilter.getStartDate()}, rowMapper);
        else if(productStatusFreqFilter.getLine().equals("HD"))
            return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByLine.FIND_ALL_HD.toString(), new Object[]{productStatusFreqFilter.getStartDate()}, rowMapper);
        else if(productStatusFreqFilter.getLine().equals("PD"))
            return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByLine.FIND_ALL_PD.toString(), new Object[]{productStatusFreqFilter.getStartDate()}, rowMapper);
        else
            return null;
    }

    @Override
    public List<ProductStatusFreqOrigin> findAllByOKProduct(ProductStatusFreqFilter productStatusFreqFilter) throws SQLException {
        RowMapper<ProductStatusFreqOrigin> rowMapper = (rs, rowNum) -> {
            ProductStatusFreqOrigin productStatusFreqOrigin = new ProductStatusFreqOrigin(
                    rs.getString("line_name"),
                    rs.getString("machine_name"),
                    rs.getString("production_date"),
                    rs.getInt("total_product"),
                    rs.getInt("good_product"),
                    rs.getInt("ng_product"),
                    rs.getInt("defective_product")
            );
            return productStatusFreqOrigin;
        };

            return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByOKProduct.FIND_ALL_OK_PRODUCT.toString(), new Object[]{productStatusFreqFilter.getStartDate()}, rowMapper);

    }

    @Override
    public List<ProductStatusFreqOrigin> findAllByNG_DF(ProductStatusFreqFilter productStatusFreqFilter) throws SQLException {
        RowMapper<ProductStatusFreqOrigin> rowMapper = (rs, rowNum) -> {
            ProductStatusFreqOrigin productStatusFreqOrigin = new ProductStatusFreqOrigin(
                    rs.getString("line_name"),
                    rs.getString("machine_name"),
                    rs.getString("production_date"),
                    rs.getInt("total_product"),
                    rs.getInt("good_product"),
                    rs.getInt("ng_product"),
                    rs.getInt("defective_product")
            );
            return productStatusFreqOrigin;
        };

        return jdbcTemplate.query(SQLStatement.ProductStatusFreqSQLByNG_DF.FIND_ALL_NG_DF_PRODUCT.toString(), new Object[]{productStatusFreqFilter.getStartDate()}, rowMapper);

    }
}