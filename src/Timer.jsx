import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function Timer() {
  const { timeLeft } = useContext(GameContext);

  return <p>Tiempo: {timeLeft}s</p>;
}