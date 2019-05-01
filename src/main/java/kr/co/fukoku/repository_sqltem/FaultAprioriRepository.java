package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.model.FaultState;

import java.util.List;

public interface FaultAprioriRepository {
    List<FaultState> findAll(FaultStateFilter faultStateFilter);
}
