import { useContext } from 'react';
import './App.css';
import { GameContext, GameProvider } from './GameContext';
import Timer from './Timer';
import Arriesgar from './Arriesgar';
import Puntos from './Puntos';

function Juego() {
  const { currentCountry } = useContext(GameContext);

  return (
    <div className="game-shell">
      <div className="game-card">
        <header className="top-bar">
          <Puntos />
          <Timer />
        </header>

        <div className="flag-panel">
          {currentCountry ? (
            <img
              className="flag-image"
              src={currentCountry.flag}
              alt={currentCountry.name}
            />
          ) : (
            <p className="loading-text">Cargando bandera...</p>
          )}
        </div>

        <Arriesgar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Juego />
    </GameProvider>
  );
}


