import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const AdminCharts = ({ stats }) => {
  const data = [
    { name: 'Users', value: stats.totalUsers ?? 0 },
    { name: 'Deposits', value: stats.totalDeposits?.length ?? 0 },
    { name: 'Withdrawals', value: stats.totalWithdrawals?.length ?? 0 },
    { name: 'Investments', value: stats.totalInvestments ?? 0 },
  ];

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.08)',
        padding: '20px',
        borderRadius: '14px',
        marginTop: '40px',
      }}
    >
      <h3 style={{ color: '#fff' }}>Platform Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4cc9f0" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminCharts;
