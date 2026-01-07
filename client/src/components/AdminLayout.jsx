import { useState } from 'react';

const sidebarStyle = {
  width: '220px',
  background: '#0b132b',
  color: '#fff',
  padding: '20px',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
};

const linkStyle = {
  display: 'block',
  padding: '10px 0',
  color: '#fff',
  cursor: 'pointer',
};

const navbarStyle = {
  height: '60px',
  background: '#1c2541',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  position: 'fixed',
  top: 0,
  left: '220px',
  right: 0,
  zIndex: 10,
};

const contentStyle = {
  marginLeft: '220px',
  marginTop: '60px',
  padding: '30px',
};

const AdminLayout = ({ children }) => {
  return (
    <>
      {/* SIDEBAR */}
      <aside style={sidebarStyle}>
        <h2>Admin</h2>
        <div style={linkStyle}>Dashboard</div>
        <div style={linkStyle}>Deposits</div>
        <div style={linkStyle}>Withdrawals</div>
        <div style={linkStyle}>Investments</div>
        <div style={linkStyle}>Plans</div>
      </aside>

      {/* NAVBAR */}
      <nav style={navbarStyle}>
        <strong>Admin Panel</strong>
      </nav>

      {/* CONTENT */}
      <main style={contentStyle}>{children}</main>
    </>
  );
};

export default AdminLayout;
