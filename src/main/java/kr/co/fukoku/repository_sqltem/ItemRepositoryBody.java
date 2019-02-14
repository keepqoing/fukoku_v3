package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.ItemFilter;
import kr.co.fukoku.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class ItemRepositoryBody implements ItemRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Item> findAll(ItemFilter filter) throws SQLException {
        RowMapper<Item> rowMapper = (rs, rowNum) -> {
            Item item = new Item(
                    rs.getInt("id"),
                    rs.getString("_code"),
                    rs.getString("_name"),
                    rs.getString("remark"),
                    rs.getInt("ref_dep_pro_cat"),
                    rs.getInt("ref_parent")
            );
            item.setDepartment(rs.getString("department"));
            return item;
        };
        if (filter.getDepartment().equals("0"))
            return jdbcTemplate.query(SQLStatement.ItemSQL.FIND_ALL.toString(), new Object[]{}, rowMapper);
        else
            return jdbcTemplate.query(SQLStatement.ItemSQL.FIND_ALL_BY_DEPARTMENT.toString(), new Object[]{filter.getDepartment()}, rowMapper);
    }

    @Override
    public List<Item> findAllItemName(ItemFilter filter) throws SQLException {
        RowMapper<Item> rowMapper = (rs, rowNum) -> {
            Item item = new Item(
                    rs.getInt("id"),
                    rs.getString("_name")
            );
            item.setCode(rs.getString("_code"));
            return item;
        };
        return jdbcTemplate.query(SQLStatement.ItemSQL.FIND_ALL_ITEM_NAME.toString(), new Object[]{filter.getClassification()}, rowMapper);
    }

    @Override
    public Item findOne(int id) throws SQLException {
        try {
            RowMapper<Item> rowMapper = (rs, rowNum) -> {
                Item item = new Item(
                        rs.getInt("id"),
                        rs.getString("_code"),
                        rs.getString("_name"),
                        rs.getString("remark"),
                        rs.getInt("ref_dep_pro_cat"),
                        rs.getInt("ref_parent")
                );
                return item;
            };
            return jdbcTemplate.queryForObject(SQLStatement.ItemSQL.FIND_BY_ID.toString(),
                    new Object[]{
                            id
                    }, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public boolean save(Item item) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.ItemSQL.ADD.toString(), new Object[]{
                item.getCode(),
                item.getName(),
                item.getRemark(),
                item.getDepOfCat(),
                item.getRef_parent()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean update(Item item) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.ItemSQL.UPDATE.toString(), new Object[]{
                item.getCode(),
                item.getName(),
                item.getRemark(),
                item.getDepOfCat(),
                item.getRef_parent(),
                item.getId()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.ItemSQL.DELETE.toString(),
                new Object[]{
                        id
                });
        if (result == 1) {
            return true;
        }
        return false;
    }
}