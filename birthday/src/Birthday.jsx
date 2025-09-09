import React, { useState, useEffect, useRef } from 'react';
import Countdown from './Countdown';
import { Link } from 'react-router-dom';
import birthdaySong from './birthdaySong.mp3';
import './Birthday.css';

const Birthday = ({ name = 'Manav', day = 22, month = 9 }) => {
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isItBday: false,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [theme, setTheme] = useState('default');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showWishCreator, setShowWishCreator] = useState(false);
  const [customWish, setCustomWish] = useState('');
  const [memories, setMemories] = useState([]);
  const [showMemoryUpload, setShowMemoryUpload] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [showBirthdayCard, setShowBirthdayCard] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const audioRef = useRef(null);
  const confettiInterval = useRef(null);
  const celebrationTimeout = useRef(null);
  const fileInputRef = useRef(null);

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  const isItBday =
    currentTime.getDate() === day && currentTime.getMonth() === month - 1;

  // Quiz questions about the birthday person
  const quizQuestions = [
    {
      question: `What is ${name}'s favorite color?`,
      options: ['Blue', 'Red', 'Green', 'Yellow'],
      correct: 0
    },
    {
      question: `What is ${name}'s favorite food?`,
      options: ['Pizza', 'Sushi', 'Burgers', 'Tacos'],
      correct: 1
    },
    {
      question: `What year was ${name} born?`,
      options: ['1990', '1995', '2000', '2005'],
      correct: 2
    }
  ];

  // Custom confetti effect
  useEffect(() => {
    if (isItBday) {
      startCelebration();
    }
  }, [isItBday]);

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const startCelebration = () => {
    setShowCelebration(true);
    
    // Create initial confetti
    createConfetti();
    
    // Set interval to keep creating confetti
    confettiInterval.current = setInterval(createConfetti, 800);
    
    // Clean up after 10 seconds
    celebrationTimeout.current = setTimeout(() => {
      stopCelebration();
    }, 10000);
  };

  const stopCelebration = () => {
    setShowCelebration(false);
    if (confettiInterval.current) {
      clearInterval(confettiInterval.current);
    }
    setConfettiPieces([]);
    setExplosions([]);
  };

  const createConfetti = () => {
    const pieces = [];
    const colors = ['#FFC700', '#FF0058', '#FF6B35', '#00C2BA', '#5E17EB', '#FF28D4'];
    
    for (let i = 0; i < 30; i++) {
      pieces.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
      });
    }
    
    setConfettiPieces(prev => [...prev, ...pieces]);
    
    // Remove pieces after animation
    setTimeout(() => {
      setConfettiPieces(prev => prev.filter(p => !pieces.some(np => np.id === p.id)));
    }, 3000);
  };

  const createExplosion = () => {
    const newExplosions = [];
    const colors = ['#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF'];
    
    // Create explosions at random positions across the screen
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      for (let j = 0; j < 20; j++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 3;
        
        newExplosions.push({
          id: Date.now() + i * 20 + j,
          x: x,
          y: y,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocityX: Math.cos(angle) * velocity,
          velocityY: Math.sin(angle) * velocity,
          life: 100,
        });
      }
    }
    
    setExplosions(prev => [...prev, ...newExplosions]);
  };

  useEffect(() => {
    const explosionInterval = setInterval(() => {
      setExplosions(prev => 
        prev
          .map(exp => ({
            ...exp,
            x: exp.x + exp.velocityX,
            y: exp.y + exp.velocityY,
            life: exp.life - 2,
          }))
          .filter(exp => exp.life > 0)
      );
    }, 50);

    return () => clearInterval(explosionInterval);
  }, []);

  const triggerCelebration = () => {
    // Clear any existing celebration
    if (confettiInterval.current) {
      clearInterval(confettiInterval.current);
    }
    if (celebrationTimeout.current) {
      clearTimeout(celebrationTimeout.current);
    }
    
    // Start new celebration
    startCelebration();
    createExplosion();
  };

  const handleMemoryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newMemory = {
          id: Date.now(),
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: event.target.result,
          caption: `Memory ${memories.length + 1}`
        };
        setMemories(prev => [...prev, newMemory]);
        showNotification('Memory added successfully!');
      };
      reader.readAsDataURL(file);
    }
    setShowMemoryUpload(false);
  };

  const removeMemory = (id) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
    showNotification('Memory removed');
  };

  const shareCountdown = () => {
    if (navigator.share) {
      navigator.share({
        title: `${name}'s Birthday Countdown`,
        text: `Check out ${name}'s birthday countdown!`,
        url: window.location.href,
      })
      .then(() => showNotification('Countdown shared successfully!'))
      .catch(() => showNotification('Sharing failed'));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showNotification('Link copied to clipboard!'))
        .catch(() => showNotification('Failed to copy link'));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const dateAtm = new Date();

      let birthdayDay = new Date(currentYear, month - 1, day);
      if (dateAtm > birthdayDay) {
        birthdayDay = new Date(currentYear + 1, month - 1, day);
      }

      const currentTime = dateAtm.getTime();
      const birthdayTime = birthdayDay.getTime();
      const timeRemaining = birthdayTime - currentTime;

      let seconds = Math.floor(timeRemaining / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      seconds %= 60;
      minutes %= 60;
      hours %= 24;

      setState({
        seconds,
        minutes,
        hours,
        days,
        isItBday,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentYear, day, month, isItBday]);

  const birth = new Date(currentYear, month - 1, day);
  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];
  const monthBday = monthNames[birth.getMonth()];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const themes = {
    default: { primary: '#667eea', secondary: '#764ba2' },
    sunset: { primary: '#ff7e5f', secondary: '#feb47b' },
    ocean: { primary: '#4facfe', secondary: '#00f2fe' },
    forest: { primary: '#11998e', secondary: '#38ef7d' },
    berry: { primary: '#f5576c', secondary: '#f093fb' },
  };

  const applyTheme = (themeKey) => {
    setTheme(themeKey);
    setShowThemeSelector(false);
    showNotification(`Theme changed to ${themeKey}`);
  };

  const saveWish = () => {
    if (customWish.trim()) {
      localStorage.setItem(`birthdayWish-${name}`, customWish);
      setShowWishCreator(false);
      showNotification('Wish saved successfully!');
    }
  };

  useEffect(() => {
    const savedWish = localStorage.getItem(`birthdayWish-${name}`);
    if (savedWish) {
      setCustomWish(savedWish);
    }
  }, [name]);

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizQuestion(0);
    setQuizScore(0);
  };

  const answerQuestion = (answerIndex) => {
    if (answerIndex === quizQuestions[quizQuestion].correct) {
      setQuizScore(quizScore + 1);
      showNotification('Correct answer!');
    } else {
      showNotification('Wrong answer!');
    }

    if (quizQuestion < quizQuestions.length - 1) {
      setQuizQuestion(quizQuestion + 1);
    } else {
      // Quiz finished
      setShowQuiz(false);
      showNotification(`Quiz completed! Score: ${quizScore + (answerIndex === quizQuestions[quizQuestion].correct ? 1 : 0)}/${quizQuestions.length}`);
      triggerCelebration();
    }
  };

  return (
    <div 
      className={`birthday-page ${isItBday || showCelebration ? 'celebration' : ''}`}
      onClick={() => {
        if (!showThemeSelector && !showWishCreator && !showMemoryUpload && !showQuiz && !showBirthdayCard) {
          triggerCelebration();
        }
      }}
      style={{ 
        cursor: 'pointer',
        background: `linear-gradient(135deg, ${themes[theme].primary} 0%, ${themes[theme].secondary} 100%)`
      }}
    >
      {/* Custom Confetti */}
      {confettiPieces.length > 0 && (
        <div className="confetti-container">
          {confettiPieces.map(piece => (
            <div
              key={piece.id}
              className="confetti-piece"
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
                animation: `fall ${piece.speed}s linear forwards`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Explosion Effects */}
      {explosions.length > 0 && (
        <div className="explosion-container">
          {explosions.map(exp => (
            <div
              key={exp.id}
              className="explosion-piece"
              style={{
                left: `${exp.x}%`,
                top: `${exp.y}%`,
                width: `${exp.size}px`,
                height: `${exp.size}px`,
                backgroundColor: exp.color,
                opacity: exp.life / 100,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Notification */}
      {notification.show && (
        <div className="notification">
          {notification.message}
        </div>
      )}
      
      <div className="birthday-container">
        <div className="settings-bar">
          <button 
            className="settings-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowThemeSelector(!showThemeSelector);
              setShowWishCreator(false);
              setShowMemoryUpload(false);
              setShowQuiz(false);
              setShowBirthdayCard(false);
            }}
          >
            🎨 Themes
          </button>
          <button 
            className="settings-btn"
            onClick={(e) => {
              e.stopPropagation();
              shareCountdown();
            }}
          >
            📤 Share
          </button>
        </div>
        <br />
        
        {showThemeSelector && (
          <div className="theme-selector" onClick={e => e.stopPropagation()}>
            <h3>Select a Theme</h3>
            <div className="theme-options">
              {Object.keys(themes).map(themeKey => (
                <div 
                  key={themeKey} 
                  className="theme-option"
                  onClick={() => applyTheme(themeKey)}
                  style={{ 
                    background: `linear-gradient(135deg, ${themes[themeKey].primary} 0%, ${themes[themeKey].secondary} 100%)` 
                  }}
                >
                  {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="birthday-header">
          <h1 className="birthday-title">
            {isItBday ? (
              <>
                Happy Birthday <span className="name-highlight">{name}</span>! 🎉
              </>
            ) : (
              <>
                <span className="name-highlight">{name}'s</span> Birthday Countdown
              </>
            )}
          </h1>
          <div className="birthday-subtitle">
            {isItBday 
              ? (customWish || "Wishing you an amazing day filled with joy and laughter!") 
              : "Click anywhere to celebrate!"}
          </div>
        </div>

        <div className="countdown-section">
          <Countdown countdownData={state} name={name} />
        </div>

        {!isItBday && (
          <div className="birthdate-display">
            <div className="birthdate-label">Birth Date:</div>
            <div className="birthdate-value">{day} {monthBday} {currentYear}</div>
          </div>
        )}

        <div className="interactive-section">
          <div className="music-player" onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}>
            <div className="music-icon">
              {isPlaying ? '❚❚' : '▶'}
            </div>
            <div className="music-label">
              {isPlaying ? 'Pause Song' : 'Play Birthday Song'}
            </div>
          </div>

          <audio ref={audioRef} src={birthdaySong} />
          
          <div className="action-buttons">
            <button 
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowWishCreator(!showWishCreator);
                setShowThemeSelector(false);
                setShowMemoryUpload(false);
                setShowQuiz(false);
                setShowBirthdayCard(false);
              }}
            >
              💝 Create Wish
            </button>
            
            <button 
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowMemoryUpload(!showMemoryUpload);
                setShowThemeSelector(false);
                setShowWishCreator(false);
                setShowQuiz(false);
                setShowBirthdayCard(false);
              }}
            >
              📸 Add Memory
            </button>
            
            <button 
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowBirthdayCard(!showBirthdayCard);
                setShowThemeSelector(false);
                setShowWishCreator(false);
                setShowMemoryUpload(false);
                setShowQuiz(false);
              }}
            >
              🎁 Virtual Card
            </button>
            
            <button 
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                startQuiz();
                setShowThemeSelector(false);
                setShowWishCreator(false);
                setShowMemoryUpload(false);
                setShowBirthdayCard(false);
              }}
            >
              ❓ Birthday Quiz
            </button>
            
            <Link to="/generate" className="action-btn generate-countdown-btn" onClick={(e) => e.stopPropagation()}>
              🎂 Create Countdown
            </Link>
          </div>
          
          {showWishCreator && (
            <div className="wish-creator" onClick={e => e.stopPropagation()}>
              <h3>Create a Birthday Wish</h3>
              <textarea
                value={customWish}
                onChange={(e) => setCustomWish(e.target.value)}
                placeholder="Enter your birthday wish here..."
                rows="3"
              />
              <div className="wish-actions">
                <button onClick={saveWish}>Save Wish</button>
                <button onClick={() => setShowWishCreator(false)}>Cancel</button>
              </div>
            </div>
          )}
          
          {showMemoryUpload && (
            <div className="memory-upload" onClick={e => e.stopPropagation()}>
              <h3>Add a Memory</h3>
              <p>Upload a photo or video to remember this special day</p>
              <button onClick={() => fileInputRef.current?.click()}>
                Choose File
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleMemoryUpload}
                accept="image/*,video/*"
                style={{ display: 'none' }}
              />
              <button onClick={() => setShowMemoryUpload(false)}>Cancel</button>
            </div>
          )}
          
          {showBirthdayCard && (
            <div className="birthday-card" onClick={e => e.stopPropagation()}>
              <h3>Virtual Birthday Card</h3>
              <div className="card-content">
                <div className="card-front">
                  <h4>Happy Birthday {name}!</h4>
                  <p>Wishing you all the best on your special day!</p>
                </div>
                <div className="card-message">
                  <p>{customWish || "May your day be filled with joy and laughter!"}</p>
                </div>
              </div>
              <button onClick={() => setShowBirthdayCard(false)}>Close</button>
            </div>
          )}
          
          {showQuiz && (
            <div className="quiz-container" onClick={e => e.stopPropagation()}>
              <h3>Birthday Quiz</h3>
              <p>How well do you know {name}?</p>
              <div className="quiz-question">
                <h4>{quizQuestions[quizQuestion].question}</h4>
                <div className="quiz-options">
                  {quizQuestions[quizQuestion].options.map((option, index) => (
                    <button 
                      key={index} 
                      className="quiz-option"
                      onClick={() => answerQuestion(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowQuiz(false)}>Cancel Quiz</button>
            </div>
          )}
        </div>

        {memories.length > 0 && (
          <div className="memories-section">
            <h3>Special Memories</h3>
            <div className="memories-grid">
              {memories.map(memory => (
                <div key={memory.id} className="memory-item">
                  {memory.type === 'image' ? (
                    <img src={memory.url} alt={memory.caption} />
                  ) : (
                    <video controls>
                      <source src={memory.url} type="video/mp4" />
                    </video>
                  )}
                  <button 
                    className="remove-memory"
                    onClick={() => removeMemory(memory.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="click-hint">
          Click anywhere for a celebration!
        </div>
      </div>
    </div>
  );
};

export default Birthday;