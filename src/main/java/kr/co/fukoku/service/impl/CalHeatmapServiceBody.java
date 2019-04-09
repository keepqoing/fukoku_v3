package kr.co.fukoku.service.impl;

import kr.co.fukoku.filters.CalHeatmapFilter;
import kr.co.fukoku.model.CalHeatmap;
import kr.co.fukoku.repository.sql.CalHeatmapRepository;
import kr.co.fukoku.service.CalHeatmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalHeatmapServiceBody implements CalHeatmapService {

    @Autowired
    private CalHeatmapRepository calHeatmapRepository;

    @Override
    public List<CalHeatmap> getCountOK(CalHeatmapFilter calHeatmapFilter) {
        return calHeatmapRepository.countOK(calHeatmapFilter);
    }

    @Override
    public List<CalHeatmap> getCountTT(CalHeatmapFilter calHeatmapFilter) {
        return calHeatmapRepository.countTT(calHeatmapFilter);
    }

    @Override
    public List<CalHeatmap> getCountNG(CalHeatmapFilter calHeatmapFilter) {
        return calHeatmapRepository.countNG(calHeatmapFilter);
    }

    @Override
    public List<CalHeatmap> getCountDF(CalHeatmapFilter calHeatmapFilter) {
        return calHeatmapRepository.countDF(calHeatmapFilter);
    }

    @Override
    public List<CalHeatmap> getCountNAS(CalHeatmapFilter calHeatmapFilter) {
        return calHeatmapRepository.countNAS(calHeatmapFilter);
    }

    @Override
    public List<CalHeatmap> getCountFS(CalHeatmapFilter calHeatmapFilter) {
        return calHeatmapRepository.countFS(calHeatmapFilter);
    }

    @Override
    public List<CalHeatmap> getCountAlarm(CalHeatmapFilter calHeatmapFilter) {
        return calHeatmapRepository.countAlarm(calHeatmapFilter);
    }
}