import { useContext, useState } from 'react';
import { GameContext } from './GameContext';

export default function Arriesgar() {
  const { handleGuess, currentCountry } = useContext(GameContext);
  const [pais, setPais] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentCountry) {
      setMensaje('Todavía no hay una bandera cargada.');
      return;
    }

    if (!pais.trim()) {
      setMensaje('Escribi un nombre de pai­s.');
      return;
    }

    const acerto = handleGuess(pais);
    setMensaje(
      acerto
        ? `Muy bieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeen la bandera es de ${currentCountry.name}.`
        : `Incorrecto, era ${currentCountry.name}.`
    );
    setPais('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        placeholder="EscribÃ­ el nombre del paÃ­s"
      />
      <button type="submit">Arriesgar</button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
