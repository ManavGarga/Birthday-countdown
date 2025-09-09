# 🎉 Birthday Countdown App

A beautiful, interactive birthday countdown application built with React that celebrates special days with style!  

---

## ✨ Features  

- **Personalized Countdown**: Track days, hours, minutes, and seconds until the birthday  
- **Interactive Celebration**: Click anywhere for confetti explosions and animations  
- **Multiple Themes**: Choose from 5 beautiful color themes  
- **Birthday Quiz**: Test how well you know the birthday person  
- **Memory Gallery**: Upload and share photos/videos  
- **Custom Wishes**: Create and save personalized birthday messages  
- **Virtual Birthday Card**: Display a beautiful digital card  
- **Music Player**: Play birthday songs with custom controls  
- **Share Functionality**: Share the countdown with friends and family  
- **Responsive Design**: Works on all device sizes  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js (version 14 or higher)  
- npm or yarn  

### Installation  

Clone the repository:  
```bash
git clone <your-repo-url>
cd birthday-countdown
```

Install dependencies:  
```bash
npm install
```

Start the development server:  
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

---

## 🎨 Customization  

### Setting the Birthday Person  
Edit the default props in the **Birthday.js** component:  
```jsx
<Birthday name="Manav" day={22} month={9} />
```

### Adding Quiz Questions  
Modify the `quizQuestions` array:  
```jsx
const quizQuestions = [
  {
    question: `What is ${name}'s favorite color?`,
    options: ['Blue', 'Red', 'Green', 'Yellow'],
    correct: 0
  },
  // Add more questions...
];
```

### Customizing Themes  
Add new themes to the `themes` object:  
```jsx
const themes = {
  // Existing themes...
  newTheme: { primary: '#your-color', secondary: '#your-color' },
};
```

---

## 📁 Project Structure  

```
src/
├── components/
│   ├── Birthday.js          # Main birthday component
│   ├── Countdown.js         # Countdown timer component
│   ├── Birthday.css         # Styles for the birthday component
│   └── birthdaySong.mp3     # Birthday audio file
└── App.js                   # Main app component
```

---

## 🎮 How to Use  

- **View Countdown**: The main page shows the time remaining until the birthday  
- **Celebrate**: Click anywhere on the screen to trigger confetti and animations  
- **Change Theme**: Click the "Themes" button to select a different color scheme  
- **Play Music**: Click the music player to toggle birthday songs  
- **Create Wish**: Use the "Create Wish" button to write a personalized message  
- **Add Memories**: Upload photos or videos with the "Add Memory" feature  
- **Take Quiz**: Test your knowledge with the birthday quiz  
- **Share**: Use the share button to send the countdown to others  

---

## 🛠️ Built With  

- [React](https://reactjs.org/) - Frontend framework  
- [React Router](https://reactrouter.com/) - Navigation  
- **CSS3** - Styling and animations  

---

## 📱 Browser Support  

- Chrome (latest)  
- Firefox (latest)  
- Safari (latest)  
- Edge (latest)  

---

## 🤝 Contributing  

1. Fork the project  
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

---

## 📄 License  

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.  

---

## 🎊 Enjoy!  

Make birthdays more special with this interactive countdown app! Perfect for surprising friends and family with a personalized celebration experience.  

For any questions or support, please open an issue in the repository.  
