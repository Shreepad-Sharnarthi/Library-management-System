import { useEffect, useState } from "react";
import api from "../services/api";

export default function RecentBorrowings() {

  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("access_token");

    api
      .get("borrowings/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {

        const data = res.data.results || res.data;
setBorrowings(data.slice(0, 5));

      })

      .catch(console.log);

  }, []);

  return (

    <div className="card p-4">

      <h4 className="fw-bold mb-3">
        📖 Recent Borrowings
      </h4>

      <table className="table table-hover">

        <thead className="table-light">

          <tr>

            <th>Book</th>

            <th>Member</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {borrowings.map((item) => (

            <tr key={item.id}>

              <td>{item.book_title}</td>

              <td>{item.member_name}</td>

              <td>

                <span
                  className={`badge ${
                    item.status === "RETURNED"
                      ? "bg-success"
                      : item.status === "ISSUED"
                      ? "bg-primary"
                      : "bg-danger"
                  }`}
                >
                  {item.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}