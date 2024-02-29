import React from "react";
import FinancialSummaryByYear from "../../../common/FinancialSummaryByYear";
import FinancialSummaryByMonth from "../../../common/FinancialSummaryByMonth";
import YearlyPercentChange from "../../../common/YearlyPercentChange";

function HomeMetricsTab({ buildings }) {
  return (
    <>
      <FinancialSummaryByYear buildings={buildings} />
      <FinancialSummaryByMonth buildings={buildings} />
      <YearlyPercentChange buildings={buildings} />
    </>
  );
}

export default HomeMetricsTab;
