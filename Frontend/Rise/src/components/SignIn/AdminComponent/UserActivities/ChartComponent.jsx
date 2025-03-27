import React from "react";
import ReactApexChart from "react-apexcharts";

function ChartComponent({chartData}) {

    console.log(chartData);

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={500}
        width={"500%"}
      />
    </div>
  );
}

export default ChartComponent;
