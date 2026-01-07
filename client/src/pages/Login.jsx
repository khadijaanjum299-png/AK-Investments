import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // ✅ NEW: success state
  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });

      login(data);

      // ✅ Show success message
      setSuccess(true);

      // ✅ Redirect after 1.5 seconds
      setTimeout(() => {
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <div className="login-page">
        <form className="login-card" onSubmit={submitHandler}>
          <h2 className="neon-text">Login</h2>

          {/* ✅ Show messages */}
          {success && <p className="success">✔ Login Successful</p>}
          {error && <p className="error">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>

      {/* STYLES */}
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top, #0f2027, #000);
        }

        .login-card {
          width: 360px;
          padding: 35px;
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(14px);
          box-shadow:
            0 0 20px rgba(0, 255, 231, 0.4),
            inset 0 0 20px rgba(0, 255, 231, 0.2);
          transition: all 0.4s ease;
          animation: pulseGlow 3s infinite ease-in-out;
        }

        .login-card:hover {
          box-shadow:
            0 0 35px rgba(0, 255, 231, 0.8),
            inset 0 0 30px rgba(0, 255, 231, 0.4);
          transform: scale(1.02);
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px rgba(0,255,231,0.4); }
          50% { box-shadow: 0 0 30px rgba(0,255,231,0.7); }
          100% { box-shadow: 0 0 15px rgba(0,255,231,0.4); }
        }

        .neon-text {
          text-align: center;
          margin-bottom: 25px;
          color: #00ffe7;
          text-shadow:
            0 0 5px #00ffe7,
            0 0 15px #00ffe7,
            0 0 30px #00ffe7;
        }

        .login-card input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 14px;
          transition: box-shadow 0.3s;
        }

        .login-card input:focus {
          box-shadow: 0 0 12px rgba(0, 255, 231, 0.8);
        }

        .login-card button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          background: linear-gradient(90deg, #00ffe7, #00c6ff);
          color: #000;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(0, 255, 231, 0.6);
        }

        .login-card button:hover {
          transform: translateY(-4px);
          box-shadow:
            0 0 30px rgba(0, 255, 231, 0.9),
            0 10px 20px rgba(0, 0, 0, 0.4);
        }

        .error {
          color: #ff6b6b;
          text-align: center;
          margin-bottom: 10px;
        }

        /* ✅ SUCCESS MESSAGE STYLE */
        .success {
          text-align: center;
          color: #00ffe7;
          margin-bottom: 10px;
          font-weight: bold;
          animation: flash 1s infinite;
        }
        @keyframes flash {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Login;





