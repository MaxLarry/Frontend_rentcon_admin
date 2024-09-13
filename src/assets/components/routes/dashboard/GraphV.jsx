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
import Layout from "../../ui/Layout";

// Register the scales and elements for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);


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
  // Custom plugin for drawing the vertical line on hover
  const verticalLinePlugin = {
    id: 'verticalLinePlugin',
    afterDraw: (chart) => {
      const { ctx, tooltip, chartArea } = chart;
  
      // Check if the tooltip is active
      if (tooltip && tooltip.getActiveElements().length > 0) {
        const activePoint = tooltip.getActiveElements()[0]; // Get the active point
        const x = activePoint.element.x; // X-coordinate of the active point
        const topY = chartArea.top;
        const bottomY = chartArea.bottom;
  
        ctx.save(); // Save the canvas state
        ctx.beginPath();
  
        // Create a dashed vertical line
        ctx.setLineDash([9, 5]); // Define dash pattern (5px dash, 5px space)
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
  
        // Set line properties
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(155, 155, 155, 0.8)';  // Line color
  
        // Draw the line
        ctx.stroke();
        ctx.restore(); // Restore the canvas state after drawing
      }
    },
  };

ChartJS.register( verticalLinePlugin);
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
        border: {
          display: false, // Remove the y-axis border line
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
      verticalLinePlugin: true,  // Enable the plugin in options
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
    <div className="bg-white border border-gray-200  dark:bg-zinc-800 dark:border-zinc-700 px-10 py-5 rounded-md shadow-md block items-center lg:col-start-4 lg:col-end-7 lg:row-start-1 lg:row-end-3 md:col-start-1 md:col-end-3 relative">
      <div className="flex justify-between">
        <div>
          <div className="text-lg font-bold text-zinc-900  dark:text-white">1230</div>
          <span className="text-md font-normal text-gray-500  dark:text-gray-200">
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
            <div className="absolute mt-2 p-2 w-40 bg-white border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 shadow-lg rounded-lg z-10 right-0">
              {opt.map((opt) => (
                <div
                  key={opt.value}
                  className="py-2 px-4 text-sm dark:text-gray-200 rounded-md hover:bg-zinc-800 cursor-pointer"
                  onClick={() => handleOptionClick(opt.value)}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-4 ">
        <div className="h-auto w-full ">
          <Line className="w-fit" data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default GraphV;
