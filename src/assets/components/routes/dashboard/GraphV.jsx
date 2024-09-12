import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { IoIosArrowDown } from "react-icons/io";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the scales and elements for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Custom plugin for drawing the vertical line on hover
const verticalLinePlugin = {
  id: 'verticalLinePlugin',
  beforeDraw: (chart) => {
    const { ctx, tooltip, chartArea } = chart;
    if (tooltip._active && tooltip._active.length) {
      const activePoint = tooltip._active[0];
      const x = activePoint.element.x;
      const topY = chartArea.top;
      const bottomY = chartArea.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.stroke();
      ctx.restore();
    }
  },
};

function GraphV() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("30d");

  // Sample data for the chart based on selected time range
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Request",
        data: [30, 90, 40, 60, 70, 90],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  // Chart options with the added plugin
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e5e7eb",
        },
      },
    },
    elements: {
      line: {
        cubicInterpolationMode: "monotone",
        
      },
      point: {
        radius: 0,
        hoverRadius: 5,
        hitRadius: 40,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      verticalLinePlugin, // Include the custom plugin
    },
  };

  // Available time range options
  const opt = [
    { value: "24h", label: "24h" },
    { value: "30d", label: "30d" },
    { value: "90d", label: "90d" },
    { value: "1y", label: "1y" },
    { value: "all", label: "All time" },
  ];

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="bg-white border border-gray-200 px-10 py-5 rounded-md shadow-md block items-center lg:col-start-4 lg:col-end-7 lg:row-start-1 lg:row-end-3 md:col-start-1 md:col-end-3 relative">
      <div className="flex justify-between">
        <div>
          <div className="text-lg font-bold text-zinc-900">1230</div>
          <span className="text-md font-normal text-gray-500">
            Listing Requests
          </span>
        </div>
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            className="text-sm text-gray-700 dark:text-gray-200 py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {opt.find((opt) => opt.value === selectedValue)?.label}
            <IoIosArrowDown className="ml-1" />
          </button>
          {isOpen && (
            <div className="absolute mt-2 w-40 bg-white border border-gray-200 dark:bg-gray-800 shadow-lg rounded-lg z-10 right-0">
              {opt.map((opt) => (
                <div
                  key={opt.value}
                  className="py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(opt.value)}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-4">
        <div className="h-auto w-full">
          <Line className="w-fit" data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default GraphV;
