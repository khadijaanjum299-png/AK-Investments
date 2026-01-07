import Navbar from '../components/HomeNavbar';

const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="contact-page">
        <section className="contact-card">
          <h1 className="neon-title">Contact Us</h1>

          <p className="contact-subtitle">
            Have questions? Need support? We’re here to help.
          </p>

          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required />
            <button type="submit">Send Message</button>
          </form>

          <div className="contact-info">
            <p>📧 support@ak.investments</p>
            <p>🌐 www.ak.investments</p>
            <p>⏱ 24/7 Investment Support</p>
          </div>
        </section>
      </div>

      <style>{`
        .contact-page {
          min-height: 100vh;
          padding-top: 120px;
          display: flex;
          justify-content: center;
          background: radial-gradient(circle at top, #0f2027, #000);
          color: white;
        }

        .contact-card {
          width: 420px;
          padding: 35px;
          border-radius: 18px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(14px);
          box-shadow: 0 0 30px rgba(0,255,231,0.5);
        }

        .neon-title {
          text-align: center;
          font-size: 2.5rem;
          color: #00ffe7;
          margin-bottom: 10px;
          text-shadow: 0 0 10px #00ffe7, 0 0 30px #00ffe7;
        }

        .contact-subtitle {
          text-align: center;
          margin-bottom: 25px;
          opacity: 0.8;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: none;
          background: rgba(255,255,255,0.1);
          color: white;
          outline: none;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          box-shadow: 0 0 12px rgba(0,255,231,0.8);
        }

        .contact-form button {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          background: linear-gradient(90deg, #00ffe7, #00c6ff);
          color: #000;
          transition: all 0.3s;
          box-shadow: 0 0 15px rgba(0,255,231,0.6);
        }

        .contact-form button:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(0,255,231,0.9);
        }

        .contact-info {
          margin-top: 25px;
          text-align: center;
          opacity: 0.9;
        }

        .contact-info p {
          margin: 6px 0;
        }
      `}</style>
    </>
  );
};

export default Contact;
