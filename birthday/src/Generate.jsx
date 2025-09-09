import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Generate = () => {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [link, setLink] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const generateLink = () => {
    if (!name || !day || !month) {
      alert('Please fill in all fields');
      return;
    }
    
    setLink(
      `https://birthday-wisher.netlify.app/birthday/${name}/${day}/${month}`
    );
    setIsGenerated(true);
  };

  const resetForm = () => {
    setName('');
    setDay('');
    setMonth('');
    setLink('');
    setIsGenerated(false);
  };

  // Confetti component with improved distribution
  const Confetti = () => {
    return (
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => {
          const left = Math.floor(Math.random() * 100);
          const animationDelay = Math.random() * 5;
          const size = Math.floor(Math.random() * 10) + 5;
          // Gold and dark themed confetti
          const colors = ['#D4AF37', '#AA8C2C', '#2C2C2C', '#1A1A1A', '#3D3D3D'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          return (
            <div 
              key={i}
              className="confetti"
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                animationDelay: `${animationDelay}s`
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="generate-page">
      <Confetti />
      
      <div className="card">
        <div className="card-header">
          <h1>Create Birthday Magic</h1>
          <p>Generate a personalized birthday celebration link</p>
        </div>
        
        <div className="form-container">
          <div className="input-group full-width">
            <label>Recipient's Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="date-inputs-container">
            <div className="input-group">
              <label>Birth Day</label>
              <input
                type="number"
                placeholder="Day (1-31)"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                max={31}
                min={1}
                className="input-field"
              />
            </div>
            
            <div className="input-group month-select-container">
              <label>Birth Month</label>
              <div className="select-wrapper">
                <select 
                  value={month} 
                  onChange={(e) => setMonth(e.target.value)}
                  className="input-field select-field"
                >
                  <option value="">Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
            </div>
          </div>
          
          <button 
            className={`generate-btn ${isGenerated ? 'generated' : ''}`}
            onClick={isGenerated ? resetForm : generateLink}
          >
            {isGenerated ? 'Create Another' : 'Generate Celebration Link'}
          </button>
        </div>
        
        {link && (
          <div className="result-container">
            <div className="success-animation">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            
            <p className="success-text">Your birthday link is ready!</p>
            
            <div className="link-container">
              <input
                type="text"
                value={link}
                readOnly
                className="generated-link"
                onClick={(e) => e.target.select()}
              />
              <button 
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  alert('Link copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
            
            <Link to={`/birthday/${name}/${day}/${month}`}>
              <button className="preview-btn">Preview Celebration</button>
            </Link>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .generate-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0a0a0a 0%, #2c2c2c 100%);
          padding: 20px;
          position: relative;
          overflow: hidden;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .confetti-container {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        
        .confetti {
          position: absolute;
          border-radius: 2px;
          opacity: 0;
          animation: confetti-fall 5s ease-in infinite;
        }
        
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            top: -10%;
            transform: rotate(0deg) translateX(0);
          }
          100% {
            opacity: 0;
            top: 100%;
            transform: rotate(720deg) translateX(20px);
          }
        }
        
        .card {
          background: #1a1a1a;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 500px;
          z-index: 2;
          animation: cardEntrance 0.6s ease-out;
          position: relative;
          border: 1px solid #333;
        }
        
        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card-header {
          background: linear-gradient(135deg, #2c2c2c 0%, #0a0a0a 100%);
          color: #D4AF37;
          padding: 30px 20px;
          text-align: center;
          border-radius: 20px 20px 0 0;
          border-bottom: 2px solid #D4AF37;
        }
        
        .card-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        .card-header p {
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 16px;
          color: #f5f5f5;
        }
        
        .form-container {
          padding: 30px;
          position: relative;
        }
        
        .input-group {
          margin-bottom: 20px;
        }
        
        .full-width {
          width: 100%;
        }
        
        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #D4AF37;
        }
        
        .input-field {
          width: 100%;
          padding: 15px;
          border: 2px solid #333;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s;
          box-sizing: border-box;
          background: #2c2c2c;
          color: #f5f5f5;
        }
        
        .input-field::placeholder {
          color: #888;
        }
        
        /* Special container for the select to handle dropdown overflow */
        .select-wrapper {
          position: relative;
          display: block;
        }
        
        /* Special styling for the select field */
        .select-field {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 15px center;
          background-size: 16px;
          padding-right: 45px;
        }
        
        /* Ensure dropdown options are visible outside the card */
        .select-field option {
          background: #2c2c2c;
          color: #f5f5f5;
          padding: 10px;
        }
        
        /* Fix for Firefox to show full dropdown */
        @-moz-document url-prefix() {
          .select-field {
            text-indent: 0;
          }
        }
        
        .input-field:focus {
          border-color: #D4AF37;
          outline: none;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.3);
        }
        
        .date-inputs-container {
          display: flex;
          gap: 15px;
          width: 100%;
        }
        
        .date-inputs-container .input-group {
          flex: 1;
          min-width: 0;
        }
        
        /* Ensure month dropdown is fully visible */
        .month-select-container {
          position: relative;
          z-index: 1000; /* High z-index to ensure dropdown appears above everything */
        }
        
        /* Force the dropdown to render outside the card */
        .month-select-container select {
          position: relative;
        }
        
        .generate-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #2c2c2c 0%, #0a0a0a 100%);
          color: #D4AF37;
          border: 2px solid #D4AF37;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        
        .generate-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #0a0a0a 0%, #2c2c2c 100%);
          box-shadow: 0 7px 14px rgba(212, 175, 55, 0.3);
        }
        
        .generate-btn.generated {
          background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
          border-color: #4CAF50;
          color: #4CAF50;
        }
        
        .result-container {
          padding: 0 30px 30px;
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .success-animation {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        
        .checkmark {
          width: 56px;
          height: 56px;
        }
        
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: #D4AF37;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        
        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        
        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        .success-text {
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: #D4AF37;
          margin-bottom: 20px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        
        .link-container {
          display: flex;
          margin-bottom: 20px;
          width: 100%;
        }
        
        .generated-link {
          flex: 1;
          padding: 12px 15px;
          border: 2px solid #333;
          border-right: none;
          border-radius: 10px 0 0 10px;
          font-size: 14px;
          background: #2c2c2c;
          color: #f5f5f5;
          min-width: 0;
        }
        
        .copy-btn {
          padding: 0 20px;
          background: #2c2c2c;
          color: #D4AF37;
          border: 2px solid #D4AF37;
          border-left: none;
          border-radius: 0 10px 10px 0;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          white-space: nowrap;
        }
        
        .copy-btn:hover {
          background: #D4AF37;
          color: #2c2c2c;
        }
        
        .preview-btn {
          width: 100%;
          padding: 16px;
          background: #2c2c2c;
          color: #D4AF37;
          border: 2px solid #D4AF37;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .preview-btn:hover {
          background: #D4AF37;
          color: #2c2c2c;
          transform: translateY(-2px);
        }
        
        @media (max-width: 600px) {
          .date-inputs-container {
            flex-direction: column;
            gap: 0;
          }
          
          .card-header h1 {
            font-size: 24px;
          }
          
          .card-header p {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Generate;