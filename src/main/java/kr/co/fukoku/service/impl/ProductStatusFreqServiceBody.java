package kr.co.fukoku.service.impl;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.MachineAssignFilter;
import kr.co.fukoku.filters.ProductStatusFreqFilter;
import kr.co.fukoku.model.*;
import kr.co.fukoku.repository.LineRepository;
import kr.co.fukoku.repository.MachineRepository;
import kr.co.fukoku.repository.sql.ProductStatusFreqRepository;
import kr.co.fukoku.service.ProductStatusFreqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductStatusFreqServiceBody implements ProductStatusFreqService {

    @Autowired
    private ProductStatusFreqRepository productStatusFreqRepository;

    @Autowired
    private LineRepository lineRepository;

    @Autowired
    private MachineRepository machineRepository;

    @Override
    public List<ProductStatusFreq> getAllProductStatusFreqPerMachineGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException {
        try {
            List<Line> lineList = lineRepository.findAllLines();
            ProductStatusFreqFilter filter = new ProductStatusFreqFilter(
                    productStatusFreqFilter.getStartDate(),
                    productStatusFreqFilter.getEndDate(),
                    productStatusFreqFilter.getLine(),
                    productStatusFreqFilter.getMachine());

            List<ProductStatusFreqOrigin> productListAllLine = productStatusFreqRepository.findAllByMachine(filter);
            List<ProductStatusFreqOrigin> productStatusFreqOriginList = new ArrayList<>();
            productListAllLine.stream().forEach(i->{productStatusFreqOriginList.add(i);});

            List<ProductStatusFreq> productStatusFreqList = new ArrayList<>();
//            System.out.println(productStatusFreqOriginList.size());
//            productStatusFreqOriginList.stream().forEach(i-> System.out.println(i.toString()));


            lineList.stream().forEach(i->{
                List<StatusFreq> statusFreqList = new ArrayList<>();
                ProductStatusFreq productStatusFreq = new ProductStatusFreq();
                for(int j=0;j<productStatusFreqOriginList.size();j++){
                    if(i.getName().equals(productStatusFreqOriginList.get(j).getLine())){
                        StatusFreq TTFreq = new StatusFreq(productStatusFreqOriginList.get(j).getTotalProduct(), "TT");
                        StatusFreq OKFreq = new StatusFreq(productStatusFreqOriginList.get(j).getTotalGoodProduct(), "OK");
                        StatusFreq NGFreq = new StatusFreq(productStatusFreqOriginList.get(j).getTotalNGProduct(), "NG");
                        StatusFreq DFFreq = new StatusFreq(productStatusFreqOriginList.get(j).getTotalDefectiveProduct(), "DF");
                        statusFreqList.add(TTFreq);
                        statusFreqList.add(OKFreq);
                        statusFreqList.add(NGFreq);
                        statusFreqList.add(DFFreq);
                    }
                }
                productStatusFreq.setCategorie(i.getName());
                productStatusFreq.setValues(statusFreqList);
                productStatusFreqList.add(productStatusFreq);
            });
            productStatusFreqList.stream().forEach(i->{
                if(i.getValues().size()==0){
                    for(int j=0;j<4;j++){
                        StatusFreq statusFreq = new StatusFreq(0,"");
                        i.getValues().add(statusFreq);
                        if(j==0)
                            statusFreq.setRate("TT");
                        else if(j==1)
                            statusFreq.setRate("OK");
                        else if(j==2)
                            statusFreq.setRate("NG");
                        else
                            statusFreq.setRate("DF");
                    }
                }else if(i.getValues().size()<4){
                    for(int j=i.getValues().size()+1;j<=4;j++){
                        StatusFreq statusFreq = new StatusFreq(0,"");
                        i.getValues().add(statusFreq);
                        if(j==0)
                            statusFreq.setRate("TT");
                        else if(j==1)
                            statusFreq.setRate("OK");
                        else if(j==2)
                            statusFreq.setRate("NG");
                        else
                            statusFreq.setRate("DF");
                    }
                }
            });
            return productStatusFreqList;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public List<ProductStatusFreq> getAllProductStatusFreqPerLineGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException {
        try {

//            MachineAssignFilter machineAssignFilter = new MachineAssignFilter();
//            machineAssignFilter.setLineName(productStatusFreqFilter.getLine());
//            List<Machine> machineList = machineService.getAllMachineNameAndMappingName(machineAssignFilter);
            List<Machine> machineList;
            if(productStatusFreqFilter.getLine().equals("ALL")) {

                machineList = machineRepository.findAllMachines();
                System.out.println("YES..........");
            }else{
                MachineAssignFilter m = new MachineAssignFilter();
                m.setLineName(productStatusFreqFilter.getLine());
                machineList = machineRepository.findAllMachinesByLine(m.getLineName());
            }
            machineList.stream().forEach(i->{
                        System.out.println("Machine name: " + i.getName() + " , Mapping Name: " + i.getAcronym());
                    }
            );
            ProductStatusFreqFilter filter = new ProductStatusFreqFilter(
                    productStatusFreqFilter.getStartDate()
                    , productStatusFreqFilter.getEndDate()
                    , productStatusFreqFilter.getLine()
                    , productStatusFreqFilter.getMachine());
            List<ProductStatusFreqOrigin> productList = productStatusFreqRepository.findAllByLine(filter);

            List<ProductStatusFreqOrigin> productStatusFreqOriginList = new ArrayList<>();
            productList.stream().forEach(i->{productStatusFreqOriginList.add(i);});


            List<ProductStatusFreq> productStatusFreqList = new ArrayList<>();
//            System.out.println(productStatusFreqOriginList.size());
//            productStatusFreqOriginList.stream().forEach(i-> System.out.println(i.toString()));

//            System.out.println("yyy00000---- " + productStatusFreqFilter.getLine());
//            System.out.println("mmm====" + productStatusFreqFilter.getMachine());
            machineList.stream().forEach(i->{
                List<StatusFreq> statusFreqList = new ArrayList<>();
                ProductStatusFreq productStatusFreq = new ProductStatusFreq();
                for(int j=0;j<productStatusFreqOriginList.size();j++){
//                    System.out.println(productStatusFreqOriginList.get(j).getMachine().contains(i.getMappingName()));
//                    System.out.println("get machine : " + productStatusFreqOriginList.get(j).getMachine());
                    if(productStatusFreqOriginList.get(j).getMachine().equalsIgnoreCase(i.getName())){
                        StatusFreq TTFreq = new StatusFreq(productStatusFreqOriginList.get(j).getTotalProduct(), "TT");
                        StatusFreq OKFreq = new StatusFreq(productStatusFreqOriginList.get(j).getTotalGoodProduct(), "OK");
                        StatusFreq NGFreq = new StatusFreq(productStatusFreqOriginList.get(j).getTotalNGProduct(), "NG");
                        StatusFreq DFFreq = new StatusFreq(productStatusFreqOriginList.get(j).getTotalDefectiveProduct(), "DF");
                        statusFreqList.add(TTFreq);
                        statusFreqList.add(OKFreq);
                        statusFreqList.add(NGFreq);
                        statusFreqList.add(DFFreq);
                    }
                }
                productStatusFreq.setCategorie(i.getName());
                productStatusFreq.setValues(statusFreqList);
                productStatusFreqList.add(productStatusFreq);
            });
            productStatusFreqList.stream().forEach(i->{
                if(i.getValues().size()==0){
                    for(int j=0;j<4;j++){
                        StatusFreq statusFreq = new StatusFreq(0,"");
                        i.getValues().add(statusFreq);
                        if(j==0)
                            statusFreq.setRate("TT");
                        else if(j==1)
                            statusFreq.setRate("OK");
                        else if(j==2)
                            statusFreq.setRate("NG");
                        else
                            statusFreq.setRate("DF");
                    }
                }else if(i.getValues().size()<4){
                    for(int j=i.getValues().size()+1;j<=4;j++){
                        StatusFreq statusFreq = new StatusFreq(0,"");
                        i.getValues().add(statusFreq);
                        if(j==0)
                            statusFreq.setRate("TT");
                        else if(j==1)
                            statusFreq.setRate("OK");
                        else if(j==2)
                            statusFreq.setRate("NG");
                        else
                            statusFreq.setRate("DF");
                    }
                }
            });
            return productStatusFreqList;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public List<Pie> getAllProductStatusFreqOKProductGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException {
        try {
            List<Line> lineList = lineRepository.findAllLines();
            ProductStatusFreqFilter filter = new ProductStatusFreqFilter(productStatusFreqFilter.getStartDate(), productStatusFreqFilter.getEndDate(), productStatusFreqFilter.getLine(), productStatusFreqFilter.getMachine());
            List<ProductStatusFreqOrigin> productList = productStatusFreqRepository.findAllByOKProduct(filter);

            List<Pie> pieList = new ArrayList<>();
            lineList.stream().forEach(i->{

                for(int j=0;j<productList.size();j++) {
                    if (i.getName().equals(productList.get(j).getLine())) {
                        Pie OKFreq = new Pie(productList.get(j).getTotalGoodProduct(), productList.get(j).getLine());
                        pieList.add(OKFreq);
                    }
                }
            });

            return pieList;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public List<Pie> getAllProductStatusFreqNGGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException {
        try {
            List<Line> lineList = lineRepository.findAllLines();
            ProductStatusFreqFilter filter = new ProductStatusFreqFilter(productStatusFreqFilter.getStartDate(), productStatusFreqFilter.getEndDate(), productStatusFreqFilter.getLine(), productStatusFreqFilter.getMachine());
            List<ProductStatusFreqOrigin> productList = productStatusFreqRepository.findAllByNG_DF(filter);

            List<Pie> pieList = new ArrayList<>();
            lineList.stream().forEach(i->{

                for(int j=0;j<productList.size();j++) {
                    if (i.getName().equals(productList.get(j).getLine())) {
                        Pie pie = new Pie(productList.get(j).getTotalNGProduct(), productList.get(j).getLine());
                        pieList.add(pie);
                    }
                }
            });

            return pieList;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public List<Pie> getAllProductStatusFreqDFGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException {
        try {
            List<Line> lineList = lineRepository.findAllLines();
            ProductStatusFreqFilter filter = new ProductStatusFreqFilter(productStatusFreqFilter.getStartDate(), productStatusFreqFilter.getEndDate(), productStatusFreqFilter.getLine(), productStatusFreqFilter.getMachine());
            List<ProductStatusFreqOrigin> productList = productStatusFreqRepository.findAllByNG_DF(filter);

            List<Pie> pieList = new ArrayList<>();
            lineList.stream().forEach(i->{

                for(int j=0;j<productList.size();j++) {
                    if (i.getName().equals(productList.get(j).getLine())) {
                        Pie pie = new Pie(productList.get(j).getTotalDefectiveProduct(), productList.get(j).getLine());
                        pieList.add(pie);
                    }
                }
            });

            return pieList;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }
}