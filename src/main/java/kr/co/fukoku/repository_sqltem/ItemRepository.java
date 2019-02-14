package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.ItemFilter;
import kr.co.fukoku.model.Item;

import java.sql.SQLException;
import java.util.List;

public interface ItemRepository {
    List<Item> findAll(ItemFilter filter) throws SQLException;
    List<Item> findAllItemName(ItemFilter filter) throws SQLException;
    Item findOne(int id) throws SQLException;
    boolean save(Item item) throws SQLException;
    boolean update(Item item) throws SQLException;
    boolean delete(int id) throws SQLException;
}
