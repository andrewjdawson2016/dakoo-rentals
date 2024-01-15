import React from "react";

import FinancialSummaryByYear from "../../../common/FinancialSummaryByYear";
import FinancialSummaryByMonth from "../../../common/FinancialSummaryByMonth";
import YearlyPercentChange from "../../../common/YearlyPercentChange";

function BuildingMetricsTab({ building }) {
  return (
    <>
      <FinancialSummaryByYear buildings={[building]} />
      <FinancialSummaryByMonth buildings={[building]} />
      <YearlyPercentChange buildings={[building]} />
    </>
  );
}

export default BuildingMetricsTab;
