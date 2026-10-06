import { useContext } from 'react';
import './App.css';
import ListaBanderas, { GameContext } from './banderas';
import Timer from './Timer';
import Arriesgar from './Arriesgar';
import Puntos from './Puntos';

function Juego() {
  const { paisActual } = useContext(GameContext);

  return (
    <div className="game-shell">
      <div className="game-card">
        <header className="top-bar">
          <Puntos />
          <Timer />
        </header>

        <div className="flag-panel">
          {paisActual ? (
            <img
              className="flag-image"
              src={paisActual.flag}
              alt={paisActual.name}
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
    <ListaBanderas>
      <Juego />
    </ListaBanderas>
  );
}
