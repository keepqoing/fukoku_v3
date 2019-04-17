package kr.co.fukoku.service.impl;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.model.FaultMachineModel;
import kr.co.fukoku.repository_sqltem.FaultMachineMonitorRepository;
import kr.co.fukoku.service.FaultMachineMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class FaultMachineMonitorServiceBody implements FaultMachineMonitorService {
    @Autowired
    private FaultMachineMonitorRepository faultMachineMonitorRepository;
//    @Autowired
//    private ProductDefectDetailRepositoryBody productDefectDetail;

    @Override
    public List<FaultMachineModel> getFaultMachineData(String year) throws BusinessException {
        List<FaultMachineModel> listFm = new ArrayList<>();
        List<FaultMachineModel> listFmOperateTime = new ArrayList<>();
        List<FaultMachineModel> listMainDataFm = new ArrayList<>();
        /*List<Line> line = null;
        List<Machine> machines = null;*/
        DecimalFormat df4 = new DecimalFormat(".####");
        /*try {
            line = productDefectDetail.getLine();
            //machines = productDefectDetail.getMachine();
        } catch (SQLException e) {
            e.printStackTrace();
        }*/
        try {
            listFm = faultMachineMonitorRepository.getFaultDataFromDB(year);
            listFmOperateTime = faultMachineMonitorRepository.getRealOperateTime(year);

            if(listFm.size()>0 && listFmOperateTime.size()>0){
                for(int i=0;i<listFm.size();i++){
                    double faulRate = 0;
                    FaultMachineModel fmodel = new FaultMachineModel();
                    for(int j=0;j<listFmOperateTime.size();j++){
                        if(listFm.get(i).getMonthly()==listFmOperateTime.get(j).getMonthly() && listFm.get(i).getLineName().equalsIgnoreCase(listFmOperateTime.get(j).getLineName())){
                            faulRate = (listFm.get(i).getDuration() / (listFmOperateTime.get(j).getDuration()*60)) * 100;
                            faulRate = Double.parseDouble(df4.format(faulRate));
                            fmodel.setLineName(listFm.get(i).getLineName());
                            fmodel.setDuration(listFm.get(i).getDuration());
                            fmodel.setMonthly(listFm.get(i).getMonthly());
                            fmodel.setFaultRate(faulRate);
                           /* System.out.println(listFm.get(i).getLineName()+"\t"+listFm.get(i).getMonthly());
                            System.out.println(listFm.get(i).getDuration());*/
                            listMainDataFm.add(fmodel);
                        }
                    }
                }
                return listMainDataFm;
            }
        }catch (SQLException e){
            e.printStackTrace();
            throw new BusinessException();
        }
        return listFm;
    }

    @Override
    public List<FaultMachineModel> getFaultMachineDataByLine(String year, String line) throws BusinessException{
        List<FaultMachineModel> listMainData = new ArrayList<>();
        try {
            List<FaultMachineModel> listFaultData = faultMachineMonitorRepository.getFaultDataFromDBWithLine(year,line);
            List<FaultMachineModel> listFaulOperateTime = faultMachineMonitorRepository.getRealOperateTimeByLIne(year,line);
            System.out.println(listFaultData.size());
            System.out.println(listFaulOperateTime.size());
            if(listFaultData.size()>0 && listFaulOperateTime.size()>0){
                for(int i=0;i<listFaultData.size();i++){
                    double faulRate = 0;
                    FaultMachineModel fmodel = new FaultMachineModel();
                    for(int j=0;j<listFaulOperateTime.size();j++){
                        if(listFaultData.get(i).getMonthly()==listFaulOperateTime.get(j).getMonthly() && listFaultData.get(i).getMachineName().equalsIgnoreCase(listFaulOperateTime.get(j).getMachineName())){
                            /*System.out.println(listFaultData.get(i).toString());
                            System.out.println(listFaulOperateTime.get(j).toString());*/
                            System.out.println("======================");
                            faulRate = (listFaultData.get(i).getDuration() / (listFaulOperateTime.get(j).getDuration()*60)) * 100;
                            fmodel.setLineName(listFaultData.get(i).getLineName());
                            fmodel.setDuration(listFaultData.get(i).getDuration());
                            fmodel.setMachineName(listFaultData.get(i).getMachineName());
                            fmodel.setDisplayName(listFaultData.get(i).getDisplayName());
                            fmodel.setMonthly(listFaultData.get(i).getMonthly());
                            fmodel.setFaultRate(faulRate);
                            listMainData.add(fmodel);
                        }
                    }
                }
                return listMainData;
            }
        }catch (SQLException e){
            e.printStackTrace();
            throw new BusinessException();
        }
        return listMainData;
    }

    @Override
    public List<FaultMachineModel> getFaultMachineDataByMachine(String year, String machine) throws BusinessException{
        List<FaultMachineModel> listMainData = new ArrayList<>();
        List<FaultMachineModel> listFaultMainData = new ArrayList<>();
        try {
            List<FaultMachineModel> listFaultData = faultMachineMonitorRepository.getFaultDataFromDBWithMachine(year,machine);
            List<FaultMachineModel> listFaulOperateTime = faultMachineMonitorRepository.getRealOperateTimeByMachine(year,machine);
            if(listFaultData.size()>0 && listFaulOperateTime.size()>0){
                for(int i=0;i<listFaultData.size();i++){
                    double faulRate = 0;
                    FaultMachineModel fmodel = new FaultMachineModel();
                    for(int j=0;j<listFaulOperateTime.size();j++){
                        if(listFaultData.get(i).getMonthly()==listFaulOperateTime.get(j).getMonthly() && listFaultData.get(i).getMachineName().equalsIgnoreCase(listFaulOperateTime.get(j).getMachineName())){
                            /*System.out.println(listFaultData.get(i).toString());
                            System.out.println(listFaulOperateTime.get(j).toString());
                            System.out.println("======================");*/
                            faulRate = (listFaultData.get(i).getDuration() / (listFaulOperateTime.get(j).getDuration()*60)) * 100;
                            fmodel.setLineName(listFaultData.get(i).getLineName());
                            fmodel.setDuration(listFaultData.get(i).getDuration());
                            fmodel.setMachineName(listFaultData.get(i).getMachineName());
                            fmodel.setDisplayName(listFaultData.get(i).getDisplayName());
                            fmodel.setMonthly(listFaultData.get(i).getMonthly());
                            fmodel.setFaultRate(faulRate);
                            listMainData.add(fmodel);
                        }
                    }
                }

                /*if(listMainData.size()>0){
                    //List<String> machine = lstFm.stream().map(FaultMachineModel::getMachineName).distinct().collect(Collectors.toList());
                    List<Integer> monthNum = listMainData.stream().map(FaultMachineModel::getMonthly).distinct().collect(Collectors.toList());
                    List<String> line = listMainData.stream().map(FaultMachineModel::getLineName).distinct().collect(Collectors.toList());
                    System.out.println(monthNum.size());

                    *//*for(int i=0; i<line.size(); i++){
                        for(int j=0; j<monthNum.size();j++){
                            for(int k=0;k<listMainData.size()){

                            }
                        }
                    }*//*
                    *//*
                    for(int i=0;i<monthNum.size();i++){
                        double duration = 0;
                        System.out.println(monthNum.get(i));
                        FaultMachineModel fm = new FaultMachineModel();
                        for(int j=0;j<listMainData.size();j++){
                            if(listMainData.get(j).getMachineName().contains(machine) && listMainData.get(j).getMonthly()==monthNum.get(i)){
                                duration+=listMainData.get(j).getDuration();
                                System.out.println(duration);
                                System.out.println(listMainData.get(i).toString());
                            }
                        }
                    }*//*
                }*/
                return listMainData;
            }
        }catch (SQLException e){
            e.printStackTrace();
            throw new BusinessException();
        }
        return listMainData;
    }

    @Override
    public List<FaultMachineModel> getFrequencyAlarm(FaultMachineModel fm){
        List<FaultMachineModel> listFM = new ArrayList<>();
        String line = fm.getLineName();
        String machine = fm.getMachineName();
        String startTime = fm.getStartTime();
        String endTime = fm.getEnd_time();
        try{
            listFM = faultMachineMonitorRepository.getFrequencyAlam(line,machine,startTime,endTime);
        }catch(SQLException e){
            e.printStackTrace();
        }
        return listFM;
    }

    @Override
    public List<FaultMachineModel> getFrequencyNonMovingState(FaultMachineModel fm){
        List<FaultMachineModel> listFM = new ArrayList<>();
        String line = fm.getLineName();
        String machine = fm.getMachineName();
        String startTime = fm.getStartTime();
        String endTime = fm.getEnd_time();
        try{
            listFM = faultMachineMonitorRepository.getFrequencyNonMovingState(line,machine,startTime,endTime);
        }catch(SQLException e){
            e.printStackTrace();
        }
        return listFM;
    }

    @Override
    public List<FaultMachineModel> getFrequencyError(FaultMachineModel fm){
        List<FaultMachineModel> listFM = new ArrayList<>();
        String line = fm.getLineName();
        //String machine = fm.getMachineName();
        String startTime = fm.getStartTime();
        String endTime = fm.getEnd_time();
        try{
            listFM = faultMachineMonitorRepository.getFrequencyError(line,startTime,endTime);
        }catch(SQLException e){
            e.printStackTrace();
        }
        return listFM;
    }


    /*public static void main(String arg[]){

    }*/
}
