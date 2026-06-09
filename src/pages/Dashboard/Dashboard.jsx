import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import StatsCard from '../../components/StatsCard/StatsCard';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { dashboardStats, revenueChartData, formatRupiah } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-label">{label}</p>
        <p className="chart-tooltip-value">{formatRupiah(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = React.useState(dashboardStats);
  const [chartData, setChartData] = React.useState(revenueChartData);
  const [recentOrders, setRecentOrders] = React.useState([]);

  React.useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.orders) {
          const orders = data.orders;
          setRecentOrders(orders.slice(0, 5));
          
          // Calculate stats
          const totalOrders = orders.length;
          const pendingOrders = orders.filter(o => o.status === 'Belum Dikerjakan' || o.status === 'Sedang Dikerjakan').length;
          const completedOrders = orders.filter(o => o.status === 'Selesai').length;
          const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
          
          setStats([
            { title: 'Total Pendapatan', value: formatRupiah(totalRevenue), change: 'Total Pendapatan', isPositive: true, icon: 'dollar' },
            { title: 'Pesanan Masuk', value: totalOrders.toString(), change: 'Pesanan Masuk', isPositive: true, icon: 'shopping-cart' },
            { title: 'Menunggu Dikerjakan', value: pendingOrders.toString(), change: 'Menunggu Dikerjakan', isPositive: false, icon: 'clock' },
            { title: 'Website Selesai', value: completedOrders.toString(), change: 'Website Selesai', isPositive: true, icon: 'check-circle' }
          ]);
          
          // Calculate chart data (group revenue by date)
          const revenueByDate = {};
          orders.forEach(o => {
            if (o.date) {
              if (!revenueByDate[o.date]) {
                revenueByDate[o.date] = 0;
              }
              revenueByDate[o.date] += o.totalPrice || 0;
            }
          });
          
          const newChartData = Object.keys(revenueByDate).sort().map(date => {
            const d = new Date(date);
            const dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
            return {
              name: dateStr,
              value: revenueByDate[date]
            };
          });
          
          if (newChartData.length > 0) {
            setChartData(newChartData);
          }
        }
      })
      .catch(err => console.error(err));
    }
  }, [token]);

  return (
    <DashboardLayout>
      <div className="dashboard-page" id="dashboard-page">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Ringkasan Dashboard</h1>
          <p className="page-subtitle">
            Selamat datang di Dashboard Tim Cuan.in. Kelola pesanan joki website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" id="stats-grid">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="chart-card" id="revenue-chart">
          <div className="chart-card-header">
            <div>
              <h2 className="chart-title">Tren Pendapatan Jasa (30 Hari Terakhir)</h2>
              <p className="chart-subtitle">Performa pendapatan harian dari order joki</p>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="recent-orders-card" id="recent-orders">
          <div className="recent-orders-header">
            <div>
              <h2 className="chart-title">Pesanan Terbaru</h2>
              <p className="chart-subtitle">5 pesanan terbaru dari toko Anda</p>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID Pesanan</th>
                  <th>Klien & Domain</th>
                  <th>Total Harga</th>
                  <th>Status Pengerjaan</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="table-id">{order.id}</td>
                    <td>
                      <div className="table-bold">{order.clientName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{order.domainRequest}</div>
                    </td>
                    <td className="table-bold">{formatRupiah(order.totalPrice)}</td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
