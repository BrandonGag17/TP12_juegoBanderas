import { useContext, useState } from 'react';
import { GameContext } from './banderas';

export default function Arriesgar() {
  const { handleAdivinar, paisActual } = useContext(GameContext);
  const [pais, setPais] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paisActual) {
      setMensaje('Todavía no hay una bandera cargada.');
      return;
    }

    if (!pais.trim()) {
      setMensaje('Escribí un nombre de país.');
      return;
    }

    const acerto = handleAdivinar(pais);
    setMensaje(
      acerto
        ? `¡Correcto! La bandera es de ${paisActual.name}.`
        : `Incorrecto, era ${paisActual.name}.`
    );
    setPais('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        placeholder="Escribí el nombre del país"
      />
      <button type="submit">Arriesgar</button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}