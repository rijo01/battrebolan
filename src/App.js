import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

function Home() {
  const [formSent, setFormSent] = useState(false);
  const navigate = useNavigate();

  const loanOffers = [
    { bank: "Swedbank", rate: "2.35%", term: "5 år", comment: "Stark stabilitet och säkerhet" },
    { bank: "SEB", rate: "2.40%", term: "3 år", comment: "Flexibel bindningstid" },
    { bank: "Nordea", rate: "2.38%", term: "7 år", comment: "Långsiktig trygghet" },
    { bank: "Handelsbanken", rate: "2.42%", term: "2 år", comment: "God kundservice" },
  ];

  const handleSubmit = () => {
    setFormSent(true);
    setTimeout(() => navigate("/tack"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-white text-gray-800 font-sans">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-700">🏠 BättreBolån</div>
          <nav className="space-x-4 hidden md:block">
            <a href="#" className="text-gray-700 hover:text-indigo-600">Jämför</a>
            <a href="#faq" className="text-gray-700 hover:text-indigo-600">FAQ</a>
            <a href="#kontakt" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Kontakta</a>
          </nav>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-20 px-4 bg-white"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">Få bästa bolånet – snabbt och tryggt</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Vi samlar erbjudanden från flera banker så att du kan välja det bästa – gratis & utan förpliktelser.</p>

        <AnimatePresence>
          {formSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-600 font-semibold text-xl flex flex-col items-center"
            >
              <svg className="w-12 h-12 mb-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Tack! Vi har tagit emot din förfrågan 🎉
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              action="https://formspree.io/f/xrbkwvkp"
              method="POST"
              className="max-w-xl mx-auto grid gap-4 text-left"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="Ny bolåneförfrågan från BättreBolån" />
              <input type="text" name="namn" placeholder="Namn" required className="border p-3 rounded w-full" />
              <input type="email" name="email" placeholder="E-post" required className="border p-3 rounded w-full" />
              <input type="number" name="belopp" placeholder="Lånebelopp (kr)" required className="border p-3 rounded w-full" />
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-indigo-700" type="submit">
                🚀 Jämför bolån nu
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="flex justify-center items-center gap-4 mt-8 flex-wrap text-sm text-gray-500">
          <span>🔒 SSL-skyddad</span>
          <span>💳 Kostnadsfri tjänst</span>
          <span>✅ BankID krävs</span>
          <span>⭐ 4.8 / 5 i kundbetyg</span>
        </div>
      </motion.section>

      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} BättreBolån.se – jämför smart, bind rätt.</p>
        <p className="mt-2">Kontakt: <a href="mailto:info@battrebolan.se" className="text-indigo-600">info@battrebolan.se</a></p>
        <p className="mt-1">
          <a href="/robots.txt" className="text-gray-400 hover:text-indigo-600">robots.txt</a> | <a href="/sitemap.xml" className="text-gray-400 hover:text-indigo-600">sitemap.xml</a>
        </p>
      </footer>
    </div>
  );
}

function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center">
      <div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Tack för din förfrågan!</h1>
        <p className="text-gray-700">Vi återkommer inom 24 timmar. Tveka inte att kontakta oss vid frågor.</p>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tack" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}
