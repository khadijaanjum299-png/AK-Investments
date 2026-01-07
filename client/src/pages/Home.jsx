import { useEffect, useState } from 'react';
import Navbar from '../components/HomeNavbar';
import '../styles/home.css';

const quotes = [
  "Grow your wealth while you sleep. Let your money work for you.",
  "Secure investments. Transparent profits. Trusted growth.",
  "AK Investments — where your future is built intelligently.",
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  // ⭐ PARALLAX EFFECT
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      document.querySelector('.stars')?.style.setProperty(
        'transform',
        `translate(${x}px, ${y}px)`
      );
      document.querySelector('.stars2')?.style.setProperty(
        'transform',
        `translate(${x * 1.5}px, ${y * 1.5}px)`
      );
      document.querySelector('.stars3')?.style.setProperty(
        'transform',
        `translate(${x * 2}px, ${y * 2}px)`
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div className="home">
      <Navbar />

      {/* STARS */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {/* HERO */}
      <section className="hero">
        <h1 className="glitter-title">Welcome to AK Investments</h1>

        <p className="hero-quote">
          “Building wealth isn’t luck — it’s strategy, patience, and trust.”
        </p>
      </section>

      {/* CAROUSEL */}
      <section className="carousel">
        <div className="carousel-card">
          <p>{quotes[index]}</p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="info">
        {[
          "✔ Smart & automated investment plans",
          "✔ Real-time profit tracking",
          "✔ Secure deposits & withdrawals",
        ].map((text, i) => (
          <div key={i} className="info-card">
            {text}
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} AK Investments. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;


