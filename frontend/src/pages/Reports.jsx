import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

export default function Reports() {

    const token = localStorage.getItem("access_token");

    const downloadBooksReport = async () => {

        try {

            const response = await api.get(
                "reports/books/",
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Books_Report.csv";

            link.click();

        } catch (err) {

            console.log(err);

            alert("Unable to download Books Report.");

        }

    };

    const downloadBorrowingsReport = async () => {

        try {

            const response = await api.get(
                "reports/borrowings/",
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Borrowings_Report.csv";

            link.click();

        } catch (err) {

            console.log(err);

            alert("Unable to download Borrowings Report.");

        }

    };

    return (

        <MainLayout>

           <h2 className="fw-bold text-primary">
    📊 Reports
</h2>

            <div className="row">

                <div className="col-md-6">

                    <div className="card">

                        <div className="card-body text-center">

                            <h4>
                                📚 Books Report
                            </h4>

                            <p className="text-muted">
                                Download complete library inventory.
                            </p>

                            <button
                                className="btn btn-primary"
                                onClick={downloadBooksReport}
                            >
                                Download CSV
                            </button>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body text-center">

                            <h4>
                                📖 Borrowings Report
                            </h4>

                            <p className="text-muted">
                                Download borrowing history.
                            </p>

                            <button
                                className="btn btn-success"
                                onClick={downloadBorrowingsReport}
                            >
                                Download CSV
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}