import { useContext } from 'react';
import { GameContext } from './banderas';

export default function Puntos() {
  const { puntos } = useContext(GameContext);

  return (
    <div>
      <p>Puntos: {puntos}</p>
    </div>
  );
}