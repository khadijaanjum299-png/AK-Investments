// import AdminCharts from '../components/AdminCharts';
// import AdminLayout from '../components/AdminLayout';
// import '../styles/snow.css';
// import { useEffect, useState, useRef } from 'react';
// import api from '../api/axios';
// import { fetchAdminDashboard } from '../api/admin';

// const cardStyle = {
//   background: 'rgba(255,255,255,0.08)',
//   backdropFilter: 'blur(10px)',
//   borderRadius: '14px',
//   padding: '18px',
//   boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
//   color: '#fff',
// };

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
// };

// const thtd = {
//   padding: '12px',
//   borderBottom: '1px solid rgba(255,255,255,0.15)',
//   textAlign: 'left',
// };

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({});
//   const [pendingDeposits, setPendingDeposits] = useState([]);
//   const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
//   const [investments, setInvestments] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination for Investments
//   const [page, setPage] = useState(1);
//   const perPage = 5;

//   // Section refs for navbar scrolling
//   const depositsRef = useRef();
//   const withdrawalsRef = useRef();
//   const investmentsRef = useRef();
//   const plansRef = useRef();

//   const safeInvestments = Array.isArray(investments) ? investments.filter(i => i && i._id) : [];
//   const paginatedInvestments = safeInvestments.slice((page - 1) * perPage, page * perPage);

//   const loadDashboard = async () => {
//     try { setStats(await fetchAdminDashboard() || {}); } catch {}
//     try { const { data } = await api.get('/deposits'); setPendingDeposits((data || []).filter(d => d?.status === 'pending')); } catch {}
//     try { const { data } = await api.get('/withdrawals'); setPendingWithdrawals((data || []).filter(w => w?.status === 'pending')); } catch {}
//     try { const { data } = await api.get('/investments'); setInvestments(data || []); } catch {}
//     try { const { data } = await api.get('/plans'); setPlans(data || []); } catch {}
//     setLoading(false);
//   };

//   useEffect(() => { loadDashboard(); }, []);

//   const approve = async (url, id) => { await api.put(`${url}/${id}`, { status: 'approved' }); loadDashboard(); };
//   const reject = async (url, id) => { await api.put(`${url}/${id}`, { status: 'rejected' }); loadDashboard(); };
//   const deletePlan = async (id) => { await api.delete(`/plans/${id}`); loadDashboard(); };

//   const scrollToSection = (ref) => { ref.current?.scrollIntoView({ behavior: 'smooth' }); };

//   if (loading) return <h2 style={{ textAlign: 'center', color: '#fff' }}>Loading Dashboard…</h2>;

//   return (
//     <AdminLayout>
//       {/* ❄ Snow */}
//       {Array.from({ length: 60 }).map((_, i) => (
//         <div key={i} className="snowflake" style={{ left: `${Math.random()*100}vw`, animationDuration: `${6+Math.random()*10}s`, fontSize: `${8+Math.random()*18}px` }}>❄</div>
//       ))}

//       <div style={{ minHeight: '100vh', padding: '30px' }}>
//         <h1 style={{ color: '#fff' }}>Admin Dashboard</h1>

//         {/* NAVBAR */}
//         <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
//           <button onClick={() => scrollToSection(depositsRef)}>Deposits</button>
//           <button onClick={() => scrollToSection(withdrawalsRef)}>Withdrawals</button>
//           <button onClick={() => scrollToSection(investmentsRef)}>Investments</button>
//           <button onClick={() => scrollToSection(plansRef)}>Plans</button>
//         </div>

//         {/* STATS */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '20px' }}>
//           {[
//             ['Users', stats.totalUsers ?? 0],
//             ['Deposits', stats.totalDeposits?.length ?? 0],
//             ['Pending Deposits', pendingDeposits.length],
//             ['Withdrawals', stats.totalWithdrawals?.length ?? 0],
//             ['Pending Withdrawals', pendingWithdrawals.length],
//             ['Investments', stats.totalInvestments ?? safeInvestments.length],
//           ].map(([label, value]) => (
//             <div key={label} style={cardStyle}><h2>{value}</h2><p>{label}</p></div>
//           ))}
//         </div>

//         {/* CHART */}
//         <AdminCharts stats={stats} />

//         {/* DEPOSITS */}
//         <section ref={depositsRef} style={{ marginTop: '40px' }}>
//           <h2 style={{ color: '#fff' }}>Pending Deposits</h2>
//           <div style={cardStyle}>
//             {pendingDeposits.length === 0 ? <p>No pending deposits</p> : (
//               <table style={tableStyle}><tbody>
//                 {pendingDeposits.map(d => (
//                   <tr key={d._id}>
//                     <td style={thtd}>{d.user?.email ?? 'Deleted User'}</td>
//                     <td style={thtd}>${d.amount}</td>
//                     <td style={thtd}>
//                       <button onClick={() => approve('/deposits', d._id)}>Approve</button>
//                       <button onClick={() => reject('/deposits', d._id)} style={{ marginLeft: '10px' }}>Reject</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody></table>
//             )}
//           </div>
//         </section>

//         {/* WITHDRAWALS */}
//         <section ref={withdrawalsRef} style={{ marginTop: '40px' }}>
//           <h2 style={{ color: '#fff' }}>Pending Withdrawals</h2>
//           <div style={cardStyle}>
//             {pendingWithdrawals.length === 0 ? <p>No pending withdrawals</p> : (
//               <table style={tableStyle}><tbody>
//                 {pendingWithdrawals.map(w => (
//                   <tr key={w._id}>
//                     <td style={thtd}>{w.user?.email ?? 'Deleted User'}</td>
//                     <td style={thtd}>${w.amount}</td>
//                     <td style={thtd}>
//                       <button onClick={() => approve('/withdrawals', w._id)}>Approve</button>
//                       <button onClick={() => reject('/withdrawals', w._id)} style={{ marginLeft: '10px' }}>Reject</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody></table>
//             )}
//           </div>
//         </section>

//         {/* INVESTMENTS */}
//         <section ref={investmentsRef} style={{ marginTop: '40px' }}>
//           <h2 style={{ color: '#fff' }}>All Investments</h2>
//           <div style={cardStyle}>
//             {paginatedInvestments.length === 0 ? <p>No investments found</p> : (
//               <>
//                 <table style={tableStyle}>
//                   <thead><tr>
//                     <th style={thtd}>User</th>
//                     <th style={thtd}>Plan</th>
//                     <th style={thtd}>Amount</th>
//                     <th style={thtd}>Daily Profit</th>
//                     <th style={thtd}>Duration</th>
//                   </tr></thead>
//                   <tbody>
//                     {paginatedInvestments.map(inv => (
//                       <tr key={inv._id}>
//                         <td style={thtd}>{inv.user?.email ?? 'Deleted User'}</td>
//                         <td style={thtd}>{inv.plan?.name ?? 'Deleted Plan'}</td>
//                         <td style={thtd}>${inv.amount ?? 0}</td>
//                         <td style={thtd}>{inv.plan?.dailyProfitPercent ?? 0}%</td>
//                         <td style={thtd}>{inv.plan?.durationDays ?? 0} days</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div style={{ marginTop: '15px', textAlign: 'center' }}>
//                   <button disabled={page===1} onClick={()=>setPage(p=>p-1)}>Prev</button>
//                   <span style={{margin:'0 15px'}}>Page {page}</span>
//                   <button disabled={page*perPage >= safeInvestments.length} onClick={()=>setPage(p=>p+1)}>Next</button>
//                 </div>
//               </>
//             )}
//           </div>
//         </section>

//         {/* PLANS */}
//         <section ref={plansRef} style={{ marginTop: '40px' }}>
//           <h2 style={{ color: '#fff' }}>Manage Plans</h2>
//           <div style={cardStyle}>
//             <table style={tableStyle}><tbody>
//               {plans.map(p => (
//                 <tr key={p._id}>
//                   <td style={thtd}>{p.name}</td>
//                   <td style={thtd}>{p.dailyProfitPercent}%</td>
//                   <td style={thtd}>{p.durationDays} days</td>
//                   <td style={thtd}><button onClick={()=>deletePlan(p._id)}>Delete</button></td>
//                 </tr>
//               ))}
//             </tbody></table>
//           </div>
//         </section>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminDashboard;
import AdminCharts from '../components/AdminCharts';
import AdminLayout from '../components/AdminLayout';
import '../styles/snow.css';
import { useEffect, useState, useRef } from 'react';
import api from '../api/axios';
import { fetchAdminDashboard } from '../api/admin';

const cardStyle = {
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(10px)',
  borderRadius: '14px',
  padding: '18px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
  color: '#fff',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thtd = {
  padding: '12px',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  textAlign: 'left',
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // PLAN FORM STATE
  const [planForm, setPlanForm] = useState({
    name: '',
    minAmount: '',
    dailyProfitPercent: '',
    durationDays: '',
  });
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [planSuccess, setPlanSuccess] = useState(false);

  // Pagination for Investments
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Section refs for navbar scrolling
  const depositsRef = useRef();
  const withdrawalsRef = useRef();
  const investmentsRef = useRef();
  const plansRef = useRef();

  const safeInvestments = Array.isArray(investments) ? investments.filter(i => i && i._id) : [];
  const paginatedInvestments = safeInvestments.slice((page - 1) * perPage, page * perPage);

  const PLAN_BASE = '/admin/plans'; // Correct route

  const loadDashboard = async () => {
    try { setStats(await fetchAdminDashboard() || {}); } catch {}
    try { const { data } = await api.get('/deposits'); setPendingDeposits((data || []).filter(d => d?.status === 'pending')); } catch {}
    try { const { data } = await api.get('/withdrawals'); setPendingWithdrawals((data || []).filter(w => w?.status === 'pending')); } catch {}
    try { const { data } = await api.get('/investments'); setInvestments(data || []); } catch {}
    try { const { data } = await api.get(PLAN_BASE); setPlans(data || []); } catch {}
    setLoading(false);
  };

  useEffect(() => { loadDashboard(); }, []);

  const approve = async (url, id) => { await api.put(`${url}/${id}`, { status: 'approved' }); loadDashboard(); };
  const reject = async (url, id) => { await api.put(`${url}/${id}`, { status: 'rejected' }); loadDashboard(); };
  const deletePlan = async (id) => { await api.delete(`${PLAN_BASE}/${id}`); loadDashboard(); };

  // CREATE / UPDATE PLAN
  const submitPlan = async (e) => {
    e.preventDefault();
    try {
      if (editingPlanId) {
        await api.put(`${PLAN_BASE}/${editingPlanId}`, planForm);
      } else {
        await api.post(PLAN_BASE, planForm);
      }
      setPlanForm({ name: '', minAmount: '', dailyProfitPercent: '', durationDays: '' });
      setEditingPlanId(null);
      setPlanSuccess(true);
      loadDashboard();
      setTimeout(() => setPlanSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (plan) => {
    setEditingPlanId(plan._id);
    setPlanForm({
      name: plan.name,
      minAmount: plan.minAmount,
      dailyProfitPercent: plan.dailyProfitPercent,
      durationDays: plan.durationDays,
    });
  };

  const scrollToSection = (ref) => { ref.current?.scrollIntoView({ behavior: 'smooth' }); };

  if (loading) return <h2 style={{ textAlign: 'center', color: '#fff' }}>Loading Dashboard…</h2>;

  return (
    <AdminLayout>
      {/* ❄ Snow */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="snowflake" style={{ left: `${Math.random()*100}vw`, animationDuration: `${6+Math.random()*10}s`, fontSize: `${8+Math.random()*18}px` }}>❄</div>
      ))}

      <div style={{ minHeight: '100vh', padding: '30px' }}>
        <h1 style={{ color: '#fff' }}>Admin Dashboard</h1>

        {/* NAVBAR */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <button onClick={() => scrollToSection(depositsRef)}>Deposits</button>
          <button onClick={() => scrollToSection(withdrawalsRef)}>Withdrawals</button>
          <button onClick={() => scrollToSection(investmentsRef)}>Investments</button>
          <button onClick={() => scrollToSection(plansRef)}>Plans</button>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '20px' }}>
          {[ 
            ['Users', stats.totalUsers ?? 0],
            ['Deposits', stats.totalDeposits?.length ?? 0],
            ['Pending Deposits', pendingDeposits.length],
            ['Withdrawals', stats.totalWithdrawals?.length ?? 0],
            ['Pending Withdrawals', pendingWithdrawals.length],
            ['Investments', stats.totalInvestments ?? safeInvestments.length],
          ].map(([label, value]) => (
            <div key={label} style={cardStyle}><h2>{value}</h2><p>{label}</p></div>
          ))}
        </div>

        {/* CHART */}
        <AdminCharts stats={stats} />

        {/* DEPOSITS */}
        <section ref={depositsRef} style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#fff' }}>Pending Deposits</h2>
          <div style={cardStyle}>
            {pendingDeposits.length === 0 ? <p>No pending deposits</p> : (
              <table style={tableStyle}><tbody>
                {pendingDeposits.map(d => (
                  <tr key={d._id}>
                    <td style={thtd}>{d.user?.email ?? 'Deleted User'}</td>
                    <td style={thtd}>${d.amount}</td>
                    <td style={thtd}>
                      <button onClick={() => approve('/deposits', d._id)}>Approve</button>
                      <button onClick={() => reject('/deposits', d._id)} style={{ marginLeft: '10px' }}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody></table>
            )}
          </div>
        </section>

        {/* WITHDRAWALS */}
        <section ref={withdrawalsRef} style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#fff' }}>Pending Withdrawals</h2>
          <div style={cardStyle}>
            {pendingWithdrawals.length === 0 ? <p>No pending withdrawals</p> : (
              <table style={tableStyle}><tbody>
                {pendingWithdrawals.map(w => (
                  <tr key={w._id}>
                    <td style={thtd}>{w.user?.email ?? 'Deleted User'}</td>
                    <td style={thtd}>${w.amount}</td>
                    <td style={thtd}>
                      <button onClick={() => approve('/withdrawals', w._id)}>Approve</button>
                      <button onClick={() => reject('/withdrawals', w._id)} style={{ marginLeft: '10px' }}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody></table>
            )}
          </div>
        </section>

        {/* INVESTMENTS */}
        <section ref={investmentsRef} style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#fff' }}>All Investments</h2>
          <div style={cardStyle}>
            {paginatedInvestments.length === 0 ? <p>No investments found</p> : (
              <>
                <table style={tableStyle}>
                  <thead><tr>
                    <th style={thtd}>User</th>
                    <th style={thtd}>Plan</th>
                    <th style={thtd}>Amount</th>
                    <th style={thtd}>Daily Profit</th>
                    <th style={thtd}>Duration</th>
                  </tr></thead>
                  <tbody>
                    {paginatedInvestments.map(inv => (
                      <tr key={inv._id}>
                        <td style={thtd}>{inv.user?.email ?? 'Deleted User'}</td>
                        <td style={thtd}>{inv.plan?.name ?? 'Deleted Plan'}</td>
                        <td style={thtd}>${inv.amount ?? 0}</td>
                        <td style={thtd}>{inv.plan?.dailyProfitPercent ?? 0}%</td>
                        <td style={thtd}>{inv.plan?.durationDays ?? 0} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                  <button disabled={page===1} onClick={()=>setPage(p=>p-1)}>Prev</button>
                  <span style={{margin:'0 15px'}}>Page {page}</span>
                  <button disabled={page*perPage >= safeInvestments.length} onClick={()=>setPage(p=>p+1)}>Next</button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* PLANS */}
        <section ref={plansRef} style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#fff' }}>Manage Plans</h2>

          {/* SUCCESS MESSAGE */}
          {planSuccess && <p className="plan-success">✔ Plan {editingPlanId ? 'updated' : 'created'} successfully!</p>}

          {/* CREATE / UPDATE FORM */}
          <div style={{ ...cardStyle, marginBottom: '20px' }}>
            <form onSubmit={submitPlan} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input placeholder="Plan Name" value={planForm.name}
                onChange={e => setPlanForm({ ...planForm, name: e.target.value })} required />
              <input placeholder="Minimum Amount" type="number" value={planForm.minAmount}
                onChange={e => setPlanForm({ ...planForm, minAmount: e.target.value })} required />
              <input placeholder="Daily Profit %" type="number" value={planForm.dailyProfitPercent}
                onChange={e => setPlanForm({ ...planForm, dailyProfitPercent: e.target.value })} required />
              <input placeholder="Duration (days)" type="number" value={planForm.durationDays}
                onChange={e => setPlanForm({ ...planForm, durationDays: e.target.value })} required />
              <button type="submit">{editingPlanId ? 'Update Plan' : 'Create Plan'}</button>
            </form>
          </div>

          {/* PLANS TABLE */}
          <div style={cardStyle}>
            <table style={tableStyle}><tbody>
              {plans.map(p => (
                <tr key={p._id}>
                  <td style={thtd}>{p.name}</td>
                  <td style={thtd}>${p.minAmount}</td>
                  <td style={thtd}>{p.dailyProfitPercent}%</td>
                  <td style={thtd}>{p.durationDays} days</td>
                  <td style={thtd}>
                    <button onClick={() => startEdit(p)}>Edit</button>
                    <button onClick={() => deletePlan(p._id)} style={{ marginLeft: '10px' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody></table>
          </div>

          <style>{`
            .plan-success {
              color: #00ffe7;
              font-weight: bold;
              margin-bottom: 10px;
              animation: flash 1s infinite;
              text-align: center;
            }
            @keyframes flash {
              0% { opacity: 1; }
              50% { opacity: 0.4; }
              100% { opacity: 1; }
            }
          `}</style>
        </section>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;


















