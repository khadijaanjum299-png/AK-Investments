import { useEffect, useState } from 'react';
import api from '../api/axios';
import { fetchMyTransactions } from '../api/transactions';
import { fetchPlans } from '../api/plans';
import Skeleton from '../components/Skeleton';

/* ---------------- STYLES ---------------- */
const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  color: '#fff',
  paddingTop: '80px',
};

const card = {
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  borderRadius: '14px',
  padding: '20px',
  marginBottom: '30px',
  boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
};

const navbar = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '60px',
  background: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(12px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '25px',
  zIndex: 1000,
};

const navBtn = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
};

const inputStyle = {
  padding: '8px',
  marginRight: '10px',
  borderRadius: '6px',
  border: 'none',
};

const btn = {
  padding: '8px 14px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
};

/* ---------------- COMPONENT ---------------- */
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [investments, setInvestments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [investAmounts, setInvestAmounts] = useState({});
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  /* ---------------- LOAD DATA ---------------- */
  const loadData = async () => {
    try {
      const profileRes = await api.get('/user/profile');
      setUser(profileRes.data);

      setTransactions(await fetchMyTransactions());
      setPlans(await fetchPlans());

      const investmentsRes = await api.get('/investments/my');
      setInvestments(investmentsRes.data || []);
    } catch {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const handleWithdraw = async (e) => {
    e.preventDefault();
    setActionError('');
    setActionMessage('');

    try {
      await api.post('/withdrawals', { amount: Number(withdrawAmount) });
      setWithdrawAmount('');
      setActionMessage('Withdrawal request submitted');
      loadData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Withdrawal failed');
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setActionError('');
    setActionMessage('');

    try {
      await api.post('/deposits', { amount: Number(depositAmount) });
      setDepositAmount('');
      setActionMessage('Deposit submitted');
      loadData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Deposit failed');
    }
  };

  const handleInvest = async (planId) => {
    setActionError('');
    setActionMessage('');

    const amount = Number(investAmounts[planId]);
    if (!amount || amount <= 0) {
      setActionError('Enter a valid amount');
      return;
    }

    try {
      await api.post('/investments', { planId, amount });
      setActionMessage('Investment successful');
      setInvestAmounts(prev => ({ ...prev, [planId]: '' }));
      loadData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Investment failed');
    }
  };

  if (loading)
    return (
      <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
        <Skeleton height={40} />
        <Skeleton />
        <Skeleton />
        <Skeleton height={80} />
        <Skeleton height={120} />
      </div>
    );

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* NAVBAR */}
      <div style={navbar}>
        {['profile', 'deposit', 'withdraw', 'transactions', 'investments', 'plans'].map(n => (
          <button key={n} style={navBtn} onClick={() => scrollTo(n)}>
            {n.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={pageStyle}>
        <div style={{ maxWidth: '900px', margin: 'auto' }}>

          {/* PROFILE */}
          <section id="profile" style={card}>
            <h2>Welcome, {user?.name}</h2>
            <p>Email: {user?.email}</p>
            <p>Balance: ${user?.balance}</p>
          </section>

          {/* DEPOSIT */}
          <section id="deposit" style={card}>
            <h3>Deposit</h3>
            <form onSubmit={handleDeposit}>
              <input type="number" style={inputStyle} value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
              <button style={btn}>Deposit</button>
            </form>
          </section>

          {/* WITHDRAW */}
          <section id="withdraw" style={card}>
            <h3>Withdraw</h3>
            <form onSubmit={handleWithdraw}>
              <input type="number" style={inputStyle} value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} />
              <button style={btn}>Withdraw</button>
            </form>
          </section>

          {/* TRANSACTIONS */}
          <section id="transactions" style={card}>
            <h3>Transactions</h3>
            {transactions.length === 0
              ? <p>No transactions</p>
              : transactions.map(tx => (
                <p key={tx._id}>{tx.type} — ${tx.amount} — {tx.status}</p>
              ))}
          </section>

          {/* INVESTMENTS */}
          <section id="investments" style={card}>
            <h3>Active Investments</h3>
            {investments.length === 0
              ? <p>No investments</p>
              : investments.map(inv => (
                <p key={inv._id}>
                  {inv.plan?.name || 'Deleted Plan'} — ${inv.amount} — {inv.daysCompleted}/{inv.plan?.durationDays || 0}
                </p>
              ))}
          </section>

          {/* PLANS */}
          <section id="plans" style={card}>
            <h3>Investment Plans</h3>
            {plans.map(plan => (
              <div key={plan._id} style={{ marginBottom: '15px' }}>
                <strong>{plan.name}</strong>
                      <p>Minimum Amount: ${plan.minAmount}</p>
                      <p>Daily Profit: {plan.dailyProfitPercent}%</p>
                      <p>Duration: {plan.durationDays} days</p>
                <input
                  type="number"
                  style={inputStyle}
                  placeholder={`Min $${plan.minAmount}`}
                  value={investAmounts[plan._id] || ''}
                  onChange={e => setInvestAmounts({ ...investAmounts, [plan._id]: e.target.value })}
                />
                <button style={btn} onClick={() => handleInvest(plan._id)}>Invest</button>
              </div>
            ))}
          </section>

          {actionError && <p style={{ color: 'red' }}>{actionError}</p>}
          {actionMessage && <p style={{ color: 'lime' }}>{actionMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;





