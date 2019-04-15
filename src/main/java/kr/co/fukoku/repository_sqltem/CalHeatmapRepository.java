package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.CalHeatmapFilter;
import kr.co.fukoku.model.CalHeatmap;

import java.util.List;

public interface CalHeatmapRepository {
    List<CalHeatmap> countTT(CalHeatmapFilter calHeatmapFilter);
    List<CalHeatmap> countDF(CalHeatmapFilter calHeatmapFilter);
    List<CalHeatmap> countNG(CalHeatmapFilter calHeatmapFilter);
    List<CalHeatmap> countOK(CalHeatmapFilter calHeatmapFilter);

    List<CalHeatmap> countNAS(CalHeatmapFilter calHeatmapFilter); // NAS: Non Active State of Machine
    List<CalHeatmap> countFS(CalHeatmapFilter calHeatmapFilter); // FS: Fault State of Machine
    List<CalHeatmap> countAlarm(CalHeatmapFilter calHeatmapFilter); // Alarm of Machine
}
