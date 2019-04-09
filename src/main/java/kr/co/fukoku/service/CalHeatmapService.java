package kr.co.fukoku.service;

import kr.co.fukoku.filters.CalHeatmapFilter;
import kr.co.fukoku.model.CalHeatmap;

import java.util.List;

public interface CalHeatmapService {
    List<CalHeatmap> getCountTT(CalHeatmapFilter calHeatmapFilter);
    List<CalHeatmap> getCountOK(CalHeatmapFilter calHeatmapFilter);
    List<CalHeatmap> getCountNG(CalHeatmapFilter calHeatmapFilter);
    List<CalHeatmap> getCountDF(CalHeatmapFilter calHeatmapFilter);

    List<CalHeatmap> getCountNAS(CalHeatmapFilter calHeatmapFilter); // NAS: Non Active State of Machine
    List<CalHeatmap> getCountFS(CalHeatmapFilter calHeatmapFilter); // FS: Fault State of Machine
    List<CalHeatmap> getCountAlarm(CalHeatmapFilter calHeatmapFilter); // Alarm
}
