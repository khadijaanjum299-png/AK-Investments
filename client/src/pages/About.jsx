import Navbar from '../components/HomeNavbar';

const About = () => {
  return (
    <>
      <Navbar />

      <div className="about-page">
        <section className="about-card">
          <h1 className="neon-title">About AK Investments</h1>

          <p className="about-text">
            AK Investments is a next-generation investment platform designed to
            help individuals grow their wealth through smart, transparent, and
            technology-driven financial strategies.
          </p>

          <p className="about-text">
            Our mission is simple — to make profit-generating investments
            accessible, secure, and rewarding for everyone. We combine market
            expertise, automation, and real-time analytics to ensure consistent
            growth and risk-managed returns.
          </p>

          <div className="about-features">
            <div className="feature-card">📈 Smart Investment Strategies</div>
            <div className="feature-card">🔐 Bank-Grade Security</div>
            <div className="feature-card">💡 Transparent Profit Tracking</div>
            <div className="feature-card">⚡ Fast Withdrawals</div>
          </div>

          <p className="about-footer">
            At AK Investments, your money doesn’t sit idle — it works for you.
          </p>
        </section>
      </div>

      <style>{`
        .about-page {
          min-height: 100vh;
          padding-top: 120px;
          display: flex;
          justify-content: center;
          background: radial-gradient(circle at top, #0f2027, #000);
          color: white;
        }

        .about-card {
          max-width: 900px;
          padding: 40px;
          border-radius: 18px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(14px);
          box-shadow: 0 0 30px rgba(0,255,231,0.5);
          animation: glowPulse 4s infinite ease-in-out;
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 20px rgba(0,255,231,0.4); }
          50% { box-shadow: 0 0 40px rgba(0,255,231,0.8); }
          100% { box-shadow: 0 0 20px rgba(0,255,231,0.4); }
        }

        .neon-title {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 30px;
          color: #00ffe7;
          text-shadow: 0 0 10px #00ffe7, 0 0 30px #00ffe7;
        }

        .about-text {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 20px;
          opacity: 0.9;
          text-align: center;
        }

        .about-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 40px 0;
        }

        .feature-card {
          padding: 20px;
          text-align: center;
          border-radius: 14px;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 15px rgba(0,255,231,0.4);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 0 25px rgba(0,255,231,0.8);
        }

        .about-footer {
          text-align: center;
          font-size: 1.2rem;
          color: #00ffe7;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default About;
