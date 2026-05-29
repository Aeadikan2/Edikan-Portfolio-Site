import React, { useEffect, useState } from 'react';

const ThankYou = ({ redirectTo = '/' }) => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      window.location.href = redirectTo;
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [redirectTo]);

  return (
    <div className="thankyou-screen">
      <div className="thankyou-card glass-card p-5 rounded-4 text-center">
        <h1 className="display-6 fw-bold mb-3">THANKS FOR REACHING OUT!</h1>
        <p className="mb-2 text-muted">We'll get back to you soon.</p>
        <p className="small text-muted">Redirecting back in {count}s…</p>
        <div className="mt-3">
          <button className="btn glass-btn" onClick={() => (window.location.href = redirectTo)}>
            Go back now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
