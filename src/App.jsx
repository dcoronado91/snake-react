import { useState } from 'react';
import HomeScreen from './HomeScreen';
import Game from './Game';

function App() {
  const [screen, setScreen] = useState('home');
  return screen === 'home'
    ? <HomeScreen onPlay={() => setScreen('game')} />
    : <Game onHome={() => setScreen('home')} />;
}

export default App;
