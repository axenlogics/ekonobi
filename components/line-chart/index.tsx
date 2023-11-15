import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function LineChart() {
  const canvasEl = useRef(null);

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, '#ddf7ee');
    gradient.addColorStop(0.10, '#ddf7ee');
    gradient.addColorStop(0.40, '#ffff');
    gradient.addColorStop(0.50, '#ffff');
    gradient.addColorStop(1, '#ddf7ee');

    const weight = [
        60.10, 
        60.10, 
        60.13,
        60.10,
        60.15,
        60.11,
        59.95,
        60.20,
        60.15,
    ];

    const labels = [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10"
    ];
    const data = {
      labels: 'labels',
      datasets: [
        {
          backgroundColor: gradient,
          label: "",
          data: weight,
          fill:true,
          borderWidth: 1,
          borderColor: '#7ac9aa',
          lineTension: 0.5,
          pointRadius: .01
        }
      ]
    };
    const options={
        maintainAspectRatio: false,
        plugins: {
            legend: false, // Hide legend
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    label: function(context:any) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                display: false // Hide Y axis labels
            },
            x: {
                display: false // Hide X axis labels
            }
        } 
    }
    
    const config = {
      type: "line",
      data: data,
      options: options
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div className="w-full h-full">
      <canvas className="rounded-bl-[30px] border-0" id="myChart" ref={canvasEl} height="100%" />
    </div>
  );
}
