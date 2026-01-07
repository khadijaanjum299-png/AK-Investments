import { Link } from 'react-router-dom';

const navStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '65px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 40px',
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(15px)',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  zIndex: 1000,
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginLeft: '20px',
  fontWeight: '500',
  position: 'relative',
};

const HomeNavbar = () => (
  <nav style={navStyle} className="navbar glitter-nav">
    <h2 style={{ color: '#fff' }}>AK Investments</h2>

    <div>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/register" style={linkStyle}>Register</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </div>
  </nav>
);

export default HomeNavbar;
