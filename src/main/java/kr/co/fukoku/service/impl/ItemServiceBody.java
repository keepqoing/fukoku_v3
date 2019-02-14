package kr.co.fukoku.service.impl;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.ItemFilter;
import kr.co.fukoku.model.Item;
import kr.co.fukoku.repository_sqltem.ItemRepository;
import kr.co.fukoku.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class ItemServiceBody implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<Item> getAllItemsByDepartment(ItemFilter filter) throws BusinessException {
        try {
            return itemRepository.findAll(filter);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public List<Item> getAllItemsNameByClassification(ItemFilter filter) throws BusinessException {
        try {
            return itemRepository.findAllItemName(filter);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public Item getItemById(int id) throws BusinessException {
        try {
            return itemRepository.findOne(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public boolean deleteItem(int id) throws BusinessException {
        try {
            return itemRepository.delete(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public boolean addItem(Item item) throws BusinessException {
        try {
            return itemRepository.save(item);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public boolean updateItem(Item item) throws BusinessException {
        try {
            return itemRepository.update(item);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }
}