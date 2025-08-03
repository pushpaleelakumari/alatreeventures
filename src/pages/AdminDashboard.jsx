import { useEffect, useState } from "react";
import Spinner from "../component/Spinner";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const isMobile = window.innerWidth <= 768;
    const [spinner, showSpinner] = useState(false);
    const [data, setData] = useState({
        total: 0,
        recent: [],
        mapping: {}
    });

    const handleGetData = async () => {
        showSpinner(true);
        try {
            const response = await fetch(`${apiUrl}/admin/data`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            console.log(result, 'hello result')
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            showSpinner(false);
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    // Prepare chart data
    const chartData = {
        labels: Object.keys(data.mapping || {}),
        datasets: [
            {
                label: 'Mapping Count',
                data: Object.values(data.mapping || {}),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Source to Target Mapping',
            },
        },
    };

    return (
        <Spinner show={spinner}>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-gray-500">Total Records</h3>
                        <p className="text-2xl font-bold">{data.total}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-gray-500">Recent Records</h3>
                        <p className="text-2xl font-bold">{data.recent?.length || 0}</p>
                    </div>
                </div>

                {/* Recent Data Table */}
                <div className="bg-white p-4 rounded shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Targets</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.recent?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.source}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.targets?.join(', ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(item.date).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mapping Chart */}
                <div className="p-4 bg-white shadow rounded">
                    <h2 className="text-xl font-semibold mb-4">Mapping Distribution</h2>
                    <div className="h-auto">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </Spinner>
    );
};

export default AdminDashboard;