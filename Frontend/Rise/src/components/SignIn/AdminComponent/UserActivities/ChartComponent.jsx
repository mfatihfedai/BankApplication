import React from "react";
import ReactApexChart from "react-apexcharts";

function ChartComponent({chartData}) {

  return (
    <>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={500}
        width={"100%"}
      />
    </>
  );
}

export default ChartComponent;
