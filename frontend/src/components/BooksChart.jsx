import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import api from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BooksChart() {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {

    const token = localStorage.getItem("access_token");

    api
      .get("books/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {

        const books = res.data.results || res.data;
        const categoryCount = {};

        books.forEach((book) => {

          categoryCount[book.category] =
            (categoryCount[book.category] || 0) + 1;

        });

        setChartData({
          labels: Object.keys(categoryCount),

          datasets: [
            {
              label: "Books",

              data: Object.values(categoryCount),

              backgroundColor: "#6C4DF6",
            },
          ],
        });

      })

      .catch(console.log);

  }, []);

  return (
    <div className="card p-4">

      <h4 className="fw-bold mb-3">
        📚 Books by Category
      </h4>

      <Bar data={chartData} />

    </div>
  );
}