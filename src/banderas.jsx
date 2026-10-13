import { GameProvider } from './GameContext';

export default function ListaBanderas({ children }) {
  return <GameProvider>{children}</GameProvider>;
}
