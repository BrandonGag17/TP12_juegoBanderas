import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function Puntos() {
  const { score } = useContext(GameContext);

  return (
    <div>
      <p>Puntos: {score}</p>
    </div>
  );
}
