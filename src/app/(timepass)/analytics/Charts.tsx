"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

import { Bar } from "react-chartjs-2";

type BarChartPropType = {
  typesOfRevenue: string;
};

export const BarChart = ({ typesOfRevenue }: BarChartPropType) => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: `${
          typesOfRevenue === "totalRevenue"
            ? "Total Revenue ₹"
            : typesOfRevenue === "revenueFromUs ₹"
            ? "Revenue From Us ₹"
            : "Previous Revenue ₹"
        }`,
        data: labels.map(() =>
          typesOfRevenue === "totalRevenue"
            ? Math.floor(Math.random() * 10000000000)
            : typesOfRevenue === "revenueFromUs"
            ? Math.floor(Math.random() * 10000000)
            : Math.floor(Math.random() * 100000)
        ),
        backgroundColor: `${
          typesOfRevenue === "totalRevenue"
            ? "rgba(255, 99, 132)"
            : typesOfRevenue === "revenueFromUs"
            ? //green color
              "rgba(75, 192, 192)"
            : "rgba(255, 206, 86)"
        }`,
      },
    ],
  };

  return <Bar data={data} />;
};
