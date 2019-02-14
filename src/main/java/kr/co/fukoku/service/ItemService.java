package kr.co.fukoku.service;



import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.ItemFilter;
import kr.co.fukoku.model.Item;

import java.util.List;

public interface ItemService {
    List<Item> getAllItemsByDepartment(ItemFilter filter) throws BusinessException;
    List<Item> getAllItemsNameByClassification(ItemFilter filter) throws BusinessException;
    Item getItemById(int id) throws BusinessException;
    boolean deleteItem(int id) throws BusinessException;
    boolean addItem(Item Item) throws BusinessException;
    boolean updateItem(Item Item) throws BusinessException;
}
