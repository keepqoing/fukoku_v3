package kr.co.fukoku.service.impl;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.NewCorrelationFilter;
import kr.co.fukoku.model.NewCorrelationModel;
import kr.co.fukoku.repository_sqltem.NewCorrelationRepository;
import kr.co.fukoku.service.NewCorrelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NewCorrelationServiceBody implements NewCorrelationService {
    @Autowired
    private NewCorrelationRepository ncRepository;


    @Override
    public Map<String, Object> getAllNewCorrelation(NewCorrelationFilter correlationFilter) throws BusinessException {
        try {


            List<Object[]> correlationModelList = ncRepository.findAll(correlationFilter);


            if(correlationModelList == null)
                return null;
            int size = correlationModelList.get(0).length;
            NewCorrelationModel correlationModel;
            List<NewCorrelationModel> correlationModelList1 = new ArrayList<>();
            for(int i=0;i<size;i++){
                correlationModel = new NewCorrelationModel();
                String d0 = correlationModelList.get(0)[i].toString();
                String d1 = correlationModelList.get(1)[i].toString();
                correlationModel.setxValue(Double.parseDouble(d0));
                correlationModel.setyValue(Double.parseDouble(d1));
                correlationModelList1.add(correlationModel);
            }



            Map<String, Object> map1 = new HashMap<>();
            map1.put("DATA", correlationModelList1);
            map1.put("CORRELATION", correlationModelList.get(2));
            return map1;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }
}
