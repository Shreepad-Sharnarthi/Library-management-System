export default function DashboardCard({
    title,
    value,
    icon,
    color,
}) {
    return (
        <div
            className="card border-0 shadow-lg rounded-4 text-white"
            style={{
                background: color,
                minHeight: "170px",
            }}
        >
            <div className="card-body d-flex justify-content-between align-items-center">

                <div>
                    <h6>{title}</h6>

                    <h1 className="fw-bold display-4">
                        {value}
                    </h1>
                </div>

                <div
                    style={{
                        fontSize: "60px",
                        opacity: ".3",
                    }}
                >
                    {icon}
                </div>

            </div>
        </div>
    );
}