import { useContext, useEffect, useState } from 'react';
import { GameContext } from './banderas';

export default function Timer() {
  const { paisActual, paises, siguientePais, sumarPuntos } = useContext(GameContext);
  const [tiempo, setTiempo] = useState(30);

  useEffect(() => {
    if (!paisActual || !paises.length) return;

    setTiempo(30);

    const interval = setInterval(() => {
      setTiempo((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          sumarPuntos(-1);
          siguientePais();
          return 30;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paisActual, paises, siguientePais, sumarPuntos]);

  return <p>Tiempo: {tiempo}s</p>;
}

