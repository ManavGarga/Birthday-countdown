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

  // Enhanced Confetti component with birthday-themed elements
  const Confetti = () => {
    return (
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => {
          const left = Math.floor(Math.random() * 100);
          const animationDelay = Math.random() * 5;
          const size = Math.floor(Math.random() * 10) + 5;
          // Birthday-themed colors with gold, purple, and blue accents
          const colors = ['#D4AF37', '#AA8C2C', '#8A2BE2', '#4169E1', '#FF69B4'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          const shapes = ['circle', 'rect', 'star'];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          
          return (
            <div 
              key={i}
              className={`confetti ${shape}`}
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
          <div className="magic-wand">✨</div>
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
                <option value="1">🎂 January</option>
                <option value="2">💖 February</option>
                <option value="3">🌸 March</option>
                <option value="4">🌼 April</option>
                <option value="5">🌞 May</option>
                <option value="6">🌈 June</option>
                <option value="7">🌴 July</option>
                <option value="8">🍉 August</option>
                <option value="9">🍁 September</option>
                <option value="10">🎃 October</option>
                <option value="11">🍂 November</option>
                <option value="12">🎄 December</option>

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
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          padding: 20px;
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
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
          opacity: 0;
          animation: confetti-fall 5s ease-in infinite;
        }
        
        .confetti.circle {
          border-radius: 50%;
        }
        
        .confetti.rect {
          border-radius: 2px;
        }
        
        .confetti.star {
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }
        
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            top: -10%;
            transform: rotate(0deg) translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            top: 100%;
            transform: rotate(720deg) translateX(20px) scale(0.5);
          }
        }
        
        .card {
          background: rgba(26, 26, 46, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5),
                      0 0 30px rgba(212, 175, 55, 0.2);
          width: 100%;
          max-width: 500px;
          z-index: 2;
          animation: cardEntrance 0.6s ease-out;
          position: relative;
          border: 1px solid rgba(212, 175, 55, 0.3);
          overflow: hidden;
        }
        
        .card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          transform: rotate(0deg);
          animation: shimmer 8s linear infinite;
          pointer-events: none;
        }
        
        @keyframes shimmer {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .card-header {
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(10, 10, 20, 0.9) 100%);
          color: #D4AF37;
          padding: 30px 20px;
          text-align: center;
          border-radius: 20px 20px 0 0;
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
          position: relative;
        }
        
        .magic-wand {
          font-size: 40px;
          margin-bottom: 10px;
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        
        .card-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          background: linear-gradient(45deg, #D4AF37, #FFD700, #D4AF37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shimmerText 3s linear infinite;
        }
        
        @keyframes shimmerText {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
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
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        .input-field {
          width: 100%;
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s;
          box-sizing: border-box;
          background: rgba(26, 26, 46, 0.6);
          color: #f5f5f5;
          font-family: 'Poppins', sans-serif;
        }
        
        .input-field::placeholder {
          color: #888;
        }
        
        .select-wrapper {
          position: relative;
          display: block;
        }
        
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
        
        .select-field option {
          background: #1a1a2e;
          color: #f5f5f5;
          padding: 10px;
        }
        
        @-moz-document url-prefix() {
          .select-field {
            text-indent: 0;
          }
        }
        
        .input-field:focus {
          border-color: #D4AF37;
          outline: none;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.3);
          background: rgba(26, 26, 46, 0.8);
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
        
        .month-select-container {
          position: relative;
          z-index: 1000;
        }
        
        .generate-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%);
          color: #D4AF37;
          border: 2px solid rgba(212, 175, 55, 0.5);
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        .generate-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }
        
        .generate-btn:hover::before {
          left: 100%;
        }
        
        .generate-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.2) 100%);
          box-shadow: 0 7px 14px rgba(212, 175, 55, 0.3);
        }
        
        .generate-btn.generated {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%);
          border-color: rgba(76, 175, 80, 0.5);
          color: #4CAF50;
        }
        
        .generate-btn.generated:hover {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.3) 0%, rgba(76, 175, 80, 0.2) 100%);
          box-shadow: 0 7px 14px rgba(76, 175, 80, 0.3);
        }
        
        .result-container {
          padding: 0 30px 30px;
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-right: none;
          border-radius: 10px 0 0 10px;
          font-size: 14px;
          background: rgba(26, 26, 46, 0.6);
          color: #f5f5f5;
          min-width: 0;
          font-family: 'Poppins', sans-serif;
        }
        
        .copy-btn {
          padding: 0 20px;
          background: rgba(26, 26, 46, 0.6);
          color: #D4AF37;
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-left: none;
          border-radius: 0 10px 10px 0;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          white-space: nowrap;
          font-family: 'Poppins', sans-serif;
        }
        
        .copy-btn:hover {
          background: rgba(212, 175, 55, 0.2);
        }
        
        .preview-btn {
          width: 100%;
          padding: 16px;
          background: rgba(26, 26, 46, 0.6);
          color: #D4AF37;
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        .preview-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }
        
        .preview-btn:hover::before {
          left: 100%;
        }
        
        .preview-btn:hover {
          background: rgba(212, 175, 55, 0.2);
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
          
          .form-container {
            padding: 20px;
          }
          
          .result-container {
            padding: 0 20px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Generate;